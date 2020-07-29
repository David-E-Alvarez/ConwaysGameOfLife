import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'



const Board = (props) => {
  {/*rows_array is to populate board */}
  {/*cell_id is to identify each cell */}
  {/*cell_class in Cell component is to tell if a cell is on or off */}
  {/* */}
  var rows_array = [];
  var cell_class = "";
  for(var i = 0; i < props.rows; i++){
    for(var j = 0; j < props.columns; j++){
      let cell_id = i + "_" + j;
      cell_class = props.empty_board ? "cell on":"cell off";
      
    }
  }
  return(
    <div className="board">
      {rows_array}
    </div>
  );
}

class App extends Component {
  constructor(){
    super();
    
    this.speed = 100;{/*how fast program runs */}
    {/*rows and columns for grid; will be referenced for creation of state */}
    {/*"emptyGrid makes initil empty grid" it is a 2d array to represent board*/}
    this.rows = 25;
    this.columns = 25;
    this.state = {
      generation: 0,
      empty_board: Array(this.rows).fill().map(() => Array(this.columns).fill(false)),
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
        <Board 
          board={this.state.empty_board}
          rows={this.rows}
          cols={this.columns}
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
