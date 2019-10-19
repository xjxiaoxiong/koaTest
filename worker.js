var a = require('debug')('worker:a')
  , b = require('debug')('worker:b');

function work() {
  console.log('a')
  a('doing lots of uninteresting work');
  console.log('a1')
  setTimeout(work, Math.random() * 1000);
}

work();

function workb() {
  console.log('b')
  b('doing some work');
  setTimeout(workb, Math.random() * 2000);
}

workb();
