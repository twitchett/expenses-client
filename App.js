import React from 'react'
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { RNCamera } from 'react-native-camera'

const BASE_URL = 'http://localhost:3000'

const MODES = {
  menu: 0,
  camera: 1
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: MODES.menu,
      expenseDate: new Date()
    }
    this.renderMenu = this.renderMenu.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.renderCamera = this.renderCamera.bind(this)
    this.takePicture = this.takePicture.bind(this)
    this.sendItem = this.sendItem.bind(this)
  }

  renderCamera () {
    console.log('in capture image....', RNCamera)
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={ styles.preview }
          type={ RNCamera.Constants.Type.back }
          permissionDialogTitle={ 'Permission to use camera' }
          permissionDialogMessage={ 'We need your permission to use your camera phone' }
          onCameraReady={() => console.log('camera ready')}
          onMountError={(e) => console.warn('on mount error: ', e)}
          // style={styles.preview}
          // aspect={RNCamera.Constants.Aspect.fill}
          // captureTarget={RNCamera.Constants.CaptureTarget.disk}
        >
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
            <TouchableOpacity
              onPress={ this.takePicture.bind(this) }
              style={ styles.capture }
            >
              <Text style={{ fontSize: 14 }}>SNAP</Text>
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    )

  }

  takePicture = async function () {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
    } else {
      console.warn('where\'s my camera?')
    }
  };

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

  renderMenu () {
    return (
      <View style={ styles.container }>
        <Button
          title="Image"
          onPress={ () => this.setState({ mode: MODES.camera }) }
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
    )
  }

  render () {
    const { mode } = this.state

    if (mode === MODES.menu) {
      return this.renderMenu()
    } else if (mode === MODES.camera) {
      return this.renderCamera()
    }
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
    width: 70
  },
  value: {
    width: 200
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
