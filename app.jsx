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
    }
  }
  componentDidMount() {
    Trello.fetchBoards(boards => this.setState({
      boards,
    }));
  }
  render() {
    return (
      <list
        top="center"
        left="center"
        width="100%"
        height="100%"
        border={{type: 'line'}}
        style={{border: {fg: 'blue'}}}
        interactive={true}
        keys={true}
        mouse={true}
        select={(e) => console.log(e)}
        items={this.state.boards.map(board => board.name)}
     />
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
