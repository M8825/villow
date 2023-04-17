import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorageSearchCredentials } from "../../store/utils";
import Listings from "../ListingsIndex/Listings";
import SearchBar from "../SearchBar/SearchBar";
import { setInitialSearchingData } from "../../store/searchFilters";

import "./IndexPage.scss";
import { fetchSearchListings, getListings } from "../../store/listingsReducer";

const IndexPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageData = getLocalStorageSearchCredentials();

    dispatch(setInitialSearchingData(localStorageData));
  }, []);

  return (
    <>
      <SearchBar />
      <div className="index-page-container">
        <div style={{ width: "50vw", height: "100vh" }}>MAP COMMING</div>
        <Listings />
      </div>
    </>
  );
};

export default IndexPage;
