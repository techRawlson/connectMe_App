import { HOMEWORK_DATA, SET_CART_ITEM_COUNT, USER_DETAILS } from "./constants"

export const setUserDetails = (item) => {
    return {
        type: USER_DETAILS,
        data: item
    }
}
export const setHomeworkData = (item) => {
    return {
        type: HOMEWORK_DATA,
        data: item
    }
}

export const setCartItemCount = (count) => {
    return {
        type: SET_CART_ITEM_COUNT,
        data: count,
    }
};