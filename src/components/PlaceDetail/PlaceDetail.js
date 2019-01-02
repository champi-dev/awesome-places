import React from 'react'
import {
  Modal,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import objectHasKeys from '../../utils/objectHasKeys'

const PlaceDetail = props => (
  <Modal
    visible={objectHasKeys(props.selectedPlace)}
    onRequestClose={props.onModalClosed}
    animationType="slide"
  >
    <View style={styles.modalContainer}>
      <Image source={props.selectedPlace.image} style={styles.placeImage} />
      <Text style={styles.placeName}>{props.selectedPlace.name}</Text>

      <View>
        <TouchableOpacity onPress={props.onItemDeleted}>
          <View style={styles.deleteButton}>
            <Icon size={30} name="trash-o" color="red" />
          </View>
        </TouchableOpacity>
        <Button onPress={props.onModalClosed} title="close" />
      </View>
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage: {
    width: '100%',
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center'
  }
})

export default PlaceDetail
