let synth1, filt, rev, polySynth, noise1, noise2, ampEnv1, ampEnv2, filt1, pressedKey;

let pressedKeys = {};
let activeKey = null;
let fish = []

let keyNotes1 = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'h': 'G4',
  'j': 'A4',
  'k': 'B4',
  'l': 'C5'
}

function setup() {
  createCanvas(400, 400);

  filt = new Tone.Filter(1500, 'highpass').toDestination();
  rev = new Tone.Reverb(2).connect(filt);

  revAmpSlider = createSlider(0, 1, 0, 0.01);
  revAmpSlider.position(10, 100);
  revAmpSlider.input(() => {rev.decay = revAmpSlider.value()});
  filterSelect = createSelect();
  filterSelect.position(200, 100);

  filterSelect.option('lowshelf');
  filterSelect.option('lowpass');
  filterSelect.option('highpass');
  filterSelect.option('highshelf');
  filterSelect.option('bandpass');
  filterSelect.option('notch');
  filterSelect.option('allpass');
  filterSelect.option('peaking');

  filterSelect.selected('highpass');

  filterSelect.input(() => {filt.type = filterSelect.selected()});
  synth1 = new Tone.Synth({
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.9,
      release: 0.3
    }
  }).connect(rev);
  synth1.portamento.value = 0.5;
  polySynth = new Tone.PolySynth(Tone.Synth).connect(rev);
  polySynth.set({
    envelope: {
      attack: 0.3,
      decay: 0.6,
      sustain: 1,
      release: 0.7
    },
    oscillator: {
      type: 'sine'
    }
  })
  polySynth.volume.value = -3;
  ampEnv1 = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.5,
    sustain: 0,
    release: 0.1
  }).toDestination();
  filt1 = new Tone.Filter(1500, "highpass").connect(ampEnv1);
}

function draw() {
  background(220);
  text("Use keys a-f and h-l to play notes.\nUse the Reverb Slider to change the durartion of the reverb.\nUse the Filter Selector to select the filter used for the synth.", 20, 20)
  text('Reverb Slider', 10, 75);
  text('Filter Selection', 200, 75);
  if(key){
  text('Notes Playing: ', 75, 165);
  textSize(25);
  text(Object.keys(pressedKeys), 75, 200);
  textSize(12);
  }
}

function keyPressed() {
  let pitch1 = keyNotes1[key];
  if (pitch1) {
    pressedKeys[keyNotes1[key]] = true;
    polySynth.triggerAttack(pitch1);
  
  }
}

function keyReleased() {
  let pitch1 = keyNotes1[key];
  if (pitch1) {
    delete pressedKeys[keyNotes1[key]];
    polySynth.triggerRelease(pitch1);
  }
}