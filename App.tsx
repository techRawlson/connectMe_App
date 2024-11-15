import React, { useEffect, useState } from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useSelector } from 'react-redux';
import ActivateTag from './src/Screens/ActivateTag';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {

  // const [profileImage, setProfileImage] = useState("https://th.bing.com/th/id/OIP.n_GnWI6F_1dxWSoX9cNvFQHaHw?w=764&h=800&rs=1&pid=ImgDetMain")

  // const UserDetails = useSelector((item: any) => item.UserDetails)

  // useEffect(() => {
  //   if (UserDetails.images) {
  //     if (UserDetails.images.length > 0) {
  //       setProfileImage("data:image/png;base64," + UserDetails.images[0].image)
  //     }
  //   } else {
  //     setProfileImage("https://th.bing.com/th/id/OIP.n_GnWI6F_1dxWSoX9cNvFQHaHw?w=764&h=800&rs=1&pid=ImgDetMain")
  //   }
  // }, [UserDetails])


  // Navigate to the Profile screen
  // const profileScreenHandler = (navigation: any) => {
  //   navigation.navigate('Profile');
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "#7c7cf1", }, headerTintColor: "white" }}
        // options={({ navigation }) => ({
        //   header
        // })}
      >
        <Stack.Screen
          name='Activate Tag'
          component={ActivateTag}
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
export default App

const style = StyleSheet.create({

})