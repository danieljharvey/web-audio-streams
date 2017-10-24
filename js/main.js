const Rx = require('rxjs/Rx')

const rxCore = require('./src/rxCore')
const audioCore = require('./src/audioCore')

console.log("horse2")

const button = document.querySelector('button');

const observable = rxCore.getClickObservable(button);

observable.scan(count => count + 1, 0)
  		  .subscribe(count => console.log(`Clicked ${count} times`));

const subject = new Rx.Subject();

const handleScroll = event => {
	subject.next(window.scrollY);
}

window.addEventListener('scroll', handleScroll);

const calcWait = bpm => {
	return 1000 / (bpm / 60)
}

const wait = calcWait(160)

console.log('120 becomes ', wait)

subject.throttleTime(wait)
	   .subscribe({
  next: (v) => console.log('observerA: ' + v)
});

observable.zip(subject)
		  .subscribe(egg => console.log('egg', egg));

const s = setTimeout(() => {
	audioCore.startAudio();	
},1000)

