const gifUrl = 'https://api.giphy.com/v1/gifs/search?'  // url pour gif
const stickUrl = 'https://api.giphy.com/v1/stickers/search?'  // url pour sticker
const apiKey = '&api_key=etJpLXfaLL3wX5Q4Tbhh2hoUFEgUL35B'  // api pour giphy
const limitEtquery = '&limit=5&q='  // limit de 5 '&limit=5' et parametre query '&q='
let gifSearch = gifUrl + apiKey + limitEtquery  // concatenation de url, api et limit et query pour gif
let stickerSearch = stickUrl + apiKey + limitEtquery   // concatenation de url, api et limit et query pour sticker
let searchResult = document.querySelector('.searchResult')  // query selector du div '.searchResult'

document.getElementById('btngif').addEventListener('click', ev=searchGifs)  // ecoute pour un click de search Gif avec fonction de rappel 'searchGifs'
document.getElementById('btnsticker').addEventListener('click', ev=searchStickers)  // ecoute pour un click de search sticker avec fonction de rappel 'searchStickers'


// fonction 'searchGifs'
function searchGifs() { 
    let terms = document.getElementById('saisie').value.trim()
    searchGiphy(gifSearch + terms)  // appel de la fonction de recherche genereal 'searchGiphy'
}

// fonction 'searchStickers'
function searchStickers() {  
    let terms = document.getElementById('saisie').value.trim()
    searchGiphy(stickerSearch + terms)   // appel de la fonction de recherche genereal 'searchGiphy'
}

// fonction 'searchGiphy'
function searchGiphy(myquery){
    searchResult.innerHTML = ""
    fetch(myquery)  // fetch effectué dans l'API
        .then ((response) => { 
            if (response.status >= 200 && response.status <= 299){ // test sur le statut de la reponse 
                return response.json(); // lecture de la réponse en json
            }else{
                throw Error(response.status); // renvoie du type d'erreur
            }
        })
        .then((content) => {  // opération a effectuer sur le resultat
            console.log(content) // affichage des resultats de la recherche en format json
            if (content.pagination.count == 0){
                searchResult.insertAdjacentText('beforeend', 'Aucun résultats pour cette recherche.') // affichage d'une reponse sans contenu
            }
            else {
                for (let i= 0; i < content.pagination.count; i++) {  // pour chaque resultat....
                    let image = document.createElement('img')  // ...creation d'un element image
                    image.src = content.data[i].images.downsized.url  //...assignation de l'url d'image au parametre src de l'element img
                    image.alt = content.data[i].title  //...assignation du d'image au parametre alt de l'element img
                    image.width = 300  // largeur de l'image
                    searchResult.appendChild(image)  //...ajout de l'image dans le div 'searchResult'
            }
        }
    }).catch(err => console.error(err)); // affichage console d'erreur
}
