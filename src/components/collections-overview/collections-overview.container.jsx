import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionsOverview from "./collections-overview.component";
import Spinner from "../../components/spinner/spinner.component";

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverviewContainer = () => {
  return (
    <Query query={GET_COLLECTIONS}>
      {({ error, loading, data }) => {
        return loading ? (
          <Spinner />
        ) : (
          <CollectionsOverview collections={data.collections} />
        );
      }}
    </Query>
  );
};

export default CollectionsOverviewContainer;
