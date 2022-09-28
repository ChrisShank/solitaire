import morphdom from 'morphdom';
import './style.css';

const gameWorker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });

const app = document.querySelector('main')!;

let button: HTMLButtonElement | undefined;

gameWorker.addEventListener('message', ({ data }) => {
  morphdom(app, data.html);

  if (!button) {
    button = document.querySelector('button')!;
    button.addEventListener('click', () => {
      gameWorker.postMessage('TOGGLE');
    });
  }
});
