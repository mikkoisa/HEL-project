import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
    }
  }

  onFocus = () => {
    this.setState({ focused: true })
  }

  unFocus = () => {
    this.setState({ focused: false })
  }

  render() {
    const { saveText, title, placeholder, multiline, lines, id, value, style } = this.props
    const { focused } = this.state
    return (
      <View>
        <View style={[focused ? styles.textFieldFocused : styles.textField, style]}>
          <TextInput
            style={{ color: '#00000087' }}
            value={value}
            placeholder={placeholder}
            underlineColorAndroid='transparent'
            multiline={multiline}
            numberOfLines={lines}
            onFocus={this.onFocus}
            onBlur={this.unFocus}
            onChangeText={text => saveText(id, text)}
          />
        </View>
        <View style={styles.label}>
          <Text 
            style={focused ? styles.labelTextFocused : styles.labelText}
          >
            {title}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textField: {
    // backgroundColor: '#00000012',
    // height: 40,
    borderWidth: 1,
    borderColor: '#00000040',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 15,
  },
  textFieldFocused: {
    // height: 40,
    borderWidth: 1,
    borderColor: '#f57c00',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 15,
  },
  label: {
    position: 'absolute',
    alignItems: 'center',
    top: 5,
    left: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  labelText: {
    color: '#00000060',
  },
  labelTextFocused: {
    color: '#f57c00',
  },
})

export default CustomTextInput
