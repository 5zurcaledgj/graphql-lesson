import { gql } from "apollo-boost";

import {
  addItemToCart,
  getItemCount,
  getTotalPrice,
  clearItemFromCart,
  removeItemFromCart
} from "./cart.utils.js";

export const typeDef = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
    ClearItemFromCart(item: Item!): [Item]!
    RemoveItemFromCart(item: Item!): [Item]!
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

const GET_TOTAL_PRICE = gql`
  {
    totalPrice @client
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

      // Update cartItems and write to cache
      const updatedCartItems = addItemToCart(cartItems, item);
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: updatedCartItems
        }
      });

      //update item count
      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: {
          itemCount: getItemCount(updatedCartItems)
        }
      });

      //update totalPrice
      cache.writeQuery({
        query: GET_TOTAL_PRICE,
        data: {
          totalPrice: getTotalPrice(updatedCartItems)
        }
      });

      return updatedCartItems;
    },
    clearItemFromCart: (_, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      // Update cartItems and write to cache
      const updatedCartItems = clearItemFromCart(cartItems, item);
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: updatedCartItems
        }
      });

      //update item count
      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: {
          itemCount: getItemCount(updatedCartItems)
        }
      });

      //update totalPrice
      cache.writeQuery({
        query: GET_TOTAL_PRICE,
        data: {
          totalPrice: getTotalPrice(updatedCartItems)
        }
      });

      return updatedCartItems;
    },

    removeItemFromCart: (_, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      // Update cartItems and write to cache
      const updatedCartItems = removeItemFromCart(cartItems, item);
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: updatedCartItems
        }
      });

      //update item count
      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: {
          itemCount: getItemCount(updatedCartItems)
        }
      });

      //update totalPrice
      cache.writeQuery({
        query: GET_TOTAL_PRICE,
        data: {
          totalPrice: getTotalPrice(updatedCartItems)
        }
      });

      return updatedCartItems;
    }
  }
};
