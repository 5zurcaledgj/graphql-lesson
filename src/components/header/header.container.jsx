import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Header from "./header.component";

const GET_CLIENT_PROPERTIES = gql`
  {
    cartHidden @client
    currentUser @client
  }
`;

const HeaderContainer = () => {
  return (
    <Query query={GET_CLIENT_PROPERTIES}>
      {({ data: { cartHidden, currentUser } }) => (
        <Header currentUser={currentUser} hidden={cartHidden} />
      )}
    </Query>
  );
};

export default HeaderContainer;
