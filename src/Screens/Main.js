import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'

import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Feather from 'react-native-vector-icons/Feather';

import HomePage from './HomePage';
import ActivateTag from './ActivateTag';
import ContactVehicleOwner from './ContactVehicleOwner';
import LoginScreen from './LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './Profile';
import MyTags from './MyTags';

const Stack = createNativeStackNavigator();



const Main = () => {
    const changeScreen = (navigation) => {
        navigation.navigate("Profile")
    }


    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerStyle: { backgroundColor: Color.Header_Fooler_Background_Color, }, headerTintColor: "black", }}
            >
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={{
                        headerTitle: "My Tag...",
                    }}
                />

                <Stack.Screen
                    name='Home Page'
                    component={HomePage}
                    options={({ navigation }) => ({
                        headerTitle: "Home Page",
                        headerRight: () => (
                            <TouchableOpacity onPress={() => changeScreen(navigation)}>
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
                        headerTitle: "",
                        headerRight: () => (
                            <TouchableOpacity>
                                <Feather name='list' size={25} />
                            </TouchableOpacity>
                        )
                    }} />
                <Stack.Screen
                    name='Profile'
                    component={Profile}
                    options={{ headerTitle: "" }}
                />
                <Stack.Screen
                    name='My Tags'
                    component={MyTags}
                />
                <Stack.Screen
                    name='Contact Vehicle Owner'
                    component={ContactVehicleOwner}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Main

const styles = StyleSheet.create({})
