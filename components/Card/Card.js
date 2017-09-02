import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';

export default class Card extends Component {
  render() {
    return (
      <box
        top="center"
        width="50%"
        height="100%"
        left="50%"
        border={{type: 'line'}}
        style={{
          border: {fg: 'blue'},
        }}
     >
      <box
        top="0%"
        height="50%"
        width="100%"
        border={{type: 'line'}}
        style={{
          border: {fg: '#ad3412'},
        }}
      >
        #{this.props.card.idShort} - {this.props.card.name}
      </box>
     </box>
    );
  }
}
