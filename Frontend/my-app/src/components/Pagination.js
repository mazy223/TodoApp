function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          href="#aa"
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </a>
      </li>

      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`page-item ${currentPage === number ? 'active' : ''}`}
        >
          <a
            href="#aa"
            className="page-link"
            onClick={() => onPageChange(number)}
          >
            {number}
          </a>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <a
          href="#aa"
          className="page-link"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </a>
      </li>
    </ul>
  );
}

export default Pagination;
