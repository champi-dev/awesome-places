import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import {
  addPlace,
  deletePlace,
  selectPlace,
  deselectPlace
} from './src/store/actions/index'

import PlaceInput from './src/components/PlaceInput/PlaceInput'
import PlaceList from './src/components/PlaceList/PlaceList'
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail'

class App extends Component {
  placeAddedHandler = placeName => this.props.onAddPlace(placeName)

  placeDeletedHandler = () => this.props.onDeletePlace()

  placeSelectedHandler = key => this.props.onSelectPlace(key)

  modalClosedHandler = () => this.props.onDeselectPlace()

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />

        <PlaceInput pressHandler={this.placeAddedHandler} />

        <PlaceList
          places={this.props.places}
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

const mapStateToProps = state => ({
  places: state.placesReducer.places,
  selectedPlace: state.placesReducer.selectedPlace
})

const mapDispatchToProps = dispatch => ({
  onAddPlace: name => dispatch(addPlace(name)),
  onDeletePlace: () => dispatch(deletePlace()),
  onSelectPlace: key => dispatch(selectPlace(key)),
  onDeselectPlace: () => dispatch(deselectPlace())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
