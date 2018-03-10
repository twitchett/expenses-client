import React from 'react'
import { Button, StyleSheet, Text, View, TextInput } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Camera } from 'react-native-camera'

const BASE_URL = 'http://localhost:3000'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expenseDate: new Date()
    }
    this.renderItem = this.renderItem.bind(this)
    this.captureImage = this.captureImage.bind(this)
    this.sendItem = this.sendItem.bind(this)
    this.showDatePicker = this.showDatePicker.bind(this)
  }

  captureImage () {
   return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        // style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.disk}
      >
        <TouchableHighlight
          // style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </Camera>
    )
  }

  renderItem (label, item) {
    return (
      <View style={ styles.row }>
        <Text style={ styles.label }>{ `${label}:` }</Text>
        <TextInput
          style={ styles.value }
          value={ this.state[item] }
          onChangeText={(text) => this.setState({ [item]: text })}
        />
      </View>
    )
  }

  renderDateItem (label, item) {
    const { expenseDate, datePickerVisible } = this.state

    return (
      <View style={ styles.row }>
        <Text style={ styles.label }>{ `${label}:` }</Text>
        <Text style={ styles.value }>{ expenseDate.toLocaleDateString() }</Text>
        <Button
          title="change"
          onPress={ () => this.setState({ datePickerVisible: true }) }
        />
        <DateTimePicker
          isVisible={ datePickerVisible }
          onConfirm={ (val) => {
            this.setState({
              datePickerVisible: false,
              expenseDate: val
            })
          }}
          onCancel={ () => this.setState({ datePickerVisible: false }) }
        />
      </View>
    )
  }

  sendItem () {
    console.log('send to server')
  }

  render() {
    return (
      <View style={ styles.container }>
        <Button
          title="Image"
          onPress={ this.captureImage }
        />
        { this.renderItem('Name', 'expenseName') }
        { this.renderItem('Payee', 'expensePayee') }
        { this.renderDateItem('Date', 'expenseDate') }
        { this.renderItem('Value', 'expenseValue') }
        { this.renderItem('Comment', 'expenseComment') }
        <Button
          title="Send"
          onPress={ this.sendItem }
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    width: 50
  },
  value: {
    width: 200
  }
});
