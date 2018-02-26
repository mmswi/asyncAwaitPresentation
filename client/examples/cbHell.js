/**
 * Created by mmarinescu on 2/26/2018.
 */
import Api from "../api/api"

const api = new Api();

export default class CbHell {

    didIWatchAMovieFromYear(year) {
        console.log("Callback Hell - didIWatchAMovieFromYear");
        api.getMovies().then((moviesResponse) => {
            const movies = moviesResponse.movies;
            console.log("First call, movies are: ", movies);
            api.getTitleByYear(movies, year).then((returnedTitle) => {
                console.log("Second call, returnedTitle", returnedTitle);
                api.watchedThis(returnedTitle).then((watchedResponse) => {
                    console.log("Third call: ",watchedResponse);
                })
            })
        })
    }

    relatedMoviesOfRelatedMovies() {
        api.getMovies().then((moviesResponse) => {
            const movies = moviesResponse.movies;
            api.getRelatedMovies(movies[0].title).then((relatedMovies) => {
                relatedMovies.forEach((movieTitle) => {
                    api.getRelatedMovies(movieTitle).then((titles)=> {
                        console.log("cbHell related movies for: ", movieTitle, titles);
                    })
                });

                // Note - as expected, console.log fires before the getRelatedMovies
                console.log("foreach done");

                /*
                for (let i = 0; i< relatedMovies.length; i++) {
                    api.getRelatedMovies(relatedMovies[i]).then((titles)=> {
                        console.log("cbHell related movies for: ", relatedMovies[i], titles);
                    })
                }
                console.log("for loop done");
                */
            })
        })
    }

    parallelCalls() {
        console.log("Can't use parallel calls with callback hell");
    }

    errorHandling () {
        api.getMovies().then((moviesResponse) => {
            const movies = moviesResponse.movies;
            api.getTitleByYear(movies, 1977).then((returnedTitle) => {
                // Throwing an error here
                api.throwError().then(function () { //'This is my Intentional Error'
                    console.log('Error was not thrown');
                    api.watchedThis(returnedTitle).then((watchedResponse) => {
                        console.log("Third call: ",watchedResponse);
                        }, function (err) {
                            console.error("watchedThis err", err)
                    })
                }, function (err) {
                    console.error("throwError err", err)
                })
            }, function (err) {
                console.error("getTitleByYear err", err)
            })
        }, function (err) {
            console.error("getMovies err", err)
        })
    }
}
