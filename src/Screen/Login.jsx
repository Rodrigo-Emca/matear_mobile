import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import FormLogin from '../Components/FormLogin.jsx';

export default function Login() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormLogin />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(230, 230, 230)',
  },
});
