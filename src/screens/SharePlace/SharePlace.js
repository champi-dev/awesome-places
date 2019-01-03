import React, { Component } from 'react'
import { View, Button, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { addPlace } from '../../store/actions/index'

import PlaceInput from '../../components/PlaceInput/PlaceInput'
import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PickImage from '../../components/PickImage/PickImage'
import PickLocation from '../../components/PickLocation/PickLocation'
import validate from '../../utils/validate'

class SharePlace extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  }

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  state = {
    controls: {
      placeName: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      }
    }
  }

  onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left'
        })
      }
    }
  }

  placeChangedNameHandler = value =>
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        placeName: {
          ...prevState.controls.placeName,
          valid: validate(value, prevState.controls.placeName.validationRules),
          touched: true,
          value
        }
      }
    }))

  placeAddedHandler = () => {
    if (this.state.controls.placeName.value.trim() !== '') {
      this.props.onAddPlace(this.state.controls.placeName.value)
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>

          <PickImage />

          <PickLocation />

          <PlaceInput
            placeData={this.state.controls.placeName}
            onChangeText={this.placeChangedNameHandler}
          />

          <View style={styles.button}>
            <Button
              title="Share the place!"
              onPress={this.placeAddedHandler}
              disabled={!this.state.controls.placeName.valid}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})

const mapDispatchToProps = dispatch => ({
  onAddPlace: placeName => dispatch(addPlace(placeName))
})

export default connect(
  null,
  mapDispatchToProps
)(SharePlace)
