import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartButton(props) {
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        const cartItemKey = `cartItem${props.product._id}`;
        AsyncStorage.getItem(cartItemKey)
            .then((value) => {
                const cartItemExists = value !== null;
                setPressed(cartItemExists);
            });
    }, [props.product._id]);
    

    const handleClick = () => {
        AsyncStorage.getItem('cartItems')
            .then((value) => {
                const cartItems = JSON.parse(value);
                const existingKeys = Object.keys(cartItems || {}).filter((key) =>
                    key.startsWith('cartItem')
                );

                if (cartItems) {
                    let itemExists = false;

                    existingKeys.forEach((key) => {
                        const item = JSON.parse(cartItems[key]);
                        if (item.product._id === props.product._id) {
                            AsyncStorage.removeItem(key);
                            setPressed(false);
                            itemExists = true;
                        }
                    });

                    if (!itemExists) {
                        const cartItemCount = existingKeys.length + 1;
                        const newItemKey = `cartItem${props.product._id}`;
                        AsyncStorage.setItem(newItemKey, JSON.stringify(props));
                        setPressed(true);
                    }
                } else {
                    const newItemKey = `cartItem${props.product._id}`;
                    AsyncStorage.setItem(newItemKey, JSON.stringify(props));
                    setPressed(true);
                }
            });
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