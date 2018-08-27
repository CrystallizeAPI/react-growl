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
    this.removeAllTimeouts();
  }

  getKey() {
    return `item-${this.key++}`;
  }

  addGrowl({ callback, ..._growl }) {
    const defaultOptions = {
      timeout: 7000,
      key: this.getKey(),
      type: 'info',
      sticky: false
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

    growl.update = props => {
      this.setState(({ items }) => {
        const newItems = [...items];
        const item = newItems.find(i => i.key === growl.key);
        if (item) {
          Object.assign(item, props);
          return {
            items: newItems
          };
        }
      });
    };

    if (!growl.sticky) {
      growl.hideTimeout = setTimeout(growl.hide, growl.timeout);
    }

    growl.clearTimeouts = () => {
      clearTimeout(growl.hideTimeout);
    };

    if (callback) {
      callback(growl);
    }

    return growl;
  }

  removeAllTimeouts() {
    this.state.items.forEach(i => i.clearTimeouts());
  }

  removeGrowl(key) {
    const { items } = this.state;
    const index = items.findIndex(i => i.key === key);

    if (index !== -1) {
      items[index].clearTimeouts();

      this.setState({
        items: [...items.slice(0, index), ...items.slice(index + 1)]
      });
    }
  }

  render() {
    const { items } = this.state;

    return (
      <Outer>
        <PoseGroup>
          {items.map(item => (
            <Growl
              key={item.key}
              onClick={() => !item.sticky && this.removeGrowl(item.key)}
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

export default opt => {
  return new Promise(resolve => {
    let options = opt;
    if (typeof opt === 'string') {
      options = {
        message: opt
      };
    }

    emitter.emit('add', {
      callback: resolve,
      ...options
    });
  });
};
