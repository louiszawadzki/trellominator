import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import List from '../List/List';

// Rendering a simple centered box
export default class BoardsList extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      list: {},
    }
  }
  selectList(list) {
    this.setState({list});
    //Trello.fetchCards(list, cards => this.setState({cards}));
  }
  render() {
    return (
      <box>
        <List
          onSelect={item => this.selectList(this.props.lists[item.index - 4])}
          items={this.props.lists.map(list => list.name)}
       />
       <box
         width="50%"
         height="100%"
         left="30%"
       >
         Selected List: {this.state.list.name}

       </box>
     </box>
    );
  }
}
