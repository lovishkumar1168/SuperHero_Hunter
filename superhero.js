const superheroContainerRow = document.querySelector(".row");
import {ts,hash,publicKey} from './index.js'


async function getSuperheroDetails() {
    const superheroId = localStorage.getItem("selectedSuperheroIndex");
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${superheroId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
    const superheroData = await response.json();
    const superhero = superheroData.data.results[0];
    displaySuperheroDetails(superhero); //func to display superHEroDetails like name and pic
    displayComics(superhero); //to display Comics related to superero
    displaySeries(superhero); //to display Series related to superero
    displayEventsandStories(superhero); //to display Events and Stories related to superero
}

function displaySuperheroDetails(superHero) {
    const card= `   <div class="col col-12 col-md-6 col-lg-3 my-4">
                        <div class="card" style="width: 18rem;">
                            <img class="card-img-top" src="${superHero.thumbnail.path}.jpg" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title mb-5">${superHero.name}</h5>
                                <p class="card-text">Id : ${superHero.id}</p>
                                <p class="card-text">Comic Available : ${superHero.comics.available}</p>
                                <p class="card-text">Events Available : ${superHero.events.available}</p>
                                <p class="card-text">Series Available : ${superHero.series.available}</p>
                                <p class="card-text">Stories Available : ${superHero.stories.available}</p>
                            </div>
                        </div>
                    </div>
                `
    superheroContainerRow.innerHTML = card;
}


function displayComics(superhero) {
    const comics = superhero.comics.items;
    const comicsList = document.createElement('ul');
    comicsList.classList.add("comics-list");
    comics.forEach((comic) => {
        const listItem = document.createElement('li');
        listItem.textContent = comic.name;
        comicsList.appendChild(listItem);
    });

    const comicsColumn = `
                            <div class="col col-12 col-md-6 col-lg-3 my-4">
                                <div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">Comics</h5>
                                        ${comicsList.outerHTML}
                                    </div>
                                </div>
                            </div>
                        `;
    superheroContainerRow.innerHTML += comicsColumn;
}


function displaySeries(superhero) {
    const allSeries = superhero.series.items;
    const seriesList = document.createElement('ol');
    seriesList.classList.add("series-list");
    allSeries.forEach((series) => {
        const listItem = document.createElement('li');
        listItem.textContent = series.name;
        seriesList.appendChild(listItem);
    });

    const seriesColumn = `
                            <div class="col col-12 col-md-6 col-lg-3 my-4">
                                <div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">Series</h5>
                                        ${seriesList.outerHTML}
                                    </div>
                                </div>
                            </div>
                        `;
    superheroContainerRow.innerHTML += seriesColumn;
}



function displayEventsandStories(superhero) {
    const events = superhero.events.items;
    const stories = superhero.stories.items;
    const eventsList = document.createElement('ul');
    eventsList.classList.add("events-list");
    events.forEach((event) => {
        const listItem = document.createElement('li');
        listItem.textContent = event.name;
        eventsList.appendChild(listItem);
    });
    const storiesList = document.createElement('ul');
    storiesList.classList.add("stories-list");
    stories.forEach((story) => {
        const listItem = document.createElement('li');
        listItem.textContent = story.name;
        storiesList.appendChild(listItem);
    });
    const eventsstoriesColumn = `
                                    <div class="col col-12 col-md-6 col-lg-3 my-4">
                                        <div class="card" style="width: 18rem;">
                                            <div class="card-body">
                                                <h5 class="card-title">events</h5>
                                                ${eventsList.outerHTML}
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">Stories</h5>
                                                ${storiesList.outerHTML}
                                            </div>
                                        </div>
                                    </div>
                                `
    superheroContainerRow.innerHTML += eventsstoriesColumn;
}


document.addEventListener("DOMContentLoaded", () => {
    getSuperheroDetails();
});