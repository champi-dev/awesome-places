import { SET_PLACES, REMOVE_PLACE } from './actionTypes'
import { uiStartLoading, uiStopLoading } from './index'

export const addPlace = (placeName, location, image) => dispatch => {
  dispatch(uiStartLoading())

  fetch(
    'https://us-central1-devsarmico-rncourse.cloudfunctions.net/storeImage',
    {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64
      })
    }
  )
    .then(res => res.json())
    .then(({ imageUrl }) => {
      const placeData = {
        name: placeName,
        image: imageUrl,
        location
      }
      return fetch('https://devsarmico-rncourse.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify(placeData)
      })
    })
    .then(() => dispatch(uiStopLoading()))
    .catch(err => {
      dispatch(uiStopLoading())
      console.log(err)
      alert('Something went wrong, please try again!')
    })
}

export const getPlaces = () => dispatch => {
  fetch('https://devsarmico-rncourse.firebaseio.com/places.json')
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
  dispatch(removePlace(key))
  fetch(`https://devsarmico-rncourse.firebaseio.com/places/${key}.json`, {
    method: 'DELETE'
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
