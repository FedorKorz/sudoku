export default function(stateOfPopup = false, action) {
  switch(action.type) {
    case 'SHOW_POPUP':
      stateOfPopup = true;
      return stateOfPopup;
        break;
    case 'СLOSE_POPUP':
      stateOfPopup = false;
      return stateOfPopup;
        break;
    default:
        return stateOfPopup;
  }
}
