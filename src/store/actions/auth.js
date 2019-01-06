import { AsyncStorage } from 'react-native'
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes'
import { uiStartLoading, uiStopLoading } from './index'
import startMainTabs from '../../screens/MainTabs/startMainTabs'
import App from '../../../App'

const apiKey = 'AIzaSyCZYntJ86tdeVAY9--F6de_DYE3HnIH0aE'

export const tryAuth = ({ email, password }, authMode) => dispatch => {
  dispatch(uiStartLoading())
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
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error()
    })
    .then(parsedRes => {
      dispatch(uiStopLoading())
      if (!parsedRes.idToken) {
        alert('Authentication failed, please try again!')
      } else {
        dispatch(
          authStoreToken(
            parsedRes.idToken,
            parsedRes.expiresIn,
            parsedRes.refreshToken
          )
        )
        startMainTabs()
      }
    })
    .catch(err => {
      dispatch(uiStopLoading())
      console.log(err)
      alert('Authentication failed, please try again!')
    })
}

export const authStoreToken = (token, expiresIn, refreshToken) => dispatch => {
  const now = new Date()
  const expirationTime = now.getTime() + expiresIn * 1000
  dispatch(authSetToken(token, expirationTime))
  AsyncStorage.setItem('rn:auth:token', token)
  AsyncStorage.setItem('rn:auth:expirationTime', expirationTime.toString())
  AsyncStorage.setItem('rn:auth:refreshToken', refreshToken)
}

export const authSetToken = (token, expirationTime) => ({
  type: AUTH_SET_TOKEN,
  token,
  expirationTime
})

export const authGetToken = () => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    const token = getState().authReducer.token
    const expTime = getState().authReducer.expirationTime
    if (!token || new Date(expTime) <= new Date()) {
      let fetchedToken = null
      AsyncStorage.getItem('rn:auth:token')
        .then(tokenFromStorage => {
          fetchedToken = tokenFromStorage
          if (!tokenFromStorage) reject()
          return AsyncStorage.getItem('rn:auth:expirationTime')
        })
        .then(expirationTime => {
          const parsedExpTime = new Date(parseInt(expirationTime))
          const now = new Date()
          if (parsedExpTime > now) {
            dispatch(authSetToken(fetchedToken))
            resolve(fetchedToken)
          } else {
            reject()
          }
        })
        .catch(err => reject(err))
    } else {
      resolve(token)
    }
  })
    .catch(err => {
      return AsyncStorage.getItem('rn:auth:refreshToken')
        .then(refreshToken =>
          fetch(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`
          })
        )
        .then(res => {
          if (res.ok) return res.json()
          else throw new Error()
        })
        .then(parsedRes => {
          if (parsedRes.id_token) {
            dispatch(
              authStoreToken(
                parsedRes.id_token,
                parsedRes.expires_in,
                parsedRes.refresh_token
              )
            )
            return parsedRes.id_token
          } else {
            dispatch(authClearStorage())
          }
        })
    })
    .then(token => {
      if (!token) {
        throw new Error()
      } else {
        return token
      }
    })

export const authAutoSignIn = () => dispatch => {
  dispatch(authGetToken())
    .then(token => startMainTabs())
    .catch(err => console.log('Auth Failed!'))
}

export const authClearStorage = () => dispatch => {
  AsyncStorage.removeItem('rn:auth:token')
  AsyncStorage.removeItem('rn:auth:expirationTime')
  return AsyncStorage.removeItem('rn:auth:refreshToken')
}

export const authLogout = () => dispatch => {
  dispatch(authClearStorage()).then(() => {
    App()
  })
  dispatch(authRemoveToken())
}

export const authRemoveToken = () => ({
  type: AUTH_REMOVE_TOKEN
})
