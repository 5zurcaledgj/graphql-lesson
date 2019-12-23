import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import CheckoutPage from "./checkout.component";

const GET_CART_ITEMS_AND_TOTAL_PRICE = gql`
  {
    cartItems @client
    totalPrice @client
  }
`;

const CheckoutPageContainer = () => {
  return (
    <Query query={GET_CART_ITEMS_AND_TOTAL_PRICE}>
      {({ data: { cartItems, totalPrice } }) => (
        <CheckoutPage cartItems={cartItems} totalPrice={totalPrice} />
      )}
    </Query>
  );
};

export default CheckoutPageContainer;
