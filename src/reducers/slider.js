import {
  SEARCH,
  DROPDOWN 
} from '@actions/type';

const initialState = {
  searchTerm: '',
  sort: '',
  translateValue: 0
};

export default function (state = initialState, action) {
  console.log(action);
  switch(action.type) {
    case SEARCH:
      return { ...state, searchTerm: action.payload };
    case DROPDOWN:
      return { ...state, sort: action.payload };
  }
  return state;
}
