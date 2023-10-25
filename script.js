document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    let canFlip = true;
    let firstCard, secondCard;
 
    function flipCard() {
        if (!canFlip) return;
        this.classList.add("flipped");
 
        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            checkMatch();
        }
    }
 
    function checkMatch() {
        if (firstCard.dataset.image === secondCard.dataset.image) {
            disableCards();
        } else {
            unflipCards();
        }
    }
 
    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
    }
 
    function unflipCards() {
        canFlip = false;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
 
    function resetBoard() {
        [canFlip, firstCard, secondCard] = [true, null, null];
    }
 
    function shuffleCards() {
        cards.forEach(card => {
            const randomPos = Math.floor(Math.random() * 8);
            card.style.order = randomPos;
        });
    }
 
    cards.forEach(card => card.addEventListener("click", flipCard));
    shuffleCards();
 
    document.getElementById("newGame").addEventListener("click", () => {
        cards.forEach(card => {
            card.classList.remove("flipped");
            card.addEventListener("click", flipCard);
        });
        shuffleCards();
    });
 });
 