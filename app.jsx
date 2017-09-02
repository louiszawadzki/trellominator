import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import Trello from './services/Trello';
import BoardsList from './components/BoardsList/BoardsList';
import Board from './components/Board/Board';

// Rendering a simple centered box
class App extends Component {
  constructor() {
    super();
    this.state = {
      boards: [],
      board: {},
      lists: [],
    }
  }
  selectBoard(board) {
    this.setState({board});
    Trello.fetchLists(board, lists => this.setState({lists}));
  }
  componentDidMount() {
    Trello.fetchBoards(boards => this.setState({boards}));
  }
  render() {
    return (
      <box
        top="center"
        left="center"
        width="100%"
        height="100%"
      >
        {Object.keys(this.state.board).length === 0 && <BoardsList
          onSelect={(item) => this.selectBoard(this.state.boards[item.index - 2])}
          items={this.state.boards.map(board => board.name)}
          ref="boards"
       />}
       {Object.keys(this.state.board).length !== 0 && <box
         width="100%"
         height="100%"
       >
        Selected board: {this.state.board.name}
        <Board
          lists={this.state.lists}
        />
       </box>}

     </box>
    );
  }
}

// Creating our screen
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'react-blessed hello world'
});

// Adding a way to quit the program
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Rendering the React app using our screen
const component = render(<App />, screen);
