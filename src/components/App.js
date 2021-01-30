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
  const  [isEditProfilePopupOpen, profilePopupIsOpen] = React.useState(false);
  const  [isAddPlacePopupOpen, placePopupIsOpen] = React.useState(false);
  const  [isEditAvatarPopupOpen, avatarPopupIsOpen] = React.useState(false);

  // обработчики открытия попапов
  const handleEditAvatarClick = () => {
    avatarPopupIsOpen(true);
  };

  const handleEditProfileClick = () => {
    profilePopupIsOpen(true);
  };

  const handleAddPlaceClick =() => {
    placePopupIsOpen(true);
  }
  // обработчик закрытия попапов
  const closeAllPopups = () => {
    avatarPopupIsOpen("");
    profilePopupIsOpen("");
    placePopupIsOpen("");
    imagePopupIsOpen("");
    selectedCardData({});
  }

  
  // стейты для открытия попапов карточек
  const  [selectedCard, selectedCardData] = React.useState({});
  const  [isImagePopupOpen, imagePopupIsOpen] = React.useState(false);

  const handleCardClick = (card) => {
    imagePopupIsOpen(true)
    selectedCardData(card)
  }

  // стейт для определения пользоателя
  const [currentUser, currentUserUpdate] = React.useState({});
  React.useEffect(() => {
    api.getProfileInfo()
      .then(data => {
        currentUserUpdate(data);
      })
      .catch((err) => 'Ошибка: ' + err)
  }, [])

  function handleUpdateUser(data) {
    api.setProfileInfo(data)
      .then(res => {
        currentUserUpdate(res);
        closeAllPopups();
      })
      .catch((err) => 'Ошибка: ' + err);

  }

  function handleUpdateAvatar(link) {
    api.updateAvatar(link)
      .then(res => {
        console.log(res)
        currentUserUpdate(res);
        closeAllPopups();
      })
      .catch((err) => 'Ошибка: ' + err)
  }

  // получаем инфу о карточках
  const  [cards, setCards] =  React.useState([]);
  
  React.useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data.map((item) => ({
          _id: item._id,
          link: item.link,
          likes: item.likes,
          name: item.name,
          owner: item.owner
      })))})
      .catch((err) => 'Ошибка: ' + err)
      
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(liker => liker._id === currentUser._id);
    
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {

    // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
    const newCards = cards.map((oldCard) => {
      if (oldCard._id === card._id) { 
        return newCard
      } 
        else {
          return  oldCard
        }
    });
    
    // Обновляем стейт
    setCards(newCards);
    })
    .catch((err) => 'Ошибка: ' + err)
  } 

  function handleCardDelete(card) {
    // Снова проверяем владельца карточки
    const isOwn = card.owner._id === currentUser._id;

    // Отправляем запрос в API на удаление карточки
    api.deleteCard(card._id).then(() => {
  
      // Формируем новый массив на основе имеющегося, удаляя из него карточку
      const newCardsReduced = cards.filter((c) => c._id !== card._id);
      
      // Обновляем стейт
      setCards(newCardsReduced);
    })
    .catch((err) => 'Ошибка: ' + err)
  } 

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups(); 
      })
      .catch((err) => 'Ошибка: ' + err)
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
      
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
