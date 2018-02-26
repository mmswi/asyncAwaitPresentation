/* Response should be something like
* {
 "title": "The Basics - Networking",
 "description": "Your app fetched this from a remote endpoint!",
 "movies": [
 { "title": "Star Wars", "releaseYear": "1977"},
 { "title": "Back to the Future", "releaseYear": "1985"},
 { "title": "The Matrix", "releaseYear": "1999"},
 { "title": "Inception", "releaseYear": "2010"},
 { "title": "Interstellar", "releaseYear": "2014"}
 ]
 }
*
* Each method is returning a new Promise so we can use "then" when calling the api
* */
export default class Api {
    constructor () {
        this.whenWhatched = [
            {title: "Star Wars", watched: "Watched Star Wars in 2002", relatedMovies: ["The Matrix", "Back to the Future", "Inception", "Interstellar"]},
            {title: "Back to the Future", watched: "Watched Back to the Future in 1998", relatedMovies: ["Iron Man", "Thor", "The Hulk"]},
            {title: "The Matrix", watched: "Watched The Matrix in 2001", relatedMovies: ["Iron Man 2", "Thor 2", "Avengers"]},
            {title: "Inception", watched: "Watched Inception in 2010", relatedMovies: ["Iron Man 3", "Black Panther"]},
            {title: "Interstellar", watched: "Watched Interstellar in 2014", relatedMovies: ["Captain Marvel", "Black Widow"]}
        ];
    }


    getMovies () {
        return fetch('https://facebook.github.io/react-native/movies.json').then(response => response.json())
    }

    getTitleByYear(movies, year) {
        return new Promise((resolve, reject) => {
            movies.forEach((movieData) => {
                if(movieData.releaseYear == year) {
                    resolve(movieData.title);
                }
            });
        })
    }

    watchedThis(title) {
        return new Promise((resolve, reject) => {
            this.whenWhatched.forEach((movieData) => {
                if (movieData.title == title) {
                    resolve(movieData.watched)
                }
            })
        })
    }

    getRelatedMovies(title) {
        return new Promise((resolve, reject) => {
            this.whenWhatched.forEach((movieData) => {
                if (movieData.title == title) {
                    resolve(movieData.relatedMovies)
                }
            })
        })
    }

    // REAL API CALL
    async getMoviesFromApi() {
            // await response of fetch call - this will return a promise
            const response = await fetch('https://facebook.github.io/react-native/movies.json');
            // await for the .json() promise to be solved
            const responseJson = await response.json();
            // here the responseJson is an array of objects
            const movies = responseJson.movies;
            console.log("responseJson.movies is: ", movies);
            //but it's still returned as a promise so you need to use async / await when calling it
            return movies;
    }

    throwError () {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('This is my Intentional Error')), 200)
        })
    }
}