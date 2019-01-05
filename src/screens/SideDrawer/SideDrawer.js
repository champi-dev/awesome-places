import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons'

import { authLogout } from '../../store/actions/index'

const isAndroid = Platform.OS === 'android'

class SideDrawer extends Component {
  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get('window').width * 0.8 }
        ]}
      >
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Icon
              name={isAndroid ? 'md-log-out' : 'ios-log-out'}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Sign out</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: 'white',
    flex: 1
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee'
  },
  drawerItemIcon: {
    marginRight: 10
  }
})

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(authLogout())
})

export default connect(
  null,
  mapDispatchToProps
)(SideDrawer)
