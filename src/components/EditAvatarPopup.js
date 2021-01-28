import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props){
  const inputRef = React.useRef(); 

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm name={'update-avatar'} title='Обновить аватар' isOpen={props.isOpen} button="Сохранить" onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={inputRef} className="popup__item popup__item-link" type="url" name="link" placeholder="Ссылка на аватар"
        required aria-label="попап форма"/>
      <span className="error" id="link-error"/>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;