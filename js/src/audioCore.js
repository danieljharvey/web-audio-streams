
const createAudioContext = () => new (window.AudioContext || window.webkitAudioContext)();

const createLimiter = audioCtx => {
  // Create a compressor node
  const compressor = audioCtx.createDynamicsCompressor();
  compressor.threshold.value = -1;
  compressor.knee.value = 40;
  compressor.ratio.value = 12;
  compressor.attack.value = 0;
  compressor.release.value = 0.25;
  compressor.connect(audioCtx.destination)
  return compressor
}

const createOscillator = (audioCtx) => (output) => {
  const oscillator = audioCtx.createOscillator()
  oscillator.connect(output)
  oscillator.type = 'sine';
  oscillator.frequency.value = 440; // value in hertz
  return oscillator
}

const createNoiseOsc = (audioCtx) => (output) => {
  const node = audioCtx.createBufferSource()
  const buffer = audioCtx.createBuffer(1, 4096, audioCtx.sampleRate)
  const data = buffer.getChannelData(0);

  for (var i = 0; i < 4096; i++) {
    data[i] = Math.random();
  }

  node.buffer = buffer;
  node.loop = true;
  node.connect(output);
  return node
}

const startAudio = () => {
  
  console.log('startAudio');

  // create web audio api context
  const audioCtx = createAudioContext()

  // create limiter
  const limiter = createLimiter(audioCtx)

  // create Oscillator node
  const oscillator = createOscillator(audioCtx)(limiter)

  // create Noise node
  const noiseOsc = createNoiseOsc(audioCtx)(limiter)

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 2);

  noiseOsc.start()
  noiseOsc.stop(audioCtx.currentTime + 1)
}

module.exports = {
  startAudio
}