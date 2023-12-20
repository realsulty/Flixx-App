// we need to create a router since using Vanilla JS 
const global = {
    currentPage: window.location.pathname,

    search: { // THis object can be usedin functions since its in global scope
        term: '', // These will be used in the fetch porocess 
        type: '', // when you write down the fetching path these can be used
        page: 1, // The reason being the term and type are written in the link
        totalPages:1, // check the HTML Elm input has name and search type
    },

    api: {
        apiKey : '5fee0608c42a6c8dfacafe995e841de1',
        apiUrl: 'https://api.themoviedb.org/3/'
    }

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

// Dipslay the overlay background image 
// Here the functions is called up with Paramters that we init in function 
displayBackgroundImage('movie', movie.backdrop_path)

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

async function diplsayShowDetails() {
    const showId = window.location.search.split('=')[1];
    
    const show = await fetchAPIData(`tv/${showId}`);
    
    // Dipslay the overlay background image 
    // Here the functions is called up with Paramters that we init in function 
    displayBackgroundImage('tv', show.backdrop_path)
    
    const div = document.createElement('div');
    div.innerHTML = `
     <div class="details-top">
    <div>
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
      alt="${show.title}"
    />`
      }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)}/ 10
      </p>
      <p class="text-muted">First Air Date: ${show.first_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
       ${show.genres.map((genre)=> `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>
    </div>
    </div>
    <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
      <li><span class="text-secondary">Last Episode to be Aired:</span> ${show.last_episode_to_air.name}</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${show.production_companies
    .map((company) => `<span>${company.name}</span>`).join('')}</div>
    </div>
    
    `;
    
    document.querySelector('#show-details').appendChild(div);
    
    }

// Display Backdrop image on details Pages 
// here we sit up the functions for mulitpile use in tv shows and movie pages as well
function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div')
    overlayDiv.style.backgroundImage = 
    `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
overlayDiv.style.backgroundSize ='cover';
overlayDiv.style.backgroundPosition = 'center';
overlayDiv.style.backgroundRepeat = 'no-repeat';
overlayDiv.style.height = '100vh';
overlayDiv.style.width = '100vw'
overlayDiv.style.position = 'absolute';
overlayDiv.style.top = '0'
overlayDiv.style.left ='0'
overlayDiv.style.zIndex = '-1'
overlayDiv.style.opacity = '0.1'

if ( type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv)
} else {  
    document.querySelector('#show-details').appendChild(overlayDiv)
}
}


// This function is to earch movies
// the stesp are :  1 -create search function 2 - create checking search box alerts
// 3 - create fetching data from data base for the form
async function search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    global.search.type = urlParams.get('type') // In the variable u accesing the global
    global.search.term = urlParams.get('search-term') // you are storing the link values in these url Prams

     if (global.search.term !== '' && global.search.term !== null && isNaN(global.search.term)) {
        const {results, total_pages, page} = await searchAPIData();

    if (results.length === 0) {
        showAlert('No results found')
        return;
    }

    displaySearchResults(results); // This is the functions were we sit up the dipslay of search

     } else {
        showAlert('PLease Enter a valid search term')
     }

}


function displaySearchResults(results) {
    results.forEach(result=> {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        
        <a href="${global.search.type}-details.html?id=${result.id}">
          ${
            result.poster_path
            ?`<img  
            src="https://image.tmdb.org/t/p/w500${result.poster_path}"
            class="card-img-top"
            alt="${global.search.type === 'movie' ? result.title : result.name}"
          />` //               (? means THEN DO ) Two dots : means ELSE DO
          : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${global.search.type === 'movie' ? result.title : result.name}"
        />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
          </p>
        </div>`;
        document.querySelector('#search-results').appendChild(div);
    })
}

// Setting up the Slider function
async function displaySlider() {
    const {results}= await fetchAPIData('movie/now_playing')
    
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');

        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Title" />
        </a>
        <h4 class="swiper-rating">
          <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)}/ 10
        </h4>
        `
        document.querySelector('.swiper-wrapper').appendChild(div);

        initSwiper();
    });

}

// Show Alert for search function else 
function showAlert(message, className) { /// These Prams here for multiple use
    const alerEl = document.createElement('div');
    alerEl.classList.add('alert', className); // here the className in case we needed to add another
    // class to the function --- but we already have one class assgined that is alert
    alerEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alerEl);

    setTimeout(()=> alerEl.remove(),3000)
}

// This is the option for the swiper 
// we can set the values, the sizes and the functionality of it 
// Check the docs 
function initSwiper() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop:true,
        autoplay:{
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints : {
            500: {
              slidesPerView: 2  
            },
        
            700: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            },
        }

    })


}

// Fetch Data from TMDB API this can be referd to as a global fetch method
async function fetchAPIData(endpoint) {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
    
    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}&languages=en-US`
    );

    showSpinner();
    const data = await response.json()
    hideSpinner();
    return data;
}
/// This asyc functions is getch data fro searching 
async function searchAPIData() {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
    
    const response = await fetch(
        `${API_URL}search/${global.search.type}?api_key=${API_KEY}&languages=en-US&query=${global.search.term}`
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
            displaySlider();
            displayPopularMovies();
         break;
         case '/shows.html':
            displayPopularMShows();
            break;
         case '/movie-details.html':
             diplsayMovieDetails();
            break;
         case '/tv-details.html':
             diplsayShowDetails();
            break;
         case '/search.html':
            search();
            break;
    }

    highLightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);