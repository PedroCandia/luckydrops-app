import { useState } from 'react';
import './App.css';
import { getRandomChallenge } from './raritySystem';

const OPEN_DELAY = 1150;

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

    setChallenge(null);
    setIsOpening(true);

    window.setTimeout(() => {
      setChallenge(getRandomChallenge());
      setIsOpening(false);
    }, OPEN_DELAY);
  };

  return (
    <main className="game-screen">
      <div className="stadium-lights" />
      <div className="arena-grid" />
      <section className="game-stage" aria-label="Lucky Blocks RL">
        <p className="eyebrow">Rocket League Challenge Drop</p>
        <h1>Lucky Blocks RL</h1>
        <p className="subtitle">
          Rompe el bloque, recibe un reto y lleva la partida al caos.
        </p>

        <div className="block-stage">
          <LuckyBlock isOpening={isOpening} onOpen={openLuckyBlock} />
        </div>

        <ChallengeCard challenge={challenge} onReset={openLuckyBlock} />
      </section>
    </main>
  );
}

export default App;
