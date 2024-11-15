import React from 'react';

function ComicDetails({ comic, onBack }) {
  return (
    <div>
      {/* Título */}
      <h2>{comic.title}</h2>
      {/* Imagen */}
      <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
      {/* Descripcion */}
      <p>{comic.description}</p>
      {/* Personajes */}
      <h3>Personajes:</h3>
      {comic.characters.items.map(character => (
        <p key={character.resourceURI}>{character.name}</p>
      ))}
      <button onClick={onBack}>Volver a la lista</button>
    </div>
  );
}

export default ComicDetails;
