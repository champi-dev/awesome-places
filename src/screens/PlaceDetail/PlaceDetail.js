import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePlace } from '../../store/actions/index'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native'
import MapView from 'react-native-maps'
import Icon from 'react-native-vector-icons/Ionicons'

const isAndroid = Platform.OS === 'android'

class PlaceDetail extends Component {
  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key)
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: '80%' }}>
          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta:
                  (Dimensions.get('window').width /
                    Dimensions.get('window').height) *
                  0.0122
              }}
              style={styles.map}
            >
              <MapView.Marker coordinate={this.props.selectedPlace.location} />
            </MapView>
          </View>

          <View style={styles.subContainer}>
            <Image
              source={this.props.selectedPlace.image}
              style={styles.placeImage}
            />
            <Text style={styles.placeName}>
              {this.props.selectedPlace.name}
            </Text>
          </View>
        </View>

        <View style={{ height: '20%', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon
                size={30}
                name={isAndroid ? 'md-trash' : 'ios-trash'}
                color="red"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  subContainer: {
    height: '50%'
  },
  placeImage: {
    width: '100%',
    height: '80%'
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: '100%'
  }
})

const mapDispatchToProps = dispatch => ({
  onDeletePlace: key => dispatch(deletePlace(key))
})

export default connect(
  null,
  mapDispatchToProps
)(PlaceDetail)
