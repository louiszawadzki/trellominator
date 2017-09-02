import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import Trello from './services/Trello';
import List from './components/List/List';
import Board from './components/Board/Board';

class App extends Component {
  constructor() {
    super();
    this.state = {
      boards: [],
      board: {},
      lists: [],
      me: {},
    }
  }
  selectBoard(board) {
    this.setState({board});
    Trello.fetchLists(board, lists => this.setState({lists}));
  }
  componentDidMount() {
    Trello.fetchMe(me => this.setState({me}));
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
        {Object.keys(this.state.board).length === 0 && <List
          onSelect={(item) => this.selectBoard(this.state.boards[item.index - 2])}
          items={this.state.boards.map(board => board.name)}
          ref="boards"
       />}
       {Object.keys(this.state.board).length !== 0 && <box
         width="100%"
         height="100%"
       >
        <Board
          me={this.state.me}
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
  title: 'Trellominator'
});

// Adding a way to quit the program
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Rendering the React app using our screen
const component = render(<App />, screen);
