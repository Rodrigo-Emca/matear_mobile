import { Text, StyleSheet } from 'react-native';

export default function
  Presentation(props) {
  return (
    <Text style={styles.parrafo} numberOfLines={2}>
      {props.text || props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  parrafo: {
    color: "white",
    fontSize: 19,
    textAlign: "center",
    marginVertical: 10,
    textShadowColor: 'black',
    textShadowOffset: { width: 4, height: 2 },
    textShadowRadius: 2,
    marginTop:40,
  },
});