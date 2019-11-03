export const OPEN_DAY = 'OPEN_DAY';
export const CLEAR_DAY = 'CLEAR_DAY';
export const UPDATE_POST = 'UPDATE_POST';
export const PUSH_POST_TO_DAY = 'PUSH_POST_TO_DAY';
export const CLEAR_POST = 'CLEAR_POST';
export const SET_DETAILED_DAY = 'SET_DETAILED_DAY';
export const SET_DETAILED_POST = 'SET_DETAILED_POST';

// import {client} from './../../App'
// import gql from 'graphql-tag';


export const openDay = id => {
  console.log(id);
  return { type: OPEN_DAY, dayId: id };
};

export const clearDay = () => {
  return { type: CLEAR_DAY };
};

export const updatePost = (name, value) => {
  return { type: UPDATE_POST, name, value };
};

export const pushPostToDay = post => {
  return { type: PUSH_POST_TO_DAY, post };
};

export const setDetailedDay = day => {
  return { type: SET_DETAILED_DAY, day };
};

export const setDetailedPost = post => {
  return { type: SET_DETAILED_POST, post };
};

// export const openDay2 = id => {
//   return (dispatch, getState) => {
//     const state = getState();
//     console.log(state);
//     setTimeout(() => {
//       // Yay! Can invoke sync or async actions with `dispatch`
//       dispatch(openDay(id));
//     }, 5000);
//   };
// };

// export const getDay = (dayId) => {
//   return async (dispatch, getState) => {
//     const request = await client.query({
//       query: gql`
//       query($dayId: ID!) {
//         getDay(dayId: $dayId) {
//           id
//           locationName
//           open
//           author {
//             id
//             userName
//             profileImageHiRes
//           }
//           createdAt
//           posts {
//             id
//             title
//             postImageHiRes
//             location {
//               coordinates
//             }
//             description
//           }
//         }
//       }
//     `
//     });
//     console.log(request);
//     dispatch(setDetailedDay(id));
//   };
// };
