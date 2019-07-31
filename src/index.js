const theatreId = 696;
const ourUrl = "https://evening-plateau-54365.herokuapp.com/theatres/696";

// X Set up initial GET function for API, test it
// X Render Data on DOM, create elements
// X Add event listeners for BUY TICKET functionality
// X Test events, make sure they're working
// X Add Logic (POST) for ticket purchase to persist in API
// X We'll know this works when amount of tickets decreases in the database
// X Hide button for sold out shows

getData = () => {
  fetch(ourUrl)
    .then(resp => resp.json())
    .then(json => renderTheatre(json));
}

renderTheatre = json => {
  let shows = json.showings;
  shows.forEach(show => {
    createCard(show);
  });
}

createCard = show => {
  const cardHtml = `<div class="content">
    <div class="header">
      ${show.film.title}
    </div>
    <div class="meta">
      ${show.film.runtime} minutes
    </div>
    <div class="description">
      <span class="tickets-remaining">${show.capacity -
        show.tickets_sold}</span> remaining tickets
    </div>
    <span class="ui label">
      ${show.showtime}
    </span>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>`;
  const cardsElement = document.querySelector(".cards");
  const newCard = document.createElement("div");
  newCard.className = "card";
  newCard.innerHTML = cardHtml;
  cardsElement.appendChild(newCard);
  addBuyTicketListener(newCard, show.id);
}

function addBuyTicketListener(card, id) {
  const button = card.querySelector(".button");
  const ticketCounter = card.querySelector(".tickets-remaining");
  if (ticketCounter.innerText == 0) {
    button.outerHTML = "Sold Out";
  }
  button.addEventListener("click", function() {
    ticketCounter.innerText = ticketCounter.innerText - 1;
    if (ticketCounter.innerText == 0) {
      button.outerHTML = "Sold Out";
    }
    createTicket(id);
  });
}

function createTicket(showing_id) {
  const createUrl = "https://evening-plateau-54365.herokuapp.com/tickets";
  fetch(createUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      showing_id: showing_id
    })
  })
    .then(resp => resp.json())
    .then(json => json);
}

document.addEventListener("DOMContentLoaded", () => {
  getData();
});
