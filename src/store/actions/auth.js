import { AUTH_SET_TOKEN } from './actionTypes'
import { uiStartLoading, uiStopLoading } from './index'
import startMainTabs from '../../screens/MainTabs/startMainTabs'

export const tryAuth = ({ email, password }, authMode) => dispatch => {
  dispatch(uiStartLoading())
  const apiKey = 'AIzaSyCZYntJ86tdeVAY9--F6de_DYE3HnIH0aE'
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`

  if (authMode === 'signup') {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`
  }

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(parsedRes => {
      dispatch(uiStopLoading())
      if (!parsedRes.idToken) {
        alert('Authentication failed, please try again!')
      } else {
        dispatch(authSetToken(parsedRes.idToken))
        startMainTabs()
      }
    })
    .catch(err => {
      dispatch(uiStopLoading())
      console.log(err)
      alert('Authentication failed, please try again!')
    })
}

export const authSetToken = token => ({
  type: AUTH_SET_TOKEN,
  token
})

export const authGetToken = () => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    const token = getState().authReducer.token
    if (!token) {
      reject()
    } else {
      resolve(token)
    }
  })
