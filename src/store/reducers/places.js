import {
  ADD_PLACE,
  DELETE_PLACE,
  SELECT_PLACE,
  DESELECT_PLACE
} from '../actions/actionTypes'

const initialState = {
  places: [],
  selectedPlace: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: [
          ...state.places,
          {
            key: `${Math.random()}`,
            name: action.placeName,
            image: {
              uri:
                'https://img1.10bestmedia.com/Images/Photos/352450/GettyImages-913753556_55_660x440.jpg'
            }
          }
        ]
      }
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(
          place => place.key !== state.selectedPlace.key
        ),
        selectedPlace: {}
      }
    case SELECT_PLACE:
      return {
        ...state,
        selectedPlace: state.places.find(place => place.key === action.placeKey)
      }
    case DESELECT_PLACE:
      return {
        ...state,
        selectedPlace: {}
      }
    default:
      return state
  }
}

export default reducer
