import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case "NEW_STORY":
      return {
        ...state,
        homepage: {
          ...state.homepage,
          stories: state.homepage.stories
            ? [...state.homepage.stories, action.payload.story]
            : [action.payload.story]
        }
      };
    case "PAGE_EDITED":
      return {
        ...state,
        homepage: {
          ...action.payload.page,
          stories: state.homepage.stories
        }
      };

    case "STORY_LIKED":
      return {
        ...state,
        homepage: {
          ...state.homepage,
          stories: [...state.homepage.stories, action.payload.story]
        }
      };
    case "STORY_DELETED":
      const storyId = action.payload;
      const filteredStories = state.homepage.stories.filter(
        story => story.id !== storyId
      );
      return {
        ...state,
        homepage: {
          ...state.homepage,
          stories: filteredStories
        }
      };

    default:
      return state;
  }
};
