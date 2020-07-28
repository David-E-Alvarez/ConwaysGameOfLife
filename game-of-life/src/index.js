import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Future home of Conway's Game of Life</h1>
        <h2>Did You hear me lad?</h2>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
