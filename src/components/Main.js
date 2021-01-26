import React from 'react';
import api from '../utils/api'
import Card from './Card';

function Main(props) {
  
  // получаем начальные данные
  const  [userName, setUserName] = React.useState('');
  const  [userDescription, setUserDescription] = React.useState('');
  const  [userAvatar, setUserAvatar] = React.useState('');
 
  React.useEffect(() => {
    api.getProfileInfo()
      .then(data => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
  }, [])
  
  // получаем инфу о карточках
  const  [cards, setCards] =  React.useState([]);
  
  React.useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data.map((item) => ({
          id: item._id,
          link: item.link,
          likes: item.likes,
          name: item.name
      })))})
      
  }, [])

  return (
    <>
    <main className="main">

      <section className="profile">
        <img src={userAvatar} alt="аватар" className="profile__avatar"></img> 
        <div className="profile__avatar-edit" onClick={props.onEditAvatar}></div>
        <div className="profile-info">
          <h1 className="profile-info__title">{userName}</h1>
          <button type="button" className="edit-button" onClick={props.onEditProfile}/>
          <p className="profile-info__subtitle">{userDescription}</p>
        </div>
        <button type="button" className="add-button" onClick={props.onAddPlace}/>
      </section>

      <ul className="cards">
        {
          cards.map((card) => <Card key={card.id} name={card.name} link={card.link} likes={card.likes.length} onCardClick={props.onCardClick}/>)
        }
      </ul>
    </main>

    </>
  );
}

export default Main;