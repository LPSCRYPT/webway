import { gql, useQuery } from "@apollo/client";
import { Button, Input, Table, Typography } from "antd";
import "antd/dist/antd.css";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import fetch from "isomorphic-fetch";
import React, { useState, useEffect } from "react";
import { Address } from "../components";

function Subgraph(props) {
  const OWNERS_QUERY = `
  {
    owners {
      id
    }
  }
  `;
  const ACTIVE_EFFECTS_QUERY = `
  {
    activeEffects {
      uri,
      tokenId,
      key,
      active
    }
  }
  `;
  const TOKEN_URIS_QUERY = `
  {
    tokenURIs {
      id
      uri
    }
  }
  `;

  const OWNERS_GQL = gql(OWNERS_QUERY);
  const ACTIVE_GQL = gql(ACTIVE_EFFECTS_QUERY);
  const TOKEN_GQL = gql(TOKEN_URIS_QUERY);

  const { loading: loadingOwners, data: dataOwners } = useQuery(OWNERS_GQL, { pollInterval: 2500 });
  const { loading: loadingActive, data: dataActive } = useQuery(ACTIVE_GQL, { pollInterval: 2500 });
  const { loading: loadingToken, data: dataToken } = useQuery(TOKEN_GQL, { pollInterval: 2500 });

  const [owners, setOwners] = useState([]);
  const [effects, setEffects] = useState([]);
  const [tokens, setTokens] = useState([]);

  // dem hooks
  useEffect(() => {
    if (dataOwners && dataOwners.owners.length > 0) {
      let tempArr = dataOwners.owners.map(owner => ({
        id: owner.id,
      }));
      setOwners(tempArr);
    }
  }, [dataOwners]);
  useEffect(() => {
    if (dataActive && dataActive.activeEffects.length > 0) {
      let tempArr = dataActive.activeEffects.map(effect => ({
        uri: effect.uri,
      tokenId: effect.tokenId,
      key: effect.key,
      active: effect.active
      }));
      setEffects(tempArr);
    }
  }, [dataActive]);
  useEffect(() => {
    if (dataToken && dataToken.tokenURIs.length > 0) {
      let tempArr = dataToken.tokenURIs.map(effect => ({
        id: effect.id,
        uri: effect.uri,
      }));
      setTokens(tempArr);
    }
  }, [dataToken]);

  return (
    <>
      {dataOwners ? <div>{JSON.stringify({owners})}</div> : <div>Loading...</div>}
      {dataActive ? <div>{JSON.stringify({effects})}</div> : <div>Loading...</div>}
      {dataToken ? <div>{JSON.stringify({tokens})}</div> : <div>Loading...</div>}
    </>
  );
}

export default Subgraph;
