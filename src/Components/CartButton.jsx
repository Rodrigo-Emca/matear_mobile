import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function CartButton(props) {
    const [pressed, setPressed] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            const cartItemKey = `cartItem${props.product._id}`;
            AsyncStorage.getItem(cartItemKey)
                .then((value) => {
                    const cartItemExists = value !== null;
                    setPressed(cartItemExists);
                });
        }, [props.product._id])
    );

    const handleClick = () => {
        const cartItemKey = `cartItem${props.product._id}`;
        AsyncStorage.getItem(cartItemKey)
            .then((value) => {
                if (value !== null) {
                    AsyncStorage.removeItem(cartItemKey)
                        .then(() => setPressed(false))
                        .catch((error) => console.log(error));
                } else {
                    AsyncStorage.setItem(cartItemKey, JSON.stringify(props))
                        .then(() => setPressed(true))
                        .catch((error) => console.log(error));
                }
            })
            .catch((error) => console.log(error));
    };

    const buttonStyle = {
        backgroundColor: pressed ? 'grey' : 'white',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <TouchableOpacity onPress={handleClick} style={buttonStyle}>
            <AntDesign name="shoppingcart" size={24} color="black" />
            <Text style={{ marginLeft: 10 }}>Cart</Text>
        </TouchableOpacity>
    );
}
