import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'

//grid dimensions
const rows = 25;
const columns = 25;

//initial board
const new_board = (status_of_cell = () => false) => {//sets every cell on board to false
  const grid = [];
  for(var i = 0; i< rows; i++){
    grid[i] = [];
    for(var j = 0; j < columns; j++){
      grid[i][j] = status_of_cell()
    }
  }
  return grid;

};

//board component
const Board = ({board_status, toggle_cell}) =>{
  const handleClick = (i,j) => toggle_cell(i,j);
  const table_rows = [];
  for(var i = 0; i < rows; i++){
    const table_data = [];
    for(var j = 0; j < columns; j++){
      table_data.push(
        <td
          key={`${i},${j}`}
          className={board_status[i][j] ? 'alive':'dead'}
          onClick={()=>handleClick(i,j)}
        />
      );
    }
    table_rows.push(<tr key={i}>{table_data}</tr>)
  } 
  return <table><tbody>{table_rows}</tbody></table>;
};


class App extends Component {
  //state
  state = {
    board_status: new_board(),
    generation: 0,
    isGameRunning: false,
  };
  //function for start/stop buttons
  buttons = () => {
    return this.state.isGameRunning ?
    <button type='button' onClick={this.handle_stop}>Stop</button>:
    <button type='button' onClick={this.handle_start}>Start</button>;
  }

  //clear board
  clear_board = () => {
    this.setState({
      board_status: new_board(()=> false),
      generation: 0
    });
  }
  //new board
  new_board_instance = () => {
    this.setState({
      board_status: new_board(),
      generation:0
    });
  }

  //handle cell toggling
  handle_toggle_cell_status = (i,j) => {
    const toggle_board_status = prev_state => {
      const board_copy = JSON.parse(JSON.stringify(prev_state.board_status));
      board_copy[i][j] = !board_copy[i][j];
      return board_copy;
    };
    this.setState(prev_state => ({
      board_status: toggle_board_status(prev_state)
    }))
  }

  //stop/run state
  handle_start = () => {
		this.setState({ isGameRunning: true });
	}

	handle_stop = () => {
		this.setState({ isGameRunning: false });
	}
  render() {
    const {board_status,isGameRunning,generation} = this.state;
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
        <Board board_status={board_status} toggle_cell={this.handle_toggle_cell_status}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
