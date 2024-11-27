import { Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'

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
import { setUserDetails } from '../Redux/action';
import { useAsyncStorage } from '../hooks/useAsyncStorage';
import Social from './Social';


const Stack = createNativeStackNavigator();



const Main = () => {
    const dispatch = useDispatch();

    const UserDetails = useSelector(item => item.UserDetails)
    // console.log("Main", UserDetails);
    const { saveToStorage, getFromStorage } = useAsyncStorage();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                // let userData = JSON.parse(await AsyncStorage.getItem("Login"))

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
        checkLogin();
    }, []);

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
                        <Image style={styles.logoImage} source={require("../../assrts/image/easylogo.png")} />
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
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <FontAwesome name='shopping-cart' size={23} onPress={() => changeScreen(navigation, "Cart Page")} />
                        )
                    })}
                />
                <Stack.Screen
                    name='Cart Page'
                    component={CartPage}
                />
                <Stack.Screen name='Demo' component={Demo} />
                <Stack.Screen name='Faq' component={Feq} />
                <Stack.Screen name='Support' component={Support}
                    options={{
                        headerLeft: () => ""
                    }}
                />
                <Stack.Screen name='Social' component={Social} />
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
