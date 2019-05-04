export function createNewBoard(input, boardColor) {
  return {
    type: 'CREATE_NEW_BOARD',
    input,
    boardColor
  }
}
