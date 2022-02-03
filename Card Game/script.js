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

    checkForMatch();
  }

  function checkForMatch() {
    (firstCard.dataset.number === secondCard.dataset.number) ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }

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


