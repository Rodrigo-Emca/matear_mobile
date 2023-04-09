
import React, { useState } from 'react';
import axios from 'axios';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image,KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import google from "../../assets/Google.png"
import { Alert } from 'react-native';

export default function FormRegister() {
  const [name, setName] = useState('');     
  const [mail, setmail] = useState('');     
  const [country, setCountry] = useState('');     
  const [address, setAddress] = useState('');
  const [mailing_address, setMailing_address] = useState('');
  const [password, setPassword] = useState('');
  const navigation= useNavigation()
  const [loading, setLoading] = useState()

  async function handleSubmit() {
    let data = {
        name: name,
        mail: mail,
        password: password,
        country: country,
        address: address,
        mailing_address: mailing_address,
       
    }
    
    let url = "http://localhost:8080/api/auth/signup";
    try {
      setLoading(true)
        await axios.post(url, data)
        console.log('creado')
        setTimeout(() => {
        setLoading(false);
      }, 3000);
      navigation.navigate("Home")
      Alert.alert(
        'Account created!',
        'Your account has been created successfully.',
      );
    } catch (error) {
        console.log(error)
        Alert.alert(
          'Ups',
        );
        setLoading(false);
    }
}
  

  return (
    <View style={styles.container}>
      <View style={styles.fieldset}>
        <Text style={styles.legend}>Name</Text>
        <View style={styles.legendCont}>
          <TextInput style={styles.input} id="name" name="name" required onChangeText={(inputText => setName(inputText))} />
          
        </View>
      </View>

      <View style={styles.fieldset}>
        <Text style={styles.legend}>Email</Text>
        <View style={styles.legendCont}>
          <TextInput style={styles.input} id="mail" name="mail" required onChangeText={(inputText => setmail(inputText))} />
          
        </View>
      </View>
      <View style={styles.fieldset}>
        <Text style={styles.legend}>Password</Text>
        <View style={styles.legendCont}>
          <TextInput style={styles.input} secureTextEntry={true} id="password" name="password" required onChangeText={(inputText => setPassword(inputText))} />
          
        </View>
      </View>

      <View style={styles.fieldset}>
        <Text style={styles.legend}>Country</Text>
        <View style={styles.legendCont}>
          <TextInput style={styles.input} id="country" name="country" required onChangeText={(inputText => setCountry(inputText))} />
         
        </View>
      </View>
      <View style={styles.fieldset}>
        <Text style={styles.legend}>Address</Text>
        <View style={styles.legendCont}>
          <TextInput style={styles.input} id="address" name="address" required onChangeText={(inputText => setAddress(inputText))} />
         
        </View>
      </View>
      <View style={styles.fieldset}>
        <Text style={styles.legend}>Mailing_address</Text>
        <View style={styles.legendCont}>
          <TextInput style={styles.input} id="mailing_address" name="mailing_address" required onChangeText={(inputText => setMailing_address(inputText))} />
         
        </View>
      </View>
     

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>

      </TouchableOpacity>

      <View style={styles.divGoogle}>
        <TouchableOpacity style={styles.button2} onPress={() => {
          
          }}>
          <Image style={styles.googleImg} source={google} />
          <Text style={styles.buttonText2}>Sign up with Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.parrafosForm}>
        <Text>
          Already have an account?
          <Text style={styles.parrafosFormText} onPress={() => {
              navigation.navigate("Home");
            }}> Log in</Text> 
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 7,
    marginTop: 5,
    width: "100%",
  
   
  },
  fieldset: {
    display: "flex",
    alignItems: "flex-start",
    width: 410,
    height: 65,
    width: "90%",
    justifyContent: "flex-start",
    background: "#EBEBEB",
    borderBottomWidth: 1,
  },
  legendCont:{
    display: "flex",
    width:"100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imagen:{
    width: 19,
    height: 19,
    marginBottom: 10,
  },
  googleImg: {
    width: 30,
    height:30
  },
  buttonText2:{
    color: "white"
  },
  legend: {
    marginLeft: 10,
    fontSize: 10,
    marginTop: 10,
    lineHeight: 15,
    letterSpacing: 1,
    fontWeight: 500,
    color: "white",
  },
  input: {
    width: "90%",
    backgroundColor: "transparent",
    height: 45,
    fontSize: 15,
    padding: 11,
    borderRadius: 5,
  },
  divCheck: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 12,
    lineHeight: 5,
    letterSpacing: 5,
    color: "#1F1F1F",
    gap: 5,
    width: 410,
  },

  button: {
    backgroundColor: "#C5A880",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  
  buttonText: {
    color: "white"
  },

  button2: {
    backgroundColor: "black",
    borderRadius: 10,
    height: 50,
    margin: 10,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    gap: 20
  },
  
  buttonText3: {
    color: "white"
  },

  divGoogle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 390,
    height: 16,
    color: 'black',
    borderRadius: 10,
   
    border: 1,
  },

  parrafosForm: {
    display: "flex",
    gap: 17,
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  parrafosFormText:{
    color: "#C5A880",
    fontWeight: 700,
  },
});