import './AdBanner.css';
import ailingBanner from './assets/ailing-channel-banner.png';

function AdBanner() {
  return (
    <aside
      className="channel-promo"
      aria-label="Canal de YouTube de Ailing"
      style={{ '--ailing-banner': `url(${ailingBanner})` }}
    >
      <div className="channel-promo-copy">
        <strong>🎮 Ailing</strong>
        <span>Rocket League en español</span>
      </div>
      <a
        className="channel-promo-button"
        href="https://www.youtube.com/@ailing21"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver Canal
      </a>
    </aside>
  );
}

export default AdBanner;
