import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import startMainTabs from '../MainTabs/startMainTabs'
import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton'
import backgroundImg from '../../assets/background.png'
import validate from '../../utils/validate'

import { tryAuth } from '../../store/actions/auth'

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
    viewMode: getViewMode(),
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  }

  updateStyles = () => {
    this.setState({
      viewMode: getViewMode()
    })
  }

  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    }

    this.props.onLogin(authData)
    startMainTabs()
  }

  updateInputState = (key, value) => {
    let connectedValue = {}
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo
      const equalValue = this.state.controls[equalControl].value
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      }
    }

    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        confirmPassword: {
          ...prevState.controls.confirmPassword,
          valid:
            key === 'password'
              ? validate(
                  prevState.controls.confirmPassword.value,
                  prevState.controls.confirmPassword.validationRules,
                  connectedValue
                )
              : prevState.controls.confirmPassword.valid
        },
        [key]: {
          ...prevState.controls[key],
          valid: validate(
            value,
            prevState.controls[key].validationRules,
            connectedValue
          ),
          touched: true,
          value
        }
      }
    }))
  }

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
              value={this.state.controls.email.value}
              onChangeText={val => this.updateInputState('email', val)}
              valid={this.state.controls.email.valid}
              touched={this.state.controls.email.touched}
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
                <DefaultInput
                  placeholder="Password"
                  style={styles.input}
                  value={this.state.controls.password.value}
                  valid={this.state.controls.password.valid}
                  touched={this.state.controls.password.touched}
                  onChangeText={val => this.updateInputState('password', val)}
                />
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
                  value={this.state.controls.confirmPassword.value}
                  valid={this.state.controls.confirmPassword.valid}
                  touched={this.state.controls.confirmPassword.touched}
                  onChangeText={val =>
                    this.updateInputState('confirmPassword', val)
                  }
                  style={styles.input}
                />
              </View>
            </View>
          </View>

          <DefaultButton
            color="#29aaf4"
            onPress={this.loginHandler}
            disabled={
              !this.state.controls.email.valid ||
              !this.state.controls.password.valid ||
              !this.state.controls.confirmPassword.valid
            }
          >
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

const mapDispatchToProps = dispatch => ({
  onLogin: authData => dispatch(tryAuth(authData))
})

export default connect(
  null,
  mapDispatchToProps
)(AuthScreen)
