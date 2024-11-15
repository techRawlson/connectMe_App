import { DrawerLayoutAndroid, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import GetFullDate from './GetFullDate';
import LocalTimeComponent from './LocalTimeComponent';
import Font from '../../constant/Font';
import Bold from '../../constant/Bold';
import Color from '../../constant/Color';
import GetDate from './GetDate';

const TicketRenderItem = ({ openModalHandler, funParameter, date, lableData, }) => {
  let newDate = GetDate(date).getDate();
  let newMonth = GetDate(date).getMonth();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <Pressable onPress={() => openModalHandler(funParameter)} style={styles.pressableCompont}>
      <View style={styles.dateMonthViewContainer}>
        <View style={styles.textView}>
          <Text style={[styles.textItem, { color: "white" }]}>{newDate}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={[styles.textItem, { color: "white" }]}>{months[newMonth]}</Text>
        </View>
      </View>
      <View style={styles.timeSubTechContainer}>
        {
          lableData.map((item, index) => (
            <View key={index} style={styles.textView}>
              <Text style={styles.lableText}>{item.lable}</Text>
              <Text style={[styles.textItem, styles.headingTextItem]}>: {item?.data}</Text>
            </View>
          ))
        }
      </View>
    </Pressable >
  )
}

export default memo(TicketRenderItem)

const styles = StyleSheet.create({
  pressableCompont: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    overflow: "hidden"
  },
  dateMonthViewContainer: {
    // flex: 1,
    width: 60,
    backgroundColor: "#343497",
    alignItems: "center",
    justifyContent: "center",
  },
  timeSubTechContainer: {
    flex: 5,
    justifyContent: "center",
    paddingLeft: 10
  },
  textView: {
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
})