import { useState } from "react"
import { Square } from "./components/Square"
import confetti from 'canvas-confetti'
import { WinnerModal } from "./components/WinnerModal"
import { checkEndGame, checkWinner } from "./logic/BoardLogic"
import { Turn } from "./constants"



export const App = () => {
  const[board,setBoard]= useState(Array(9).fill(null))
  const[turn,setTurn] = useState(Turn.x)
  const[winner,setWinner] = useState(null)




  const updateBoard = (index)=>{
         
    // chequear que no haya nada en esa posicion
    if(board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn =  turn === Turn.x ? Turn.o : Turn.x
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard);
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame =()=>{
    setBoard(Array(9).fill(null)),
    setTurn(Turn.x),
    setWinner(null)
  }

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <button className="btn-modal" onClick={resetGame}>Reset Game</button>
      <section className="board-game">
        {
          board.map((item,index)=>(
            <Square key={index} index={index} updateBoard={updateBoard}>
              {item}
            </Square>
          ))
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === Turn.x}>
           {Turn.x}
        </Square>
        <Square isSelected={turn === Turn.o}>
            {Turn.o}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </div>
  )
}
