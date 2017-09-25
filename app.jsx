import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import Trello from './services/Trello';
import List from './components/List/List';
import Board from './components/Board/Board';
import Logger from './components/Logger/Logger';
import LoggerService from './services/LoggerService';

class App extends Component {
  constructor() {
    super();
    this.state = {
      boards: [],
      board: {},
      lists: [],
      me: {},
      logs: [],
      logger: {},
    }
  }
  selectBoard(board) {
    this.setState({board});
    Trello.fetchLists(board, lists => this.setState({lists}));
  }
  componentDidMount() {
    Trello.fetchMe(me => this.setState({me}));
    Trello.fetchBoards(boards => this.setState({boards}));
    LoggerService.push('Trellominator launched');
  }
  render() {
    return (
      <box>
        <box
          top="0%"
          left="center"
          width="100%"
          height="88%"
        >
          {Object.keys(this.state.board).length === 0 && <List
            onSelect={(item) => this.selectBoard(this.state.boards.find(board => board.name === item.content))}
            items={this.state.boards.map(board => board.name)}
            ref="boards"
         />}
         {Object.keys(this.state.board).length !== 0 && <box
           width="100%"
           top="0%"
           height="88%"
         >
          <Board
            me={this.state.me}
            lists={this.state.lists}
          />
         </box>}
       </box>
       <Logger />
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
