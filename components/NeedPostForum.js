import React, { Component } from 'react';
import { TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';


import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from 'react-native';

function post(amountOfTime, amountPerHour, animalFriendly, city, dogBreed, 
  dogName, dogNeeds, email, fullName, phone, pottyTrained, state, title) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  var date = mm + '/' + dd + '/' + yyyy;

  firestore()
  .collection('needPosts')
  .add({
    amountOfTime: amountOfTime,
    amountPerHour: amountPerHour,
    animalFriendly: animalFriendly,
    city: city,
    date: date,
    dogBreed: dogBreed,
    dogName: dogName,
    dogNeeds: dogNeeds,
    email: email,
    fullName: fullName,
    phone: phone,
    pottyTrained: pottyTrained,
    state: state,
    title: title
  })
  .then(() => {
    console.log('Need Post success');
  });
}


class NeedPostForum extends Component {
  state = {
    title: '',
    dogBreed: '',
    dogName: '',
    animalFriendly: '',
    pottyTrained: '',
    amountPerHour: '',
    amountOfTime: '',
    phoneNumber: '',
    fullName: '',
    dogBio: '',
    email: this.props.route.params.email,
    state: this.props.route.params.state.toLowerCase().trim(),
    city: this.props.route.params.city.toLowerCase().trim(),
  }

  onPress = () => {
    var doublePatt = new RegExp("\\d+\\.\\d+");
    var intPatt = new RegExp("^[0-9]*[1-9][0-9]*$");
    var phonePatt = new RegExp("^(\\d{3}[- .]?){2}\\d{4}$");

    if (this.state.title === '' || this.state.dogBreed === '' || 
        this.state.dogName === '' || this.state.animalFriendly === '' ||
        this.state.pottyTrained === '' || this.state.amountPerHour === '' ||
        this.state.amountOfTime === '' || this.state.phoneNumber === '' ||
        this.state.fullName === '' || this.state.dogBio === '') {  
        this.setState({
          error: 'All fields required!'
        })
    } else if (this.state.animalFriendly.toLowerCase() !== 'yes' && this.state.animalFriendly.toLowerCase() !== 'no') {
        this.setState({
          error: 'Animal friendly is asking if your dog is friendly with other animals. Please enter yes or no. If no please give specifics in the bio'
        })
    } else if (this.state.pottyTrained.toLowerCase() !== 'yes' && this.state.pottyTrained.toLowerCase() !== 'no') {
      this.setState({
        error: 'Potty trained is asking if your dog is potty trained. Please enter yes or no. If no please give specifics in the bio'
      })
    } else if (doublePatt.exec(this.state.amountPerHour) === null) {
      this.setState({
        error: 'Amount Per Hour must be a number with a decimal. Example: 10.50 or 10.0'
      })
    } else if (intPatt.exec(this.state.amountOfTime) === null) {
      this.setState({
        error: 'Amount Of Time must be a number. Example: 24 or 48'
      })
    }  else if (phonePatt.exec(this.state.phoneNumber) === null) {
      this.setState({
        error: 'Please enter a valid phone number. Example: 123-456-7890'
      })
    } else {
      this.setState({
        error: ''
      })
      post (this.state.amountOfTime, this.state.amountPerHour, this.state.animalFriendly, this.state.city, this.state.dogBreed, 
           this.state.dogName, this.state.dogBio, this.state.email, this.state.fullName, this.state.phoneNumber, this.state.pottyTrained,
           this.state.state, this.state.title);
      this.props.navigation.pop();
      this.props.navigation.push('Forum', { email: this.state.email, typeOfPost: 'needPosts' });

      //this.props.navigation.navigate('Forum', { email: this.state.email, typeOfPost: 'needPosts' });
    }
    
  }

 render() {
    return (
      <ScrollView style={styles.container}>
          <View style = {styles.row}>
            <TextInput
              style={{ borderColor: 'gray', borderWidth: 1, width: "100%",}}
              placeholder = "Title"
              onChangeText={(value) => this.setState({title: value})}
              value={this.state.title}
              />
          </View>

          <View style = {styles.row}>
              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "49%",  marginBottom: 5, marginRight: 4 }}
              placeholder = "Dog Breed"
              onChangeText={(value) => this.setState({dogBreed: value})}
              value={this.state.dogBreed}
              />

              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "49%",  marginBottom: 5, marginLeft: 4 }}
              placeholder = "Dog Name"
              onChangeText={(value) => this.setState({dogName: value})}
              value={this.state.dogName}
              />
          </View>

          <View style = {styles.row}>
              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "49%",  marginBottom: 5, marginRight: 4 }}
              placeholder = "Animal Friendly"
              onChangeText={(value) => this.setState({animalFriendly: value})}
              value={this.state.animalFriendly}
              />

              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "49%",  marginBottom: 5, marginLeft: 4 }}
              placeholder = "Potty Trained"
              onChangeText={(value) => this.setState({pottyTrained: value})}
              value={this.state.pottyTrained}
              />
          </View>

          <View style = {styles.row}>
              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "49%",  marginBottom: 5, marginRight: 4 }}
              placeholder = "Amount Per Hour"
              onChangeText={(value) => this.setState({amountPerHour: value})}
              value={this.state.amountPerHour}
              />

              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "49%",  marginBottom: 5, marginLeft: 4 }}
              placeholder = "Amount of Time"
              onChangeText={(value) => this.setState({amountOfTime: value})}
              value={this.state.amountOfTime}
              />
          </View>


          <View style = {styles.row}>
              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "49%",  marginBottom: 10, marginRight: 4 }}
              placeholder = "Phone Number"
              onChangeText={(value) => this.setState({phoneNumber: value})}
              value={this.state.phoneNumber}
              />

              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "49%",  marginBottom: 10, marginLeft: 4 }}
              placeholder = "Full Name"
              onChangeText={(value) => this.setState({fullName: value})}
              value={this.state.fullName}
              />
          </View>

          <View style = {styles.row}>
            <TextInput
              style={{ borderColor: 'gray', borderWidth: 1, width: "100%",}}
              placeholder = "Dog Bio / Needs"
              multiline={true}
              numberOfLines={10}
              onChangeText={(value) => this.setState({dogBio: value})}
              value={this.state.dogBio}
              />
          </View>

          <View style = {{alignItems: 'center',}}>
          <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
          >
            <Text>Post</Text>
          </TouchableOpacity>
          </View>

          <View style = {{alignItems: 'center', padding: 10 }}>
            <Text>{this.state.error}</Text>
          </View>
         
        
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
    borderColor: '#1976D2', 
    borderWidth: 1
  },
  row: {
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',

  },
})

export default NeedPostForum;