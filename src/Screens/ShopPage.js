import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import url from '../constant/url';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../constant/Color';
import { useSelector } from 'react-redux';
import { Button } from 'react-native';
import Buttons from '../compont/Buttons';

const ShopPage = ({ navigation }) => {
    const UserDetails = useSelector((item) => item.UserDetails)
    // console.log("UserDatsils", UserDetails.number);

    const [quantities, setQuantities] = useState({}); // State to track quantities for items
    const [data, setData] = useState([])


    const getData = async () => {
        try {
            let URL = `${url}/api/shop/all`
            let res = (await axios.get(URL)).data;
            console.log(res);
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

        } catch (error) {
            console.error("Error Save to cart", error);
        }
    }

    const handleIncrement = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const handleDecrement = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0),
        }));
    };

    const renderItem = ({ item }) => {
        const quantity = quantities[item.id] || 0;
        return (
            <View style={styles.card}>
                <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.productTitle}</Text>
                    <Text style={styles.description}>{item.productDescription}</Text>
                    <Text style={styles.price}><FontAwesome name='rupee' size={15} />{item.productPricing}</Text>
                    <View style={styles.bottomRow}>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrement(item.id)}>
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrement(item.id)}>
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.quantityButton}
                                onPress={() => saveToCart(item.id, quantity)}
                            >
                                <Text style={styles.quantityButtonText}>Add <FontAwesome name='rupee' /> {parseInt(quantity) * (item.productPricing)}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.rootContainer}>
            <Buttons title='View Cart' onClick={() => changeScreen()} bgColor={"red"} />

            <ScrollView style={{ padding: 10 }}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>Shop Now!</Text>
                    <Text style={styles.dec}>
                        Choose from all of our products and services.
                    </Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
        // marginVertical: 15,
        textAlign: 'center',
    },
    dec: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        marginVertical: 15,
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android shadow
        marginBottom: 15,
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 15,
        objectFit: "contain",
        marginTop: 20
    },
    textContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#777',
        marginVertical: 5,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: Color.Button_BackGroung_Color,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
    },
    quantityButtonText: {
        color: Color.Button_Text_Color,
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});
