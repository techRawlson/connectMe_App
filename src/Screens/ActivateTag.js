import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Color from '../constant/Color'



const ActivateTag = () => {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.firstChildContainer}>
                <View style={styles.viewContainer}>
                    <View style={styles.textView}>
                        <Text style={[styles.headingText, { fontFamily: 'HostGrotesk-Bold' }]}>You are about to activate the Tags</Text>
                    </View>
                </View>
                <View style={styles.viewContainer}>
                    <View style={styles.textView}>
                        <Text style={styles.paragrafeText}> <MaterialIcons name='error-outline'/> Please Make sure to activate all your tags, All of them are unique.</Text>
                    </View>
                </View>
                <View style={styles.viewContainer}>
                    <View style={styles.buttonView}>
                        <TouchableOpacity>
                            <View style={styles.buttonTextView}>
                                <Text style={styles.buttonText}> <AntDesign name='check' size={20} /> Activate Tag</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.viewContainer, { marginTop: 40 }]}>
                    <View style={styles.spacialTextView}>
                        <Text style={styles.spacialText}>If you need any help please click here <Text style={styles.linkText}>WhatsApp Live Support</Text></Text>
                    </View>
                </View>
            </View>

            <View style={styles.secendChildContainer}>
                <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
                    <View style={styles.decTextView}>
                        <Text style={styles.decText}>Demo App is being Re-branded as Sannpark.nnee all services and tags will remain active as usual always. Its just ro-branding the narne. Company name rennains NGF.Ot•4E</Text>
                    </View>
                </View>
                <View style={styles.bottomButtonViewContainer}>
                    <View style={styles.bottomButtonView}>
                        <View>
                            <Ionicons name='arrow-back' size={22} />
                        </View>
                        <Text>Back</Text>
                    </View>
                    <View style={styles.bottomButtonView}>
                        <View>
                            <Ionicons name='camera' size={22} />
                        </View>
                        <Text>Scan</Text>
                    </View>
                    <View style={styles.bottomButtonView}>
                        <View>
                            <AntDesign name='question' size={22} />
                        </View>
                        <Text>Help</Text>
                    </View>
                    <View style={styles.bottomButtonView}>
                        <View>
                            <Foundation name='indent-more' size={22} />
                        </View>
                        <Text>More</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ActivateTag

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 15,
        backgroundColor: "white"
    },
    firstChildContainer: {
        // borderWidth: 1,
        paddingBottom: 20,
        borderBottomWidth: 0.5
    },
    viewContainer: {
        marginVertical: 7
    },
    textView: {
        alignItems: "center",
        paddingHorizontal: 10,
    },
    headingText: {
        fontSize: 23,
        textAlign: "center",
        fontWeight: "500"
    },
    paragrafeText: {
        fontSize: 17,
        textAlign: "center",
        fontWeight: "500"
    },
    buttonTextView: {
        // borderWidth: 1,
        borderRadius: 7,
        paddingVertical: 6,
        backgroundColor: Color.Button_BackGroung_Color,
        elevation: 5
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        color: Color.Button_Text_Color
    },
    spacialTextView: {
        alignItems: "center"
    },
    spacialText: {
        width: 230,
        fontSize: 16,
        textAlign: "center",
        color: "#535151"
    },
    linkText: {
        fontWeight: "500",
        color: "black"
    },
    decTextView: {
        paddingHorizontal: 20
    },
    decText: {
        textAlign: "center",
        color: "#a3a1a1",
    },
    secendChildContainer: {
        flex: 1,
        justifyContent: "space-between",
        // alignItems: "center"
    },
    bottomButtonViewContainer: {
        flexDirection: "row",
        justifyContent: "center",
        // alignItems: "flex-end",
        borderWidth: 1,
        height: 50,
    },
    bottomButtonView: {
        flex: 1,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    }

})