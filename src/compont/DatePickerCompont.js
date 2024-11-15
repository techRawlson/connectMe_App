import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DatePicker from "react-native-modern-datepicker"


const DatePickerCompont = ({ startedDate, dateChangeHandler }) => {
    try {

        return (
            <DatePicker
                mode="calender"
                selected={startedDate}
                onSelectedChange={dateChangeHandler}
            />
        )
    } catch (error) {
        console.log(error);
    }
}

export default DatePickerCompont

const styles = StyleSheet.create({})