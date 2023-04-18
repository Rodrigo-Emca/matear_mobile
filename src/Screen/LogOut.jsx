
import React, { useState } from 'react';
import { Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import detailsActions from "../Store/Logout/actions"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import bottomTabsActions from '../Store/Perfil/action';  
import { Alert } from 'react-native';

const { mangaClicked } = detailsActions
const { reloadBottomTabs } = bottomTabsActions

export default function LogOut() {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  let state = useSelector(store => store.bottomTabsReducer.state)
  let [token, setToken] = useState('')
  const [loading, setLoading] = useState()

  useFocusEffect(
    React.useCallback(() => {
      async function getData() {
        try {
          const value = await AsyncStorage.getItem("token");
          setToken(value);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }, [state])
  );

  let headers = { headers: { 'Authorization': `Bearer ${token}` } }


  const handleLogOut = async () => {
    let url = 'https://matear-back.onrender.com/api/auth/signout'
    try {
      setLoading(true)
      await axios.post(url," ",headers)
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      console.log('Token almacenado:', storedToken);
      console.log('Usuario almacenado:', storedUser);
      dispatch(mangaClicked( {state:false} ))
      dispatch(reloadBottomTabs({ state: false }));
      dispatch(reloadBottomTabs({ state: !state }))

      setTimeout(() => {
        setLoading(false);
      }, 3000);
      Alert.alert(
        'Log out successfully, thank you for visiting us!!',
      
      );
      navigation.navigate('Home');
      
    } catch (e) {
      Alert.alert(
        'Ups !',
      
      );
      console.log(e);
    }
  };

  return (
  <TouchableOpacity  onPress={handleLogOut} activeOpacity={0.7}>
    <Text  style={style.button}> Log Out </Text>
  </TouchableOpacity>
  )
}

const style = StyleSheet.create ({
  button: {
    backgroundColor: '#C5A880',
    height: 50,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 25,  },
    buttonHover: {
      backgroundColor: 'darkgrey',
    },
})