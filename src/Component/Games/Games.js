import React from 'react';
import './Games.css'

export default function Games(props) {

  const title = props.game.handle.charAt(0).toUpperCase() + props.game.handle.slice(1).split('-').join(' ');



  return (
    <div className='game-card'>
        <img src={props.game.images.medium} alt='Photo du jeu' className='game-card__img'/>
        <h2 className='game-card__title'>{title}</h2>
        <div className='game-card__data'>
          <p>{props.game.year_published}</p>
          <p>{props.game.min_players ? props.game.min_players + ' à ' + props.game.max_players + ' joueurs' : ''}</p>
          <p>{props.game.min_playtime ? props.game.min_playtime + ' à ' + props.game.max_playtime + ' min' : ''}</p>
        </div>
    </div>
  )
}
