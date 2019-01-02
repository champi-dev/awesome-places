import React, { Component } from 'react'
import { View, Button, StyleSheet, ImageBackground } from 'react-native'

import startMainTabs from '../MainTabs/startMainTabs'
import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton'
import backgroundImg from '../../assets/beach.jpg'

class AuthScreen extends Component {
  loginHandler = () => startMainTabs()

  render() {
    return (
      <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Please Log In</HeadingText>
          </MainText>
          <DefaultButton color="#29aaf4" onPress={() => {}}>
            Switch to Login
          </DefaultButton>

          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your E-Mail Address"
              style={styles.input}
            />
            <DefaultInput placeholder="Password" style={styles.input} />
            <DefaultInput placeholder="Confirm Password" style={styles.input} />
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
  }
})

export default AuthScreen
