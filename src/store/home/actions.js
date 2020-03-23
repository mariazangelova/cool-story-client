import { apiUrl } from "../../config/constants";
import axios from "axios";

function dispatchHomepage(data) {
  return {
    type: "FETCH_HOMEPAGES_SUCCESS",
    payload: data
  };
}

export const getHomepagesThunk = () => {
  return async (dispatch, getState) => {
    const data = await fetch(`${apiUrl}/homepages`).then(r => r.json());
    dispatch(dispatchHomepage(data));
  };
};
