import React from 'react'
import DatePicker from 'react-native-date-picker'
const DatePickerModal = ({ open, setOpen, date, setDate }) => {
    return (
        <DatePicker
            mode='date'
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
                setOpen(false)
                setDate(date)
            }}
            onCancel={() => {
                setOpen(false)
            }}
        />
    )
}

export default DatePickerModal