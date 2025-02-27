import React, { useState, useEffect } from "react";
import styles from "./favorites-page.module.css";
import PokemonDetails, { Pokemon } from "../../components/pokemon/details/PokemonDetails";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  return (
    <div className={styles.favoritesPage}>
      <h2>Favorite Pokémon</h2>
      {favorites.length === 0 ? (
        <p>No favorite Pokémon yet.</p>
      ) : (
        favorites.map((pokemon) => (
          <PokemonDetails key={pokemon.id} pokemon={pokemon} />
        ))
      )}
    </div>
  );
};

export default FavoritesPage;
