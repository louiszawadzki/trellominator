import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import Trello from '../../services/Trello';
import CommentBox from '../CommentBox/CommentBox';

const actions = [
  'Assign myself to card',
  'Move to next column',
  'Comment',
]

export default class ActionsList extends Component {
  constructor() {
    super();
    this.onSelect = this.onSelect.bind(this);
    this.state = ({
      showComment: true,
    })
  }
  componentDidMount() {
    this.refs.actions.focus();
  }
  onSelect(item) {
    switch (item.content) {
      case actions[0]:
        Trello.assignToMyself(this.props.card, this.props.me);
        break;
      case actions[1]:
        Trello.moveToNextColumn(this.props.card, this.props.lists);
        break;
      case actions[2]:
        this.setState({showComment: true});
        break;
      default:
        return true;
    }
  }
  render() {
    return (
      <box
        top="15%"
        left="0%"
        height="100%"
        width="100%"
      >
        <list
          top="0%"
          left="0%"
          height="20%"
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
        {this.state.showComment && <CommentBox card={this.props.card} />}
      </box>
    );
  }
}
