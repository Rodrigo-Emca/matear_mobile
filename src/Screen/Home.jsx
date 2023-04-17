import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Text} from 'react-native';
import FormLogin from '../Components/FormLogin';
import bg from '../../assets/cat-mates.jpg';
import Title from '../Components/Title';
import Presentation from '../Components/Presentacion';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  async function getToken() {
  const token = await AsyncStorage.getItem('token');
  if (token) {
  setIsLoggedIn(true);
  }
  }
  getToken();
  }, []);

  return (
      <ImageBackground source={bg} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.seccion}>
            <View style={styles.texto}>
            <Title text='Welcome to MateAr' />
          <Presentation text='Find the best mates and related products with the best prices' />
            </View>
          </View>
          {!isLoggedIn && (
            <View style={styles.seccion2}>
            <FormLogin />
            </View>
            )}
        </ScrollView>
      </ImageBackground>
    );
}


const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      height:"200%"
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    seccion: {
      height: "50%",
      padding: 20,
      justifyContent: 'center',
    },
    seccion2: {
      height: "100%",
      backgroundColor: "white"
    },
    texto: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 35,
    },
  });