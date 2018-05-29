import React from 'react';
import faker from 'faker';
import styled from 'styled-components';

import growl, { GrowlComponent } from '../src';

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
    </main>
    <GrowlComponent />
  </div>
);
