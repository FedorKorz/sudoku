import { combineReducers } from "redux";

import reducer_sudoku_field from "./reducer_sudoku_field";
import reducer_show_popup from "./reducer_show_popup";

const rootReducer = combineReducers({
  state: reducer_sudoku_field,
  statePopup: reducer_show_popup
});

export default rootReducer;
