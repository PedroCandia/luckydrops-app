import { useState } from 'react';
import './App.css';
import Collaborators from './Collaborators';
import { getRandomChallenge } from './raritySystem';

const OPEN_DELAY = 1150;

let audioContext;

const getAudioContext = () => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {});
  }

  return audioContext;
};

const playSound = (src, volume) => {
  const audio = new Audio(src);
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play().catch(() => {});
};

const playTone = (context, { frequency, start, duration, volume, type = 'sine' }) => {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.03);
};

const playChestOpenSound = () => {
  playSound('/sounds/chest-open.wav', 0.5);

  const context = getAudioContext();
  if (!context) {
    return;
  }

  const now = context.currentTime;
  playTone(context, {
    frequency: 150,
    start: now,
    duration: 0.22,
    volume: 0.36,
    type: 'triangle',
  });
  playTone(context, {
    frequency: 330,
    start: now + 0.05,
    duration: 0.32,
    volume: 0.16,
    type: 'sawtooth',
  });
  playTone(context, {
    frequency: 880,
    start: now + 0.08,
    duration: 0.12,
    volume: 0.2,
    type: 'square',
  });
};

const playRewardRevealSound = () => {
  playSound('/sounds/reward-reveal.wav', 0.45);

  const context = getAudioContext();
  if (!context) {
    return;
  }

  const now = context.currentTime;
  [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
    playTone(context, {
      frequency,
      start: now + index * 0.09,
      duration: 0.46,
      volume: 0.18,
      type: 'sine',
    });
    playTone(context, {
      frequency: frequency * 2,
      start: now + index * 0.09,
      duration: 0.32,
      volume: 0.07,
      type: 'triangle',
    });
  });
};

function LuckyBlock({ isOpening, onOpen }) {
  return (
    <button
      className={`lucky-block-button ${isOpening ? 'is-opening' : ''}`}
      type="button"
      onClick={onOpen}
      disabled={isOpening}
      aria-label="Abrir Lucky Block"
    >
      <span className="block-glow" />
      <span className="block-particles" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, index) => (
          <span key={index} className={`particle particle-${index + 1}`} />
        ))}
      </span>
      <span className="lucky-cube">
        <span className="cube-face cube-front">
          <span>?</span>
        </span>
        <span className="cube-face cube-right">
          <span>?</span>
        </span>
        <span className="cube-face cube-top">
          <span>?</span>
        </span>
      </span>
    </button>
  );
}

function ChallengeCard({ challenge, onReset }) {
  if (!challenge) {
    return null;
  }

  return (
    <section
      className={`challenge-card rarity-${challenge.rarity}`}
      style={{ '--rarity-color': challenge.color }}
      aria-live="polite"
    >
      <span className="rarity-badge">{challenge.rarityLabel}</span>
      <h2>{challenge.name}</h2>
      <button className="open-again-button" type="button" onClick={onReset}>
        Abrir otro Lucky Block
      </button>
    </section>
  );
}

function App() {
  const [challenge, setChallenge] = useState(null);
  const [isOpening, setIsOpening] = useState(false);

  const openLuckyBlock = () => {
    if (isOpening) {
      return;
    }

    playChestOpenSound();

    setChallenge(null);
    setIsOpening(true);

    window.setTimeout(() => {
      setChallenge(getRandomChallenge());
      setIsOpening(false);
      playRewardRevealSound();
    }, OPEN_DELAY);
  };

  return (
    <main className="app-shell">
      <div className="stadium-light-rig" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} className={`stadium-light stadium-light-${index + 1}`} />
        ))}
      </div>
      <section className="hero-section">
        <div className="game-stage" aria-label="Lucky Blocks RL">
          <p className="eyebrow">Rocket League Challenge Drop</p>
          <h1>Lucky Blocks RL</h1>
          <p className="subtitle">
            Rompe el bloque, recibe un reto y lleva la partida al caos.
          </p>

          <div className="block-stage">
            <LuckyBlock isOpening={isOpening} onOpen={openLuckyBlock} />
          </div>

          <ChallengeCard challenge={challenge} onReset={openLuckyBlock} />
        </div>
      </section>
      <Collaborators />
    </main>
  );
}

export default App;
