import { useState, useCallback } from "react";
import { Pokemon } from "../components/pokemon/details/PokemonDetails";

const MAX_POKEMON_ID = 898;

export const usePokemon = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPokemon = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch Pokémon");
            }
            const data = await response.json();
            setPokemon(data);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    return { pokemon, loading, error, fetchPokemon };
};
