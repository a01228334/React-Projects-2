import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/square.jsx"
import { TURNS } from "./constants.js"
import {checkWinner, checkendGame} from "./logic/board.js"
import { Winner } from "./components/winner.jsx"


function App() {

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  // Null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  

  const updateBoard = (index) =>{

    //Comprobar si la casilla ya tiene seleccion. En caso que si, return. 
    if(board[index] || winner) return

    //Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn // X / O
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      confetti()
      return setWinner(newWinner)
    } else if(checkendGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  
  
  return (
    <main className="board">
        <h1>TIC TAC TOE GAME</h1>
        <button onClick={resetGame}>Reset Game</button>
        <section className="game">
          {
            board.map((square,index) => {
              return (
                <Square
                key={index}
                index={ index }
                updateBoard={updateBoard}
                >
                  {square}
                </Square>

              )

            })
          }
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>

        <Winner resetGame = {resetGame} winner = {winner}/>
    </main>
    
  )
}

export default App
