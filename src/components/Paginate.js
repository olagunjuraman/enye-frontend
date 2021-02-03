import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page }) => {
  return (
    pages > 1 && (
      <nav>
        <ul className="pagination">
          {[...Array(pages).keys()].map((x) => (
            <li key={x} className="page-item">
              <Link to={`/page/${x + 1}`} className="page-link">
                {" "}
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Paginate;
