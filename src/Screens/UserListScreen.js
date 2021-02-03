import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";
import axios from "axios";
import Paginate from "../components/Paginate";
import Loader from '../components/Loader'

const UserListScreen = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [profilePerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const pages = Math.ceil(data.length / profilePerPage);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: {
          records: { profiles },
        },
      } = await axios.get("https://api.enye.tech/v1/challenge/records");

      setData(profiles);
      setLoading(false)
    };

    fetchData();
  }, []);

  // Get current Profiles
  const indexOfLastProfile = currentPage * profilePerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilePerPage;
  const currentProfile = data.slice(indexOfFirstProfile, indexOfLastProfile);

  const search = (rows) => {
    return rows.filter(
      (row) => row.FirstName.toLowerCase().indexOf(keyword) > -1
    );
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div class="form-group has-search">
        <span class="fa fa-search form-control-feedback"></span>
        <div className="main">
          <input
            type="text"
            value={keyword}
            className="form-control"
            placeholder="What you looking for?"
            onChange={(e) => setKeyword(e.target.value)}
          ></input>
        </div>
      </div>
      {loading ? <Loader/> : ( <>
         <TableList data={search(currentProfile)} />
         <Paginate pages={pages} page={currentPage} paginate={paginate} />
         </>
      )}
     
    </>
  );
};

export default UserListScreen;
