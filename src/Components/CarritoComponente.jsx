import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CarritoComponente() {
    const [items, setItems] = useState([]);

    //Para traer los productos agregados al carrito
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

    const totalCompra = items.reduce((total, item) => total + (item.product.product_id.price * (item.cantidad || 1)), 0)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                {items.length > 0 ? (
                    items.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text>{item.product.product_id.title}</Text>
                        <Text>Stock: {item.product.product_id.stock}</Text>
                        <Text>$ {item.product.product_id.price} ARS</Text>
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
                    <Text>No hay productos que coincidan con la búsqueda</Text>
                )}
            </View>
            {items.length > 0 && (
                <View>
                    <View> 
                        <Text>TOTAL: ${totalCompra} ARS</Text>
                    </View>

                    <TouchableOpacity style={styles.botonComprar}>
                        <Text style={styles.textoBotonVaciar}>Finalizar compra</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={vaciarCarrito} style={styles.botonVaciar}>
                        <Text style={styles.textoBotonVaciar}>Vaciar carrito</Text>
                    </TouchableOpacity>
                </View>
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
        width: 400,
        height: 200
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
    botonComprar: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    textoBotonVaciar: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
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
});