import React, { Component, useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';


import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';

class Forum extends Component {

  constructor(props){
    super(props);
    console.log("in constructor : " + props.route.params.typeOfPost); 
    this.state = {
      state: '',
      city: '',
      error: ' ',
      // look into passing the type of post when leave from need post or sitter post to correctly display the data..
      typeOfPost: props.route.params.typeOfPost,
      searchHit: 0,
      sitterPostHit: false,
      needPostHit: false
    }
  }

  

  onPressSearch = () => {
    if (this.state.needPostHit) {
      this.setState({
        searchHit: this.state.searchHit + 1,
        typeOfPost: 'sitterPosts'
      })
    } else if (this.state.sitterPostHit) {
      this.setState({
        searchHit: this.state.searchHit + 1,
        typeOfPost: 'needPosts'
      })
    }
  }


  onPressSitter = () => {
    this.setState({
      sitterPostHit: true,
      needPostHit: false
    })
  }


  onPressNeedSitter = () => {
    this.setState({
      sitterPostHit: false,
      needPostHit: true
    })     
  }

  onPressPost = () => {
    if (this.state.needPostHit && this.state.city !== '' && this.state.state !== '') { 
      //this.props.navigation.pop();
      //this.props.navigation.push('NeedPostForum', { email: this.props.route.params.email, state: this.state.state, city: this.state.city });
      this.props.navigation.navigate('NeedPostForum', { email: this.props.route.params.email, state: this.state.state, city: this.state.city });
    } else if (this.state.sitterPostHit && this.state.city !== '' && this.state.state !== '') {
      //this.props.navigation.pop();
      //this.props.navigation.push('SitterPostForum', { email: this.props.route.params.email, state: this.state.state, city: this.state.city });
      this.props.navigation.navigate('SitterPostForum', { email: this.props.route.params.email, state: this.state.state, city: this.state.city });

    }
  }

  

 render() {
   //console.log("type of post " + this.state.typeOfPost);
    return (
      <View style={styles.container}>
        
        <View style={styles.row}>
            <TouchableOpacity
            style={{ 
              alignItems: 'center',
              backgroundColor: this.state.sitterPostHit === true ? "#000000" : "#DDDDDD",
              padding: 10,
              width: "50%",
              marginBottom: 10,
              borderRadius: 10,
              borderColor: '#1976D2', 
              borderWidth: 1
            }}
            onPress={this.onPressSitter}
            >
            <Text style={{color: "#1976D2"}}>I am a sitter</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={{ 
              alignItems: 'center',
              backgroundColor: this.state.needPostHit === true ? "#000000" : "#DDDDDD",
              padding: 10,
              width: "50%",
              marginBottom: 10,
              borderRadius: 10,
              borderColor: '#1976D2', 
              borderWidth: 1
            }}
            onPress={this.onPressNeedSitter}
            >
            <Text style={{color: "#1976D2"}}>Need a sitter</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.row}>
            
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "30%",  marginBottom: 10, marginTop: 10 }}
            placeholder = "City"
            onChangeText={(value) => this.setState({city: value})}
            value={this.state.city}
            />

            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "30%",  marginBottom: 10, marginTop: 10 }}
            placeholder = "State"
            onChangeText={(value) => this.setState({state: value})}
            value={this.state.state}
            />

            <TouchableOpacity
             style={styles.button2}
             onPress={this.onPressSearch}
            >
             <Text style={{color: "#1976D2"}}>Search</Text>
            </TouchableOpacity>
        </View>

        <View style={{ height: 400,}}>
          <Component1 typeOfPost = {this.state.typeOfPost}
                      state = {this.state.state}
                      city = {this.state.city}
                      searchHit = {this.state.searchHit}></Component1>
        </View>
        
        <TouchableOpacity
        style={styles.button}
        onPress={this.onPressPost}
        >
        <Text style={{color: "#1976D2"}}>Post</Text>
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

function Component1(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getData = async () => {
    const subscriber = await firestore()
    .collection(props.typeOfPost)
    .where('state', "==", props.state.toLowerCase().trim())
    .where('city', "==", props.city.toLowerCase().trim())
    .onSnapshot(querySnapshot => {
      const data = [];

      querySnapshot.forEach(documentSnapshot => {
        data.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setData(data);
      setLoading(false);
    });

    return () => subscriber();
  }

  useEffect(() => {
    getData();
  }, [props.searchHit])

  if (loading) {
    return <ActivityIndicator />;
  }

  if (props.typeOfPost === "needPosts"){
    return (
      <FlatList
      data={data}
      ListEmptyComponent={
          <View style={styles.flatListEmpty}>
              <Text style={{ fontWeight: 'bold', textAlign: 'center'}}>No Data</Text>
          </View>
      }
      renderItem={({ item }) => (
        <TouchableWithoutFeedback onPress={()=>{}}>
          <View>
            <NeedPosts title = {item.title}
                       fullName = {item.fullName}
                       dogBreed = {item.dogBreed}
                       dogName = {item.dogName}
                       dogNeeds = {item.dogNeeds}
                       amountOfTime = {item.amountOfTime}
                       amountPerHour = {item.amountPerHour}
                       pottyTrained = {item.pottyTrained}
                       animalFriendly = {item.animalFriendly}
                       email = {item.email}
                       phone = {item.phone}
                       date = {item.date}
                       state = {item.state}
                       city = {item.city}></NeedPosts>
          </View>
        </TouchableWithoutFeedback>
      )}
  />
  )
  } else {
    return (
      <FlatList
      data={data}
      ListEmptyComponent={
          <View style={styles.flatListEmpty}>
              <Text style={{ fontWeight: 'bold', textAlign: 'center'}}>No Data</Text>
          </View>
      }
      renderItem={({ item }) => (
        <TouchableWithoutFeedback onPress={()=>{}}>
          <View>
            <SitterPosts title = {item.title}
                         fullName = {item.fullName}
                         amountPerHour = {item.amountPerHour}
                         bio = {item.bio}
                         breedSize = {item.breedSize}
                         city = {item.city}
                         state = {item.state}
                         date = {item.date}
                         email = {item.email}
                         fencedBackYard = {item.fencedBackYard}
                         otherAnimals = {item.otherAnimals}
                         phone = {item.phone}></SitterPosts>
          </View>
        </TouchableWithoutFeedback>
      )}
  />
  )
  }
  
}

function NeedPosts(props) {
  return ( 
    <View style={{padding: 20}}>
      <View style={{borderColor: '#1976D2', borderWidth: 1}}>
        <Text style={{textAlign: 'center', fontSize: 18}}>{props.title}</Text>
        <Text style = {styles.postText}>Dog Breed: {props.dogBreed}</Text>
        <Text style = {styles.postText}>Dog Name: {props.dogName}</Text>
        <Text style = {styles.postText}>Dog Needs: {props.dogNeeds}</Text>
        <Text style = {styles.postText}>Away Time: {props.amountOfTime}</Text>
        <Text style = {styles.postText}>Amount Per Hour: {props.amountPerHour}</Text>
        <Text style = {styles.postText}>Is the dog potty trained: {props.pottyTrained}</Text>
        <Text style = {styles.postText}>Is the dog animal friendly: {props.animalFriendly}</Text>
        <Text style = {styles.postText}>Email: {props.email}</Text>
        <Text style = {styles.postText}>Phone: {props.phone}</Text>
        <Text style = {styles.postText}>Name: {props.fullName}</Text>
        <Text style = {styles.postText}>Date Posted: {props.date}</Text>
        <Text style = {styles.postText}>State: {props.state}</Text>
        <Text style = {styles.postText}>City: {props.city}</Text>
      </View>
    </View>
  );
}

function SitterPosts(props) {
  return ( 
    <View style={{padding: 20}}>
      <View style={{borderColor: '#1976D2', borderWidth: 1}}>
        <Text style={{textAlign: 'center', fontSize: 18}}>{props.title}</Text>
        <Text style = {styles.postText}>Amount Per Hour: {props.amountPerHour}</Text>
        <Text style = {styles.postText}>Breed Size Willing To Watch: {props.breedSize}</Text>
        <Text style = {styles.postText}>Bio: {props.bio}</Text>
        <Text style = {styles.postText}>Fenced In Back Yard: {props.fencedBackYard}</Text>
        <Text style = {styles.postText}>Other Animals: {props.otherAnimals}</Text>
        <Text style = {styles.postText}>Email: {props.email}</Text>
        <Text style = {styles.postText}>Phone: {props.phone}</Text>
        <Text style = {styles.postText}>Name: {props.fullName}</Text>
        <Text style = {styles.postText}>Date Posted: {props.date}</Text>
        <Text style = {styles.postText}>State: {props.state}</Text>
        <Text style = {styles.postText}>City: {props.city}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#1976D2', 
    borderWidth: 1
  },
  row: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    width: "40%",
    borderRadius: 10,
    padding: 10,
    borderColor: '#1976D2', 
    borderWidth: 1
  },
  postText: {
    paddingLeft: 15,
    paddingTop: 10
  },
})



export default Forum;