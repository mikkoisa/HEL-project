import React from 'react'
import CreateEvent from '../components/create event components/CreateEvent'

class CreateScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: null,
    };
  } 

  componentDidMount() {
    this.getInitialLocation()
  }

  handleNavigation = (routeName, event) => {
    const { navigation } = this.props
    navigation.navigate(routeName, event)
  }

  getInitialLocation = () => {
    // Get the coordinates and set them to states
    let currentPos = null
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) { 
        currentPos = position
        currentPos.coords.latitudeDelta = 0.02
        currentPos.coords.longitudeDelta = 0.02
      }
      this.setState({
        position: currentPos,
      })
    })
  }
  

  render() {
    const { position } = this.state
    return (
      <CreateEvent position={position} handleNavigation={this.handleNavigation} />
    )
  }
}


export default CreateScreen
