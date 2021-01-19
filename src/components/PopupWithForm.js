import React from 'react';

function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen}`}>
      <div className="popup__container">
        <button className="popup__close-icon" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <form className="form" method="GET" action="#" name={`${props.name}`} noValidate>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__save-button" type="submit" aria-label={props.button}>{props.button}</button>
        </form>
      </div>
    </div>  
   
  );
}

export default PopupWithForm;