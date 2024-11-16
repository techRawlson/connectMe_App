import React, { memo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Color from '../../constant/Color';

const TableComponent = ({ headers, data, width }) => {
  console.log(":>>>> Table Componts Start");
  
  console.log("Headers: ",headers);
  console.log("Data: ", data);
  console.log("Width: ",width);
  
  console.log("Table Componts End <<<<:");

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerRow}>
        {headers.map((header, index) => (
          <View key={index} style={[styles.headerCell, { width: width[index] }]}>
            <Text style={styles.headerText}>{header}</Text>
          </View>
        ))}
      </View>
    )
  });

  const renderRow = useCallback((item, indexs) => {
    return (
      <View key={indexs} style={[styles.row, indexs % 2 ? styles.row1Color : styles.row2Color]}>
        {item.map((cell, index) => {

          if (index == 0) {
            return (
              <View key={index} style={[styles.cell, { width: width[index] }]}>
                <Text style={[{ color: Color.Table_Row_Text_Color, textAlign: "center" }]}>{indexs + 1}</Text>
              </View>
            )
          } else {
            return (
              <View key={index} style={[styles.cell, { width: width[index] }]}>{cell}</View>
            )
          }
        })
        }
      </View>
    )
  })

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <ScrollView horizontal style={[styles.container]}>
        <SafeAreaView>
          {renderHeader()}
          <ScrollView>
            {
              data.length ? data.map((item, index) => renderRow(item, index)) : null
            }
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  table: {
    // flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: Color.Table_Head_BG_Color,
    borderWidth: 1,
    borderColor: Color.Table_Border_Color
  },
  headerCell: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: Color.Table_Border_Color,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontWeight: 'bold',
    color: Color.Table_Head_Text_Color,
  },
  row: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Color.Table_Border_Color,
  },
  cell: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    justifyContent: "center",
    borderRightColor: Color.Table_Border_Color,
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

export default memo(TableComponent);