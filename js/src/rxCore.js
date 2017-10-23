const Rx = require('rxjs/Rx');

const getClickObservable = element => {
	return Rx.Observable.fromEvent(element, 'click')		
}

console.log('rxCore loaded')

module.exports = {
	getClickObservable: getClickObservable
}