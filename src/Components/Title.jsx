import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Title(props) {
  return (
    <Text style={styles.titulo}>{props.text || props.children}</Text>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: "black",
    textDecorationColor: 'grey',
    fontSize: 44,
    textAlign: "center",
    fontWeight: 'bold',
    marginVertical: 10,
  },
});