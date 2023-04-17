import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartButton from './CartButton';

export default function ProductCard({ product_id }) {
    const navigation = useNavigation();
    const [token, setToken] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            async function getToken() {
                const value = await AsyncStorage.getItem('token');
                setToken(value);
            }
            getToken();
            }, [])
        );

    let stockText = '';
    if (product_id.product_id.stock === 0) {
        stockText = 'Momentarily out of Stock';
    } else if (product_id.product_id.stock < 5) {
        stockText = 'Last ' + `${product_id.product_id.stock}` + ' units available!';
    } else {
        stockText = `${product_id.product_id.stock} units`;
    }

    return (
        <View style={styles.container}>
        <View style={styles.card}>
            <View style={styles.imageContainer}>
            <Image source={{ uri: product_id.product_id.cover_photo }} style={styles.imagenProducto} />
            </View>
            <View style={styles.details}>
                <View style={styles.center}>
                    <Text style={styles.title}>{product_id.title}</Text>
                    <Text style={styles.price}>
                    $ {parseFloat(product_id.product_id.price).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 3 })} ARS
                    </Text>
                    <Text style={styles.stock}>Available: {stockText}</Text>
                    <View style={styles.contenedorDetails}>
                        <TouchableOpacity style={styles.btnDetail}>
                            <Text style={styles.btnDetailText} onPress={() => navigation.navigate('Details', { producto: product_id })}>Details</Text>
                        </TouchableOpacity>
                        {token && product_id.product_id.stock !== 0 && <CartButton product={product_id} />}
                    </View>
                </View>
            </View>
        </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: '90%',
        margin: 10
    },
    card: {
        borderWidth: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 15,
    },
    imageContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: 10
    },
    imagenProducto: {
        width: 300,
        height: 250,
        borderRadius: 10,
        alignSelf: 'center'
    },
    details: {
        flex: 1,
        padding: 10,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        marginBottom: 10,
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    stock: {
        marginBottom: 10,
    },
    contenedorDetails: {
        flexDirection: 'row',
        height: 60,
        gap: 15,
    },
    btnDetail: {
        backgroundColor: '#4CAF50',
        height: 60,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 0,
        justifyContent: 'center'
        },
    btnDetailText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    },
})