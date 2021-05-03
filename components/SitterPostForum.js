import React, { Component, useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';


import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from 'react-native';

function Post(props) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  var date = mm + '/' + dd + '/' + yyyy;
  
  const [ loading, setLoading ] = useState(true);
  const setData = async () => {
    const subscriber = await firestore()
    .collection('sitterPosts')
    .add({
        title: props.title,
        bio:  props.bio,
        breedSize:  props.breedSize,
        fencedBackYard:  props.fencedBackYard,
        otherAnimals:  props.otherAnimals,
        amountPerHour:  props.amountPerHour,
        phone:  props.phone,
        fullName:  props.fullName,
        email:  props.email,
        state:  props.state,
        city:  props.city,
        date:  date
    })
    .then(() => {
        console.log('Sitter Post success');
        //props.navigation.navigate('Forum', { email:  props.email, typeOfPost: 'sitterPosts'  });
    });

    return () => subscriber();
  }

  useEffect(() => {
    if (loading) {
      setData();
      //props.navigation.pop();
      //props.navigation.push('Forum', { email:  props.email, typeOfPost: ' '   });
      props.navigation.navigate('Forum', { email:  props.email, typeOfPost: ' '  });
      setLoading(false);
    }
  }, []);

  return <Text> </Text>;
}


class SitterPostForum extends Component {
  state = {
    title: '',
    bio: '',
    breedSize: '',
    fencedBackYard: '',
    otherAnimals: '',    
    amountPerHour: '',
    phoneNumber: '',
    fullName: '',
    email: this.props.route.params.email,
    state: this.props.route.params.state.toLowerCase().trim(),
    city: this.props.route.params.city.toLowerCase().trim(),
    mounted: false
  }

  errorCheck = () => {
    var doublePatt = new RegExp("\\$\\d+(?:\\.\\d+)?");
    var phonePatt = new RegExp("^(\\d{3}[- .]?){2}\\d{4}$");

    if (this.state.title === '' || this.state.bio === '' || 
        this.state.breedSize === '' || this.state.fencedBackYard === '' ||
        this.state.otherAnimals === '' || this.state.amountPerHour === '' ||
        this.state.phoneNumber === '' || this.state.fullName === '') {  
        this.setState({
          error: 'All fields required!'
        })
    } else if (this.state.fencedBackYard.toLowerCase() !== 'yes' && this.state.fencedBackYard.toLowerCase() !== 'no') {
        this.setState({
          error: 'Fenced in back yard is asking if you have a fenced in back yard or not. Please enter yes or no. If no please give specifics in the bio'
        })
    } else if (this.state.otherAnimals.toLowerCase() !== 'yes' && this.state.otherAnimals.toLowerCase() !== 'no') {
      this.setState({
        error: 'Other animals is asking if you have other animals in your house. Please enter yes or no. If no please give specifics in the bio'
      })
    } else if (doublePatt.exec(this.state.amountPerHour) === null) {
      this.setState({
        error: 'Amount Per Hour must be a number with a decimal. Example: 10.50 or 10.0'
      })
    } else if (this.state.breedSize.toLowerCase() !== 'any' && this.state.breedSize.toLowerCase() !== 'small' && 
               this.state.breedSize.toLowerCase() !== 'medium' && this.state.breedSize.toLowerCase() !== 'large')  {
      this.setState({
        error: 'Must enter any, small, medium, or large for breed size willing to watch'
      })
    }  else if (phonePatt.exec(this.state.phoneNumber) === null) {
      console.log(this.state.phoneNumber);
      this.setState({
        error: 'Please enter a valid phone number. Example: 123-456-7890'
      })
    } else {
      this.setState({
        error: '',
        mounted: true
      })
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
              placeholder = "Breed size willing to watch"
              onChangeText={(value) => this.setState({breedSize: value})}
              value={this.state.breedSize}
              />

              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "49%",  marginBottom: 5, marginLeft: 4 }}
              placeholder = "Fenced in backyard?"
              onChangeText={(value) => this.setState({fencedBackYard: value})}
              value={this.state.fencedBackYard}
              />
          </View>

          <View style = {styles.row}>
              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "49%",  marginBottom: 5, marginRight: 4 }}
              placeholder = "Other Animals?"
              onChangeText={(value) => this.setState({otherAnimals: value})}
              value={this.state.otherAnimals}
              />

              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "49%",  marginBottom: 5, marginLeft: 4 }}
              placeholder = "Amount Per Hour"
              onChangeText={(value) => this.setState({amountPerHour: value})}
              value={this.state.amountPerHour}
              />
          </View>

          <View style = {styles.row}>
              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "49%",  marginBottom: 5, marginRight: 4 }}
              placeholder = "Phone Number"
              onChangeText={(value) => this.setState({phoneNumber: value})}
              value={this.state.phoneNumber}
              />

              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "49%",  marginBottom: 5, marginLeft: 4 }}
              placeholder = "Full Name"
              onChangeText={(value) => this.setState({fullName: value})}
              value={this.state.fullName}
              />
          </View>

          <View style = {styles.row}>
            <TextInput
              style={{ borderColor: 'gray', borderWidth: 1, width: "100%",}}
              placeholder = "Give a quick bio about yourself"
              multiline={true}
              numberOfLines={10}
              onChangeText={(value) => this.setState({bio: value})}
              value={this.state.bio}
              />
          </View>

          <View style = {{alignItems: 'center',}}>
          <TouchableOpacity
          style={styles.button}
          onPress={this.errorCheck}
          >
            <Text>Post</Text>
          </TouchableOpacity>
          </View>

          <View style = {{alignItems: 'center', padding: 10 }}>
            <Text>{this.state.error}</Text>
          </View>
         
          { this.state.mounted && <Post 
                title = {this.state.title} 
                bio = {this.state.bio}
                breedSize = {this.state.breedSize} 
                fencedBackYard = {this.state.fencedBackYard}
                otherAnimals = {this.state.otherAnimals}
                amountPerHour = {this.state.amountPerHour}
                phone = {this.state.phoneNumber}
                fullName = {this.state.fullName}
                email = {this.state.email}
                state = {this.state.state} 
                city = {this.state.city}
                navigation = {this.props.navigation}> </Post> }


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

export default SitterPostForum;