import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import LoggerService from '../../services/LoggerService';
import ActionsList from '../ActionsList/ActionsList';

export default class Card extends Component {
  constructor() {
    super();
    this.state = {
      logs: [],
    };
  }
  componentDidMount() {
    LoggerService.setCallback((logs) => this.setState({logs}));
  }
  render() {
    return (
      <list
        top="88%"
        width="100%"
        height="10%"
        border={{type: 'line'}}
        style={{
          border: {fg: 'green'},
        }}
        scrollable={true}
        items={this.state.logs}
     />);
  }
}
