import { Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react'

import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomePage from './HomePage';
import ActivateTag from './ActivateTag';
import ContactVehicleOwner from './ContactVehicleOwner';
import LoginScreen from './LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './Profile';
import MyTags from './MyTags';
import ShopPage from './ShopPage';
import CartPage from './CartPage';
import Demo from './Demo';
import Feq from './Feq';
import Support from './Support';
import { setCartItemCount, setUserDetails } from '../Redux/action';
import { useAsyncStorage } from '../hooks/useAsyncStorage';
import Social from './Social';
import Color from '../constant/Color';
import HomePageLogoImage from '../components/HomePageLogoImage';
import url from '../constant/url';
import axios from 'axios';
import CheckoutPage from './CheckoutPage';


const Stack = createNativeStackNavigator();



const Main = () => {
    const dispatch = useDispatch();

    const CartItemCount = useSelector(item => item.CartItemCount);
    const UserDetails = useSelector(item => item.UserDetails)
    // console.log("Main", UserDetails);
    const { saveToStorage, getFromStorage } = useAsyncStorage();

    const checkLogin = async () => {
        try {
            const userData = await getFromStorage("Login");
            console.log("userData", userData);
            if (userData?.login) {
                console.log("Logins", userData);
                dispatch(setUserDetails(userData));
            }
        } catch (error) {
            console.error("Error Fetching Data from Storage", error);
        }
    };

    const countCartItem = async () => {
        try {
            if (UserDetails.number) {
                const URL = `${url}/api/cart/user/${UserDetails?.number}`;
                const data = (await axios.get(URL)).data;
                if (data.length > 0) {
                    dispatch(setCartItemCount(data.length))
                }
                // console.log("Cart Data", URL);
                // console.log("Cart Data", data.length);
            }
        } catch (error) {
            console.error("Error fetching Cart item length", error);
        }
    };


    useEffect(() => {
        checkLogin();
    }, []);
    useEffect(() => {
        countCartItem();
    }, [UserDetails.number]);


    const changeScreen = (navigation, screenName) => {

        if (UserDetails?.login) {
            navigation.navigate(screenName)
        } else {
            Alert.alert("Alert", "Plese Login first", [
                {
                    text: "Cancel",
                    style: 'cancel'
                },
                {
                    text: "Login",
                    // style: "destructive",
                    onPress: () => { logOutHandler(navigation) }
                }
            ])
            console.log("else");
        }
    }

    const logOutHandler = async (navigation) => {
        await AsyncStorage.removeItem("Login")
        navigation.replace("Login")
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home Page'
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Color.Header_Fooler_Background_Color,
                    },
                    headerTintColor: "black",
                    headerBackVisible: true,
                    headerTitle: "",
                    headerLeft: () => (
                        <HomePageLogoImage style={styles.logoImage} />
                    ),
                }}
            >
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name='Home Page'
                    component={HomePage}
                    options={({ navigation }) => ({
                        headerBackVisible: false,
                        headerRight: () => (
                            <TouchableOpacity onPress={() => changeScreen(navigation, "Profile")}>
                                <View style={{ borderRadius: 25 }}>
                                    <Image style={{ height: 35, width: 35 }} source={require("../../assrts/image/ProfileIcon.png")} />
                                </View>
                            </TouchableOpacity>
                        ),
                    })}

                />
                <Stack.Screen
                    name='Activate Tag'
                    component={ActivateTag}
                    options={{
                        headerRight: () => (
                            <TouchableOpacity>
                                <Feather name='list' size={25} />
                            </TouchableOpacity>
                        )
                    }} />
                <Stack.Screen
                    name='Profile'
                    component={Profile}
                />
                <Stack.Screen
                    name='My Tags'
                    component={MyTags}
                />
                <Stack.Screen
                    name='Contact Vehicle Owner'
                    component={ContactVehicleOwner}
                />

                <Stack.Screen
                    name='Shop Page'
                    component={ShopPage}
                    // initialParams={{ countCartItem }}
                    options={({ navigation }) => ({
                        // headerRight: () => (
                        //     <FontAwesome name='shopping-cart' size={23} onPress={() => changeScreen(navigation, "Cart Page")} />
                        // )

                        headerRight: () => (
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <FontAwesome
                                    name="shopping-cart"
                                    size={23}
                                    onPress={() => navigation.navigate("Cart Page")}
                                />
                                {CartItemCount > 0 && (
                                    <View
                                        style={{
                                            backgroundColor: "red",
                                            borderRadius: 10,
                                            paddingHorizontal: 5,
                                            marginLeft: -10,
                                        }}
                                    >
                                        <Text style={{ color: "white", fontSize: 12 }}>{CartItemCount}</Text>
                                    </View>
                                )}
                            </View>
                        ),
                    })}
                />
                <Stack.Screen
                    name='Cart Page'
                    component={CartPage}
                />
                <Stack.Screen name='Demo' component={Demo} />
                <Stack.Screen name='Faq' component={Feq}
                    options={{
                        // headerBackVisible: false
                    }}
                />
                <Stack.Screen name='Support' component={Support}
                    options={{
                        headerLeft: () => ""
                    }}
                />
                <Stack.Screen name='Social' component={Social} />
                <Stack.Screen name='Checkout Page' component={CheckoutPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Main

const styles = StyleSheet.create({
    logoImage: {
        height: 50,
        width: 100,
        objectFit: "contain"

    }
})
