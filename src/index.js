import React from 'react';
import EE from 'event-emitter';
import { PoseGroup } from 'react-pose';

import { Outer, Growl } from './styles';

const emitter = new EE();

export class GrowlComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { items: [] };
    this.key = 0;

    this.getKey = this.getKey.bind(this);
    this.addGrowl = this.addGrowl.bind(this);
    this.removeGrowl = this.removeGrowl.bind(this);
  }

  componentDidMount() {
    emitter.on('add', this.addGrowl);
    emitter.on('remove', this.removeGrowl);
  }

  componentWillUnmount() {
    emitter.off('add', this.addGrowl);
    emitter.off('remove', this.removeGrowl);
  }

  getKey() {
    return `item-${this.key++}`;
  }

  addGrowl(_growl) {
    const defaultOptions = {
      timeout: 7000,
      key: this.getKey(),
      type: 'info'
    };

    let growl;
    if (typeof _growl === 'string') {
      growl = {
        message: _growl
      };
    } else {
      growl = _growl;
    }

    growl = Object.assign({}, defaultOptions, growl);

    this.setState({
      items: [...this.state.items, growl]
    });

    growl.hide = () => this.removeGrowl(growl.key);

    return growl;
  }

  removeGrowl(key) {
    const { items } = this.state;
    const index = items.findIndex(i => i.key === key);
    this.setState({
      items: [...items.slice(0, index), ...items.slice(index + 1)]
    });
  }

  render() {
    const { items } = this.state;

    return (
      <Outer>
        <PoseGroup>
          {items.map(item => (
            <Growl
              key={item.key}
              onClick={() => this.removeGrowl(item.key)}
              type={item.type}
            >
              {item.message}
            </Growl>
          ))}
        </PoseGroup>
      </Outer>
    );
  }
}

export default opt => emitter.emit('add', opt);
