import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native'

import startMainTabs from '../MainTabs/startMainTabs'
import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton'
import backgroundImg from '../../assets/background.png'

const getViewMode = () =>
  Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'

class AuthScreen extends Component {
  constructor(props) {
    super(props)

    Dimensions.addEventListener('change', this.updateStyles)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles)
  }

  state = {
    viewMode: getViewMode()
  }

  updateStyles = () => {
    this.setState({
      viewMode: getViewMode()
    })
  }

  loginHandler = () => startMainTabs()

  render() {
    let headingText = null
    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      )
    }

    return (
      <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <DefaultButton color="#29aaf4" onPress={() => {}}>
            Switch to Login
          </DefaultButton>

          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your E-Mail Address"
              style={styles.input}
            />

            <View
              style={
                this.state.viewMode === 'portrait'
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
              }
            >
              <View
                style={
                  this.state.viewMode === 'portrait'
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput placeholder="Password" style={styles.input} />
              </View>

              <View
                style={
                  this.state.viewMode === 'portrait'
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput
                  placeholder="Confirm Password"
                  style={styles.input}
                />
              </View>
            </View>
          </View>

          <DefaultButton color="#29aaf4" onPress={this.loginHandler}>
            Submit
          </DefaultButton>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: '100%'
  },
  inputContainer: {
    width: '80%',
    maxWidth: 300
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  portraitPasswordWrapper: {
    width: '100%'
  }
})

export default AuthScreen
