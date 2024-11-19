import React from 'react'
import Main from './src/Screens/Main';
import { View } from 'react-native';



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
    <Main />
  )
}
export default App