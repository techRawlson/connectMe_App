import { combineReducers } from "redux"
import { CartItemCount, HomeworkData, UserDetails } from "./reducer"

export default combineReducers({
    UserDetails,
    HomeworkData,
    CartItemCount
})