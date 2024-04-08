let publicKey = "76a3f61f5cdca6a5cc74a8b4a8f604ea";
let privateKey = "ec8c03cc8dddd209276de6b2aafe887035a94890";
let ts = new Date().getTime();
let hash = CryptoJS.MD5(ts+ privateKey+publicKey).toString();
if (!window.location.href.includes("superhero.html")) {  //if statement because when click on superHero name superHero.html is render , to prevent index.html file from rendering again

    const superHerosRow = document.querySelector(".row");
    const searchInputElement = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    let superHeros = []; //array of objects containing all superheros info
    const favouritesJSON = localStorage.getItem("favoriteSuperhero");
    if (favouritesJSON !== null) {
        const favourites = JSON.parse(favouritesJSON);
        document.querySelector("sup").innerHTML = favourites.length;
    } else {
        document.querySelector("sup").innerHTML = "0";
    }
    async function getData(){
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        const user = await response.json();
        superHeros = user.data.results;
        displaySuperHeros(superHeros);
    }

    function displaySuperHeros(superHeros) {
       superHerosRow.innerHTML = " ";
        superHeros.forEach((superHero,index)=>{
            let ext=".jpg";
            if(index==11)  //this is just because one superhero image have gif extension
            {
                ext = ".gif";
            }
            const card= ` <div class="col col-12 col-md-6 col-lg-4 my-4">
                            <div class="card" style="width: 18rem;">
                                <img class="card-img-top" src="${superHero.thumbnail.path}${ext}" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title mb-5 superheros-name">${superHero.name}</h5>
                                    <button class="btn btn-primary mx-5 favourite-button">Add to Favourite</button>
                                </div>
                            </div>
                        </div>
                            `
            superHerosRow.innerHTML += card;
        })

        //apply click event listener on all superHeros name
        const superherosName = document.querySelectorAll(".superheros-name");
        superherosName.forEach((superheroName,index)=>{
            superheroName.addEventListener("click",()=>{
                const superheroId = superHeros[index].id;
                window.location.href = `superhero.html`;
                localStorage.setItem("selectedSuperheroIndex", superheroId);
            })
        })

        //apply click event listener on add to favourite button for all superHeros

        const favouriteButtons = document.querySelectorAll(".favourite-button");
        let favouriteSuperHeros=[];
        favouriteButtons.forEach((favouriteButton, index) => {
            favouriteButton.addEventListener("click", () => {
                const presentItems = JSON.parse(localStorage.getItem("favoriteSuperhero")); //after refreshing if previous items in localstorage
                favouriteSuperHeros=[];
                if(presentItems) {
                    presentItems.forEach((item)=> favouriteSuperHeros.push(item));
                }
                if(favouriteSuperHeros.find((favouriteSuperHero)=>favouriteSuperHero.id === superHeros[index].id))
                {
                    alert("this superhero is already in favourite");
                    return;
                }
                if(!confirm("want to favourite this superhero?"))
                    return;
                
                favouriteSuperHeros.push(superHeros[index]);
                document.querySelector("sup").innerHTML = favouriteSuperHeros.length;
                localStorage.setItem("favoriteSuperhero", JSON.stringify(favouriteSuperHeros));
            });
        });
    }
    document.addEventListener("DOMContentLoaded",getData);
    //add click event listener on searchButton
    searchButton.addEventListener("click",()=>{
        console.log('s');
        const inputValue = searchInputElement.value.trim().toLowerCase();
        const filterData = superHeros.filter((superHero)=> superHero.name.toLowerCase().includes(inputValue));
        if(!filterData.length)
        {
            alert("no item found");
            searchInputElement.value = " ";
            return;
        }
        searchInputElement.value = " ";
        displaySuperHeros(filterData);
    })
}
export {ts,hash,publicKey};