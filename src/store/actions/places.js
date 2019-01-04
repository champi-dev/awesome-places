import { ADD_PLACE, DELETE_PLACE } from './actionTypes'
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

export const deletePlace = key => ({
  type: DELETE_PLACE,
  placeKey: key
})
