import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Header from "./shared/Header/";
import Feed from "./shared/Feed/";
import Style from "../css/meme.css";

const MemeBase = () => (
  <Query
    query={gql`
      {
        memesConnection (first: 10) {
          edges {
            node {
              id
              url
            }
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;
      return (
        <span className={Style.container}>
          <Header />
          <Feed items={data.memesConnection.edges}/>
        </span>
      );
    }}
  </Query>
);

export default MemeBase;
