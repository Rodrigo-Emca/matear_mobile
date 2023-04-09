import React from 'react';
import { ScrollView, StyleSheet, ImageBackground } from 'react-native';
import Wellcome from '../Components/Wellcome';
import FormRegister from '../Components/FormRegister.jsx';


export default function Register({ handleRender }) {
  return (
    <ImageBackground style={styles.background}>
       <Wellcome style={styles.containerLogo} />
      <ScrollView style={styles.container}>
        <FormRegister handleRender={handleRender} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: 'rgb(230, 230, 230)', 
  },
  container: {
    marginTop: -31,
    flex: 1,
    backgroundColor: 'transparent',
  },
  containerLogo: {
   marginTop: 20,
  },
  
});
