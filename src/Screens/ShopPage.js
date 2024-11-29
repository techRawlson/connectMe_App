import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import url from '../constant/url';
import Color from '../constant/Color';
import { useSelector } from 'react-redux';
import Bold from '../constant/Bold';
import Font from '../constant/Font';
import CustomButton from '../components/CustomButton';

const ShopPage = ({ navigation }) => {

    const UserDetails = useSelector((item) => item.UserDetails)
    // console.log("UserDatsils", UserDetails.number);

    const [quantities, setQuantities] = useState({}); // State to track quantities for items
    const [data, setData] = useState([])


    const getData = async () => {
        try {
            let URL = `${url}/api/shop/all`
            let res = (await axios.get(URL)).data;
            // console.log(res);
            setData(res)

        } catch (error) {
            console.error("Error fetching Data", error);

        }
    }
    useEffect(() => {
        getData()
    }, [])

    const changeScreen = () => {
        console.log("changeScreen");
        navigation.navigate("Cart Page")
    }


    const saveToCart = async (id, quantity) => {
        try {
            if (UserDetails?.login) {

                if (quantity < 1) {
                    Alert.alert("Alert", "Select Valid Quantity")
                    return;
                }
                let URL = `${url}/api/cart/add`
                let data = {
                    shopId: id,
                    quantity: quantity,
                    userId: UserDetails.number,
                }
                let res = (await axios.post(URL, data)).data;
                console.log(res);
            } else {
                Alert.alert("Alert", "Plese Login First")
            }
        } catch (error) {
            console.error("Error Save to cart", error);
        }
    }

    const handleIncrement = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 1) + 1,
        }));
    };

    const handleDecrement = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) - 1, 0),
        }));
    };
    const renderItem = (item, index) => {
        const quantity = quantities[item.id] || 1;
        const totalPrice = quantity * item.calculatedDiscountedPrice;

        return (
            <View key={index} style={styles.itemContainer}>
                {/* Product Image */}
                <Image
                    style={styles.productImage}
                    // source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
                    source={require("../../assrts/image/Card.png")}
                />

                {/* Product Details */}
                {/* black gray black blue */}
                <Text style={styles.productTitle}>{item.productTitle}</Text>
                <Text style={styles.productDescription}>{item.productDescription}</Text>
                {/* <Text style={styles.pricing}>
                    MRP:<Text style={styles.strikeThrough}> ₹{item.priceIncludingGST}/-</Text>{' '}
                    <Text style={styles.totalPrice}>Sale Price: ₹{item.calculatedDiscountedPrice}/-</Text>
                    <Text style={styles.descountPrise}>Save {item.discountPercentage}</Text>
                </Text> */}

                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.pricing}>MRP: <Text style={styles.strikeThrough}>₹{item?.productPricing}/-</Text></Text>
                    <Text style={styles.pricing}>Sale Price: <Text>₹{item?.calculatedDiscountedPrice}/-</Text></Text>
                    <Text style={[styles.pricing, styles.totalPrice]}>Save {item?.discountPercentage}</Text>
                </View>

                {/* Quantity and Total Price */}
                <View style={styles.quantityContainer}>
                    {/* <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleDecrement(item.id)}
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleIncrement(item.id)}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity> */}
                    <CustomButton title={"-"} onPress={() => handleDecrement(item.id)} />
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <CustomButton title={"+"} onPress={() => handleIncrement(item.id)} />
                    <Text style={[styles.totalPrice, { fontSize: Font.DataFontSize - 2 }]}>Total ₹{totalPrice}/-</Text>

                    {/* Add to Cart Button */}
                    <CustomButton
                        title={"Add to Cart"}
                        onPress={() => saveToCart(item.id, quantity)}

                    />
                </View>
            </View>
        );
    };


    return (
        <View style={styles.rootContainer}>
            {/* <CustomButton title={"Btn"} onPress={() => countCartItem()} /> */}
            <ScrollView style={{ paddingHorizontal: 10, paddingTop: 5 }}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>Shop Now!</Text>
                    {/* <Text style={styles.dec}>
                        Choose from all of our products and services.
                    </Text> */}
                </View>
                {
                    data.map((item, index) => {
                        return (
                            renderItem(item, index)
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

export default ShopPage;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        // padding: 10,
    },
    headerView: {
        width: Dimensions.get("window").width - 60,
        margin: "auto",
    },
    header: {
        // fontSize: Font.HeaderFontSize,
        fontSize: 20,
        fontWeight: Bold.HeaderFontWeight,
        color: Color.Header_Font_Color,
        textAlign: 'center',
    },
    dec: {
        fontSize: Font.LableFontSize,
        fontWeight: Bold.LableFontWeight,
        color: Color.Lable_Font_Color,
        marginVertical: 15,
        textAlign: 'center',
    },


    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 8,
        paddingTop: 5,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 2,
    },
    productTitle: {
        fontSize: Font.DataFontSize,
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: 5,
        // textDecorationLine: 'underline',
    },
    productDescription: {
        fontSize: Font.SimpalFontSize,
        color: Color.Simple_Text_Color,
        marginBottom: 10,
    },
    pricing: {
        fontSize: 15,
        // fontSize: Font.DataFontSize,
        color: '#000',
        marginRight: 15,
        marginBottom: 10,
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
        color: '#888',
        // marginRight:20,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    quantityButton: {
        backgroundColor: Color.Button_Background_Color,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    quantityButtonText: {
        fontSize: 16,
        color: '#000',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    totalPrice: {
        fontSize: Font.SimpalFontSize,
        fontWeight: 'bold',
        color: Color.Current_Prise_Text_Color,
    },
    descountPrise: {

    },
    addToCartButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
