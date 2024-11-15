/*
import { NativeModules, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import Color from '../../constant/Color'
import Buttons from './Buttons';
import { useSelector } from 'react-redux';
import Font from '../../constant/Font';
import GetFullDate from './GetFullDate';
import LocalTimeComponent from './LocalTimeComponent';


const SmsReturnCompont = ({ data, deleteItem, recepients }) => {

    const UserDetails = useSelector((item) => item.UserDetails)


    const [openDropdown, setOpenDropdown] = useState(null);


    const renderItem = (item, index) => {

        const handlePress = (id) => {
            setOpenDropdown(openDropdown === id ? null : id); // Toggle the dropdown
        };

        const messageStatus = (messageStatus, staffId) => {
            if (messageStatus) {
                return messageStatus;
            } else if (UserDetails.userId == staffId) {
                return "Outgoing";
            } else {
                return "Incoming";
            }
        }

        const date = (timestamp, date) => {
            if (timestamp) {
                return GetFullDate(timestamp)
            } else {
                // let date = ${item.date.split('-')[2]}/${item.date.split('-')[1]}/${item.date.split('-')[0]}
                let _date = date.split('-')[2]
                let _month = date.split('-')[1]
                let _year = date.split('-')[0]
                return `${_date}/${_month}/${_year}`
            }
        }

        return (
            <View key={index} style={[styles.renderItemRootContainer, { marginVertical: 10, marginHorizontal: 10 }]}>
                <Pressable
                    onPress={() => handlePress(index)}
                    style={styles.renderItemRootContainer}
                >
                    <View style={styles.textViewContainer}>
                        <View style={styles.textView}>
                            <Text style={styles.textItem}>{date(item.timestamp, item.date)}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.textItem}>{item.timestamp ? LocalTimeComponent(item.timestamp) : "05:30 am"}</Text>
                        </View>
                    </View>
                    <View style={styles.textViewContainer}>
                        <View style={styles.textView}>
                            <Text style={styles.textItem}>{messageStatus(item.messageStatus, item.staffId)}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.textItem}>{item.senderName}</Text>
                        </View>
                    </View>
                    <View style={[styles.textView, { flexDirection: "row", flex: 1 }]}>
                        <Text style={styles.textItem}>{item.subject}</Text>
                    </View>
                </Pressable >
                {openDropdown === index && (
                    <View style={[styles.textView, { marginBottom: 10 }]}>
                        <View style={[styles.textView]}>
                            <Text style={[styles.textItem]}>{item?.content ? item?.content : item?.message}</Text>
                        </View>

                        {((UserDetails.role.toLowerCase() == "admin" || UserDetails.role.toLowerCase() == "staff" || UserDetails.role.toLowerCase() == "superadmin") && item.messageStatus == "Outgoing") && <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                            <View style={{ flex: 1, marginHorizontal: 10 }}>
                                <Buttons title={"Recepients"} onClick={() => recepients([...item.studentIds])} />
                            </View>
                            <View style={{ flex: 1, marginHorizontal: 10 }}>
                                <Buttons title={"Delete"} onClick={() => deleteItem(item.id)} />
                            </View>
                        </View>
                        }
                    </View>
                )}
            </View >
        )
    }

    return (
        <ScrollView style={{ flex: 1, }}>
            {data.length > 0 ?
                data.map((item, index) => renderItem(item, index)) :
                <View
                    style={[styles.renderItemRootContainer, { marginVertical: 10, marginHorizontal: 10 }]}
                >
                    <View
                        style={styles.renderItemRootContainer}
                    >
                        <View style={styles.textViewContainer}>
                            <View style={styles.textView}>
                                <Text style={styles.textItem}>Null</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.textItem}>Null</Text>
                            </View>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.textItem}>Null</Text>
                        </View>
                    </View>
                </View>
            }
        </ScrollView >
    )
}

export default memo(SmsReturnCompont)

const styles = StyleSheet.create({
    renderItemRootContainer: {
        backgroundColor: Color.Page_Background_Color,
        elevation: 5,
        borderRadius: 15
    },
    textViewContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    textView: {
        // borderWidth: 1,
        borderColor: "blue",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        flex: 1,
    },
    textItem: {
        // paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: "center",
        color: Color.Table_Row_Text_Color,
        fontSize: Font.SimpalFontSize
        // borderWidth: 0.3
    },
    textHeader: {
        marginRight: 5,
        fontWeight: "700"
    }
})
// */













// /*
import { Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import Color from '../../constant/Color';
import Buttons from './Buttons';
import { useSelector } from 'react-redux';
import Font from '../../constant/Font';
import GetFullDate from './GetFullDate';
import LocalTimeComponent from './LocalTimeComponent';

const SmsReturnComponent = ({ data, deleteItem, recepients }) => {

    const UserDetails = useSelector((state) => state.UserDetails);
    const [openDropdown, setOpenDropdown] = useState(null);

    const handlePress = useCallback((id) => {
        setOpenDropdown((prevOpenDropdown) => (prevOpenDropdown === id ? null : id));
    }, []);

    const canShowActions = useMemo(() => {
        const role = UserDetails.role.toLowerCase();
        return role === 'admin' || role === 'staff' || role === 'superadmin';
    }, [UserDetails.role]);

    const messageStatus = (messageStatus, staffId) => {
        if (messageStatus) {
            return messageStatus;
        } else if (UserDetails.userId == staffId) {
            return "Outgoing";
        } else {
            return "Incoming";
        }
    }

    const date = (timestamp, date) => {
        if (timestamp) {
            return GetFullDate(timestamp)
        } else {
            // let date = ${item.date.split('-')[2]}/${item.date.split('-')[1]}/${item.date.split('-')[0]}
            let _date = date.split('-')[2]
            let _month = date.split('-')[1]
            let _year = date.split('-')[0]
            return `${_date}/${_month}/${_year}`
        }
    }

    const renderItem = useCallback((item, index) => {

        return (
            <View key={index} style={styles.cardContainer}>
                <Pressable onPress={() => handlePress(index)} style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.dateText}>{date(item.timestamp, item.date)}</Text>
                        <Text style={styles.timeText}>{item.timestamp ? LocalTimeComponent(item.timestamp) : "05:30 am"}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.statusText}>{messageStatus(item.messageStatus, item.staffId)}</Text>
                        <Text style={styles.senderText}>{item.senderName}</Text>
                    </View>
                    <Text style={styles.subjectText}>{item.subject}</Text>
                </Pressable>
                {openDropdown === index && (
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.contentText}>{item?.content ? item?.content : item?.message}</Text>
                        {canShowActions && item.messageStatus === 'Outgoing' && (

                            <View style={styles.actionsContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => recepients(item.studentIds)}>
                                    <Text style={styles.buttonText}>Recipients</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => deleteItem(item.id)}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            </View>
        );
    }, [handlePress, openDropdown, canShowActions]);

    return (
        <ScrollView style={styles.scrollView}>
            {data.length > 0 ? (
                data.map(renderItem)
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No Data Available</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default memo(SmsReturnComponent);



const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#eaf2f3", // Soft light background for better contrast
    },
    cardContainer: {
        backgroundColor: "#d1f0d1",  // Lighter green background for the card
        borderRadius: 12,
        elevation: 6,
        marginVertical: 8,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    card: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    dateText: {
        fontSize: 15,
        color: "#2b702b",  // Darker green for date
        fontWeight: 'bold',
    },
    timeText: {
        fontSize: 15,
        color: "#2b702b",
        fontWeight: 'bold',
    },
    statusText: {
        fontSize: 15,
        color: "#444", // Darker color for status
        fontWeight: '500',
    },
    senderText: {
        fontSize: 15,
        color: "#444", // Darker color for sender
        fontWeight: '500',
    },
    subjectText: {
        fontSize: 17,
        color: "#333",  // Darker color for subject
        fontWeight: 'bold',
        marginVertical: 8,
    },
    dropdownContainer: {
        backgroundColor: "#fff",  // White background for dropdown
        padding: 12,
        borderRadius: 10,
        marginTop: 8,
    },
    contentText: {
        fontSize: 15,
        color: "#555",  // Slightly darker for content
        marginBottom: 8,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        backgroundColor: "#4caf50",  // Brighter green button
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",  // White text for contrast
        fontWeight: "bold",
        textAlign: 'center',
    },
    noDataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    noDataText: {
        fontSize: 18,
        color: "#666",
        fontWeight: 'bold',
    },
});
// */