import ailingAvatar from './assets/ailing-logo.jpg';

const collaborators = [
  {
    name: 'Ailing',
    description: 'Creador de contenido de Rocket League',
    avatar: ailingAvatar,
    url: 'https://www.youtube.com/@ailing21',
  },
];

function Collaborators() {
  return (
    <section className="collaborators-section" aria-labelledby="collaborators-title">
      <h2 id="collaborators-title">Colaboradores</h2>
      <div className="collaborators-grid">
        {collaborators.map((collaborator) => (
          <article className="collaborator-card" key={collaborator.url}>
            <img
              className="collaborator-avatar"
              src={collaborator.avatar}
              alt={`Foto de perfil de ${collaborator.name}`}
            />
            <div className="collaborator-copy">
              <h3>{collaborator.name}</h3>
              <p>{collaborator.description}</p>
            </div>
            <a
              className="collaborator-link"
              href={collaborator.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Canal
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Collaborators;
