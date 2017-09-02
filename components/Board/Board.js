import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import Card from '../Card/Card';
import ActionsList from '../ActionsList/ActionsList';
import List from '../List/List';
import Trello from '../../services/Trello';

export default class BoardsList extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      list: {},
      card: {},
    }
  }
  selectList(list) {
    this.setState({list});
    Trello.fetchCards(list, cards => this.setState({cards}));
  }
  selectCard(content) {
    const card = this.state.cards.find(card => `#${card.idShort} - ${card.name}` === content);
    this.setState({card})
  }
  render() {
    return (
      <box>
        <List
          onSelect={item => this.selectList(this.props.lists[item.index - 4])}
          items={this.props.lists.map(list => list.name)}
       />
       <box
         width="70%"
         height="100%"
         left="30%"
       >
         {Object.keys(this.state.list).length !== 0 && <List
           width="50%"
           items={this.state.cards.map(card => `#${card.idShort} - ${card.name}`)}
           onSelect={item => this.selectCard(item.content)}
         />}
         {Object.keys(this.state.card).length !== 0 && <Card
           card={this.state.card}
           list={this.state.list}
         />}
         {Object.keys(this.state.card).length !== 0 &&
           <box
             top="51%"
             left="50%"
             height="40%"
             width="50%"
           >
             <text>Actions:</text>
             <ActionsList
               card={this.state.card}
               lists={this.props.lists}
             />
           </box>
         }
       </box>
     </box>
    );
  }
}
