import React, { useRef, useState } from 'react';
import faker from 'faker';

import { growl, GrowlScene } from '../src';

function stickyGrowl() {
  growl({
    title: 'Ha ha. I am sticky',
    message: 'You cannot click to remove me 🤓',
    sticky: true,
    type: 'warning',
  }).then((g) => {
    setTimeout(() => {
      g.update({
        type: 'info',
        title: 'I changed!',
        message: "I'm still static though.",
      });

      setTimeout(() => {
        g.update({
          title: 'All good',
          message: 'You can click to remove me now',
          sticky: false,
        });
      }, 2000);
    }, 2000);
  });
}

function Controlled() {
  const [shown, setShown] = useState(false);
  const ref = useRef();

  async function add() {
    ref.current = await growl({
      title: 'You cannot click me',
      message: 'Use the instance method .hide() to hide me',
      sticky: true,
    });
    setShown(true);
  }

  function hide() {
    ref.current.hide();
    setShown(false);
  }

  function update() {
    ref.current.update({
      title: faker.hacker.verb(),
      message: faker.hacker.phrase(),
    });
  }

  if (shown) {
    return (
      <div>
        <button onClick={hide}>ref.current.hide()</button>
        <button onClick={update}>ref.current.update(...random)</button>
      </div>
    );
  }

  return <button onClick={add}>Controlled</button>;
}

export default () => {
  return (
    <div>
      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '5vh 5vw' }}>
        <h1>Growl</h1>
        <p>
          <button
            onClick={() =>
              growl({
                title: `I can ${faker.hacker.verb()} now!`,
                message: 'Really? For Sure?',
              })
            }
          >
            type: info (default)
          </button>
        </p>
        <p>
          <button
            onClick={() =>
              growl({
                type: 'warning',
                title: faker.hacker.phrase(),
                message: `Remember: this is ${faker.hacker.adjective()}`,
              })
            }
          >
            type: warning
          </button>
        </p>
        <p>
          <button
            onClick={() =>
              growl({
                type: 'error',
                title: faker.hacker.phrase(),
                message: `Oh no! ${faker.hacker.phrase()}`,
              })
            }
          >
            type: error
          </button>
        </p>
        <p>
          <button onClick={stickyGrowl}>sticky</button>
        </p>
        <p>
          <Controlled />
        </p>
        <p>
          <Controlled />
        </p>
      </main>
      <GrowlScene />
    </div>
  );
};
