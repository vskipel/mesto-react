import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function App() {

  const  [isEditProfilePopupOpen, profilePopupIsOpen] = React.useState('');
  const  [isAddPlacePopupOpen, placePopupIsOpen] = React.useState('');
  const  [isEditAvatarPopupOpen, avatarPopupIsOpen] = React.useState('');


  const handleEditAvatarClick = () => {
    avatarPopupIsOpen("popup_opened");
  };

  const handleEditProfileClick = () => {
    profilePopupIsOpen("popup_opened");
  };

  const handleAddPlaceClick =() => {
    placePopupIsOpen("popup_opened");
  }

  const closeAllPopups = () => {
    avatarPopupIsOpen("");
    profilePopupIsOpen("");
    placePopupIsOpen("");
    imagePopupIsOpen("");
    selectedCardData([]);
  }

  

  const  [selectedCard, selectedCardData] = React.useState([]);
  const  [isImagePopupOpen, imagePopupIsOpen] = React.useState('');

  const handleCardClick = (card) => {
    
    imagePopupIsOpen("popup_opened")
    selectedCardData(card)
  }

  return (
    <div className="page">
        <Header />

        <Main onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick} onCardClick={handleCardClick}/> 

        <PopupWithForm name={'edit-profile'} title='Редактировать профиль' isOpen={isEditProfilePopupOpen} button="Сохранить" onClose={closeAllPopups}> 
            <input maxLength="40" minLength="2" className="popup__item popup__item-name" type="text" name="name" 
              placeholder="Ваше имя" required aria-label="попап форма" />
            <span className="error" id="name-error"/>
            <input maxLength="200" minLength="2" className="popup__item popup__item-job" type="text" name="job" 
              placeholder="Род деятельности" required aria-label="попап форма" />
            <span className="error" id="job-error"/>
        </PopupWithForm>

        <PopupWithForm name={'add-card'} title='Новое место' isOpen={isAddPlacePopupOpen} button="Создать" onClose={closeAllPopups}>
            <input maxLength="30" minLength="1" className="popup__item popup__item-place" type="text" name="name" 
              placeholder="Название" required aria-label="попап форма" />
            <span className="error" id="name-error"/>
            <input className="popup__item popup__item-link" type="url" name="link" placeholder="Ссылка на картинку"
              required aria-label="попап форма" />
            <span className="error" id="link-error"/>
        </PopupWithForm>

        <PopupWithForm name={'update-avatar'} title='Обновить аватар' isOpen={isEditAvatarPopupOpen} button="Сохранить" onClose={closeAllPopups}>
            <input className="popup__item popup__item-link" type="url" name="link" placeholder="Ссылка на аватар"
              required aria-label="попап форма" />
            <span className="error" id="link-error"/>
        </PopupWithForm>

        <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard}/>

        <Footer /> 

      <div className="popup popup_type_confirm">
        <div className="popup__container">
          <button className="popup__close-icon" type="button" aria-label="Закрыть"/>
          <h2 className="popup__title">Вы уверены?</h2>
          <form className="form" method="GET" action="#" name="confirm" noValidate><button className="popup__save-button"
            type="submit" aria-label="Да">Да</button></form>
        </div>
      </div>
      
    </div>
  );
}

export default App;
