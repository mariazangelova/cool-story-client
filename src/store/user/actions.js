import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUserId, selecHomepageId } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";
import { selectHomepage } from "../pagedetails/selectors";
import { getHomepageThunk } from "../pagedetails/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = userWithToken => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken
  };
};

const tokenStillValid = userWithoutToken => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password
      });
      await dispatch(loginSuccess(response.data));

      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

const newStory = story => ({
  type: "NEW_STORY",
  payload: {
    story
  }
});

export const postStory = (name, content, imageUrl) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    const homepageId = selecHomepageId(getState());
    //console.log("homepageid", homepageId);
    const story = await axios.post(
      `${apiUrl}/stories`,
      {
        name,
        content,
        imageUrl,
        homepageId
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log("story", story);
    await dispatch(newStory(story.data));
  };
};

const edits = page => ({
  type: "PAGE_EDITED",
  payload: { page }
});

export const editPage = (title, description, color, backgroundColor) => {
  return async (dispatch, getState) => {
    const homepageId = selecHomepageId(getState());
    const token = selectToken(getState());

    const edit = await axios.put(
      `${apiUrl}/homepages/:homepageId`,
      { title, description, color, backgroundColor, homepageId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    //console.log("edit", edit);
    await dispatch(edits(edit.data));
  };
};
// const newLike = like => ({
//   type: "STORY_LIKED",
//   payload: { like }
// });

export const likeStory = storyId => {
  return async (dispatch, getState) => {
    //dispatch(appLoading());
    const token = selectToken(getState());
    const homepage = selectHomepage(getState());
    const homepageId = homepage.id;

    const like = await axios.post(
      `${apiUrl}/homepages/stories/${storyId}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch(getHomepageThunk(homepageId));
    //dispatch(appDoneLoading());
  };
};

export const storyDeleted = storyId => ({
  type: "STORY_DELETED",
  payload: storyId
});
export const deleteStory = storyId => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    const homepage = selectHomepage(getState());
    const homepageId = homepage.id;
    try {
      const deleted = await axios.delete(
        `${apiUrl}/homepages/${homepageId}/stories/${storyId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        },
        {}
      );
      console.log("deleted?", deleted.data);
      dispatch(storyDeleted(storyId));
      dispatch(getHomepageThunk(homepageId));
      dispatch(appDoneLoading());
    } catch (e) {
      console.error(e);
    }
  };
};
