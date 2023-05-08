/* eslint-disable react/prop-types */


export const WinnerModal = ({winner,resetGame}) => {

 const champion= winner === false ? 'Tie' : 'Victory'
    if(winner === null) return;
  return (
    <section className="winner">
       <div className="win-modal">
            <h3>{champion}</h3>
            <span>{winner || '.'}</span>
            <button onClick={resetGame} className="btn-modal">Reset game</button>
       </div>
       
    </section>
  )
}
