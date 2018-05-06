let x = 0;
let y = 0;

export default function(state = [], action) {
  switch(action.type) {
    case 'GENERATE_SUDOKU_ARRAY':
        return state, action.payload
        break;
    case 'MARK_ITEM':
      x = action.coord_x;
      y = action.coord_y;
      return state;
        break;
    case 'INSERT_VALUE':
      let tempState = state.slice();
      tempState[x][y] = action.payload;
      state = tempState;
      return state;
        break;
    default:
        return state;
  }
}
