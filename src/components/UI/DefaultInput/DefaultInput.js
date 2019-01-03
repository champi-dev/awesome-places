import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const DefaultInput = props => (
  <TextInput
    {...props}
    style={[
      styles.input,
      props.style,
      !props.valid && props.touched ? styles.invalid : null
    ]}
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
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: 'red'
  }
})

export default DefaultInput
