import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { getAnimeBySearchQuery } from "../services/animeService";
import { Spinner, Popover, PopoverBody } from "reactstrap";

function SearchBar({ placeholder }) {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [displaySearchItems, setDisplay] = useState(true);
  const [loading, setLoading] = useState(true);

  const debouncedChangeHandlerHelper = useMemo(
    () =>
      debounce(async (event) => {
        if (!displaySearchItems) setDisplay(true);
        if (event.target.value !== "") {
          setLoading(true);
          const searchedAnimes = await getAnimeBySearchQuery({
            q: event.target.value,
            limit: 10,
            // order_by: "title",
            // sort: "asc",
          });
          setLoading(false);
          // console.log("hello", searchedAnimes);
          setSearchData(searchedAnimes);
        } else {
          setSearchData([]);
        }
      }, 1000),
    [displaySearchItems]
  );

  const debouncedChangeHandler = (event) => {
    setQuery(event.target.value);
    debouncedChangeHandlerHelper(event);
  };

  const clearInput = () => {
    setSearchData([]);
    setQuery("");
    setDisplay(false);
  };

  const searchBarRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSearchBar);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearchBar);
    };
  }, []);

  const handleClickOutsideSearchBar = (e) => {
    if (!searchBarRef.current.contains(e.target)) {
      setDisplay(false);
    }
  };

  return (
    <div className="search" ref={searchBarRef} id="searchMessagePopover">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={debouncedChangeHandler}
          onClick={() => setDisplay(true)}
          spellCheck={false}
        />
        <div className="searchIcon">
          {searchData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      <div
        className="dataResult bg-dark"
        style={{
          alignSelf: "center",
          height:
            query.length >= 3 && displaySearchItems
              ? loading
                ? "100px"
                : "520px"
              : "0",
        }}
      >
        <Popover
          placement="bottom"
          isOpen={query.length > 0 && query.length < 3 && displaySearchItems}
          target="searchMessagePopover"
          className="result-message"
        >
          <PopoverBody>Enter atleast 3 letters :)</PopoverBody>
        </Popover>

        {loading && query.length >= 3 && (
          <Spinner type="grow" color="primary" className="searchSpinner" />
        )}
        {!loading &&
          query.length >= 3 &&
          searchData.slice(0, 10).map((value, i) => (
            <Link
              key={i || value.mal_id}
              className="dataItem"
              to={`/anime/${value.mal_id}`}
              onClick={() => setDisplay(false)}
            >
              <div className="d-flex flex-row px-1">
                <img
                  src={value.images.jpg.image_url}
                  alt="img_url"
                  className="search-result-image"
                  loading="lazy"
                />
                <div
                  className="ms-2 align-self-center text-light"
                  style={{ width: "210px" }}
                >
                  {value.title}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SearchBar;
