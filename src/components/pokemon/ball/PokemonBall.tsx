import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import ballSound from '../../../assets/ball-click.mp3';
import './pokemon-ball.module.css';

interface PokemonBallProps {
  onClick: () => void;
}

const PokemonBall: React.FC<PokemonBallProps> = ({ onClick }) => {
  const [play] = useSound(ballSound, { volume: 0.5 });
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    if (!isOpened) {
      play();
      setIsOpened(true);
      onClick();
    }
  };

  const containerVariants = {
    closed: { x: 0 },
    open: { x: -300, transition: { delay: 0.6, duration: 0.6 } },
  };

  const topVariants = {
    closed: { y: 0, rotate: 0 },
    open: { y: -30, rotate: -15, transition: { duration: 0.5 } },
  };

  const bottomVariants = {
    closed: { y: 0, rotate: 0 },
    open: { y: 30, rotate: 15, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="pokemon-ball-container"
      onClick={handleClick}
      initial="closed"
      animate={isOpened ? 'open' : 'closed'}
      variants={containerVariants}
    >
      <motion.svg viewBox="0 0 100 140" className="pokemon-ball-svg">
        <circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth="5" />
        <motion.g variants={topVariants}>
          <path d="M5,50 A45,45 0 0 1 95,50 L50,50 Z" fill="red" />
        </motion.g>
        <motion.g variants={bottomVariants}>
          <path d="M95,50 A45,45 0 0 1 5,50 L50,50 Z" fill="white" />
        </motion.g>
        <rect x="5" y="50" width="90" height="2" fill="black" />
        <circle cx="50" cy="50" r="10" fill="white" stroke="black" strokeWidth="3" />
      </motion.svg>
    </motion.div>
  );
};

export default PokemonBall;
