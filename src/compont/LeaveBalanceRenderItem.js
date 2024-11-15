import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../../constant/Color'
import Bold from '../../constant/Bold'
import Font from '../../constant/Font'

const LeaveBalanceRenderItem = ({ header, data, width }) => {
    // console.log("LeaveBalanceRenderItem:",header,data,width);


    const headerRenderItem = () => {
        return (
            <View style={[styles.row, styles.headerView, { backgroundColor: Color.Table_Head_BG_Color }]}>
                {
                    header?.map((item, index) => (
                        <View key={index} style={[styles.cell, isNaN(width[index]) ? width[index] : { width: width[index] }]}>
                            <Text style={[styles.item, styles.headerItem]}>{item}</Text>
                        </View>
                    ))
                }
            </View>
        )
    }
    const dataRenderItem = () => {
        return (
            data.map((item, index) => (
                <View key={index} style={[styles.row, { backgroundColor: index % 2 == 0 ? Color.Table_Row_BG_Color2 : Color.Table_Row_BG_Color1 }]}>
                    {
                        item.map((item, index) => (
                            <View key={index} style={[styles.cell, isNaN(width[index]) ? width[index] : { width: width[index] }]}>
                                <Text style={[styles.item]}>{item == "" || item == null ? "N/A" : item}</Text>
                            </View>
                        ))
                    }
                </View >
            ))
        )
    }


    return (
        <View style={styles.rootContainer}>
            {headerRenderItem()}
            {dataRenderItem()}
        </View>
    )
}

export default LeaveBalanceRenderItem

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    row: {
        // borderWidth: 1,
        flexDirection: "row",
        borderColor: Color.Table_Border_Color
    },
    headerView: {
        backgroundColor: Color.Table_Head_BG_Color
    },
    cell: {
        borderWidth: 0.5,
        borderColor: Color.Table_Border_Color,
        alignItems: "center",
        justifyContent: "center"
    },
    headerItem: {
        fontWeight: Bold.HeaderFontWeight,
        fontSize: Font.HeaderFontSize,
        textAlign: "center",
    },
    item: {
        color: Color.Table_Row_Text_Color,
        fontWeight: Bold.DataFontWeight,
        paddingHorizontal: 2,
        paddingVertical: 2,
        fontSize: Font.DataFontSize,
        textAlign: "center"
    }

})