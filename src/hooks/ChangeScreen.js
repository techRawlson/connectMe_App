import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../Redux/action';

export default ChangeScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const ChangeScreenHandler = (screenName) => {
        navigation.navigate(screenName)
    }

    const Logout = async () => {
        await AsyncStorage.removeItem("Login")
        dispatch(setUserDetails({}));
        navigation.replace("Login")
    }

    return { ChangeScreenHandler, Logout }
}