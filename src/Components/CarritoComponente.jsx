import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                {items.length > 0 ? (
                    items.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text>{item.product.product_id.title}</Text>
                        <Text>$ {item.product.product_id.price}</Text>
                        <Text>{item.product.product_id.description}</Text>
                        <TouchableOpacity onPress={() => eliminarItem(item.product._id)}>
                        <Text style={styles.eliminar}>Eliminar Item</Text>
                        </TouchableOpacity>
                        
                    </View>
                    ))
                ) : (
                    <Text>No hay productos que coincidan con la búsqueda</Text>
                )}
            </View>
            {items.length > 0 && (
                <TouchableOpacity onPress={vaciarCarrito} style={styles.botonVaciar}>
                    <Text style={styles.textoBotonVaciar}>Vaciar carrito</Text>
                </TouchableOpacity>
                )}
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
    item: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    eliminar: {
        color: 'red',
        marginTop: 8,
    },
    botonVaciar: {
        backgroundColor: '#f00',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    textoBotonVaciar: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});