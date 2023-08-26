import { winnerCombos } from "../constants"

export const checkWinner = (boardToCheck) =>{
    //Revisar todas las combinaciones ganadoras para determinar el ganador
    for(const combo of winnerCombos){
      const [a,b,c] = combo
      if(
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null //Si no hay ganador
  }

export const  checkendGame = (newBoard) => {

  /*
  Revisamr si hay un empate. 
  Si no hay mas espacios vacios en el board
  */

  return newBoard.every((square) => square !== null)
}