import { apiUrl } from "../../config/constants";

function dispatchHomepages(data) {
  return {
    type: "FETCH_HOMEPAGES_SUCCESS",
    payload: data
  };
}

export const getHomepagesThunk = () => {
  return async (dispatch, getState) => {
    const data = await fetch(`${apiUrl}/homepages`).then(r => r.json());
    dispatch(dispatchHomepages(data));
  };
};
