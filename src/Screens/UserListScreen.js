import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";
import { Route } from "react-router-dom";
import axios from "axios";
import Paginate from "../components/Paginate";
import SearchBox from "../components/SearchBox";
import { Form, Row } from "react-bootstrap";

const UserListScreen = ({ match }) => {
  let currentPage = match.params.pageNumber || 1;
  const [data, setData] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePerPage, setProfilePerPage] = useState(20);

  const pages = Math.ceil(profiles.length / profilePerPage);
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: {
          records: { profiles },
        },
      } = await axios.get("https://api.enye.tech/v1/challenge/records");

      setProfiles(profiles);
      setData(profiles);
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

  return (
    <>
      <div class="form-group has-search">
        <span class="fa fa-search form-control-feedback"></span>
        <div className='main'>
        <input
          type="text"
          value={keyword}
          className="form-control"
          placeholder="What you looking for?"
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
        </div>
     
      </div>
      <TableList data={search(currentProfile)} />
      <Paginate pages={pages} page={currentPage} />
    </>
  );
};

export default UserListScreen;
