import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import PlaceInput from './src/components/PlaceInput/PlaceInput'
import PlaceList from './src/components/PlaceList/PlaceList'

export default class App extends Component {
  state = {
    placeName: '',
    places: []
  }

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    })
  }

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === '') return

    this.setState(prevState => ({
      placeName: '',
      places: [
        ...prevState.places,
        { key: `${Math.random()}`, value: prevState.placeName }
      ]
    }))
  }

  placeDeletedHandler = key => {
    this.setState(prevState => ({
      places: prevState.places.filter(place => place.key !== key)
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput
          placeName={this.state.placeName}
          textHandler={this.placeNameChangedHandler}
          pressHandler={this.placeSubmitHandler}
        />

        <PlaceList
          places={this.state.places}
          itemPressHandler={this.placeDeletedHandler}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 48
  }
})
