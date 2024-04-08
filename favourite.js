const ulElement = document.querySelector(".favourite-list");
function addItem() {
    const favouriteSuperheros = JSON.parse(localStorage.getItem("favoriteSuperhero"));
    document.querySelector("sup").innerHTML = favouriteSuperheros.length;

    // Add the superhero to the favorites list only if it exists in local storage
    if (favouriteSuperheros) {
        favouriteSuperheros.forEach((favouriteSuperhero)=>{
            const newItem = document.createElement("li");
            newItem.innerHTML = `<div class="card" style="width: 18rem;">
                                    <img class="card-img-top" src="${favouriteSuperhero.thumbnail.path}.jpg" alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title mb-5 superheros-name">${favouriteSuperhero.name}</h5>
                                        <button class="btn btn-primary mx-5 remove-button">Remove</button>
                                    </div>
                                </div>`;
            ulElement.appendChild(newItem);
        })
        
        //apply click event listener on all superHeros name
        const superherosName = document.querySelectorAll(".superheros-name");
        superherosName.forEach((superheroName,index)=>{
            superheroName.addEventListener("click",()=>{
                const superheroId = favouriteSuperheros[index].id;
                window.location.href = `superhero.html`;
                localStorage.setItem("selectedSuperheroIndex", superheroId);
            })
        })

        // add click event listener on remove button for all fav super Heros list
        const removeButtons = document.querySelectorAll(".remove-button");
        removeButtons.forEach((removeButton,index)=>{
            const liElement = removeButton.parentElement.parentElement.parentElement; //to find li element correspond to this button
            removeButton.addEventListener("click",()=> deleteItem(favouriteSuperheros[index],liElement));
        })
    }
    else
    {
        console.log("error");
    }
}
function deleteItem(superheroToDelete,li) {
    const storedFavouriteSuperheros = JSON.parse(localStorage.getItem("favoriteSuperhero"));
    const updateSuperHeors = storedFavouriteSuperheros.filter((superhero)=> superhero.id != superheroToDelete.id); //this will return all favSuperHeros except deletedOne
    localStorage.setItem("favoriteSuperhero", JSON.stringify(updateSuperHeors));
    li.innerHTML = " ";
    document.querySelector("sup").innerHTML = updateSuperHeors.length;
}
document.addEventListener("DOMContentLoaded",addItem);