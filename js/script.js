// we need to create a router since using Vanilla JS 
const global = {
    currentPage: window.location.pathname,
};


async function displayPopularMovies() {
    const { results } = await fetchAPIData('movie/popular')
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        
        <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
            ?`<img  
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
          : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>`;
        document.querySelector('#popular-movies').appendChild(div);
    })
}

// Display TV shows
async function displayPopularMShows() {
    const { results } = await fetchAPIData('tv/popular')
    results.forEach(show => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        
        <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path
            ?`<img  
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />`
          : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date: ${show.first_air_date}</small>
          </p>
        </div>`;
        document.querySelector('#popular-shows').appendChild(div);
    })
}
function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}


async function diplsayMovieDetails() {
const movieID = window.location.search.split('=')[1];
 
const movie = await fetchAPIData(`movie/${movieID}`);

const div = document.createElement('div');
div.innerHTML = `
 <div class="details-top">
<div>
${
    movie.poster_path
    ?`<img  
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />`
  : `<img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="${movie.title}"
/>`
  }
</div>
<div>
  <h2>${movie.title}</h2>
  <p>
    <i class="fas fa-star text-primary"></i>
    ${movie.vote_average.toFixed(1)}/ 10
  </p>
  <p class="text-muted">Release Date: ${movie.release_date}</p>
  <p>
    ${movie.overview}
  </p>
  <h5>Genres</h5>
  <ul class="list-group">
   ${movie.genres.map((genre)=> `<li>${genre.name}</li>`).join('')}
  </ul>
  <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
</div>
</div>
<div class="details-bottom">
<h2>Movie Info</h2>
<ul>
  <li><span class="text-secondary">Budget:</span> $${numberWithCommas(movie.budget)}</li>
  <li><span class="text-secondary">Revenue:</span> $${numberWithCommas(movie.revenue)}</li>
  <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
  <li><span class="text-secondary">Status:</span> ${movie.status}</li>
</ul>
<h4>Production Companies</h4>
<div class="list-group">
${movie.production_companies
.map((company) => `<span>${company.name}</span>`).join('')}</div>
</div>

`;

document.querySelector('#movie-details').appendChild(div);

}


// Fetch Data from TMDB API this can be referd to as a global fetch method
async function fetchAPIData(endpoint) {
    const API_KEY = '5fee0608c42a6c8dfacafe995e841de1';
    const API_URL = 'https://api.themoviedb.org/3/'
    
    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}&languages=en-US`
    );

    showSpinner();
    const data = await response.json()
    hideSpinner();
    return data;
}
function highLightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage){
            link.classList.add('active')
        } 
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Init App -- This will contain all functions 
function init() {
    switch (global.currentPage) {
        case '/': // The Two dots mean Then ... Not OR !! 
        case '/index.html': // Must Include the TWO DOTS 
            displayPopularMovies();
         break;
         case '/shows.html':
            displayPopularMShows();
            break;
         case '/movie-details.html':
             diplsayMovieDetails();
            break;
         case '/tv-details.html':
            console.log('Tv Shows');
            break;
         case '/search.html':
            console.log('Serach Bar');
            break;
    }

    highLightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);