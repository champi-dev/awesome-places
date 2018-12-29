import React from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

const PlaceInput = props => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.placeInput}
      placeholder="An awesome place"
      value={props.placeName}
      onChangeText={props.textHandler}
    />
    <Button
      title="Add"
      style={styles.placeButton}
      onPress={props.pressHandler}
    />
  </View>
)

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  placeInput: {
    width: '70%',
    borderColor: '#eee',
    borderWidth: 1
  },
  placeButton: {
    width: '30%'
  }
})

export default PlaceInput
