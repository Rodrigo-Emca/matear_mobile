import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CarritoComponente() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const obtenerItems = async () => {
        try {
            const allKeys = await AsyncStorage.getAllKeys();
            const cartItems = await Promise.all(
            allKeys
                .filter((key) => key.includes('cartItem'))
                .map(async (key) => JSON.parse(await AsyncStorage.getItem(key)))
            );
            //console.log('cartItems:', cartItems[1].product.product_id);
            setItems(cartItems);
        } catch (error) {
            console.log(error);
        }
        };

        obtenerItems();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
        {items.length > 0 ? (
            items.map((items, index) => (
            <View key={index} style={styles.item}>
                <Text>{items.product.product_id.title}</Text>
                <Text>{items.product.product_id.price}</Text>
                <Text>{items.product.product_id.description}</Text>
            </View>
            ))
        ) : (
            <Text>No hay productos que coincidan con la búsqueda</Text>
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
});