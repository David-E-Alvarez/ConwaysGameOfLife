import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'

//grid dimensions
const rows = 25;
const columns = 35;

//initial board
const new_board = (status_of_cell = () => false) => {//sets every cell on board to false
  const grid = [];
  for(let i = 0; i< rows; i++){
    grid[i] = [];
    for(let j = 0; j < columns; j++){
      grid[i][j] = status_of_cell()
    }
  }
  return grid;

};
//glider gun config
const glider_gun_config = (status_of_cell = () => false) => {//sets every cell on board to false
  const grid = [];
  for(let i = 0; i< rows; i++){
    grid[i] = [];
    for(let j = 0; j < columns; j++){
      grid[i][j] = status_of_cell()
    }
  }
  //this makes grids true to make glider shape
  grid[0][1] = true;
  grid[2][0] = true;
  grid[2][1] = true;
  grid[2][2] = true;
  grid[1][2] = true;

  return grid;

};
//random config
const random_config = (true_or_false = () => Math.random() < 0.5) => {
  const grid = [];
  for(let i = 0; i< rows; i++){
    grid[i] = [];
    for(let j = 0; j < columns; j++){
      grid[i][j] = true_or_false()
    }
  }
  return grid;
}

//board component
const Board = ({board_status, toggle_cell}) =>{
  const handleClick = (i,j) => toggle_cell(i,j);
  const table_rows = [];
  for(let i = 0; i < rows; i++){
    const table_data = [];
    for(let j = 0; j < columns; j++){
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
    speed: 25,
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
 
  //glider that calls function to configure glider gun
  glider_func = () => {
    this.setState({
      board_status: glider_gun_config(),
      generation: 0
    })
  }
  //random configuration
  random_func = () => {
    this.setState({
      board_status: random_config(),
      generation: 0
    })
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

  //method to handle steps
  handle_step = () => {
    const next_step = prev_state =>{
      const board_status = prev_state.board_status;
      const board_copy = JSON.parse(JSON.stringify(board_status));
      //function to calcualte neighbors and updates individual cell status and return cloned board status
      const calc_neighbors = (row,col) => {
        const calc_neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        return calc_neighbors.reduce((true_neighbors, neighbor) => {
          const x = row + neighbor[0];
          const y = col + neighbor[1];
          const is_neighbor_on_grid = (x >= 0 && x < rows && y >= 0 && y < columns);
          if(true_neighbors < 4 && is_neighbor_on_grid && board_status[x][y]){
            return true_neighbors + 1;
          }else{
            return true_neighbors;
          }
        },0);
      };
      //update cloned board status
      for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
          const true_neighbors_total = calc_neighbors(i,j);
          if(!board_status[i][j]){
            if(true_neighbors_total === 3) board_copy[i][j] = true;
          }else{
            if(true_neighbors_total < 2 || true_neighbors_total > 3) board_copy[i][j] = false;
          }
        }
      }
      return board_copy;
    };
    //iterate
    this.setState(prev_state =>({
      board_status: next_step(prev_state),
      generation: prev_state.generation + 1
    }));
  }

  //stop/run state
  handle_start = () => {
		this.setState({ isGameRunning: true });
	}

	handle_stop = () => {
		this.setState({ isGameRunning: false });
  }
  //for stop and start
  componentDidUpdate(prev_props,prev_state){
    const {isGameRunning, speed} = this.state;
    const iterate = prev_state.speed !== speed;
    const game_started = !prev_state.isGameRunning && isGameRunning;
    const game_stopped = prev_state.isGameRunning && !isGameRunning;
    if((isGameRunning && iterate)||game_stopped){
      clearInterval(this.timerID)
    }
    if((isGameRunning && iterate)||game_started){
      this.timerID = setInterval(()=>{
        this.handle_step();
      },iterate)
    }
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
        <div>
          {`Generation: ${generation}`}
        </div>
        <div>
          {this.buttons()}
          <button type='button' disabled={isGameRunning} onClick={this.handle_step}>Step</button>
          <button type='button' onClick={this.clear_board}>Clear Board</button>
          <br></br><label>preset configurations: </label>
          <button type='button' onClick={this.glider_func}>Glider</button>
          <button type='button' onClick={this.random_func}>Random</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
