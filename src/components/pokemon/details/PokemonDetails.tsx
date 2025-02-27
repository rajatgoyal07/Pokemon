import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./pokemon-details.module.css";

export interface PokemonType {
    type: {
        name: string;
    };
}

export interface PokemonStat {
    stat: {
        name: string;
    };
    base_stat: number;
}

export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    types: PokemonType[];
    stats: PokemonStat[];
}

interface PokemonDetailsProps {
    pokemon: Pokemon | null;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const statMaxes: { [key: string]: number } = {
        hp: 255,
        attack: 190,
        defense: 250,
        "special-attack": 194,
        "special-defense": 250,
        speed: 200,
    };

    useEffect(() => {
        if (pokemon) {
            const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
            const exists = favorites.find((fav: Pokemon) => fav.id === pokemon.id);
            setIsFavorite(!!exists);
        }
    }, [pokemon]);

    const handleFavorite = () => {
        if (!pokemon) return;
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        if (isFavorite) {
            const updated = favorites.filter((fav: Pokemon) => fav.id !== pokemon.id);
            localStorage.setItem("favorites", JSON.stringify(updated));
            setIsFavorite(false);
        } else {
            favorites.push(pokemon);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(true);
        }
    };

    if (!pokemon) return null;

    return (
        <motion.div
            className={styles.pokemonDetails}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className={styles.pokemonName}>{pokemon.name.toUpperCase()}</h2>
            <div className={styles.detailsHeader}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className={styles.pokemonImage} />
                <button onClick={handleFavorite} className={styles.favoriteBtn}>
                    {isFavorite ? "Remove Favorite" : "Add to Favorites"}
                </button>
            </div>
            <div className={styles.pokemonTypes}>
                {pokemon.types.map((t, index) => (
                    <motion.span
                        key={index}
                        className={`${styles.typeBadge} ${t.type.name}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {t.type.name.toUpperCase()}
                    </motion.span>
                ))}
            </div>

            <div className={styles.pokemonStats}>
                {pokemon.stats.map((stat, index) => {
                    const max = statMaxes[stat.stat.name] || 100;
                    const normalizedStat = Math.min((stat.base_stat / max) * 100, 100);
                    return (
                        <div key={index} className={styles.stat}>
                            <span className={styles.statName}>{stat.stat.name.replace("-", " ").toUpperCase()} : </span>
                            <span className={styles.statBar}>
                                <motion.div
                                    className={styles.statBarFill}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${normalizedStat}%` }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                >
                                    <span className={styles.statValue}>{stat.base_stat}</span>
                                </motion.div>
                            </span>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default PokemonDetails;
