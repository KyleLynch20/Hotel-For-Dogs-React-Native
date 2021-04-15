import React, { Component } from 'react';
import { TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';


import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image
} from 'react-native';

class Register extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    error: ' '
  }

  onPress = () => {
    if (this.state.email !== '' && this.state.password !== '') {
      if (this.state.confirmPassword === this.state.password) { 
        auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('User account created!');
          this.props.navigation.navigate('Login');
        }).catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            this.setState({
              error: 'That email address is already in use!'
            })
          }
          else if (error.code === 'auth/invalid-email') {
            this.setState({
            error: 'That email address is invalid!'
            })
          }
          else if(error.code === 'auth/weak-password') {
            this.setState({
              error: 'The password is too weak'
            })
          }
        });
      } else {
        this.setState({
          error: 'passwords do not match!'
          })
      }
    } else { 
      this.setState({
        error: 'All fields required!'
        })
    }
  }

 render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "80%",  marginBottom: 10, marginTop: 10 }}
          placeholder = "Email"
          onChangeText={(value) => this.setState({email: value})}
          value={this.state.email}
        />

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "80%",  marginBottom: 10 }}
          placeholder = "Password"
          onChangeText={(value) => this.setState({password: value})}
          value={this.state.password}
          secureTextEntry={true}
        />

         <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "80%",  marginBottom: 10 }}
          placeholder = "Confirm Password"
          onChangeText={(value) => this.setState({confirmPassword: value})}
          value={this.state.confirmPassword}
          secureTextEntry={true}
        />            

        <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
        >
         <Text>Register</Text>
        </TouchableOpacity>

        <View>
          <Text>
            { this.state.error }
          </Text>
        </View>
      </View>
    )
  }

}

const UselessTextInput = () => {
  return (
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "80%",  marginBottom: 10 }}
      onChangeText={(value) => this.setState({email: value})}
      value={this.state.email}
    />
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: "80%",
    marginBottom: 10,
    borderRadius: 10

  }
})

export default Register;