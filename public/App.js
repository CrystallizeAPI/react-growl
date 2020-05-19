import React from 'react';
import faker from 'faker';

import growl, { GrowlScene } from '../src';

function stickyGrowl() {
  growl({
    message: 'You cannot click to remove me',
    sticky: true,
    type: 'warning',
  }).then((g) => {
    setTimeout(() => {
      g.update({
        type: 'info',
        message: 'Hey, I just changed my own type =)',
      });

      setTimeout(() => {
        g.update({
          message: 'You can click to remove me now',
          sticky: false,
        });
      }, 2000);
    }, 2000);
  });
}

export default () => (
  <div>
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '5vh 5vw' }}>
      <h1>Growl</h1>
      <p>
        <button onClick={() => growl(`I can ${faker.hacker.verb()} now!`)}>
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
    </main>
    <GrowlScene />
  </div>
);
