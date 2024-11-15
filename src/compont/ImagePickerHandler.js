import { launchImageLibrary } from 'react-native-image-picker';

const ImagePickerHandler = async () => {
    const options = {
        mediaType: 'photo', // Can also be 'video' or 'mixed'
        quality: 1,         // 0 to 1, representing image quality (1 being highest)
    };

    try {
        const result = await launchImageLibrary(options);
        if (result.didCancel) {
            console.log('User cancelled image picker');
            return "User cancelled image picker"
        } else if (result.errorCode) {
            console.error('ImagePicker Error:', result.errorMessage);
            return result.errorCode
        } else {
            const image = result.assets[0];
            console.log('Image URI:', image.uri);
            return image;
            // You can now use this image URI to display the image or upload it to a server
        }
    } catch (error) {
        console.error('Error picking image:', error);
        return error;
    }
};

export default ImagePickerHandler