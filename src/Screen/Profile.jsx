import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bg from '../../assets/fondoprofile.jpg';
import Wellcome from '../Components/Wellcome';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [mailingAddress, setMailingAddress] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      setUser(JSON.parse(userData));
    };
    getUser();
  }, []);

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      name: name ? name : user.name,
      mail: mail ? mail : user.mail,
      country: country ? country : user.country,
      address: address ? address : user.address,
      mailing_address: mailingAddress ? mailingAddress : user.mailing_address,
    };
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditMode(false);
  };

  return (
    <ImageBackground source={bg} style={styles.background}>
      <View style={styles.container}>
        <Wellcome />
        {user && !editMode ? (
          <View style={styles.userContainer}>
            <Text style={styles.userTitle}>User Information:</Text>
            <Text style={styles.userText}>Name: {user.name}</Text>
            <Text style={styles.userText}>Email: {user.mail}</Text>
            <Text style={styles.userText}>Country: {user.country}</Text>
            <Text style={styles.userText}>Address: {user.address}</Text>
            <Text style={styles.userText}>Mailing Address: {user.mailing_address}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(true)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.userContainer}>
            <Text style={styles.userTitle}>Edit User Information:</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Mailing Address"
              value={mailingAddress}
              onChangeText={setMailingAddress}
            />
            <TouchableOpacity style={styles.editButton} onPress={handleSave}>
              <Text style={styles.editButton}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  userContainer: {
    alignItems: 'center',
    backgroundColor:'#fffbfb67',
    padding:6,
    borderRadius:20,
  },
  userTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userText: {
    fontSize: 20,
    marginBottom: 5,
    color: 'black',
  },
  userPhoto: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  input:{
    fontSize: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loggedOutContainer: {
    alignItems: 'center',
  },
  loggedOutText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editButton: {
    fontSize: 20,
    marginTop: 20,
    color: '#C5A880',
    borderRadius: 5,
    width: 50,
     
  },
});
