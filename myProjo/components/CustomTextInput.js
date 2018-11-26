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
    const { saveText, title, placeholder, multiline, 
      lines, id, value, style, styleLabel, keyType } = this.props
    const { focused } = this.state
    return (
      <View>
        <View style={[focused ? styles.textFieldFocused : styles.textField, style]}>
          <TextInput
            style={{ color: '#00000087', width: '100%' }}
            keyboardType={keyType}
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
        <View style={[styles.label, styleLabel]}>
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
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    marginTop: '9%',
  },
  textFieldFocused: {
    // height: 40,
    borderWidth: 1,
    borderColor: '#f57c00',
    borderRadius: 3,
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    marginTop: '9%',
  },
  label: {
    position: 'absolute',
    alignItems: 'center',
    top: '20%',
    left: '3%',
    backgroundColor: '#ffffff',
    paddingHorizontal: '5%',
  },
  labelText: {
    color: '#00000060',
  },
  labelTextFocused: {
    color: '#f57c00',
  },
})

export default CustomTextInput
