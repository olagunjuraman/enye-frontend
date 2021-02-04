import React from "react";
import { NavLink } from "react-router-dom";

const Paginate = ({ pages, page, paginate }) => {
  return (
    pages > 1 && (
      <nav>
        <ul className="pagination">
          {[...Array(pages).keys()].map((x) => (
            <li key={x + 1} className={x + 1 === page ? "page-item active" : undefined} >
              <NavLink
                to={`/`}
                className="page-link"
                
                onClick={() => paginate(x + 1)}
              >
                {" "}
                {x + 1}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Paginate;
