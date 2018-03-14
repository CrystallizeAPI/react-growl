import React from 'react';
import EE from 'event-emitter';

import { Outer, Growl } from './styles';

const emitter = new EE();

export class GrowlComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { items: [] };
    this.key = 0;

    this.getKey = this.getKey.bind(this);
    this.addGrowl = this.addGrowl.bind(this);
    this.animateInGrowl = this.animateInGrowl.bind(this);
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
      animatedIn: false
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

    growl.hideTimeout = setTimeout(() => {
      this.removeGrowl(growl.key);
    }, growl.timeout);

    growl.animateInTimeout = setTimeout(() => {
      this.animateInGrowl(growl.key);
    }, 5);

    growl.timeoutDate = new Date(+new Date() + growl.timeout);

    this.setState({
      items: [...this.state.items, growl]
    });

    growl.hide = () => this.removeGrowl(growl.key);

    return growl;
  }

  animateInGrowl(key) {
    this.setState(state => {
      const items = [...state.items];
      const item = items.find(i => i.key === key);
      item.animatedIn = true;

      return {
        items
      };
    });
  }

  removeGrowl(key) {
    const item = this.state.items.find(i => i.key === key);
    item.animatedIn = false;
    clearTimeout(item.hideTimeout);
    clearTimeout(item.animateInTimeout);

    this.setState(
      {
        items: [...this.state.items]
      },
      () => {
        setTimeout(() => {
          this.setState(state => {
            const index = state.items.findIndex(i => i.key === key);
            return {
              items: [
                ...state.items.slice(0, index),
                ...state.items.slice(index + 1)
              ]
            };
          });
        }, 100);
      }
    );
  }

  render() {
    const { items } = this.state;

    if (!items.length) {
      return null;
    }

    return (
      <Outer>
        {items.map(item => (
          <Growl
            key={item.key}
            onClick={() => this.removeGrowl(item.key)}
            animatedIn={item.animatedIn}
          >
            {item.message}
          </Growl>
        ))}
      </Outer>
    );
  }
}

export default opt => emitter.emit('add', opt);
