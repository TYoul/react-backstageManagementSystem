import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import loginReducer from "./login/reducer";
import categoryReducer from "./category/reducer";
import productReducer from "./product/reducer";
import roleReducer from "./role/reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  category: categoryReducer,
  product: productReducer,
  role: roleReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;

export default store;
