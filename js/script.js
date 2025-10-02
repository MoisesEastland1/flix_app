const global = {
  currentPage: window.location.pathname
}

//Highlight active link
function hightlightALink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if(link.getAttribute('href') === global.currentPage){
    link.classList.add('active');
    }
  });
};

async function displayPopMovies() {
  const {results}  = await fetchAPIData('movie/popular');
  results.forEach((movie => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    
    <a href="movie-details.html?id=${movie.id}">
    ${movie.poster_path
    ? 
      `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"/>`

    : 
    
    `<img src="..images/noImage.jpg" class="card-img-top"
    alt="${movie.title}"/>`
    }
    </a>

    <div class="card-body">
    <h5 class="card-title">${movie.original_title}</h5>
    <p class="card-text">
    <small class="text-muted">Release: ${movie.release_date}</small>
    </p>
    </div>
    `;

    document.querySelector('#popular-movies').appendChild(div);
  }));
}

//Master fetch function for TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = '599c0cad2f7853834fdf94a24936062d';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpin();

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

  const data = await response.json();

  hideSpin();

  return data;
}

function showSpin() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpin() {
  document.querySelector('.spinner').classList.remove('show');
}

//Init App
function init() {
  switch(global.currentPage) {
    case '/':
    case '/index.html':
      displayPopMovies();
    break;
    case '/shows.html':
      console.log('Shows');
    break;
    case '/movie-details.html':
      console.log('Movies Details');
    break;
    case '/tv-details.html':
      console.log('TV Details');
    break;
    case '/search.html':
      console.log('Search');
    break;
  }

  hightlightALink();
};

document.addEventListener('DOMContentLoaded', init);

