import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

const Stack = createNativeStackNavigator();



const Main = () => {

    const [loginPageShow, setLoginPage] = useState(true);

    const getDatas = async () => {
        let data = JSON.parse(await AsyncStorage.getItem("Login"))
        console.log(data)
        if (data) {
            setLoginPage(false)
        }
    }

    useEffect(() => {
        getDatas()
    }, [])


    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerStyle: { backgroundColor: Color.Header_Fooler_Background_Color, }, headerTintColor: "black", }}
            >
                {
                    loginPageShow &&
                    <Stack.Screen
                        name='Login'
                        component={LoginScreen}
                        options={{
                            headerTitle: "My Tag...",
                            // headerShown: false,
                            // headerTitle: "",
                            headerRight: () => {
                                return (
                                    <View style={{ borderRadius: 25 }}>
                                        <Image style={{ height: 35, width: 35 }} source={require("../../assrts/image/ProfileIcon.png")} />
                                    </View>
                                )
                            }
                        }}
                    />
                }

                <Stack.Screen
                    name='Home Page'
                    component={HomePage}
                    options={{
                        headerTitle: "My Tag...",
                        headerRight: () => {
                            return (
                                <View style={{ borderRadius: 25 }}>
                                    <Image style={{ height: 35, width: 35 }} source={require("../../assrts/image/ProfileIcon.png")} />
                                </View>
                            )
                        }

                    }} />
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
                    name='Contact Vehicle Owner'
                    component={ContactVehicleOwner}
                    options={{ headerTitle: "" }}
                />
                {/* <Stack.Screen
          name="HomePage"
          component={Acti}
          options={({ navigation }) => ({
            headerTitle: "Demo International School",
            headerTitleAlign: "center",
            headerRight: () => (
              <Pressable
                onPress={() => profileScreenHandler(navigation)}
              >

                <Image style={{ height: 30, width: 30, borderRadius: 15 }}
                  source={{ uri: profileImage }}
                />
              </Pressable>
            ),
          })}
        /> */}

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Main

const styles = StyleSheet.create({})