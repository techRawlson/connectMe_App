import { COUNTER, HOMEWORK_DATA, USER_DETAILS } from "./constants";

const INITIALSTATE = {}

export const UserDetails = (state = INITIALSTATE, action) => {
    switch (action.type) {
        case USER_DETAILS:
            return action.data;
        default:
            return state
    }
}

const COUNTERINITIALSTATE = 0
export const Counter = (state = COUNTERINITIALSTATE, action) => {
    switch (action.type) {
        case COUNTER:
            return action.data+state+1;
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