var main = document.getElementById('main');

var API_ROOT        = 'https://api.themoviedb.org/3';
var API_KEY         = '?api_key=121e612aae84a3381acda8d907141364';
var URL_TOP_RATED   = '/movie/top_rated';

var topRatedUrl = API_ROOT + URL_TOP_RATED + API_KEY;

fetch(topRatedUrl)
    .then(res => {
        console.log(res);
        if (res.ok) return res.json();
        else throw new Error('Response not OK');
    })
    .then(data => {
        return nunjucks.render('views/movie-list.html', { movies: data.results })
    })
    .then(data => main.innerHTML = data)
    .catch(err => console.error('Error => ', err.message));
