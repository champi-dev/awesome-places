import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

const startTabs = async () => {
  const [mapIcon, shareIcon, barsIcon] = await Promise.all([
    Icon.getImageSource('map', 30),
    Icon.getImageSource('share', 30),
    Icon.getImageSource('bars', 30)
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
    drawer: {
      left: {
        screen: 'awesome-places.SideDrawer'
      }
    }
  })
}

export default startTabs
