import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";

const images = [
    // { id: 1, uri: require("../../assrts/image/Image1.jpg") },
    { id: 2, url: require("../../assrts/image/Image2.jpg") },
    { id: 3, url: require("../../assrts/image/Image3.jpg") },
    { id: 3, url: require("../../assrts/image/Image4.jpg") },
];

const AnimatedImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const screenWidth = Dimensions.get("window").width;
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            slideNext();
        }, 4000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [currentIndex]);

    const slideNext = () => {
        const nextIndex = (currentIndex + 1) % images.length;

        Animated.timing(translateX, {
            toValue: -screenWidth * nextIndex, // Move to the next image
            duration: 500, // Animation duration
            useNativeDriver: true,
        }).start();

        setCurrentIndex(nextIndex);
    };

    const slidePrevious = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;

        Animated.timing(translateX, {
            toValue: -screenWidth * prevIndex,
            duration: 500,
            useNativeDriver: true,
        }).start();

        setCurrentIndex(prevIndex);
    };

    return (
        <View style={styles.container}>
            {/* Animated Image Slider */}
            <Animated.View
                style={[
                    styles.sliderContainer,
                    { transform: [{ translateX }] }, // Animated transition
                ]}
            >
                {images.map((image, index) => (
                    <Image
                        key={index}
                        source={image.url}
                        style={[styles.image, { width: screenWidth }]}
                    />
                ))}
            </Animated.View>

            {/* Pagination Indicators */}
            <View style={styles.indicatorContainer}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            currentIndex === index ? styles.activeIndicator : {},
                        ]}
                    />
                ))}
            </View>

            {/* Optional: Manual Controls */}
            {/* <View style={styles.controls}>
                <TouchableOpacity onPress={slidePrevious}>
                    <Text style={styles.controlText}>Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={slideNext}>
                    <Text style={styles.controlText}>Next</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};

export default AnimatedImageSlider;

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // flex: 1,
        // justifyContent: "center",
        alignItems: "center",
    },
    sliderContainer: {
        flexDirection: "row",
        width: "100%",
        height: 200,
    },
    image: {
        height: "100%",
        resizeMode: "cover",
    },
    indicatorContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    indicator: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "#ccc",
        marginHorizontal: 4,
    },
    activeIndicator: {
        backgroundColor: "#000",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    controlText: {
        fontSize: 16,
        color: "#007bff",
        marginHorizontal: 20,
    },
});
