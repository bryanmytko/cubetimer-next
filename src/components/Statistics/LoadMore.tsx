interface LoadMoreProps {
  loading: boolean;
  onClick: () => void;
}

const LoadMore = ({ loading, onClick }: LoadMoreProps) => (
  <div className="flex justify-center mt-8">
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="rounded-lg border border-neutral-600 px-5 py-2 text-sm font-bold text-neutral-100 hover:border-yellow-300 hover:text-yellow-300 transition-colors disabled:opacity-50 disabled:hover:border-neutral-600 disabled:hover:text-neutral-100"
    >
      {loading ? "Loading…" : "Load more"}
    </button>
  </div>
);

export default LoadMore;
