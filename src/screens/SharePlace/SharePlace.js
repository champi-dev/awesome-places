import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import PlaceInput from '../../components/PlaceInput/PlaceInput'
import { addPlace } from '../../store/actions/index'

class SharePlace extends Component {
  placeAddedHandler = placeName => this.props.onAddPlace(placeName)

  render() {
    return (
      <View>
        <PlaceInput placeAddedHandler={this.placeAddedHandler} />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onAddPlace: placeName => dispatch(addPlace(placeName))
})

export default connect(
  null,
  mapDispatchToProps
)(SharePlace)
