import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const DefaultInput = props => (
  <TextInput
    {...props}
    style={[styles.input, props.style]}
    underlineColorAndroid="transparent"
  />
)

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderColor: '#eee',
    borderWidth: 1,
    padding: 5,
    marginTop: 8,
    marginBottom: 8
  }
})

export default DefaultInput
