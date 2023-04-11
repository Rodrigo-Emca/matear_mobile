import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Details(producto) {
    const productDetails = producto.route.params.producto;

    const [storedToken, setStoredToken] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('token').then((token) => {
            setStoredToken(token);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.mainImgContainer}>
                    <View style={styles.imgZoomContainer}>
                        <Image
                            style={styles.mainImg}
                            source={{ uri: productDetails?.photo?.[0] }}
                            alt="Main product"
                        />
                        <View style={styles.imgZoom} />
                    </View>
                </View>
                <View style={styles.galleryContainer}>
                    {productDetails.photo &&
                        productDetails.photo.map((photo, index) => (
                            <TouchableOpacity
                                style={styles.galleryImg}
                                key={index}
                                onPress={() => handleClick(index)}
                            >
                                <Image
                                    style={styles.galleryImg}
                                    source={{ uri: photo }}
                                    alt={`imagen ${index}`}
                                />
                            </TouchableOpacity>
                        ))}
                </View>

                <View style={styles.infoDetail}>
                    <Text style={styles.title}>{productDetails?.product_id?.title}</Text>
                    <Text style={styles.description}>{productDetails?.product_id?.description}</Text>
                    <Text style={styles.stock}>
                        Stock:
                        <Text style={{ color: productDetails?.product_id?.stock < 3 ? 'red' : 'green' }}>
                            {productDetails?.product_id?.stock}
                        </Text>
                    </Text>
                    <Text style={styles.price}>Precio: ${productDetails?.product_id?.price}</Text>
                    <View style={styles.cantidadContainer}>
                        {storedToken !== null && (
                            <TouchableOpacity style={styles.btnDetail}>
                                <Text style={styles.btnDetailText}>Agregar al carrito</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={styles.categorias}>
                        Categorias: <Text style={styles.categoria}>Mates</Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    mainImgContainer: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    },
    imgZoomContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    },
    mainImg: {
    width: '100%',
    height: '100%',
    },
    imgZoom: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    zIndex: 1,
    },
    galleryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    },
    galleryImg: {
    width: 70,
    height: 70,
    marginRight: 10,
    },
    infoDetail: {
    paddingHorizontal: 20,
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    },
    description: {
    fontSize: 16,
    marginBottom: 10,
    },
    stock: {
    fontSize: 16,
    marginBottom: 10,
    },
    price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    },
    cantidadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    },
    cantidadTitle: {
    fontSize: 16,
    marginRight: 10,
    },
    cantidad: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    },
    cantidadBtn: {
    backgroundColor: '#eee',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    },
    cantidadBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    },
    btnDetail: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    },
    btnDetailText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    },
    categorias: {
    fontSize: 16,
    marginTop: 20,
    },
    categoria: {
    fontWeight: 'bold',
    marginLeft: 10,
    },
});
