import { SET_PLACES, REMOVE_PLACE } from './actionTypes'
import { uiStartLoading, uiStopLoading, authGetToken } from './index'

export const addPlace = (placeName, location, image) => dispatch => {
  dispatch(uiStartLoading())
  let authToken = null

  dispatch(authGetToken())
    .then(token => (authToken = token))
    .then(() =>
      fetch(
        'https://us-central1-devsarmico-rncourse.cloudfunctions.net/storeImage',
        {
          method: 'POST',
          body: JSON.stringify({
            image: image.base64
          }),
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      )
    )
    .then(res => res.json())
    .then(({ imageUrl }) => {
      const placeData = {
        name: placeName,
        image: imageUrl,
        location
      }

      return fetch(
        `https://devsarmico-rncourse.firebaseio.com/places.json?auth=${authToken}`,
        {
          method: 'POST',
          body: JSON.stringify(placeData)
        }
      )
    })
    .then(() => dispatch(uiStopLoading()))
    .catch(err => {
      dispatch(uiStopLoading())
      console.log(err)
      alert('Something went wrong, please try again!')
    })
}

export const getPlaces = () => dispatch => {
  dispatch(authGetToken())
    .then(token =>
      fetch(
        `https://devsarmico-rncourse.firebaseio.com/places.json?auth=${token}`
      )
    )
    .then(res => res.json())
    .then(parsedRes => {
      const places = []
      for (let key in parsedRes) {
        places.push({
          ...parsedRes[key],
          key,
          image: {
            uri: parsedRes[key].image
          }
        })
      }
      dispatch(setPlaces(places))
    })
    .catch(err => {
      console.log(err)
      alert('Something went wrong!')
    })
}

export const deletePlace = key => dispatch => {
  dispatch(authGetToken())
    .then(token => {
      dispatch(removePlace(key))
      return fetch(
        `https://devsarmico-rncourse.firebaseio.com/places/${key}.json?auth=${token}`,
        {
          method: 'DELETE'
        }
      )
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log('Done!')
    })
    .catch(err => {
      console.log(err)
      alert('Something went wrong!')
    })
}

export const setPlaces = places => ({
  type: SET_PLACES,
  places
})

export const removePlace = key => ({
  type: REMOVE_PLACE,
  key
})
