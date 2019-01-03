import React, { Component } from 'react'
import { View, Button, StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps'

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        0.0122
    },
    locationChosen: false
  }

  pickLocationHandler = evt => {
    const coords = evt.nativeEvent.coordinate
    this.setState(prevState => ({
      focusedLocation: {
        ...prevState.focusedLocation,
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      locationChosen: true
    }))
  }

  render() {
    let marker = null
    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          region={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={() => {}} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: 250
  },
  button: {
    margin: 8
  }
})

export default PickLocation
