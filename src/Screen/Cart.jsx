import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import CarritoComponente from '../Components/CarritoComponente';

export default function Cart() { 

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <CarritoComponente />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(230, 230, 230)', 
        },
    });