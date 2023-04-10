import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Register from "../Screen/Register";
import Login from "../Screen/Login";
import Shop from '../Screen/Shop'
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function BottomTabsNavigation() {
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
        name="login"
        component={Login}
        options={{
          headerShown: false,
          tabBarLabel: 'Login',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="shop"
        component={Shop}
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
