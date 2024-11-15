import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../../constant/Color'

const HolidayTableView = ({ data }) => {
    // console.log("Hollyday Data:",data);
    
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    const renderItem = (item,index) => {
        return (
            <View key={index} style={styles.itemViewContainer}>
                <View style={[styles.itemView,{flex:4}]}>
                    <Text style={styles.itemText}>{item.holidayName}</Text>
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>{item.date}</Text>
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>{item.dayOfWeek}</Text>
                </View>
            </View>
        )
    }

    return (
        <ScrollView>
            {
                data.map((item,index) => renderItem(item,index))
            }
        </ScrollView>

    )
}

export default HolidayTableView

const styles = StyleSheet.create({
    itemViewContainer: {
        flexDirection: "row",
        width:"90%",
        marginHorizontal:"auto",
        borderRadius:10,
        paddingVertical:10,
        marginVertical:7,
        paddingHorizontal:5,
        justifyContent:"space-between",
        backgroundColor:"#ffff",
        elevation:10,
    },
    itemView:{
        flex:3,
        justifyContent:"center",
        marginHorizontal:10
    },
    itemText:{
        color:Color.Table_Row_Text_Color
    }
})