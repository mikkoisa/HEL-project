import React from 'react'
import CreateEvent from '../components/CreateEvent'

class CreateScreen extends React.Component {
  handleNavigation = (routeName, event) => {
    const { navigation } = this.props
    navigation.navigate(routeName, event)
  }

  render() {
    return (
      <CreateEvent handleNavigation={this.handleNavigation} />
    )
  }
}


export default CreateScreen
