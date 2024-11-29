import { HOMEWORK_DATA, SET_CART_ITEM_COUNT, USER_DETAILS } from "./constants";

const INITIALSTATE = {}

export const UserDetails = (state = INITIALSTATE, action) => {
    switch (action.type) {
        case USER_DETAILS:
            return action.data;
        default:
            return state
    }
}

const SETCARTITEMCOUNT = 0
export const CartItemCount = (state = SETCARTITEMCOUNT, action) => {
    switch (action.type) {
        case SET_CART_ITEM_COUNT:
            return action.data;
        default:
            return state
    }
}

const HOMEWORK = {}

export const HomeworkData = (state = HOMEWORK, action) => {
    switch (action.type) {
        case HOMEWORK_DATA:
            return action.data;
        default:
            return state
    }
}