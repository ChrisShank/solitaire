/// <reference no-default-lib="true"/>
/// <reference lib="es2020" />
/// <reference lib="WebWorker" />
declare var self: DedicatedWorkerGlobalScope;

// Everything above this makes TS happy, please ignore

import { createMachine, interpret } from '@xstate/fsm';

const game = interpret(
  createMachine({
    initial: 'on',
    states: {
      on: {
        on: {
          TOGGLE: 'off',
        },
      },
      off: {
        on: {
          TOGGLE: 'on',
        },
      },
    },
  })
).start();

game.subscribe((state) => {
  render(state);
});

function render(state: any) {
  self.postMessage({
    type: 'UI_UPDATE',
    html: `<main>
  <h1>${state.value}</h1>
  <button id="toggle">TOGGLE</button>
</main>`,
  });
}

self.addEventListener('message', ({ data }) => {
  game.send(data);
});
