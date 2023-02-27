import React from "react";
import { gql, useQuery } from "@apollo/client";

import type { Solve } from "@prisma/client";

const AllSolvesQuery = gql`
  query {
    solves {
      scramble
      puzzle
      time
    }
  }
`;

const Statistics = () => {
  const { data, loading, error } = useQuery(AllSolvesQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log("Solve data:", data);

  return (
    <div className="text-white container statistics-container">
      <h1>Statistics</h1>
    </div>
  );
};

export default Statistics;
