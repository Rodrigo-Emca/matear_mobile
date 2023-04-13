import React from 'react';
import { TextInput, View } from 'react-native';

export default function TextFilter({ defaultText, onChangeText }) {
    return (
        <View className='filtroTexto'>
            <View className='form-search'>
                <TextInput
                    defaultValue={defaultText}
                    className='input-search'
                    type='text'
                    name='title'
                    id='title'
                    placeholder='Find your product here'
                    onChangeText={(event) => onChangeText(event)}
                />
            </View>
        </View>
    );
}
