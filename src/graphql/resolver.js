import { gql } from "apollo-boost";

import { addItemToCart, getItemCount } from "./cart.utils.js";

export const typeDef = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, _context, _info) => {
      const { cache } = _context;
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN
      });

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden }
      });

      return !cartHidden;
    },
    addItemToCart: (_root, _args, _context, _info) => {
      const { cache } = _context;
      const { item } = _args;
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const updatedCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: {
          itemCount: getItemCount(updatedCartItems)
        }
      });

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: updatedCartItems }
      });

      return updatedCartItems;
    }
  }
};
