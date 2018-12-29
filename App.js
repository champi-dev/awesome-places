import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import PlaceInput from './src/components/PlaceInput/PlaceInput'
import PlaceList from './src/components/PlaceList/PlaceList'
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail'

export default class App extends Component {
  state = {
    placeName: '',
    places: [],
    selectedPlace: {}
  }

  placeNameChangedHandler = val =>
    this.setState({
      placeName: val
    })

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === '') return

    this.setState(prevState => ({
      placeName: '',
      places: [
        ...prevState.places,
        {
          key: `${Math.random()}`,
          name: prevState.placeName,
          image: {
            uri:
              'https://img1.10bestmedia.com/Images/Photos/352450/GettyImages-913753556_55_660x440.jpg'
          }
        }
      ]
    }))
  }

  placeSelectedHandler = key =>
    this.setState(prevState => ({
      selectedPlace: prevState.places.find(place => place.key === key)
    }))

  placeDeletedHandler = () =>
    this.setState(prevState => ({
      places: prevState.places.filter(
        place => place.key !== prevState.selectedPlace.key
      ),
      selectedPlace: {}
    }))

  modalClosedHandler = () =>
    this.setState({
      selectedPlace: {}
    })

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.state.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />

        <PlaceInput
          placeName={this.state.placeName}
          textHandler={this.placeNameChangedHandler}
          pressHandler={this.placeSubmitHandler}
        />

        <PlaceList
          places={this.state.places}
          itemPressHandler={this.placeSelectedHandler}
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
