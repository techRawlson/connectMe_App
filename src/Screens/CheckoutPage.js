import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Color from '../constant/Color';
import Font from '../constant/Font';
import Bold from '../constant/Bold';
import url from '../constant/url';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CustomButton from '../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CheckoutPage = () => {

    const UserDetails = useSelector(item => item.UserDetails)
    const [amountDetails, setAmountDetails] = useState([])

    const [address, setAddress] = useState()

    const getAddressHandler = async () => {
        try {
            const URL = `${url}/api/address/user/${UserDetails.number}`;
            const res = (await axios.get(URL)).data;
            setAddress(res[0])
        } catch (error) {

        }
    }

    // http://192.168.1.111:8082/api/cart/user/9671059942
    const getTotalPrise = async () => {
        try {
            const URL = `${url}/api/cart/user/${UserDetails.number}`
            let res = (await axios.get(URL)).data
            setAmountDetails(res)
        } catch (error) {
            console.error("Error Fetching in Prise", error);
        }
    }

    useEffect(() => {
        getAddressHandler()
        getTotalPrise()
    }, [])

    const cartRenderItem = (item, index) => {
        // const quantity = quantities[item.id] || 1;
        // const totalPrice = quantity * item.calculatedDiscountedPrice;
        const totalPrice = 0;


        return (
            <View key={index} style={styles.itemContainer}>
                {/* Product Image */}
                <Image
                    style={styles.productImage}
                    // source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
                    source={require("../../assrts/image/Card.png")}
                />

                <Text style={styles.productTitle}>{item.productTittle}</Text>
                <Text style={styles.productDescription}>{item.productDescription}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.pricing, styles.strikeThrough]}>₹{item.productPricing}/-</Text>
                    <Text style={styles.pricing}>Sale Price: <Text>₹{item.productCalculatedDiscountedPrice}/-</Text></Text>
                    <Text style={[styles.pricing, styles.totalPrice]}>Save {item.productDiscountPercentage.toString().split(".")[0]}%</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <View style={[styles.quantityContainer, { marginBottom: 0 }]}>
                        <CustomButton title={"-"} onPress={() => handleDecreaseQuantity(item.id)} />
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <CustomButton title={"+"} onPress={() => handleIncreaseQuantity(item.id)} />
                    </View>
                    < CustomButton title={<MaterialIcons name="delete" size={20} />} />
                </View>
            </View>
        );
    };


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Checkout</Text>
                {address ? (
                    <View style={styles.addressContainer}>
                        {/* Render the address data */}
                        <Text style={[styles.addressText, { marginBottom: 5 }]}>Shipping Address</Text>
                        <Text style={styles.addressHeader}>{address.fullName}</Text>
                        <Text style={styles.addressText}>{address.addressLine1}, {address.city}, {address.state}</Text>
                        <Text style={styles.addressText}>{address.postalCode}, {address.country}</Text>
                        <Text style={styles.addressText}>{address.userId}</Text>
                    </View>
                ) : (
                    <Text>No Address Data Found</Text>
                )}

                {
                    amountDetails.map((item, index) => cartRenderItem(item, index))
                }

                <View style={styles.cartContainer}>
                    <Text style={styles.cartTitle}>Price Details</Text>
                    <View style={styles.priceItem}>
                        <Text style={styles.label}>Price (1 item)</Text>
                        <Text style={styles.value}>{amountDetails[0].actualProductPricing}</Text>
                    </View>
                    <View style={styles.priceItem}>
                        <Text style={styles.label}>Price including GST</Text>
                        <Text style={styles.value}>{amountDetails[0]?.productPricing}</Text>
                    </View>
                    <View style={styles.priceItem}>
                        <Text style={styles.label}>Discount</Text>
                        <Text style={styles.discount}>-₹{amountDetails[0]?.productDiscountPrice}</Text>
                    </View>
                    <View style={[styles.priceItem, styles.total]}>
                        <Text style={styles.label}>Total</Text>
                        <Text style={styles.totalPrice}>₹{amountDetails[0]?.totalPrice}</Text>
                    </View>
                </View>
                <CustomButton title={"Place Order"} />
            </View>
        </ScrollView>
    );
};

export default CheckoutPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center",

    },
    // Addess
    addressContainer: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    addressHeader: {
        fontSize: Font.DataFontSize,
        fontWeight: Bold.DataFontWeight,
        color: Color.Data_Font_Color,
        marginBottom: 5,
    },
    addressText: {
        color: Color.Simple_Text_Color,
        fontSize: Font.SimpalFontSize,
        fontWeight: Bold.SimpalFontWeight,
        marginBottom: 5,

    },


    cartContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        marginTop: 20,
        marginBottom: 20,
    },
    cartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    priceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    label: {
        fontSize: 14,
        color: '#555',
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    discount: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
    },
    total: {
        borderBottomWidth: 0,
        marginTop: 10,
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
    pricing: {
        fontSize: 15,
        // fontSize: Font.DataFontSize,
        color: '#000',
        marginBottom: 10,
        marginRight: 15,
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    productDescription: {
        fontSize: Font.SimpalFontSize,
        color: Color.Simple_Text_Color,
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
        gap: 10,
    },
    quantityButton: {
        padding: 5,
        backgroundColor: Color.Button_Background_Color,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Color.Button_Border_Color,
    },
    quantityButtonText: {
        fontSize: Font.ButtonFontSize,
        paddingHorizontal: 5,
        fontWeight: Bold.ButtonFontWeight,
        color: Color.Button_Text_Color
    },
    totalPrice: {
        // fontSize: Font.DataFontSize,
        fontWeight: Bold.LableFontWeight,
        color: Color.Current_Prise_Text_Color,
    },

});
