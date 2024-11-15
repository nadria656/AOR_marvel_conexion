import React from 'react';

function ComicList({ comics, onComicSelect, toggleFavorite, favorites }) {
  return (
    <div className="comic-list">
      {comics.map(comic => (
        <div className="comic-item" key={comic.id}>
          {/* Titulo */}
          <h2>{comic.title}</h2>
          {/* Imagen */}
          <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
          {/* Detalles */}
          <button onClick={() => onComicSelect(comic.id)}>Ver Detalles</button>
          {/* Favoritos */}
          <button onClick={() => toggleFavorite(comic)}>
            {/* Manejar los comics favoritos */}
            {favorites.some(fav => fav.id === comic.id) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ComicList;
