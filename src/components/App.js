import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../context/CurrentUserContext';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup'

function App() {

  // устанавливаем стейты для попапов
  const  [isEditProfilePopupOpen, profilePopupIsOpen] = React.useState('');
  const  [isAddPlacePopupOpen, placePopupIsOpen] = React.useState('');
  const  [isEditAvatarPopupOpen, avatarPopupIsOpen] = React.useState('');

  // обработчики открытия попапов
  const handleEditAvatarClick = () => {
    avatarPopupIsOpen("popup_opened");
  };

  const handleEditProfileClick = () => {
    profilePopupIsOpen("popup_opened");
  };

  const handleAddPlaceClick =() => {
    placePopupIsOpen("popup_opened");
  }
  // обработчик закрытия попапов
  const closeAllPopups = () => {
    avatarPopupIsOpen("");
    profilePopupIsOpen("");
    placePopupIsOpen("");
    imagePopupIsOpen("");
    selectedCardData([]);
  }

  
  // стейты для открытия попапов карточек
  const  [selectedCard, selectedCardData] = React.useState([]);
  const  [isImagePopupOpen, imagePopupIsOpen] = React.useState('');

  const handleCardClick = (card) => {
    
    imagePopupIsOpen("popup_opened")
    selectedCardData(card)
  }

  // стейт для определения пользоателя
  const [currentUser, currentUserUpdate] = React.useState([]);
  React.useEffect(() => {
    api.getProfileInfo()
      .then(data => {
        currentUserUpdate(data);
      })
  }, [])

  function handleUpdateUser(data) {
    api.setProfileInfo(data)
      .then(res => {
        currentUserUpdate(res);
        closeAllPopups();
      })

  }

  function handleUpdateAvatar(link) {
    api.updateAvatar(link)
      .then(res => {
        console.log(res)
        currentUserUpdate(res);
        closeAllPopups();
      })
  }

  // получаем инфу о карточках
  const  [cards, setCards] =  React.useState([]);
  
  React.useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data.map((item) => ({
          id: item._id,
          link: item.link,
          likes: item.likes,
          name: item.name,
          owner: item.owner
      })))})
      
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card.id, isLiked).then((newCard) => {

    // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
    const newCards = cards.map((c) => c.id === card.id ? newCard : c);
    console.log(card.owner._id)
    
    // Обновляем стейт
    setCards(newCards);
    });
  } 

  function handleCardDelete(card) {
    // Снова проверяем владельца карточки
    const isOwn = card.owner._id === currentUser._id;
    console.log(isOwn)
    console.log(card.id)
  
    // Отправляем запрос в API на удаление карточки
    api.deleteCard(card.id).then((newCard) => {
  
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCardsReduced = cards.filter((c) => c.id !== card.id);
      
      // Обновляем стейт
      setCards(newCardsReduced);
    });
  } 

  function handleAddPlaceSubmit(data) {
    api.addCard(data).then((newCard) => {
      setCards([newCard, ...cards]); 
    })
    closeAllPopups();
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header />

        <Main 
          onEditAvatar={handleEditAvatarClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditProfile={handleEditProfileClick} 
          onCardClick={handleCardClick} 
          cards={cards} 
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete} /> 

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}/> 

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} /> 

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup 
          isOpen={isImagePopupOpen} 
          onClose={closeAllPopups} 
          card={selectedCard} />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
