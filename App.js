import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

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
      places: [...prevState.places, prevState.placeName]
    }))
  }

  render() {
    const placesOutput = this.state.places.map((place, i) => (
      <Text key={i}>{place}</Text>
    ))
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.placeInput}
            placeholder="An awesome place"
            value={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <Button
            title="Add"
            style={styles.placeButton}
            onPress={this.placeSubmitHandler}
          />
        </View>

        <View>{placesOutput}</View>
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
  },
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
