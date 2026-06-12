export const RARITIES = {
  common: {
    label: 'Común',
    chance: 60,
    color: '#55f28b',
    challenges: [
      'Gana una partida usando un coche aleatorio.',
      'Gana una partida usando Scarab.',
      'Gana una partida usando Aftershock.',
      'Anota un gol de tortuga.',
      'Haz una asistencia.',
      'Marca un gol con un flick.',
      'Choca los 5 con tu compañero.',
      'Bumpea a tu compañero.',
      'No puedes tomar los boost de 100.',
      'Consigue 2 salvadas en una partida.',
      'Haz una demo.',
      'Consigue 500 puntos en una partida.',
      'Anota el primer gol del partido.',
      'Gana una partida sin usar las paredes o el techo.',
      'Marca un gol desde la pared.',
    ],
  },

  rare: {
    label: 'Raro',
    chance: 25,
    color: '#38a8ff',
    challenges: [
      'Mete un flick 90 grados.',
      'Haz 3 demos en una partida.',
      'Gana usando la Merc.',
      'Marca un gol desde media cancha.',
      'Dale al crossbar.',
      'Haz un air dribble.',
      'Gana sin marcar goles.',
      'Marca un autogol.',
      'Marca un gol tras controlar el balón 3 segundos.',
      'Haz una doble salvada.',
      'Haz un half flip.',
      'Marca un gol con un powershot.',
      'Consigue hacer la regla 1.',
      'Consigue MVP de la partida.',
      'Falla un open.',
    ],
  },

  epic: {
    label: 'Épico',
    chance: 10,
    color: '#b76bff',
    challenges: [
      'Haz un ceiling shot.',
      'Mete un double tap.',
      'Anota con air dribble.',
      'Marca un gol desde la pared.',
      'No uses cámara balón hasta marcar un gol.',
      'Gana una partida usando cámara del balón únicamente.',
      'Marca un gol sin usar boost.',
      'Haz un flick 180.',
      'Haz un pogo y marca gol.',
      'Marca un gol después de un reset.',
      'Consigue 3 demos en una partida.',
      'Haz un fake y marca un gol.',
      'Marca un gol haciendo un ground pinch.',
      'Bumpea a tu compañero 3 veces.',
      'Gana una partida sin saltar.',
    ],
  },

  legendary: {
    label: 'Legendario',
    chance: 5,
    color: '#ffd45a',
    challenges: [
      'Haz un flip reset.',
      'Mete un musty flick.',
      'Haz un kuxir pinch.',
      'Gana una partida sin usar boost.',
      'Marca un double tap.',
      'Haz un ceiling musty.',
      'Antes de marcar un gol activa la camara trasera.',
      'Consigue 5 demos en una partida.',
      'Intenta hacer un psycho.',
      'Haz un breezi flick.',
      'Juega toda la partida sin usar cámara balón.',
      'Haz un pinch con tu compañero.',
      'Marca un autogol.',
      'Haz un air dribbling de tortuga.',
      'No puedes usar airrol o derrape.',
    ],
  },
};

const rarityOrder = ['common', 'rare', 'epic', 'legendary'];

const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];

export function getRandomChallenge() {
  const roll = Math.random() * 100;
  let threshold = 0;

  for (const rarityKey of rarityOrder) {
    const rarity = RARITIES[rarityKey];
    threshold += rarity.chance;

    if (roll < threshold) {
      return {
        id: `${rarityKey}-${Date.now()}`,
        rarity: rarityKey,
        rarityLabel: rarity.label,
        color: rarity.color,
        name: pickRandom(rarity.challenges),
      };
    }
  }

  const fallback = RARITIES.common;

  return {
    id: `common-${Date.now()}`,
    rarity: 'common',
    rarityLabel: fallback.label,
    color: fallback.color,
    name: pickRandom(fallback.challenges),
  };
}
