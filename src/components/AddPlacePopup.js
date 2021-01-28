import React from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props){

  const inputRefName = React.useRef(); 
  const inputRefLink = React.useRef(); 

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: inputRefName.current.value,
      link: inputRefLink.current.value
    });
  }

  return (
    <PopupWithForm name={'add-card'} title='Новое место' button="Создать"
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit} >
      <input ref={inputRefName} maxLength="30" minLength="1" className="popup__item popup__item-place" type="text" name="name" 
        placeholder="Название" required aria-label="попап форма" />
      <span className="error" id="name-error"/>
      <input ref={inputRefLink} className="popup__item popup__item-link" type="url" name="link" placeholder="Ссылка на картинку"
        required aria-label="попап форма" />
      <span className="error" id="link-error"/>
    </PopupWithForm>
  )
}


export default AddPlacePopup;