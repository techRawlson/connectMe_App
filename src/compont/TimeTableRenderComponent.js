import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../../constant/Color'
import { useSelector } from 'react-redux'

const TimeTableRenderComponent = ({ data, index }) => {
    const UserDetails = useSelector((item) => item.UserDetails)


    const RenderItem = (item, index) => {
        return (
            <View key={index} style={styles.renderItemRootContainer}>
                <View style={[styles.row1]}>
                    <View style={styles.textView}>
                        <Text style={styles.text}>{item.lectureNumber ? item.lectureNumber : "N/A"}</Text>
                    </View>
                </View>
                <View style={[styles.row2]}>
                    <View style={styles.textView}>
                        <Text style={styles.text}>{item.startTime ? item.startTime.slice(0, 5) : "N/A"}</Text>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.text}>{item.endTime ? item.endTime.slice(0, 5) : "N/A"}</Text>
                    </View>
                </View>
                <View style={[styles.row3]}>
                    <View style={styles.textView}>
                        {
                            UserDetails.role.toLowerCase() == "admin" || UserDetails.role.toLowerCase() == "staff" || UserDetails.role.toLowerCase() == "superadmin" ?
                                <Text style={styles.text}>{item.teacherSubject ? item.teacherSubject : "N/A"}</Text> :
                                <Text style={styles.text}>{item.subject ? item.subject : "N/A"}</Text>
                        }
                    </View>
                    <View style={styles.textView}>
                        {
                            UserDetails.role.toLowerCase() == "admin" || UserDetails.role.toLowerCase() == "staff" || UserDetails.role.toLowerCase() == "superadmin" ?
                                <Text style={styles.text}>{item.className ? item.className : "N/A"} | {item.section ? item.section : "N/A"}</Text> :
                                <Text style={styles.text}>{item.teacherName ? item.teacherName : "N/A"}</Text>
                        }
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View key={index} style={styles.rootContainer}>
            <View style={styles.headingView}>
                <Text style={styles.headingText}>{data[0]}</Text>
            </View>
            <View style={styles.dataHeadingView}>
                <View style={[styles.row1]}>
                    <Text style={styles.dataHeadingText}>Lect. No.</Text>
                </View>
                <View style={[styles.row2]}>
                    <Text style={styles.dataHeadingText}>Time</Text>
                </View>
                <View style={[styles.row3]}>
                    <Text style={styles.dataHeadingText}>Sub & Tech</Text>
                </View>
            </View>
            {/* <FlatList
                data={data[1]}
                renderItem={item => RenderItem(item.item)}
                keyExtractor={(item, index) => index}
            /> */}
            {
                data[1].map((item, index) => (
                    RenderItem(item, index)
                ))
            }
        </View>

    )

}

export default TimeTableRenderComponent

const styles = StyleSheet.create({
    rootContainer: {
        margin: 10,
        borderWidth: 1,
        width: 300,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: "white",
        marginHorizontal: "auto"
    },
    headingView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: 10
    },
    headingText: {
        // flex: 1,
        alignItems: "center",
        textAlign: "center",
        borderBottomWidth: 0.5,
        fontSize: 19,
        color: Color.Table_Head_Text_Color,
        fontWeight: "800",
        paddingHorizontal: 10
    },
    dataHeadingView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 0.5,
    },
    dataHeadingText: {
        // borderWidth:1,
        textAlign: "center",
        color: Color.Table_Head_Text_Color,
        fontWeight: "600"
    },
    row1: {
        flex: 2.5,
    },
    row2: {
        flex: 2,
    },
    row3: {
        flex: 4
    },
    renderItemRootContainer: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        marginVertical: 2,
    },
    ViewContainer: {
        flex: 1,
        flexDirection: "row"
    },
    textView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        textAlign: "center",
        color: Color.Table_Row_Text_Color
    }
})