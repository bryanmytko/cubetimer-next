interface PaginationProps {
  endCursor: string;
  fetchMore: any; // yeah this is gross https://github.com/apollographql/apollo-feature-requests/issues/165
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  per_page: number;
  startCursor: string;
}

const Pagination = (props: PaginationProps) => {
  const {
    endCursor,
    fetchMore,
    hasNextPage,
    hasPreviousPage,
    per_page,
    startCursor,
  } = props;

  return (
    <div className="flex justify-center">
      {hasPreviousPage ? (
        <button
          className="px-4 py-2 my-10 mr-4 text-white bg-blue-500 rounded"
          onClick={() => {
            fetchMore({
              variables: {
                before: startCursor,
                first: null,
                last: per_page,
              },
              updateQuery: (_: any, { fetchMoreResult }: any) => {
                fetchMoreResult.solves.edges = [
                  ...fetchMoreResult.solves.edges,
                ];
                return fetchMoreResult;
              },
            });
          }}
        >
          &lt;
        </button>
      ) : (
        ""
      )}
      {hasNextPage ? (
        <button
          className="px-4 py-2 my-10 text-white bg-blue-500 rounded"
          onClick={() => {
            fetchMore({
              variables: {
                after: endCursor,
                first: per_page,
              },
              updateQuery: (_: any, { fetchMoreResult }: any) => {
                fetchMoreResult.solves.edges = [
                  ...fetchMoreResult.solves.edges,
                ];
                return fetchMoreResult;
              },
            });
          }}
        >
          &gt;
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pagination;
