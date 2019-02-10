
import { SEARCH , DROPDOWN } from './type';


export function search(data) {
  return async (dispatch) => {
    try {
      dispatch(searchTerm(data)); 
    }
    catch (e) {
      console.error('failed: ' + e);
    }
  };
}

export function dropDown(data) {
  return async (dispatch) => {
    try {
      dispatch(sortTerm(data)); 
    }
    catch (e) {
      console.error('failed: ' + e);
    }
  };
}

export function searchTerm(data) {
  return {
    type: SEARCH,
    payload: data
  };
}

export function sortTerm(data) {
  return {
    type: DROPDOWN,
    payload: data
  };
}
