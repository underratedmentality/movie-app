const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';


// selecting elements on the page
const form = document.querySelector ("#form")
const input = document.querySelector (".search")
const main = document.querySelector("#main");
const empty = document.querySelector(".empty")

// get the movies from the API - GET, .then, async/await (method)
const getMovies = async(url) => {
empty.style.display = "none";
main.innerHTML = "";

   const response = await fetch (url);
   const data = await response.json();
   console.log(data.results); 
   if (data.results.length > 0){
   displayMovies(data.results); 
   } else {
    empty.style.display = "block"
   }
};
getMovies(API_URL);

function displayMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        //destructuring
        const { title, poster_path, vote_average, overview} = movie;

        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie")
        // or movieDiv.className = "movie";
        movieDiv.innerHTML = ` <img src = "${IMG_PATH + poster_path}" alt = "${title}" >
        <div class='movie-info'>
        <h3>${title} </h3>
        <span class="${assignRatings(vote_average)}">${vote_average} </span>
        </div>
        <div class= 'overview'>
        <h3>Overview</h3>
        ${overview}
        </div>`;

        main.appendChild(movieDiv);
    });
}
function assignRatings (ratings){
if (ratings >= 8){
    return "green"
}
else if (ratings >= 5){
    return "orange"
}
else {
return "red"
}
}
// get those elements 
const hiddenSearch = document.querySelector (".hidden-search")
const span = document.querySelector(".hidden-search span");
// get movies based on search 
form.addEventListener("submit", (e) =>{
    e.preventDefault()
    const searchValue = search.value.trim()
    console.log(searchValue);
    if (searchValue){
        span.textContent = searchValue;
        hiddenSearch.style.display = "block";
        getMovies(SEARCH_API + searchValue)
        search.value = ""
    } else {
        window.location.reload()
    }
});
