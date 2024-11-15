import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
// import saga from "./saga";
// import createSagaMiddleware from "redux-saga"

// const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: rootReducer
})
// sagaMiddleware.run(saga)