import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes'

const initialState = {
  places: []
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
            },
            location: action.location
          }
        ]
      }
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.key !== action.placeKey)
      }
    default:
      return state
  }
}

export default reducer
