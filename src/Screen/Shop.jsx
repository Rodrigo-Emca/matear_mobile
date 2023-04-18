import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import productsActions from '../Store/ProductsAll/actions';
import ProductCard from '../Components/ProductCard';
import categoriesActions from '../Store/Categories/actions'
import { CheckBox } from 'react-native-elements';
import TextFilter from '../Components/TextFilter';

const { read_all_products, filter_product } = productsActions;
const { read_all_categories } = categoriesActions

export default function Shop() {
    const dispatch = useDispatch();

    const categories = useSelector(store => store.categories.categories)
    const productos = useSelector((store) => store.productos.productosFiltrados);
    const [reload, setReload] = useState(false);
    const [filter, setFilter] = useState({
        condition: "",
        categories: [],
    })
    const [selectedCategories, setSelectedCategories] = useState([]);

    function handleChange(event) {
        setFilter({
            ...filter,
            condition: event
        })
    }

    const handleCategories = (value) => {
        let existe = filter.categories.find(e => e === value)
        if (existe) {
            setFilter({
                ...filter,
                categories: filter.categories.filter(e => e !== value)
            });
            setSelectedCategories(selectedCategories.filter(e => e !== value));
        } else {
            setFilter({
                ...filter,
                categories: [...filter.categories, value]
            });
            setSelectedCategories([...selectedCategories, value]);
        }
    }

    useEffect(() => {
        dispatch(read_all_products());
    }, [reload]);

    useEffect(() => {
        dispatch(read_all_categories());
    }, []);

    useEffect(() => {
        dispatch(filter_product({ filter: filter }));
    }, [filter])


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contenedorFiltroYCards}>
                <View style={styles.filtroTexto}>
                    <TextFilter defaultText={filter.condition} onChangeText={(event) => handleChange(event)} />
                </View>
                <View style={styles.filtroCategorias}>
                    {categories.map(item => {
                        return (
                            <>
                                <CheckBox
                                    key={item._id}
                                    style={styles.checkCategory}
                                    title={item.name} name="category"
                                    value={item.name}
                                    onPress={() => handleCategories(item._id)}
                                    checked={selectedCategories.includes(item._id)}
                                />
                            </>
                        )
                    })}
                </View>
                <ScrollView>
                    <View style={styles.contCards}>
                        {productos.length ? (
                            productos.map((productoIndividual) => (
                                <ProductCard key={productoIndividual._id} product_id={productoIndividual} />
                            ))
                        ) : (
                            <Text>Sorry! Not found</Text>
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
        backgroundColor: 'rgb(230, 230, 230)'
    },

    contenedorFiltroYCards: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    filtroTexto: {
        width: 480,
        height: 45,
        marginBottom: 10,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
    },
    contCards: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 5,
        width: '100%',
    },
    filtroCategorias: {
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: 480,
        height: 120,
        borderWidth: 1,
        backgroundColor: 'white',
    },
});