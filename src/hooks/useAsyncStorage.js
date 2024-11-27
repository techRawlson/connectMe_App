import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsyncStorage = () => {
    const saveToStorage = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error("AsyncStorage Error:", error);
        }
    };

    const getFromStorage = async (key) => {
        try {
            return JSON.parse(await AsyncStorage.getItem(key));
        } catch (error) {
            console.error("AsyncStorage Error:", error);
        }
    };
    return { saveToStorage, getFromStorage };
};
