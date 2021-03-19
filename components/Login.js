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

class Login extends Component {

  state = {
    email: '',
    password: '',
    error: ' '
  }

  onPressLogin = () => {
    if (this.state.email !== '' && this.state.password !== '') {
      auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log(this.state.email + " signed in!");
        this.props.navigation.navigate('Forum', { name: 'Jane' });
      }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          this.setState({
            error: 'That email address is already in use!'
            })
        }
        if (error.code === 'auth/invalid-email') {
          this.setState({
            error: 'That email address is invalid!'
            })
        }
      });
    } else {
      this.setState({
        error: 'All fields required!'
        })
    }
   
  }

  onPressRegister = () => {
    this.props.navigation.navigate('Register');
  }

 render() {
    return (
      <View style={styles.container}>
        
        <Image 
        style = {{width: 250, height: 250}}
        source = {require('./dog.gif')}
        />

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "80%",  marginBottom: 10 }}
          placeholder = "Email"
          onChangeText={(value) => this.setState({email: value})}
          value={this.state.email}
        />

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "80%",  marginBottom: 10 }}
          placeholder = "Password"
          onChangeText={(value) => this.setState({password: value})}
          value={this.state.password}
        />        

        <TouchableOpacity
         style={styles.button}
         onPress={this.onPressLogin}
        >
         <Text style = {{color: "#1976D2"}}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
         style={styles.button}
         onPress={this.onPressRegister}
        >
         <Text style = {{color: "#1976D2"}}>Register</Text>
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
    borderRadius: 10,
    borderColor: '#1976D2', 
    borderWidth: 1

  }
})

export default Login;