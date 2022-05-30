import React from 'react';
import './Games.css';
import {BsCheckCircle as Checkbox} from 'react-icons/bs'
import { IconContext } from 'react-icons';

export default function Games(props) {
  const title =
    props.game.handle.charAt(0).toUpperCase() +
    props.game.handle.slice(1).split('-').join(' ');

  return (
    <div className='game-card'>
      <img
        src={props.game.images.medium}
        alt='Photo du jeu'
        className='game-card__img'
      />
      <h2 className='game-card__title'>{title}</h2>
      <div className='game-card__data'>
        <p>{props.game.year_published}</p>
        <span>-</span>
        <p>
          {props.game.min_players ? props.game.min_players : '?'}&nbsp; à &nbsp;
          {props.game.max_players ? props.game.max_players : '?'} &nbsp;joueurs
        </p>
        <span>-</span>
        <p>
          {props.game.min_playtime ? props.game.min_playtime : '?'}&nbsp; à
          &nbsp;{props.game.max_playtime ? props.game.max_playtime : '?'}{' '}
          &nbsp;min
        </p>
      </div>
      <IconContext.Provider value={{size: '1.5rem'}}>
      <span className='checkbox'><Checkbox /></span>
      </IconContext.Provider>
    </div>
  );
}
