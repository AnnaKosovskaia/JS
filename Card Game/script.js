(function() {

  const cardArray = document.querySelectorAll('.card');
  const container = document.querySelector('#container');
  const wrapper = document.querySelector('#wrapper');
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard;
  let secondCard;

  cardArray.forEach((card) => {
    card.classList.add('card', 'w-25', 'd-flex', 'align-items-center', 'justify-content-center');

    (function shuffle() {
      let ramdomPos = Math.floor(Math.random() * 16);
      card.style.order = ramdomPos;
    })();

    card.addEventListener('click', flipCard);

  });

  container.classList.add('pt-5')
   wrapper.classList.add('d-flex', 'flex-wrap');

   function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('active');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    // hasFlippedCard = false;

    checkForMatch();
  }

  // ф-я для сравнения кард
  function checkForMatch() {
    (firstCard.dataset.number === secondCard.dataset.number) ? disableCards() : unflipCards();
  }

  // ф-я которая оставляет карточки перевернутыми
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }

  // ф-я кот возвращает карточки в исходное положение
  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('active');
      secondCard.classList.remove('active');

      resetBoard();
    }, 1000)
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }


})();








  // flipCard();

  // card.classList.add('card', 'w-25', 'd-flex', 'align-items-center', 'justify-content-center'); //потом ширину сделать auto

//   let cardsArray = [];
//   let card;
//   // ф-я которая создает карточки
//   function createCards(count) {

//     const container = document.querySelector('#container');
//     const wrapper = document.createElement('ul');



//     for (let i = 1; i <= count; i++) {
//       card = document.createElement('div');
//       card.classList.add('card', 'w-25', 'd-flex', 'align-items-center', 'justify-content-center'); //потом ширину сделать auto
//       card.textContent = i;
//       wrapper.append(card);
//       console.log(wrapper);
//     }



//     container.classList.add('pt-5')
//     wrapper.classList.add('d-flex', 'flex-wrap');

//     container.append(wrapper);
//   }


//   createCards('16');


