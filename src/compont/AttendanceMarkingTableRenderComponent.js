// export default AttendanceMarkingTableRenderComponent
import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Color from '../../constant/Color';

const AttendanceMarkingTableRenderComponent = ({ headers, data, width }) => {
    // console.log("Headers: ", headers);
    // console.log("Data: ", data);
    // console.log("Width: ", width);

    const RenderHeader = () => {
        return (
            <View style={styles.headerRow}>
                {headers.map((header, index) => (
                    <View key={index} style={[styles.headerCell, isNaN(width[index]) ? width[index] : { width: width[index] }]}>
                        <Text style={styles.headerText}>{header}</Text>
                    </View>
                ))}
            </View>
        )
    };

    const renderRow = (item, index) => {
        return (
            <View key={index} style={[styles.row, index % 2 ? styles.row1Color : styles.row2Color]}>
                {item.map((cell, index) => {
                    return (
                        <View key={index} style={[styles.cell, isNaN(width[index]) ? width[index] : { width: width[index] }]}>{cell}</View>
                    )
                })}
            </View>
        )
    }

    return (
        <SafeAreaView style={{}}>
            {RenderHeader()}
            {/* <RenderHeader /> */}
            <ScrollView>
                {
                    data.length ?
                        data.map((item, index) => renderRow(item, index)) :
                        <View style={[styles.row, styles.row2Color]}>
                            {
                                headers.map((item, index) => {
                                    return (
                                        <View key={index} style={[styles.cell, isNaN(width[index]) ? width[index] : { width: width[index] }]}>
                                            <Text>Null</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    table: {
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: Color.Table_Head_BG_Color,
        borderColor: Color.Table_Border_Color
    },
    headerCell: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: Color.Table_Border_Color,
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        fontWeight: 'bold',
        color: Color.Table_Head_Text_Color,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        borderColor: Color.Table_Border_Color,
    },
    cell: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderWidth: 0.5,
        borderColor: Color.Table_Border_Color,
        overflow: "visible"
    },
    cellText: {
        color: '#333',
        textAlign: "center"
    },
    row1Color: {
        backgroundColor: Color.Table_Row_BG_Color1
    },
    row2Color: {
        backgroundColor: Color.Table_Row_BG_Color2,
    }
});

export default AttendanceMarkingTableRenderComponent;
