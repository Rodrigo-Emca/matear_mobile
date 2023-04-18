import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import CarritoComponente from '../Components/CarritoComponente';

export default function Cart() { 

    return (
        <SafeAreaView style={styles.container}>
            <CarritoComponente />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: StatusBar.currentHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
        },
    });