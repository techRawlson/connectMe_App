import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert, Dimensions, ScrollView, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import url from "../constant/url";
import axios from "axios";
import Color from "../constant/Color";
import Font from "../constant/Font";
import Bold from "../constant/Bold";
import CustomButton from "../components/CustomButton";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

const CartPage = ({ navigation }) => {

  const UserDetails = useSelector((item) => item.UserDetails);
  const [cartProducts, setCartProducts] = useState([]);
  const [referse, setReferse] = useState(true);

  const fetchCartDetails = async () => {
    try {
      setReferse(true);
      let URL = `${url}/api/cart/user/${UserDetails.number}`;
      let data = (await axios.get(URL)).data;
      console.log(URL);


      console.log("DAta:::::::::::::::::;", data);

      setCartProducts(data); // Assuming the response contains a field cartItems
      // setCartProducts([]); // Assuming the response contains a field cartItems
      setReferse(false);
    } catch (error) {
      console.error("Error Fetching Data", error);
      setReferse(false);
    }
  };

  useEffect(() => {
    fetchCartDetails(); // Fetch the cart details when the component mounts
  }, []);

  const handleIncreaseQuantity = async (id) => {
    try {
      // Update quantity locally first
      const updatedCart = [...cartProducts];
      const productToUpdate = updatedCart.find((product) => product.id === id);
      if (productToUpdate) {
        productToUpdate.quantity++;
      }
      setCartProducts(updatedCart);

      // Send the updated quantity to the backend
      const URL = `${url}/api/cart/${id}`

      let response2 = await axios.put(URL, {
        quantity: productToUpdate.quantity,
      });
      console.log("response2.data", response2.data);

      await fetchCartDetails();
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Optionally, revert the UI change if there's an error
      await fetchCartDetails(); // Fetch cart details again to sync with server
    }
  };

  const handleDecreaseQuantity = async (id) => {

    try {




      const updatedCart = [...cartProducts];
      const productToUpdate = updatedCart.find((product) => product.id === id);
      if (productToUpdate) {
        productToUpdate.quantity--;
      }
      setCartProducts(updatedCart);

      const URL = `${url}/api/cart/${id}`

      let response2 = await axios.put(URL, {
        quantity: productToUpdate.quantity,
      });
      console.log("response2.data", response2.data);
    } catch (error) {
      console.error("Error in updating data", error);
    } finally {
      await fetchCartDetails();
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      const URL = `${url}/api/cart/delete/${id}`;
      await axios.delete(URL)

      const updatedCart = cartProducts.filter((product) => product.id !== id);
      setCartProducts(updatedCart);
      await fetchCartDetails();
    } catch (error) {
      console.error("Error Detete item", error);
    }
  };

  const calculateTotalPrice = () => {
    return cartProducts?.reduce(
      (total, product) => total + product.totalPrice,
      0
    );
  };

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
        <Text style={styles.pricing}>
          MRP: <Text style={styles.strikeThrough}>₹{item.productDiscountPrice}/-</Text>{' '}
          Sale Price:<Text style={styles.totalPrice}>₹{item.productCalculatedDiscountedPrice}/-</Text>   Save {item.productDiscountPercentage.toString().split(".")[0]}%
        </Text>
        {/* {/* */}
        <View style={styles.quantityContainer}>
          {/* <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleDecreaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text> */}
          {/* <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleIncreaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity> */}
          <View style={[styles.quantityContainer, { marginBottom: 0 }]}>
            <CustomButton title={"-"} onPress={() => handleDecreaseQuantity(item.id)} />
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <CustomButton title={"+"} onPress={() => handleIncreaseQuantity(item.id)} />
          </View>

          {/* <Text style={styles.totalPrice}>Total ₹{totalPrice}/-</Text> */}
          < CustomButton title={"Remove"} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <ScrollView
        style={{ paddingTop: 10, paddingHorizontal: 15 }}
        refreshControl={
          <RefreshControl refreshing={referse} onRefresh={fetchCartDetails} />
        }
      >
        {cartProducts.length > 0 ? (
          cartProducts.map((item, index) => cartRenderItem(item, index))
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data found</Text>
            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => navigation.navigate("Shop")}
            >
              <Text style={styles.shopButtonText}>Go to Shop</Text>
            </TouchableOpacity>
          </View>
        )}
        {cartProducts.length > 0 && (
          <View style={styles.summaryContainer}>
            <Text style={styles.totalLabel}>Grand Total: ₹ {calculateTotalPrice()}</Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Color.Page_Background_Color,
    fontFamily: "'Arial', sans-serif",
    maxWidth: width, // Set the maxWidth to screen width
    height: height, // Set the height to screen height
    overflow: "auto",
  },
  noDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  noDataText: {
    fontSize: Font.LableFontSize,
    color: "red",
    marginBottom: 20,
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


  summaryContainer: {
    // borderWidth: 1,
    textAlign: "center",
    marginVertical: 20,
  },
  totalLabel: {
    fontSize: Font.LableFontSize,
    fontWeight: Bold.LableFontWeight,
    color: Color.Lable_Font_Color,
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: Color.Submit_Button_Background_Color,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: Color.Button_Text_Color,
    fontSize: 18,
  },
  shopButton: {
    backgroundColor: Color.Button_Background_Color,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  shopButtonText: {
    color: Color.Button_Text_Color,
    fontSize: 18,
  },
});

export default CartPage;
