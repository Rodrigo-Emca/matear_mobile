import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function CarritoComponente() {
  const [items, setItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const obtenerItems = async () => {
        try {
          const allKeys = await AsyncStorage.getAllKeys();
          const cartItems = await Promise.all(
            allKeys
              .filter((key) => key.includes('cartItem'))
              .map(async (key) => JSON.parse(await AsyncStorage.getItem(key)))
          );
          setItems(cartItems);
        } catch (error) {
          console.log(error);
        }
      };
      obtenerItems();
    }, [])
  );

  const eliminarItem = async (itemId) => {
    try {
      await AsyncStorage.removeItem(`cartItem${itemId}`);
      const allKeys = await AsyncStorage.getAllKeys();
      const cartItems = await Promise.all(
        allKeys
          .filter((key) => key.includes('cartItem'))
          .map(async (key) => JSON.parse(await AsyncStorage.getItem(key)))
      );
      setItems(cartItems);
    } catch (error) {
      console.log(error);
    }
  };

  const vaciarCarrito = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(allKeys.filter((key) => key.includes('cartItem')));
      setItems([]);
    } catch (error) {
    }
  };

  const agregarUnidad = (item) => {
    const cantidadActual = item.cantidad || 1;
    if (cantidadActual < item.product.product_id.stock) {
      const nuevoItem = {
        ...item,
        cantidad: cantidadActual + 1
      }
      actualizarItem(nuevoItem);
    }
  };

  const disminuirUnidad = (item) => {
    const cantidadActual = item.cantidad || 1;
    if (cantidadActual > 1) {
      const nuevoItem = {
        ...item,
        cantidad: cantidadActual - 1
      }
      actualizarItem(nuevoItem);
    } else {
      eliminarItem(item.product._id);
    }
  };

  const actualizarItem = async (nuevoItem) => {
    try {
      await AsyncStorage.setItem(`cartItem${nuevoItem.product._id}`, JSON.stringify(nuevoItem));
      const allKeys = await AsyncStorage.getAllKeys();
      const cartItems = await Promise.all(
        allKeys
          .filter((key) => key.includes('cartItem'))
          .map(async (key) => JSON.parse(await AsyncStorage.getItem(key)))
      );
      setItems(cartItems);
    } catch (error) {
      console.log(error);
    }
  }

  const [counts, setCounts] = useState([]);

  const handleCheckout = async () => {
      const totalPrice = items.reduce(
        (total, item) => total + (item.product.product_id.price * (item.cantidad || 1)),
        0
      );
      
      const orderData = {
        items: items.map((item) => ({
          product_id: item.product.product_id,
          quantity: counts[items.indexOf(item)],
        })),
        total_price: totalPrice 
      };
      
      try {
        const response = await axios.post("https://matear-back.onrender.com/api/payment", orderData);
        Linking.openURL(response.data.response.body.init_point);
      } catch (error) {
        console.error(error);
      }
    };

    const totalCompra = items.reduce((total, item) => total + (item.product.product_id.price * (item.cantidad || 1)), 0)
      
    return (
        <View contentContainerStyle={styles.container}>
            <ScrollView style={styles.ScrollViewContainer}>
                {items.length > 0 ? (
                    items.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.textoPrincipal}>{item.product.product_id.title}</Text>
                        <Text style={styles.textoSecundario}>Stock: {item.product.product_id.stock}</Text>
                        <Text style={styles.textoSecundario}>$ {item.product.product_id.price} ARS</Text>
                        <Text>{item.product.product_id.description}</Text>

                        <View style={styles.cantidadContainer}>
                            <TouchableOpacity style={styles.cantidadBotonContainer} onPress={() => disminuirUnidad(item)}>
                                <Text style={styles.cantidadBotonTexto}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.cantidadTexto}>{item.cantidad || 1}</Text>
                            <TouchableOpacity style={styles.cantidadBotonContainer} onPress={() => agregarUnidad(item)}>
                                <Text style={styles.cantidadBotonTexto}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => eliminarItem(item.product._id)}>
                                <Text style={styles.eliminar}>Eliminar Item</Text>
                            </TouchableOpacity>
                        </View>

                        <View> 
                            <Text>Subtotal: ${item.product.product_id.price * (item.cantidad || 1)} ARS</Text>
                        </View>
                        
                    </View>
                    ))
                ) : (
                  <View style={styles.contenedorNotFound}>
                    <Text style={styles.textoNotFound}>It seems that there are no products in your cart.</Text>
                    <Text style={styles.textoNotFound}>Why don't you try adding some products?</Text>
                  </View>
                )}

            </ScrollView>
            {items.length > 0 && (
                <View style={styles.contenedorFinalizarCompra}>
                    <View> 
                        <Text style={styles.textoPrincipal}>TOTAL: ${totalCompra} ARS</Text>
                    </View>
                    <View style={styles.containerFinalizaryEliminar}>
                      <TouchableOpacity style={styles.botonComprar}>
                          <Text style={styles.textoBotonVaciar} onPress={handleCheckout}>Finalizar compra</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={vaciarCarrito} style={styles.botonVaciar}>
                          <Text style={styles.textoBotonVaciar}>Vaciar carrito</Text>
                      </TouchableOpacity>
                    </View>
                </View>
                )}
        </View>
    );
}

    const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    ScrollViewContainer: {
      paddingTop:25,
      paddingBottom:50,
    },
    item: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
        width: 450,
        height: 200,
    },
    eliminar: {
        color: 'red',
        marginTop: 8,
    },
    cantidadContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }, 
    cantidadBotonContainer: {
        backgroundColor: '#DDD',
        width: 40,
        height: 25,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    cantidadBotonTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#444',
    },
    textoPrincipal: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textoSecundario: {
      fontSize: 16,
      fontWeight: 'bold',
  },
    contenedorFinalizarCompra: {
      alignSelf: 'center',
      width: 450,
      backgroundColor: 'transparent',
    },
    containerFinalizaryEliminar:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    botonVaciar: {
      backgroundColor: '#f00',
      padding: 10,
      borderRadius: 5,
      margin: 10,
      width: 130,
      height: 40
    },
    botonComprar: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: 130
    },
    textoBotonVaciar: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    contenedorNotFound:{
      height: 800,
      justifyContent: 'center'
    },
    textoNotFound:{
      fontSize: 22,
      fontWeight: 'bold',
      padding: 20,
      textAlign: 'center'
    }
});