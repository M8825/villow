const RECEIVE_SERCHING_DATA = "localstorage/RECEIVE_SERCHING_DATA";
const RECEIVE_SEARCH_WORD = "localstorage/RECEIVE_SEARCH_WORD";
const RECEIVE_LISTING_TYPE = "localstorage/RECEIVE_LISTING_TYPE";
const RECEIVE_BEDROOM = "localstorage/RECEIVE_BEDROOM";
const RECEIVE_BATHROOM = "localstorage/RECEIVE_BATHROOM";
const RECEIVE_EXCLUDES = "localstorage/RECEIVE_EXCLUDES";

const receiveSearchData = (payload) => ({
  type: RECEIVE_SERCHING_DATA,
  payload,
});

const setSearchWord = (payload) => ({
  type: RECEIVE_SEARCH_WORD,
  payload
});

const receiveListingType = (payload) => ({
  type: RECEIVE_LISTING_TYPE,
  payload
});

const receiveBedrooms = (numberOfBedroom) => ({
  type: RECEIVE_BEDROOM,
  numberOfBedroom
})

const receiveBathrooms = (numberOfBathroom) => ({
  type: RECEIVE_BATHROOM,
  numberOfBathroom
})


const receiveExcludes = (excludes) => ({
  type: RECEIVE_EXCLUDES,
  excludes
})

export const getSearchWord = () => (state) => {
  if (state && state.searchFilter) {
    return state.searchFilter.searchWord;
  }

  return null;
};

export const getFilter = () => (state) => {
  if (state && state.searchFilter) {
    return state.searchFilter
  }

  return null
}


export const getPrice = (priceLabel) => (state) => {
  if (state && state.searchFilter) {
    priceLabel = priceLabel === "No Min" ? "minPrice" : "maxPrice";

    return state.searchFilter[priceLabel];
  }

  return null;
};

export const getNumberOfBedrooms = () => (state) => {
  if (state && state.searchFilter) {
    return state.searchFilter.bedroom;
  }

  return null;
}

export const getNumberOfBathrooms = () => (state) => { 
  if (state && state.searchFilter) {
    return state.searchFilter.bathroom;
  }

  return null;
}


export const getExcludes = () => (state) => {
  if (state && state.searchFilter.excludes) {
    return state.searchFilter.excludes;
  }

  return null;
}

export const setSearchWordToLocalStorage =
  (citySuffix, searchWord, term) => (dispatch) => {
    localStorage.setItem("searchWord", searchWord);
    localStorage.setItem("term", term);

    dispatch(setSearchWord({ citySuffix, searchWord, term }));
  };


export const setListingType = (listingType) => (dispatch) => {
  localStorage.setItem("listingType", listingType);

  dispatch(receiveListingType(listingType));
};

function getPriceLabel(priceLabel) {
  return (priceLabel = priceLabel === "No Min" ? "minPrice" : "maxPrice");
}

export const setPrice = (priceLabel, price) => (dispatch) => {
  const label = getPriceLabel(priceLabel);

  localStorage.setItem(`${label}`, price);
  dispatch(receiveSearchData({ [label]: price }));
};

export const setBedroom = (bedroom) => (dispatch) => {
  localStorage.setItem("bedroom", bedroom);

  dispatch(receiveBedrooms(bedroom));
}

export const setBathroom = (bathroom) => (dispatch) => {
  localStorage.setItem("bathroom", bathroom);
  
  dispatch(receiveBathrooms(bathroom));
};

export const setExcludes = (excludedListingsTypes) => (dispatch) => {
  localStorage.setItem("excludes", JSON.stringify(excludedListingsTypes));
  
  dispatch(receiveExcludes(excludedListingsTypes));
};


export const setInitialSearchingData = (localStorageData) => (dispatch) => {
  if (localStorageData) {
    dispatch(receiveSearchData(localStorageData));
  }
};

const searchFiltersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SERCHING_DATA:
      return { ...state, ...action.payload };
    case RECEIVE_SEARCH_WORD:
      return {
        ...state,
        searchWord: action.payload.searchWord,
        term: action.payload.term,
      };
    case RECEIVE_LISTING_TYPE:
      return { ...state, listingType: action.payload };
    case RECEIVE_BEDROOM:
      return { ...state, bedroom: action.numberOfBedroom };
    case RECEIVE_BATHROOM:
      return { ...state, bathroom: action.numberOfBathroom };
    case RECEIVE_EXCLUDES:
      return { ...state, excludes: action.excludes}
    default:
      return state;
  }
};

export default searchFiltersReducer;
