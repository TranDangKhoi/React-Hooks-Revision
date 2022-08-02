import React, { useEffect, useReducer, useRef } from "react";
import axios from "axios";
//https://hn.algolia.com/api/v1/search?query=react

const initialState = {
  hits: [],
  query: "",
  loading: false,
  errorMsg: "",
  url: `https://hn.algolia.com/api/v1/search?query='random'`,
};
const hackerNewsReducer = (state, action) => {
  switch (action.type) {
    case "SET_HITS": {
      return { ...state, hits: action.payload };
    }
    case "SET_LOADING": {
      return { ...state, loading: action.payload };
    }

    case "SET_ERRORMSG": {
      return { ...state, errorMsg: action.payload };
    }

    case "SET_QUERY": {
      return { ...state, query: action.payload };
    }

    case "SET_URL": {
      return { ...state, url: action.payload };
    }
    default:
      break;
  }
};
const HackerNews = () => {
  const [state, dispatch] = useReducer(hackerNewsReducer, initialState);
  const handleFetchData = useRef({});
  handleFetchData.current = async () => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
    try {
      const response = await axios.get(state.url);
      // setHits(response.data?.hits || []);
      dispatch({
        type: "SET_HITS",
        payload: response.data?.hits || [],
      });
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    } catch (err) {
      // setLoading(false);
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
      dispatch({
        type: "SET_ERRORMSG",
        payload: "Oops! Something went wrong please try again later",
      });
    }
  };
  useEffect(() => {
    handleFetchData.current();
  }, [state.url]);
  console.log(state.query);
  return (
    <div className="bg-white w-[600px] mx-auto mt-5 p-7 rounded-lg shadow-md">
      <div className="flex gap-x-5">
        <div className="flex items-center gap-5 w-full border border-gray-200 rounded-lg py-3 px-5 focus:border-blue-300">
          <span className="flex-shrink-0 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            className="w-full outline-none bg-transparent"
            placeholder="Enter your content"
            onChange={(e) =>
              dispatch({
                type: "SET_QUERY",
                payload: e.target.value,
              })
            }
          />
        </div>
        <button
          className="bg-blue-500 text-white rounded-md p-5"
          style={{
            opacity: state.loading ? "0.4" : "1",
            cursor: state.loading ? "not-allowed" : "pointer",
          }}
          onClick={() =>
            dispatch({
              type: "SET_URL",
              payload: `https://hn.algolia.com/api/v1/search?query=${state.query}`,
            })
          }
        >
          Search
        </button>
      </div>

      {state.loading && (
        <div className="loading w-8 h-8 rounded-full border-4 border-r-4 border-blue-400 border-r-transparent animate-spin mx-auto my-10"></div>
      )}
      {!state.loading && state.errorMsg && (
        <p className="text-red-500">{state.errorMsg}</p>
      )}

      <div className="mt-5 mb-5 flex flex-wrap gap-5">
        {!state.loading &&
          state.hits.length > 0 &&
          state.hits.map((item, index) => (
            <h3 className="p-2 bg-gray-200 rounded-md" key={index}>
              {item.title}
            </h3>
          ))}
      </div>
    </div>
  );
};

export default HackerNews;
