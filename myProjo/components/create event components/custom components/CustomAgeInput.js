import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'

class CustomAgeInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
    }
  }

  onFocus = () => {
    const { moveKeyboard } = this.props
    moveKeyboard(true)
    this.setState({ focused: true })
  }

  unFocus = () => {
    const { moveKeyboard } = this.props
    moveKeyboard(false)
    this.setState({ focused: false })
  }

  render() {
    const { saveText, valueMin, valueMax, error } = this.props
    const { focused } = this.state
    return (
      <View>
        <View style={[
          focused ? styles.textFieldFocused
            : error ? styles.textFieldError : styles.textField, 
          /* eslint no-nested-ternary: 0 */
        ]}
        >
          <TextInput
            // textAlign='center'
            style={[styles.textFieldText, { paddingLeft: '10%' }]}
            keyboardType='numeric'
            value={valueMin}
            placeholder='Min'
            underlineColorAndroid='transparent'
            onFocus={this.onFocus}
            onBlur={this.unFocus}
            onChangeText={text => saveText('minAge', text)}
            onEndEditing={() => saveText('minAge', 'ended')}
            blurOnSubmit 
          />
          <Text centerText='true' style={{ color: '#3c4043' }}> — </Text>
          <TextInput
            // textAlign='center'
            style={[styles.textFieldText, { paddingLeft: '10%' }]}
            keyboardType='numeric'  
            value={valueMax}
            placeholder='Max'
            underlineColorAndroid='transparent'
            onFocus={this.onFocus}
            onBlur={this.unFocus}
            onChangeText={text => saveText('maxAge', text)}
            onEndEditing={() => saveText('maxAge', 'ended')}
            blurOnSubmit 
          />
        </View>
        <Text 
          placeholder='text' 
          style={focused ? styles.errorTextHidden 
            : error ? styles.errorText : styles.errorTextHidden}
        >
          {error || 'Helper'}
        </Text>
        <View style={styles.label}>
          <Text 
            style={[
              focused ? styles.labelTextFocused
                : error ? styles.labelTextError : styles.labelText, 
            /* eslint no-nested-ternary: 0 */
            ]}
          >
            {'Age'}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textField: {
    width: '45%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00000040',
    borderRadius: 4,
    paddingBottom: '4%',
  },
  textFieldFocused: {
    width: '45%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f57c00',
    borderRadius: 4,
    paddingBottom: '4%',
  },
  textFieldError: {
    width: '45%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#b00020ff',
    borderRadius: 4,
    paddingBottom: '4%',
  },
  textFieldText: {
    width: '40%',
    color: '#3c4043',
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
    // margin: '4%',
  },
  label: {
    position: 'absolute',
    alignItems: 'center',
    top: '-20%',
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

export default CustomAgeInput
