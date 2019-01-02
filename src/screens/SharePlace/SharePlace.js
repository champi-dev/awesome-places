import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import PlaceInput from '../../components/PlaceInput/PlaceInput'
import { addPlace } from '../../store/actions/index'

class SharePlace extends Component {
  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
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
