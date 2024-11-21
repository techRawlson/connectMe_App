// import React, { useEffect, useState } from "react";
// import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
// import { useSelector } from "react-redux";
// import { useNavigation } from "@react-navigation/native";

// const CartPage = () => {
//   const loginMobileNumber = useSelector((state) => state?.login?.loginMobileNumber);
//   const navigation = useNavigation();
//   const [cartProducts, setCartProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchCartDetails = async () => {
//     try {
//       const response = await fetch(`http://192.168.1.111:8082/api/cart/user/${loginMobileNumber}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch cart details");
//       }
//       const data = await response.json();
//       setCartProducts(data); // Assuming the response contains a field cartItems
//       setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCartDetails(); // Fetch the cart details when the component mounts
//   }, []);

//   const calculateTotalPrice = () => {
//     return cartProducts?.reduce(
//       (total, product) =>
//         total + (product.quantity && product.price ? product.quantity * product.price : 0),
//       0
//     );
//   };

//   const handleIncreaseQuantity = (id) => {
//     const updatedCart = [...cartProducts];
//     updatedCart.forEach((product) => {
//       if (product.id === id) {
//         product.quantity++;
//       }
//     });
//     setCartProducts(updatedCart);
//   };

//   const handleDecreaseQuantity = (id) => {
//     const updatedCart = [...cartProducts];
//     updatedCart.forEach((product) => {
//       if (product.id === id && product.quantity > 1) {
//         product.quantity--;
//       }
//     });
//     setCartProducts(updatedCart);
//   };

//   const handleRemoveProduct = (id) => {
//     const updatedCart = cartProducts.filter((product) => product.id !== id);
//     setCartProducts(updatedCart);
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.heading}>Loading Cart...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.heading}>Error: {error}</Text>
//       </View>
//     );
//   }

//   if (cartProducts?.length === 0) {
//     setTimeout(() => navigation.navigate("Shop"), 2000);
//     return (
//       <View style={styles.container}>
//         <Text style={styles.heading}>Your Cart is Empty</Text>
//         <TouchableOpacity
//           style={styles.shopButton}
//           onPress={() => navigation.navigate("Shop")}
//         >
//           <Text style={styles.shopButtonText}>Go to Shop</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.heading}>Your Cart</Text> */}
//       <FlatList
//         data={cartProducts}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.cartCard}>
//             <Image
//               style={styles.image}
//               source={{ uri: item.productImage ? `${item.fileType};base64,${item.productImage}` : "fallback-image.jpg", }}
//             />
//             <View style={styles.content}>
//               <Text style={styles.productName}>{item.productTitle}</Text>
//               <Text style={styles.productPrice}>₹ {item.price}</Text>
//               <Text style={styles.productDescription}>{item.productDescription}</Text>
//               <Text style={styles.quantityAvailable}>Available: {item.quantityAvailable}</Text>
//               <View style={styles.quantityContainer}>
//                 <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)} style={styles.quantityButton}>
//                   <Text style={styles.quantityButtonText}>-</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.quantityValue}>{item.quantity}</Text>
//                 <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)} style={styles.quantityButton}>
//                   <Text style={styles.quantityButtonText}>+</Text>
//                 </TouchableOpacity>
//               </View>
//               <Text style={styles.totalPrice}>Total: ₹ {item.quantity * item.price}</Text>
//               <TouchableOpacity onPress={() => handleRemoveProduct(item.id)} style={styles.removeButton}>
//                 <Text style={styles.removeButtonText}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//       <View style={styles.summaryContainer}>
//         <Text style={styles.totalLabel}>Grand Total: ₹ {calculateTotalPrice()}</Text>
//         <TouchableOpacity
//           style={styles.checkoutButton}
//           onPress={() => navigation.navigate("Checkout", { products: cartProducts })}
//         >
//           <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#f8f9fa",
//     fontFamily: "'Arial', sans-serif",
//     maxWidth: 550,
//     marginHorizontal: "auto",
//     height: "80%",
//     overflow: "auto",
//     color: "black",
//   },
//   heading: {
//     fontSize: 24,
//     textAlign: "center",
//     marginBottom: 20,
//     color: "#333",
//   },
//   cartCard: {
//     flexDirection: "row",
//     padding: 15,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     marginRight: 15,
//     resizeMode: "cover",
//   },
//   content: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 5,
//   },
//   productPrice: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 5,
//   },
//   productDescription: {
//     fontSize: 14,
//     color: "#777",
//     marginBottom: 10,
//   },
//   quantityAvailable: {
//     fontSize: 14,
//     color: "#777",
//     marginBottom: 10,
//   },
//   quantityContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//     gap: 10,
//   },
//   quantityButton: {
//     padding: 5,
//     backgroundColor: "#ddd",
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   quantityButtonText: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   quantityValue: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   totalPrice: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   removeButton: {
//     backgroundColor: "#dc3545",
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 6,
//     marginTop: 10,
//   },
//   removeButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   summaryContainer: {
//     textAlign: "center",
//     marginVertical: 20,
//   },
//   totalLabel: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 15,
//   },
//   checkoutButton: {
//     backgroundColor: "#28a745",
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 6,
//   },
//   checkoutButtonText: {
//     color: "#fff",
//     fontSize: 18,
//   },
//   shopButton: {
//     backgroundColor: "#007bff",
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 6,
//   },
//   shopButtonText: {
//     color: "#fff",
//     fontSize: 18,
//   },
// });

// export default CartPage;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CartPage = () => {
  return (
    <View>
      <Text>CartPage</Text>
    </View>
  )
}

export default CartPage

const styles = StyleSheet.create({})