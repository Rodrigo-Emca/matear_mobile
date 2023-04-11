import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Register from "../Screen/Register";
import Home from "../Screen/Home";
import Shop from '../Screen/Shop'
import Details from "../Screen/Details";
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from "react-redux";



const ShopStackNavigator = createNativeStackNavigator();

function ShopStack() {
    return (
        <ShopStackNavigator.Navigator
            initialRouteName="ShopScreen"
        >
            
            <ShopStackNavigator.Screen
                name="ShopScreen"
                component={Shop}
                options={{
                    headerShown: false,
                }}
            />
            <ShopStackNavigator.Screen
                name="Details"
                component={Details}
                options={{
                    headerBackTitleVisible: false,
                }}
            />
        </ShopStackNavigator.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function BottomTabsNavigation() {
 
  let state = useSelector((store) => store.bottomTabsReducer.state);
  let [token, setToken] = useState("");
 

  useFocusEffect(
    React.useCallback(() => {
      async function getData() {
        try {
          const value = await AsyncStorage.getItem("token");
          setToken(value);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }, [state])
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#111111",
          borderTopColor: "transparent",
          height: 55,
          paddingBottom: 5,
          paddingTop: 5,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 5,
        },
        tabBarActiveTintColor: "#532E1C",
        tabBarInactiveTintColor: "#9B9B9B",
        tabBarTabStyle: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      }}
    >   
        <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="register"
        component={Register}
        options={{
          headerShown: false,
          tabBarLabel: 'Register',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle-o" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="shop"
        component={ShopStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabsNavigation;


