import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Color from '../../constant/Color';

const DirectoryTableComponent = ({ headers, data, width }) => {
    // console.log("Headers: ", headers);
    // console.log("Data: ", data);
    // console.log("Width: ", width);

    const renderHeader = () => {
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

    const renderRow = (item, indexs) => {
        return (
            <View key={indexs} style={[styles.row, indexs % 2 ? styles.row1Color : styles.row2Color]}>
                {item.map((cell, index) => {
                    if (index == 0) {
                        return (
                            <View key={index} style={[styles.cell, isNaN(width[index]) ? width[index] : { width: width[index] }]}>
                                <Text style={[{ color: Color.Table_Row_Text_Color, textAlign: "center" }]}>{indexs + 1}</Text>
                            </View>
                        )
                    } else {
                        return (
                            <View key={index} style={[styles.cell, isNaN(width[index]) ? width[index] : { width: width[index] }]}>{cell}</View>
                        )
                    }
                })
                }

            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {renderHeader()}
            <ScrollView>
                {
                    data.length ? data.map((item, index) => renderRow(item, index)) : null
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
        borderWidth:0.5,
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
        paddingHorizontal:10,
        paddingVertical:3,
        borderWidth:0.5,
        borderColor:Color.Table_Border_Color,
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

export default DirectoryTableComponent;
