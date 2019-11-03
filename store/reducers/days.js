import { OPEN_DAY, CLEAR_DAY, UPDATE_POST, PUSH_POST_TO_DAY, SET_DETAILED_DAY, SET_DETAILED_POST } from './../actions/days';

const initialState = {
  day: {
    open: false,
    id: '',
    posts: [],
  },
  post: {
    localOriginalImageUri: '',
    localFilteredImageUri: '',
    postImageHiRes: '',
    title: '',
    lat: '',
    lng: '',
    imageObjToUpload: '',
  },
  detailedDay: '',
  detailedPost: '',
};

const daysReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DAY:
      console.log(action.dayId);
      const existingId = state.day.id;
      if (existingId) {
        console.log('trying to reopen a day that is already open');
      } else {
        return {
          ...state,
          day: {
            open: true,
            id: action.dayId,
            posts: [],
          },
        };
      }
    case CLEAR_DAY:
      return initialState;
    case UPDATE_POST:
      return {
        ...state,
        post: {
          ...state.post,
          [action.name]: action.value,
        },
      };
    case PUSH_POST_TO_DAY:
      return {
        ...state,
        post: {
          title: '',
        },
        day: {
          ...state.day,
          posts: [...state.day.posts, action.post],
        },
      };
    case SET_DETAILED_DAY:
      return {
        ...state,
        detailedDay: action.day,
      };

    case SET_DETAILED_POST:
      return {
        ...state,
        detailedPost: action.post,
      };
    default:
      return state;
  }

  return state;
};

export default daysReducer;
