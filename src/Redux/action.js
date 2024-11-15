import { COUNTER, HOMEWORK_DATA, USER_DETAILS } from "./constants"

export const setUserDetails = (item) => {
    return {
        type: USER_DETAILS,
        data: item
    }
}
export const counterIncrement = (num) => {
    return {
        type: COUNTER,
        data: num
    }
}
export const setHomeworkData = (item) => {
    return {
        type: HOMEWORK_DATA,
        data: item
    }
} 