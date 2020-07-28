import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Board from './Board.js'

class App extends Component {
  constructor(){
    super();
    this.state = {
      generation: 0,
    }
  }
  render() {
    return (
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <section>
          <h5>Rules:</h5>
          <ul>
            <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation</li>
            <li>Any live cell with two or three live neighbours lives on to the next generation</li>
            <li>Any live cell with more than three live neighbours dies, as if by overpopulation</li>
            <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction</li>
          </ul>
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules">Wikipedia</a>
        </section>
        <Board/>
        <h2>Generations: {this.state.generation}</h2>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
