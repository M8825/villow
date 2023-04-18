import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { fetchSearchListings } from "../../store/listingsReducer";
import { getLocalStorageSearchCredentials } from "../../store/utils";
import { setSearchWordToLocalStorage } from "../../store/searchFilters";

export const useSuggestionItem = (term, suggestion) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const splash = location.pathname === "/";

  const handleSearchOnClickItem = (e) => {

    e.preventDefault();


    let cleanSuggestion = "";
    let citySuffix;

    // Separate suggestions components if it's city - City, State
    if (term === "city") {
      cleanSuggestion = suggestion.split(",")[0]
      citySuffix = suggestion.split(",")[1];
    } else {
      // In case of zipcode or state there is nothing to separate
      cleanSuggestion = suggestion;
    }

    dispatch(setSearchWordToLocalStorage(citySuffix, cleanSuggestion, term));


    const { listingType } = getLocalStorageSearchCredentials();


    dispatch(
      fetchSearchListings(term, cleanSuggestion, { listing_type: listingType })
    );

    history.push("/listings");
  };

  return { splash, handleSearchOnClickItem };
};
