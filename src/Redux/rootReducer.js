import { combineReducers } from "redux"
import { Counter, HomeworkData, UserDetails } from "./reducer"

export default combineReducers({
    UserDetails,
    Counter,
    HomeworkData
})