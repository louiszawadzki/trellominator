import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';

// Rendering a simple centered box
export default class List extends Component {
  componentDidMount() {
    this.refs.list.focus();
  }
  render() {
    return (
      <list
        top="center"
        width={this.props.width || "30%"}
        height="100%"
        border={{type: 'line'}}
        style={{
          border: {fg: 'blue'},
          selected: {fg: 'white', bg: 'black'},
        }}
        interactive={true}
        keys={true}
        mouse={true}
        onSelect={this.props.onSelect}
        items={this.props.items}
        ref="list"
     />
    );
  }
}
