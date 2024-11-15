import { Alert, Pressable, StyleSheet, PermissionsAndroid, Text, View, Linking } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Color from '../../constant/Color';
import Buttons from './Buttons';
import LocalTimeComponent from './LocalTimeComponent';
import Font from '../../constant/Font';
import GetFullDate from './GetFullDate';
import RNFetchBlob from 'rn-fetch-blob';
import Bold from '../../constant/Bold';

const HomeworkRenderItem = ({ index, handlePress, openDropdown, date, months, subject, name, startTime, endTime, joinLink, message, fileData, fileName, studentIds, recepients }) => {
    const UserDetails = useSelector((item) => item.UserDetails);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const joinMetting = (meetingUrl) => {
        console.log(meetingUrl);

        // Open Google Meet meeting using the provided URL
        if (meetingUrl) {
            Linking.openURL(meetingUrl)
                .catch(() => {
                    Alert.alert("Error", "Failed to open meeting URL");
                });
        } else {
            Alert.alert("Error", "No meeting URL provided");
        }
    };

    const downloadPDF = async (base64, name) => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
                title: 'Storage Permission Needed',
                message:
                    'App needs access to your storage to download files',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                try {
                    let dirs = RNFetchBlob.fs.dirs; // Get the device's directories

                    // Use the base64 data and write it directly to a file
                    let filePath = `${dirs.DownloadDir}/RWLProject/${name}`;
                    RNFetchBlob.fs
                        .writeFile(filePath, base64, 'base64') // Write base64 data
                        .then(() => {

                            Alert.alert('Success', `${(name.includes(".pdf") ? "PDF" : "JPG/PNG")} downloaded at \n ${dirs.DocumentDir}`);
                        })
                        .catch((error) => {
                            Alert.alert('Error', 'Download failed');
                            console.error('File write error: ', error);
                        });
                } catch (error) {
                    console.log(error);
                }
            } else {
                Alert.alert('Permission Denied', 'Storage permission not granted');
            }
        } catch (error) {
            console.log('Error', error);
        }
    };

    return (
        <View key={index} style={styles.renderItemRootContainer}>
            <View style={styles.childViewContainer}>
                <Pressable onPress={() => handlePress(index)} style={styles.pressableCompont}>
                    <View style={styles.dateMonthViewContainer}>
                        <View style={styles.textView}>
                            <Text style={[styles.textItem, { color: "white" }]}>{date}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text style={[styles.textItem, { color: "white" }]}>{month[months]}</Text>
                        </View>
                    </View>
                    <View style={styles.timeSubTechContainer}>
                        <View style={styles.textView}>
                            <Text style={styles.lableText}>Subject</Text>
                            <Text style={[styles.textItem, styles.headingTextItem]}>: {subject}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.lableText}>Sent By </Text>
                            <Text style={[styles.textItem, styles.headingTextItem]}>: {name}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.lableText}>Time</Text>
                            <Text style={[styles.textItem, styles.headingTextItem]}>: {startTime} {endTime ? " - " + endTime : ""}</Text>
                        </View>
                    </View>
                </Pressable >
                {
                    joinLink ?
                        <View style={[styles.buttonView, { marginRight: 7 }]}>
                            <Buttons title={"Join"} fontSize={Font.ButtonFontSize} onClick={() => joinMetting(joinLink)} />
                        </View> :
                        ""
                }
            </View>
            {openDropdown === index && (
                <View style={styles.dropdownView}>
                    <View style={styles.textView}>
                        <Text style={styles.lableText}>Message</Text>
                        <Text style={styles.textItem}>: {message}</Text>
                    </View>

                    <View style={styles.buttonViewContainer}>
                        {
                            UserDetails.role != "student" && studentIds ?
                                <View style={styles.attactButtonView}>
                                    <Buttons title={"Recipient"} fontSize={Font.ButtonFontSize} onClick={() => recepients(studentIds)} />
                                </View> :
                                ""
                        }
                        {
                            fileData && fileName ?
                                <View style={styles.attactButtonView}>
                                    <Buttons title={"Attach"} fontSize={Font.ButtonFontSize} onClick={() => downloadPDF(fileData, fileName)} />
                                </View> : ""
                        }
                    </View>
                </View>
            )}
        </View>
    );
}

export default memo(HomeworkRenderItem)

const styles = StyleSheet.create({
    renderItemRootContainer: {
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 15,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: "hidden",

    },
    childViewContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
    },
    pressableCompont: {
        flexDirection: "row",
        flex: 5,
    },
    dateMonthViewContainer: {
        flex: 1,
        backgroundColor: "#343497",
        alignItems: "center",
        justifyContent: "center",
    },
    timeSubTechContainer: {
        flex: 4,
        justifyContent: "center",
        paddingLeft: 10
    },
    buttonView: {
        flex: 1,
        justifyContent: "center",
    },
    joinButton: {
        flex: 1,
        backgroundColor: Color.Buttons_Color,
        alignItems: "center",
        justifyContent: "center",
    },
    textView: {
        // alignItems: "center",
        // justifyContent: "center",
        flexDirection: "row",
        padding: 2,
    },
    lableText: {
        color: Color.Table_Row_Text_Color,
        fontSize: Font.LableFontSize,
        fontWeight: Bold.LableFontWeight,
        width: 70
    },
    textItem: {
        color: Color.Table_Row_Text_Color,
        fontSize: Font.SimpalFontSize,
        fontWeight: Bold.SimpalFontWeight,
    },
    headingTextItem: {
        fontSize: Font.DataFontSize,
        fontWeight: Bold.DataFontWeight,
        color: Color.Table_Head_Text_Color
    },
    dropdownView: {
        padding: 10,
        backgroundColor: "#f0f0f0",
    },
    attactButtonView: {
        width: "40%",
        marginHorizontal: "auto"
    },
    buttonViewContainer: {
        flexDirection: "row",
        marginTop: 5
    }
})




// attachmentData
// attachmentFileName
// attachmentFileType

