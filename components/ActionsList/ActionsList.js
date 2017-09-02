import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import Trello from '../../services/Trello';

const actions = [
  'Move to next column',
]

export default class ActionsList extends Component {
  constructor() {
    super();
    this.onSelect = this.onSelect.bind(this);
  }
  componentDidMount() {
    this.refs.actions.focus();
  }
  onSelect() {
    Trello.moveToNextColumn(this.props.card, this.props.lists)
  }
  render() {
    return (
      <list
        top="15%"
        left="0%"
        height="100%"
        width="100%"
        border={{type: 'line'}}
        style={{
          border: {fg: 'blue'},
          selected: {fg: 'white', bg: 'black'},
        }}
        interactive={true}
        keys={true}
        mouse={true}
        ref="actions"
        items={actions}
        onSelect={this.onSelect}
      />
    );
  }
}
