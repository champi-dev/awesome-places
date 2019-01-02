import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

const startTabs = async () => {
  const [mapIcon, shareIcon] = await Promise.all([
    Icon.getImageSource('map', 30),
    Icon.getImageSource('share', 30)
  ])

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'awesome-places.FindPlaceScreen',
        label: 'Find Place',
        title: 'Find Place',
        icon: mapIcon
      },
      {
        screen: 'awesome-places.SharePlaceScreen',
        label: 'Share Place',
        title: 'Share Place',
        icon: shareIcon
      }
    ]
  })
}

export default startTabs
