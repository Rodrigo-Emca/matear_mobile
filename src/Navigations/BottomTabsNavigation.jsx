import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Register from "../Screen/Register";
import Home from "../Screen/Home";
import Shop from '../Screen/Shop'
import Perfil from "../Screen/Profile";
import LogOut from "../Screen/LogOut"; 
import Details from "../Screen/Details";
import Cart from "../Screen/Cart";
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
  
  React.useEffect(() => {
    async function getData() {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [state]);
  
  const [isLogged, setIsLogged] = React.useState(false);
  
  
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
     { !isLogged ? (
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
) : null
}

      { isLogged  ? (
  <Tab.Screen name="Perfil" options={{
      headerShown: false,
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color }) => (
        <FontAwesome name="user" size={24} color={color} />
      ),
    }}>
      {() => (
        <>
          <Perfil />
          <LogOut />
        </>
      )}
    </Tab.Screen>
  ) : null
}

      
      
       

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

      {isLogged ? (<Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-cart" size={24} color={color} />
          ),
        }}
      /> ): null}
    </Tab.Navigator>
    
  );
}

export default BottomTabsNavigation;

