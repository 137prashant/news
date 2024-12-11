export default function Pagination({ totalPages, currentPage, changePage }) {
  if (totalPages <= 1) return null;
  return (
    <div className="join flex items-center justify-center flex-row my-8">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => changePage(index + 1)}
          className={`join-item btn ${
            currentPage === index + 1 ? "btn-active" : ""
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
