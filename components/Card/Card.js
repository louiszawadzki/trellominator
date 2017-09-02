import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import ActionsList from '../ActionsList/ActionsList';

export default class Card extends Component {
  render() {
    return (
      <box
        top="0%"
        width="50%"
        height="50%"
        left="50%"
        border={{type: 'line'}}
        style={{
          border: {fg: 'blue'},
        }}
     >
       <box
         top="0%"
         height="20%"
         width="90%"
         border={{type: 'line'}}
         style={{
           border: {fg: '#ad3412'},
         }}
       >
         {this.props.list.name}
       </box>
      <box
        top="22%"
        height="20%"
        width="90%"
        border={{type: 'line'}}
        style={{
          border: {fg: '#ad3412'},
        }}
      >
        #{this.props.card.idShort} - {this.props.card.name}
      </box>
    </box>);
  }
}
