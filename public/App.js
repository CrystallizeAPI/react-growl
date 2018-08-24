import React from 'react';
import faker from 'faker';

import growl, { GrowlComponent } from '../src';

function stickyGrowl() {
  growl({
    message: 'You cannot click to remove me',
    sticky: true
  }).then(g => {
    setTimeout(() => {
      g.update({
        type: 'success',
        message: 'Hey, I just changed my own type =)'
      });

      setTimeout(() => {
        g.update({
          message: 'You can click to remove me now',
          sticky: false
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
              message: `Remember: this is ${faker.hacker.adjective()}`
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
              message: `Oh no! ${faker.hacker.phrase()}`
            })
          }
        >
          type: error
        </button>
      </p>
      <p>
        <button
          onClick={() =>
            growl({
              type: 'success',
              message: `Horray! ${faker.hacker.phrase()}`
            })
          }
        >
          type: success
        </button>
      </p>
      <p>
        <button onClick={stickyGrowl}>sticky</button>
      </p>
    </main>
    <GrowlComponent />
  </div>
);
