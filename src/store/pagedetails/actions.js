import { apiUrl } from "../../config/constants";
import { appDoneLoading } from "../appState/actions";

function dispatchHomepage(data) {
  return {
    type: "FETCH_HOMEPAGE_SUCCESS",
    payload: data
  };
}

export const getHomepageThunk = id => {
  return async (dispatch, getState) => {
    //console.log("id", id);
    //const userId = selectUserId(getState());
    const data = await fetch(`${apiUrl}/homepages/${id}`).then(r => r.json());
    //console.log("data", data);
    dispatch(dispatchHomepage(data));
    dispatch(appDoneLoading());
  };
};
