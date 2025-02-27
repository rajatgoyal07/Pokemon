import React from "react";
import "./home-page.module.css"
import { usePokemon } from "../../hooks/usePokemon";
import PokemonBall from "../../components/pokemon/ball/PokemonBall";
import PokemonDetails from "../../components/pokemon/details/PokemonDetails";

const HomePage: React.FC = () => {
  const { pokemon, loading, error, fetchPokemon } = usePokemon();

  const handleBallClick = () => {
    fetchPokemon();
  };

  return (
    <div className="home-page">
      {!pokemon && <PokemonBall onClick={handleBallClick} />}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {pokemon && <PokemonDetails pokemon={pokemon} />}
    </div>
  );
};

export default HomePage;
