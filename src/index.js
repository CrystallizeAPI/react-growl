import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mitt from 'mitt';

import { Outer, Growl } from './styles';

const emitter = mitt();

const getKey = (function () {
  let index = 0;

  return () => index++;
})();

export function GrowlScene({ growlComponent, defaultTimeout, ...props }) {
  const [items, setItems] = useState([]);

  // Listen for emitter events
  useEffect(() => {
    emitter.on('add', addGrowl);
    emitter.on('remove', removeGrowl);

    return () => {
      emitter.off('add', addGrowl);
      emitter.off('remove', removeGrowl);
    };
  });

  // Remove old growls
  useEffect(() => {
    function check() {
      const now = Date.now();
      const itemsToKeep = items.filter((item) => {
        if ('removeAt' in item && item.removeAt <= now) {
          return false;
        }
        return true;
      });
      if (itemsToKeep.length < items.length) {
        setItems(itemsToKeep);
      }
    }

    let interval = setInterval(check, 50);
    return () => clearInterval(interval);
  }, [items]);

  function removeGrowl(key) {
    const index = items.findIndex((i) => i.key === key);

    if (index !== -1) {
      setItems([...items.slice(0, index), ...items.slice(index + 1)]);
    }
  }

  function addGrowl({ callback, ...rest }) {
    const defaultOptions = {
      timeout: defaultTimeout || 7000,
      key: getKey(),
      type: 'info',
      sticky: false,
    };

    const growl = Object.assign({}, defaultOptions, rest);

    if (!growl.sticky) {
      growl.removeAt = Date.now() + growl.timeout;
    }

    setItems([growl, ...items]);

    growl.hide = () => emitter.emit('remove', growl.key);

    growl.update = (props) => {
      setItems((items) => {
        const newItems = [...items];
        const item = newItems.find((i) => i.key === growl.key);
        if (item) {
          Object.assign(item, props);

          if (!item.sticky) {
            item.removeAt = Date.now() + item.timeout;
          }

          return newItems;
        }
        return items;
      });
    };

    if (callback) {
      callback(growl);
    }

    return growl;
  }

  const Cmp = growlComponent || Growl;

  return (
    <Outer {...props}>
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.li
            key={item.key}
            positionTransition
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            <Cmp
              remove={() => !item.sticky && removeGrowl(item.key)}
              {...item}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </Outer>
  );
}

export function growl(opt) {
  return new Promise((resolve) => {
    let options = opt;
    if (typeof opt === 'string') {
      options = {
        title: opt,
      };
    }

    emitter.emit('add', {
      callback: resolve,
      ...options,
    });
  });
}
