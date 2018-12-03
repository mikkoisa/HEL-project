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
      lines, id, value, styleLabel, keyType, error, noLabel } = this.props
    const { focused } = this.state
    return (
      <View>
        <View style={
          focused ? styles.textFieldFocused 
            : error ? styles.textFieldError : styles.textField
        }
        >
          <TextInput
            style={styles.textFieldText}
            keyboardType={keyType}
            value={value}
            placeholder={placeholder}
            underlineColorAndroid='transparent'
            multiline={multiline}
            numberOfLines={lines}
            onFocus={this.onFocus}
            onBlur={this.unFocus}
            onChangeText={text => saveText(id, text)}
            onEndEditing={() => saveText(id, 'ended')}
            blurOnSubmit 
          />
        </View>
        <Text 
          style={focused ? styles.errorTextHidden 
            : error ? styles.errorText : styles.errorTextHidden}
        >
          {error || 'Helper'}
        </Text>
        <View style={[noLabel ? { width: 0 } : styles.label, styleLabel]}>
          <Text 
            style={
              focused ? styles.labelTextFocused
                : error ? styles.labelTextError : styles.labelText 
            /* eslint no-nested-ternary: 0 */
            }
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
    borderRadius: 4,
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    marginTop: '5%',
  },
  textFieldFocused: {
    // height: 40,
    borderWidth: 1,
    borderColor: '#f57c00',
    borderRadius: 4,
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    marginTop: '5%',
  },
  textFieldError: {
    // height: 40,
    borderWidth: 1,
    borderColor: '#b00020ff',
    borderRadius: 4,
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    marginTop: '5%',
  },
  textFieldText: {
    color: '#3c4043',
    width: '100%', 
    paddingLeft: '0.5%', 
    fontFamily: 'Roboto', 
    fontSize: 14,
  },
  errorText: {
    color: '#b00020ff',
    fontSize: 12,
    paddingLeft: '4%',
  },
  errorTextHidden: {
    color: '#ffffff',
    fontSize: 12,
    paddingLeft: '4%',
  },
  label: {
    position: 'absolute',
    alignItems: 'center',
    top: '2%',
    left: '2%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 4,
  },
  labelText: {
    color: '#00000060',
  },
  labelTextFocused: {
    color: '#f57c00',
  },
  labelTextError: {
    color: '#b00020ff',
  },
})

export default CustomTextInput
