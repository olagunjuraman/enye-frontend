import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";
import axios from "axios";
import Paginate from "../components/Paginate";
import Loader from "../components/Loader";
import { v4 as uuidv4 } from "uuid";

const UserListScreen = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [profilePerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchColumns, setSearchColumns] = useState([
    "Gender",
    "PaymentMethod",
  ]);

  const pages = Math.ceil(data.length / profilePerPage);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: {
          records: { profiles },
        },
      } = await axios.get("https://api.enye.tech/v1/challenge/records");

      setData(
        profiles.map((profile) => {
          return { ...profile, id: uuidv4() };
        })
      );

      setLoading(false);
    };

    fetchData();
  }, []);

  // Get current Profiles
  const indexOfLastProfile = currentPage * profilePerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilePerPage;
  const currentProfile = data.slice(indexOfFirstProfile, indexOfLastProfile);

  const search = (rows) => {
    return rows.filter((row) =>
      searchColumns.some((column) => {
        if (keyword === "") {
          return rows;
        } else {
          return row[column].toString().toLowerCase() === keyword.toLowerCase();
        }
      })
    );
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const columns =
    data[0] &&
    Object.keys(data[0]).filter(
      (key) =>
        key === "PaymentMethod" ||
        key === "Gender" ||
        key === "FirstName" ||
        key === "LastName"
    );

  return (
    <>
      <div className="form-group has-search">
        <div className="main">
          <input
            type="text"
            value={keyword}
            className="form-control"
            placeholder="Pick a filter below and search e.g: Type Female to get all Female ...."
            onChange={(e) => setKeyword(e.target.value)}
          ></input>
          <pre></pre>
        </div>
        {columns &&
          columns.map((column) => (
            <label>
              <input
                type="checkbox"
                checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const checked = searchColumns.includes(column);
                  setSearchColumns((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column]
                  );
                }}
              />
              {column}
            </label>
          ))}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TableList data={search(currentProfile)} />
          <Paginate pages={pages} page={currentPage} paginate={paginate} />
        </>
      )}
    </>
  );
};

export default UserListScreen;
