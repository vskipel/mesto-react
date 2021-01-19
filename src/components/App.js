import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function App() {

  const  [isEditProfilePopupOpen, ProfilePopupIsOpen] = React.useState('');
  const  [isAddPlacePopupOpen, PlacePopupIsOpen] = React.useState('');
  const  [isEditAvatarPopupOpen, AvatarPopupIsOpen] = React.useState('');


  const handleEditAvatarClick = () => {
    AvatarPopupIsOpen("popup_opened");
  };

  const handleEditProfileClick = () => {
    ProfilePopupIsOpen("popup_opened");
  };

  const handleAddPlaceClick =() => {
    PlacePopupIsOpen("popup_opened");
  }

  const closeAllPopups = () => {
    AvatarPopupIsOpen("");
    ProfilePopupIsOpen("");
    PlacePopupIsOpen("");
    ImagePopupIsOpen("");
    selectedCardData([]);
  }

  

  const  [selectedCard, selectedCardData] = React.useState([]);
  const  [isImagePopupOpen, ImagePopupIsOpen] = React.useState('');

  const handleCardClick = (card) => {
    
    ImagePopupIsOpen("popup_opened")
    selectedCardData(card)
    console.log(selectedCard)
  }

  return (
    <body className="page">

        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick} onCardClick={handleCardClick}/> 

        <PopupWithForm name={'edit-profile'} title='Редактировать профиль' isOpen={isEditProfilePopupOpen} children={
          <>
            <input maxlength="40" minlength="2" className="popup__item popup__item-name" type="text" name="name" value=""
              placeholder="Ваше имя" required aria-label="попап форма" />
            <span className="error" id="name-error"></span>
            <input maxlength="200" minlength="2" className="popup__item popup__item-job" type="text" name="job" value=""
              placeholder="Род деятельности" required aria-label="попап форма" />
            <span className="error" id="job-error"></span>
          </>
        } button="Сохранить" onClose={closeAllPopups}/>

        <PopupWithForm name={'add-card'} title='Новое место' isOpen={isAddPlacePopupOpen} children={
          <>
            <input maxlength="30" minlength="1" className="popup__item popup__item-place" type="text" name="name" value=""
              placeholder="Название" required aria-label="попап форма" />
            <span className="error" id="name-error"></span>
            <input className="popup__item popup__item-link" type="url" name="link" value="" placeholder="Ссылка на картинку"
              required aria-label="попап форма" />
            <span className="error" id="link-error"></span>
          </>
        } button="Создать" onClose={closeAllPopups}/>

        <PopupWithForm name={'update-avatar'} title='Обновить аватар' isOpen={isEditAvatarPopupOpen} children={
          <>
            <input className="popup__item popup__item-link" type="url" name="link" value="" placeholder="Ссылка на аватар"
              required aria-label="попап форма" />
            <span className="error" id="link-error"></span>
          </>
        } button="Сохранить" onClose={closeAllPopups}/>

        <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard}/>

        <Footer /> 


      <div className="popup popup_type_confirm">
        <div className="popup__container">
          <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <form className="form" method="GET" action="#" name="confirm" novalidate><button className="popup__save-button"
            type="submit" aria-label="Да">Да</button></form>
        </div>
      </div>

    </body>
  );
}

export default App;
