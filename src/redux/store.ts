import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import loginReducer from "./login/reducer";
import categoryReducer from "./category/reducer";
import productReducer from "./product/reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  category: categoryReducer,
  product: productReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;

export default store;
