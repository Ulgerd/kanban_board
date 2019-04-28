export function toggleNewBoardMenu() {
  return {
    type: 'TOGGLE_MENU',
  }
}

export function inputChange(input) {
  return {
    type: 'INPUT_CHANGE',
    payload: input,
  }
}

export function createNewBoard() {
  return {
    type: 'CREATE_NEW_BOARD',
  }
}
