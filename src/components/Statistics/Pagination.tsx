interface PaginationProps {
  endCursor: string;
  fetchMore: any; // yeah this is gross https://github.com/apollographql/apollo-feature-requests/issues/165
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  model: string;
  per_page: number;
  startCursor: string;
}

const Pagination = (props: PaginationProps) => {
  return <></>;
};

export default Pagination;
