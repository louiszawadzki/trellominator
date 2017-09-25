import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import Trello from '../../services/Trello';


export default class ActionsList extends Component {
  constructor(props) {
    super();
    this.state = {
      comment: '',
    };
    this.submit = data => Trello.postComment(props.card, data)
    this.cancel = _ => console.log('Form canceled');
  }
  render() {
    return (
      <form
        keys
        vi
        onSubmit={this.submit}
        onReset={this.cancel}
        top="22%"
        left="0%"
        height="75%"
        width="100%"
        border={{type: 'line'}}
        style={{
          border: {fg: 'blue'},
        }}
      >
        <box width={9} height={3}>Comment (use %0A for newlines): </box>
        <textbox
          onSubmit={this.submit}
          height={3}
          left={34}
          keys
          mouse
          inputOnFocus
        />
      </form>
    );
  }
}
