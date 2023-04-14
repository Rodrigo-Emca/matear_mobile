import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Logomr from '../../assets/LOGO-MATEAR-NEGRO2.png';

export default function Wellcome(props) {
  return (
    <View style={styles.bienvenida}>
      <Image source={Logomr} style={styles.logo} />
      <Text style={styles.welcomeH2}>{props.text} <Text style={styles.span}>{props.text2}</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bienvenida: {
    marginTop:50,
    alignItems: 'center',
    justifyContent: "flex-start",
  
  },
  logo: {
    
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  welcomeH2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  span: {
    color: '#29abe2',
  },
  welcomeP: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});