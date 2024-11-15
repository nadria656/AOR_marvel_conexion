import React from 'react';

function Favorites({ favorites }) {
  return (
    <div>
      <h2>Cómics Favoritos</h2>
      {/* Lista de los comics favoritos */}
      <ul>
        {/*Titulo de los comics favoritos */}
        {favorites.map(fav => <li key={fav.id}>{fav.title}</li>)}
      </ul>
    </div>
  );
}

export default Favorites;
