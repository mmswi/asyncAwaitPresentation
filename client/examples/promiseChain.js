/**
 * Created by mmarinescu on 2/26/2018.
 */
import Api from "../api/api"

const api = new Api();

export default class PromiseChain {
    didIWatchAMovieFromYear(year) {
        console.log("Promise Chain - didIWatchAMovieFromYear");
        api.getMovies()
            .then((moviesResponse) => {
                const movies = moviesResponse.movies;
                console.log("First promise, movies are: ", movies);
                return api.getTitleByYear(movies, year);
            })
            .then((returnedTitle) => {
                console.log("Second promise, returnedTitle", returnedTitle);
                return api.watchedThis(returnedTitle);
            })
            .then((watchedResponse) => {
                console.log("Third call: ", watchedResponse);
            })
    }

    relatedMoviesOfRelatedMovies() {
        api.getMovies()
            .then((moviesResponse) => {
                const movies = moviesResponse.movies;
                // making an example for the first movie from the returned bunch
                return api.getRelatedMovies(movies[0].title)
            })
            .then((relatedMovies) => {
                // relatedMovies is an array of titles of movies wich I initialized
                // with the other movies from the list
                const getAllRelatedMovies = (relatedTitles) => {
                    // recursive function to go through all the related movies
                    if (relatedTitles.length > 0) {
                        let movieTitle = relatedTitles.pop();
                        //getting the related movies for each of the movie title
                        //in the relatedMovies array of the first movie
                        return api.getRelatedMovies(movieTitle)
                            .then((moreRelatedMovies) => {
                                console.log('promiseLoop related movies for:', movieTitle, moreRelatedMovies);
                                return getAllRelatedMovies(relatedTitles)
                            })
                    }
                };
                return getAllRelatedMovies(relatedMovies)
            })
    }

    parallelCalls () {
        const moviesResponse = api.getMovies()
            .then((moviesResponse) => {
                const movies = moviesResponse.movies;
                // making an example for the first movie from the returned bunch
                return api.getRelatedMovies(movies[0].title)
            })
            .then((relatedMovies) => {
                // Creating an array of promises so we can use Promise.all
                const relatedMoviesPromises = relatedMovies.map(title => api.getRelatedMovies(title));
                return Promise.all(relatedMoviesPromises);
            })
            .then((allRelatedMovies) => {
                console.log("Parallel calls, allRelatedMovies: ", allRelatedMovies)
            })



    }

    errorHandling () {
        api.getMovies()
            .then((moviesResponse) => {
                const movies = moviesResponse.movies;
                return api.getTitleByYear(movies, 1977);
            })
            .then((returnedTitle) => {
                return api.watchedThis(returnedTitle);
            })
            .then((watchedResponse) => {
                return api.throwError() //'This is my Intentional Error'
            })
            .then((watchedResponse) => {
                console.log("Error not thrown");
                console.log("Third call: ", watchedResponse);
            })
            .catch((err) => {
                console.error("Better Error Response:", err);
            })
    }
}
