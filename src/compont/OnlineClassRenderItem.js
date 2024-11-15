import { Alert, FlatList, Pressable, StyleSheet, PermissionsAndroid, Text, View, Linking } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Color from '../../constant/Color';
import Buttons from './Buttons';
import LocalTimeComponent from './LocalTimeComponent';
import Font from '../../constant/Font';
import GetFullDate from './GetFullDate';
import RNFetchBlob from 'rn-fetch-blob';

// attachmentData
// attachmentFileName
// attachmentFileType


const OnlineClassRenderItem = ({ data }) => {
    const UserDetails = useSelector((item) => item.UserDetails);
    const [openDropdown, setOpenDropdown] = useState(null);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const handlePress = (id) => {
        setOpenDropdown(openDropdown === id ? null : id); // Toggle the dropdown
    };


    useEffect(() => {
        let name = "istockphoto-589544922-1024x1024.pdf"
        console.log(name.includes(".pdf") ? "pdf" : "jpg")
    }, [])

    const joinMetting = (meetingUrl) => {
        // Open Google Meet meeting using the provided URL
        if (meetingUrl) {
            // Linking.openURL(meetingUrl)
            Linking.openURL(meetingUrl)
                .catch(() => {
                    Alert.alert("Error", "Failed to open meeting URL");
                });
        } else {
            Alert.alert("Error", "No meeting URL provided");
        }
    };

    const downloadPDF = async (base64, name) => {
        console.log("Base64::", base64);
        console.log("name::", name);

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

                            Alert.alert('Success', (name.includes(".pdf") ? "PDF" : "JPG/PNG") + ' downloaded successfully!');
                            console.log('File path: ', filePath);
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

    // const downloadPDF = async (link, name, type) => {
    //     // console.log("Link",link);
    //     console.log("name", name);
    //     console.log("Type", type);

    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //             {
    //                 title: 'Storage Permission Needed',
    //                 message:
    //                     'App needs access to your storage to download files',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             },
    //         );


    //         console.log(granted);
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             let dirs = RNFetchBlob.fs.dirs;
    //             let pdfUrl = link.toString();

    //             RNFetchBlob
    //                 .config({
    //                     fileCache: true,
    //                     appendExt: type, // file extension
    //                     path: `${dirs.DownloadDir}/${name}`, // download location
    //                 })
    //                 .fetch('GET', pdfUrl)
    //                 .then((res) => {
    //                     Alert.alert('Success', 'PDF downloaded successfully!');
    //                     console.log('File path: ', res.path());
    //                 })
    //                 .catch((error) => {
    //                     Alert.alert('Error', 'Download failed');
    //                     console.error(error);
    //                 });
    //         } else {
    //             Alert.alert('Permission Denied', 'Storage permission not granted');
    //         }
    //     } catch (error) {
    //         console.log(error);

    //     }
    // };

    const RenderItem = (item, index) => {
        // console.log(item);

        return (
            <View key={index} style={styles.renderItemRootContainer}>
                <View style={styles.childViewContainer}>
                    <Pressable onPress={() => handlePress(index)} style={styles.pressableCompont}>
                        <View style={styles.dateMonthViewContainer}>
                            <View style={styles.textView}>
                                <Text style={[styles.textItem, { color: "white" }]}>{item.startDateTime.toString().slice(8, 10)}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={[styles.textItem, { color: "white" }]}>{month[parseInt(item.startDateTime.toString().slice(5, 7)) - 1]}</Text>
                            </View>
                        </View>
                        <View style={styles.timeSubTechContainer}>
                            <View style={styles.textView}>
                                <Text style={styles.textItem}>{LocalTimeComponent(item.startDateTime)} - {LocalTimeComponent(item.endDateTime)}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.textItem}>{item.subjectList} || {item.teacherName}</Text>
                            </View>
                        </View>
                    </Pressable >
                    <View style={[styles.buttonView, { marginRight: 7 }]}>
                        {/* <Pressable style={styles.joinButton} onPress={() => joinMetting(item.googleGeneratedLink)}>
                            <Text>Join</Text>
                        </Pressable> */}
                        <Buttons title={"Join"} fontSize={Font.ButtonFontSize} onClick={() => joinMetting(item.googleGeneratedLink)} />
                    </View>
                </View>
                {openDropdown === index && (
                    <View style={styles.dropdownView}>
                        <Text style={styles.textItem}>{item.content}</Text>

                        {/* <Buttons title={"Attach"} fontSize={Font.ButtonFontSize} onClick={() => downloadPDF(item.attachmentData, item.attachmentFileName, item.attachmentFileType)} /> */}
                        {/* <Buttons title={"Attach"} fontSize={Font.ButtonFontSize} onClick={() => downloadPDF("https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf", "File.pdf", "pdf")} /> */}
                        {/* <Buttons title={"Attach"} fontSize={Font.ButtonFontSize} onClick={() => downloadPDF("https://imgs.search.brave.com/FkxCU-t2zhiKKJ7WO6jNtLS16jbF_OnkKPZqKzhrjG8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/cG5naW1nLmNvbS9z/dGF0aWMvaW1nL3lv/dXR1YmUucG5n", "Files.png", "image/png")} /> */}
                        {/* <Buttons title={"Attach"} fontSize={Font.ButtonFontSize} onClick={() => downloadPDF("https://imgs.search.brave.com/6We7rS6Gw2a2a8zRT3F8dHlQXfPosEI-LaywQwFSH3g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d2lraWhvdy5jb20v/aW1hZ2VzL3RodW1i/LzYvNjAvU2hhdmUt/WW91ci1IZWFkLVN0/ZXAtMjItVmVyc2lv/bi0yLmpwZWcvLWNy/b3AtMTI3LTE0MC0x/MjdweC1TaGF2ZS1Z/b3VyLUhlYWQtU3Rl/cC0yMi1WZXJzaW9u/LTIuanBlZw", "Files.jpeg", "image/jpeg")} /> */}
                        {
                            item.attachmentData && item.attachmentFileName ?
                                <View style={styles.attactButtonView}>
                                    <Buttons title={"Attach"} fontSize={Font.ButtonFontSize} onClick={() => downloadPDF(item.attachmentData, item.attachmentFileName)} />
                                </View> :
                                ""
                        }
                    </View>
                )}
            </View>
        );
    };

    return (
        <FlatList
            data={data}
            renderItem={({ item, index }) => RenderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default memo(OnlineClassRenderItem);

const styles = StyleSheet.create({
    renderItemRootContainer: {
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: "hidden"

    },
    childViewContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden"
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
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
    },
    textItem: {
        paddingVertical: 2,
        textAlign: "center",
        color: Color.Table_Row_Text_Color,
        fontSize: Font.SimpalFontSize,
    },
    dropdownView: {
        padding: 10,
        backgroundColor: "#f0f0f0",
    },
    attactButtonView: {
        width: "40%",
        marginHorizontal: "auto"
    }
})