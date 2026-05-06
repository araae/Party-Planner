//build API url from cohort
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2604-FTB-ET-WEB-FT";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

//create empty state
let parties = [];
let selectedParty;

//get all parties from API
//save them to state and update the page
async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    parties = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

//get one party from API
//save it to selectedParty
async function getParty(id) {
  try {
    const response = await fetch(`${API}/${id}`);
    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

//make a list item showing the party name
function PartyListItem(party) {
  const $li = document.createElement("li");
  if (selectedParty && selectedParty.id === party.id) {
    $li.classList.add("selected");
  }
  $li.innerHTML = `<a href="#selected">${party.name}</a>`;
  $li.addEventListener("click", () => {
    getParty(party.id);
  });
  return $li;
}

//make a list of all parties
function PartyList() {
  const $ul = document.createElement("ul");
  const $lis = parties.map(PartyListItem);
  $ul.replaceChildren(...$lis);
  return $ul;
}

//show details of the selected party
function PartyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }

  const $section = document.createElement("section");
  $section.innerHTML = `
    <h3>${selectedParty.name} #${selectedParty.id}</h3>
    <p>${selectedParty.date}</p>
    <address>${selectedParty.location}</address>
    <p>${selectedParty.description}</p>
  `;
  return $section;
}
