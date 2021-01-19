import React from 'react';


function Card(props) {

  function handleClick() {
    props.onCardClick(props);
    
  } 

  return (

    <li className="card">
      <button className="card__button-delete" type="button" aria-label="Удалить"></button>
      <img className="card__image" src={props.link} alt={props.name} onClick={handleClick}/>
      <div className="card__elements">
        <h2 className="card__title">{props.name}</h2>
        <button className="card__button-like" type="button" aria-label="Лайк"></button>
        <div className="card__button-likes-counter">{props.likes}</div>
      </div>
    </li>
  );
}

export default Card;
