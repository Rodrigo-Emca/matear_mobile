import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getOneProduct } from '../../Store/ProductOne/actions';


export default function Details({ route }) {
const { id } = route.params;
const [reload, setReload] = useState(false);
const dispatch = useDispatch();
const [cantidad, setCantidad] = useState(0);
const productoSimple = useSelector((store) => store.producto.producto);

useEffect(() => {
dispatch(getOneProduct({ id }));
}, [reload]);

const handleClick = (index) => {
// Implementar la lógica para cambiar la imagen principal
};

const incrementarCantidad = () => {
setCantidad(cantidad + 1);
};

const disminuirCantidad = () => {
if (cantidad > 0) {
setCantidad(cantidad - 1);
}
};

return (
<View style={styles.container}>
<View style={styles.mainImgContainer}>
<View style={styles.imgZoomContainer}>
<Image
style={styles.mainImg}
source={{ uri: productoSimple?.photo?.[0] }}
alt="Main product"
/>
<View style={styles.imgZoom} />
</View>
</View>
<View style={styles.galleryContainer}>
    {productoSimple.photo &&
      productoSimple.photo.map((photo, index) => (
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
    <Text style={styles.title}>{productoSimple?.product_id?.title}</Text>
    <Text style={styles.description}>{productoSimple?.product_id?.description}</Text>
    <Text style={styles.stock}>
      Stock:{" "}
      <Text
        style={{
          color: productoSimple?.product_id?.stock < 3 ? "red" : "green",
        }}
      >
        {productoSimple?.product_id?.stock}
      </Text>
    </Text>
    <Text style={styles.price}>Precio: ${productoSimple?.product_id?.price}</Text>
    <View style={styles.cantidadContainer}>
      <Text style={styles.cantidadTitle}>Cantidad: {cantidad}</Text>
      <TouchableOpacity
        style={styles.cantidadBtn}
        onPress={disminuirCantidad}
      >
        <Text style={styles.cantidadBtnText}>-</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cantidadBtn}
        onPress={incrementarCantidad}
      >
        <Text style={styles.cantidadBtnText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnDetail}>
        <Text style={styles.btnDetailText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.categorias}>
      Categorias: <Text style={styles.categoria}>Mates</Text>
    </Text>
  </View>
</View>
)};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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