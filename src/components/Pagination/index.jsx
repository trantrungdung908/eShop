import { useMemo } from "react";

const PAGE_STEP = 1;

const Pagination = ({ page, limit = 0, total = 0, onPagiChange }) => {
  const totalPage = useMemo(() => {
    if (!limit || !total) {
      return 1;
    }
    return Math.ceil(Number(total) / Number(limit) || 1);
  }, [limit, total]);

  const pageList = useMemo(() => {
    let start = page - PAGE_STEP;
    let end = page + PAGE_STEP;

    if (start <= 0) {
      start = 1;
      end = start + PAGE_STEP * 2;

      if (end > totalPage) {
        end = totalPage;
      }
    }
    if (end >= totalPage) {
      end = totalPage;
      start = end - PAGE_STEP * 2;
      if (start < 1) {
        start = 1;
      }
    }
    const list = [];
    for (let i = start; i < end + 1; i++) {
      list.push(i);
    }
    return list;
  }, [page, totalPage]);

  const onNext = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPage) {
      onPagiChange(nextPage);
    }
  };

  const onPrev = () => {
    const prePage = page - 1;
    if (prePage > 0) {
      onPagiChange(prePage);
    }
  };
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button
            onClick={() => onPrev()}
            className="page-link page-link-prev"
            aria-label="Previous"
            tabIndex={-1}
            aria-disabled="true"
          >
            <span aria-hidden="true">
              <i className="icon-long-arrow-left" />
            </span>
            Prev{" "}
          </button>
        </li>

        {pageList.map((item) => {
          return (
            <li
              className={`page-item ${item === page ? "active" : ""}`}
              aria-current="page"
              key={item}
            >
              <button onClick={() => onPagiChange(item)} className="page-link">
                {item}
              </button>
            </li>
          );
        })}

        <li className="page-item-total"> of {totalPage}</li>
        <li className={`page-item ${page === totalPage ? "disabled" : ""}`}>
          <button
            className="page-link page-link-next"
            aria-label="Next"
            onClick={() => onNext()}
          >
            {" "}
            Next{" "}
            <span aria-hidden="true">
              <i className="icon-long-arrow-right" />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
