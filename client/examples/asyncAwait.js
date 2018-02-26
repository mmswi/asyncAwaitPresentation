/**
 * Created by mmarinescu on 2/26/2018.
 */
import Api from "../api/api"

const api = new Api();

export default class AsyncAwait {
    async didIWatchAMovieFromYear(year) {
        console.log("Async / Await didIWatchAMovieFromYear");

        const moviesResponse = await api.getMovies();
        const movies = moviesResponse.movies;
        console.log("First await, movies are: ", movies);

        const titleOfThatYear = await api.getTitleByYear(movies, year);
        console.log("Second await, title is: ", titleOfThatYear);

        const whenDidIWatchIt = await api.watchedThis(titleOfThatYear);
        console.log("Third await, answer is: ", whenDidIWatchIt);

        // NOTE - every call is done in order
    }

    async relatedMoviesOfRelatedMovies() {
        const moviesResponse = await api.getMovies();
        const movies = moviesResponse.movies;
        const relatedWithFirstMovie = await api.getRelatedMovies(movies[0].title);

        /*
        NOTE - writing a forEach loop, won't hold the execution of the overall program
        relatedWithFirstMovie.forEach(async (title) => {
            // Note - forEach creates a new scope for the anonymous function
            // meaning the 'await' inside that function doesn't access the outer scope
            // You need to declare each function as async
            const relatedOfRelated = await api.getRelatedMovies(title);
            console.log("Async/await for ", title, relatedOfRelated);
        })

        console.log("foreach done")
        */

        for (let i = 0; i< relatedWithFirstMovie.length; i++) {
            const relatedOfRelated = await api.getRelatedMovies(relatedWithFirstMovie[i]);
            console.log("Async/await for ", relatedWithFirstMovie[i], relatedOfRelated);
        }
        // Note - console.log fires after the for loop ends
        console.log("for loop done");
    }

    async parallelCalls () {
        const moviesResponse = await api.getMovies();
        const movies = moviesResponse.movies;
        const relatedWithFirstMovie = await api.getRelatedMovies(movies[0].title);
        const relatedMoviesPromises = relatedWithFirstMovie.map(title => api.getRelatedMovies(title));
        const allRelatedMovies = await Promise.all(relatedMoviesPromises);
        console.log("Async / Await parallelCalls, allRelatedMovies:", allRelatedMovies)
    }

    async errorHandling () {
        try {
            const moviesResponse = await api.getMovies();
            const movies = moviesResponse.movies;

            const titleOfThatYear = await api.getTitleByYear(movies, 1977);

            await api.throwError(); // 'This is my Intentional Error'
            console.log('Error was not thrown');

            const whenDidIWatchIt = await api.watchedThis(titleOfThatYear);
            console.log("Third await, answer is: ", whenDidIWatchIt);

        } catch (err) {
            console.error("Async/await error handling", err)
        }
    }

    // TODO - add async await to show difference
    getMoviesFromApi () {
        const moviesResp = api.getMoviesFromApi();
        console.log("Movies response in the api is: ", moviesResp);
    }
}