var main = document.getElementById('main');

var API_ROOT        = 'https://api.themoviedb.org/3';
var API_KEY         = '?api_key=121e612aae84a3381acda8d907141364';
var URL_TOP_RATED   = '/movie/top_rated';
var URL_GENRES      = '/genre/movie/list';
var BASE_URL_IMAGES = 'http://image.tmdb.org/t/p/w500/';

var topRatedUrl = API_ROOT + URL_TOP_RATED + API_KEY;

getData(
    topRatedUrl,
    function(req) {
        var parsed = JSON.parse(req.responseText);
        console.log(parsed);
        main.innerHTML = renderMovieList(parsed.results);
    },
    function(req) {
        main.innerHTML = 'Error ' + req.status + '. ' + req.statusText;
    }
);

function getData(url, success, error) {
    var req = new XMLHttpRequest();
    console.log(req);

    req.open('GET', url, true);
    req.onreadystatechange = function() {
        if (req.readyState !== 4) return;
        if (req.status !== 200) error(req);
        else success(req);
    };
    req.send(null);
}

function renderMovie(movie) {
    return '' +
        '<li class="movie">' +
            '<div class="movie__poster">' +
                '<img src="' + BASE_URL_IMAGES + movie.poster_path + '"/>' +
            '</div>' +
            '<div class="movie__content">' +
                '<h3 class="movie__title">' + movie.title + '</h3>' +
                '<p class="movie__overview">' + movie.overview + '</p>' +
                '<em class="movie__votes">Votes: ' + movie.vote_average + '</em>' +
            '</div>' +
        '</li>';
}

function renderMovieList(list, movieRenderer) {
    movieRenderer = movieRenderer || renderMovie;
    var renderedMovies = list.map(movieRenderer).join('\n');
    return '' +
        '<ul class="movie-list">' + renderedMovies + '</ul>';
}
