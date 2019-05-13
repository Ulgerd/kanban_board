import { CREATE_NEW_BOARD, DELETE_BOARD } from './actionTypes';

export function createNewBoard(input, boardColor) {
  return {
    type: CREATE_NEW_BOARD,
    input,
    boardColor
  }
}

export function deleteBoard(boardID) {
  return {
    type: DELETE_BOARD,
    boardID
  }
}
