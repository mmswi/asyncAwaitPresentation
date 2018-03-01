import CbHell from "./examples/cbHell"
import PromiseChain from "./examples/promiseChain"
import AsyncAwait from "./examples/asyncAwait"
const cbHell = new CbHell();
const promiseChain = new PromiseChain();
const asyncAwait = new AsyncAwait();

// Calls that need the response from the previous call
// cbHell.didIWatchAMovieFromYear(1977);
// promiseChain.didIWatchAMovieFromYear(1977);
// asyncAwait.didIWatchAMovieFromYear(1977);

// For loop calls that get executed in order
// cbHell.relatedMoviesOfRelatedMovies();
// promiseChain.relatedMoviesOfRelatedMovies();
// asyncAwait.relatedMoviesOfRelatedMovies();

// Parallel calls that reduce the overall execution time to the longest call
// cbHell.parallelCalls();
// promiseChain.parallelCalls();
// asyncAwait.parallelCalls();

// Error handling
// cbHell.errorHandling();
// promiseChain.errorHandling();
// asyncAwait.errorHandling();

// Call when you use async in the api
// asyncAwait.getMoviesFromApi();


