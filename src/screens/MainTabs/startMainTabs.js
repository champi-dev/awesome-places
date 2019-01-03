import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const isAndroid = Platform.OS === 'android'

const startTabs = async () => {
  const [mapIcon, shareIcon, barsIcon] = await Promise.all([
    Icon.getImageSource(isAndroid ? 'md-map' : 'ios-map', 30),
    Icon.getImageSource(isAndroid ? 'md-share-alt' : 'ios-share', 30),
    Icon.getImageSource(isAndroid ? 'md-menu' : 'ios-menu', 30)
  ])

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'awesome-places.FindPlaceScreen',
        label: 'Find Place',
        title: 'Find Place',
        icon: mapIcon,
        navigatorButtons: {
          leftButtons: [
            {
              icon: barsIcon,
              title: 'Menu',
              id: 'sideDrawerToggle'
            }
          ]
        }
      },
      {
        screen: 'awesome-places.SharePlaceScreen',
        label: 'Share Place',
        title: 'Share Place',
        icon: shareIcon,
        navigatorButtons: {
          leftButtons: [
            {
              icon: barsIcon,
              title: 'Menu',
              id: 'sideDrawerToggle'
            }
          ]
        }
      }
    ],
    // for ios
    tabsStyle: {
      tabBarSelectedButtonColor: 'orange'
    },
    // for android
    appStyle: {
      tabBarSelectedButtonColor: 'orange'
    },
    drawer: {
      left: {
        screen: 'awesome-places.SideDrawer'
      }
    }
  })
}

export default startTabs
