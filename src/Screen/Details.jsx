import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import productsActions from '../Store/ProductsAll/actions';

const { read_all_products } = productsActions;

export default function Details(producto) {

    console.log(producto.route.params.producto)

    return (
        <SafeAreaView style={styles.container}>

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
});
