import React from 'react'
import EventList from '../components/EventList'
import FetchHelper from '../helpers/FetchHelper'

class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
    }
  }

  componentDidMount() {
    this.getEventList()
  }

  // Maybe add this to helper class????????
  handleNavigation = (routeName, event) => {
    const { navigation } = this.props
    navigation.navigate(routeName, event)
  }

  getEventList = () => {
    FetchHelper()
      .then((result) => {
        console.log(result.data)
        this.setState({
          events: result.data,
        })
      })
  }

  getEvents = () => {
    const events = [
      { latlng: { latitude: 60.1695291, longitude: 24.9383613 }, title: 'Football in the city', shortDescription: 'Come and play football in the middle of the city!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id enim tincidunt, aliquet felis vel, lacinia nisi. Aenean rutrum posuere odio, quis faucibus dolor blandit a. Maecenas a turpis et magna convallis interdum. Etiam quis placerat est. Nam lacus purus, venenatis id volutpat blandit, congue in lectus. Aliquam augue diam, vestibulum in arcu sed, vehicula tristique felis. Phasellus convallis at ante non consequat. Nunc maximus ligula sed purus iaculis, sed ornare ligula tincidunt. Praesent faucibus nisl lacus, ac maximus mauris efficitur sed. In in dui pretium, porta metus nec, venenatis diam. Curabitur congue nisi in urna mattis, non sollicitudin ligula mattis. Aenean pharetra pulvinar nunc, sed aliquet ex eleifend eu. Aliquam erat volutpat. Sed velit orci, molestie nec tellus eu, iaculis elementum diam. Nunc odio neque, mattis eu semper nec, mattis eu odio. Suspendisse pulvinar semper eros non ullamcorper. Aliquam eu magna vitae metus egestas varius. Vivamus ac aliquam odio. Sed vestibulum vulputate cursus. Vivamus tempor dapibus purus nec interdum. Aliquam non volutpat ligula, eget pellentesque augue. Quisque consectetur lorem a turpis tincidunt euismod. Vestibulum urna odio, aliquam nec nisl et, finibus ultricies dolor. Praesent a ullamcorper ante. Phasellus sollicitudin sagittis rhoncus. Donec mi arcu, ornare ac quam eu, commodo.' },
      { 
        images: { 0: 'https://api.hel.fi/linkedevents/media/images/Talvisirkus_Rakkaus_1kuva_.jpg' }, 
        name: { fi: 'Testevent' },
        short_description: { fi: 'Short Description' }, 
        description: { fi: 'Description' }, 
        locName: { fi: 'Location name' }, 
        locAddress: { fi: 'location address' }, 
      },
    ]
    this.setState({ events })
  }

  render() {
    const { events } = this.state 
    return (
      <EventList
        handleNavigation={this.handleNavigation}
        events={events}
      />
    ) 
  }
}

export default ListScreen
