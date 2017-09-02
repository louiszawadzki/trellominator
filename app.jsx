import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import Trello from './services/Trello';

// Rendering a simple centered box
class App extends Component {
  constructor() {
    super();
    this.state = {
      boards: [],
      board: '',
    }
  }
  componentDidMount() {
    this.refs.boards.focus();
    Trello.fetchBoards(boards => this.setState({
      boards,
    }));
  }
  render() {
    return (
      <box
        top="center"
        left="center"
        width="100%"
        height="100%"
      >
        <list
          top="center"
          width="30%"
          height="100%"
          border={{type: 'line'}}
          style={{
            border: {fg: 'blue'},
            selected: {fg: 'white', bg: 'black'},
          }}
          interactive={true}
          keys={true}
          mouse={true}
          onSelect={(item) => this.setState({board: this.state.boards[item.index]})}
          items={this.state.boards.map(board => board.name)}
          ref="boards"
       />
       <box
         left="30%"
         width="40%"
         height="20%"
       >
        Selected board: {this.state.board.name}
       </box>
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
