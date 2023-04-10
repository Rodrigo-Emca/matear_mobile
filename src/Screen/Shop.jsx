import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import productsActions from '../Store/ProductsAll/actions';
import ProductCard from '../Components/ProductCard';

const { read_all_products } = productsActions;

export default function Shop() {
    const [reload, setReload] = useState(false);
    const dispatch = useDispatch();

    let productos = useSelector((store) => store.productos.productos);

    useEffect(() => {
        dispatch(read_all_products());
    }, [reload]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.filtroPrecios}>
                <Text>Aqui va el filtro por precios</Text>
            </View>
            <View style={styles.contenedorFiltroYCards}>
                <View style={styles.filtroTexto}>
                <Text>Aquí va el filtro busqueda por texto</Text>
                </View>
                <ScrollView>
                    <View style={styles['cont-cards']}>
                        {productos.length ? (
                            productos.map((productoIndividual) => (
                            <ProductCard key={productoIndividual._id} product_id={productoIndividual} />
                            ))
                        ) : (
                            <Text>not found</Text>
                        )}
                    </View>
                </ScrollView>
            </View>
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
    filtroPrecios: {
        paddingVertical: 10,
        backgroundColor: 'pink',
    },
    contenedorFiltroYCards: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    filtroTexto: {
        paddingVertical: 10,
        backgroundColor: 'yellow',
    },
    'cont-cards': {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});
