<template>
  <div>
    Reset / empty movie list
    Search Bar
    Search Results
    List of movies
  </div>
</template>

<script>
import axios from 'axios'
import config from '~/nuxt.config.js'

const env = config.env

export default {
  data () {
    return {
      imageSizes: [],
      movies: []
    }
  },

  created () {
    env.apiHeaders = { 'Authorization': 'Bearer ' + env.apiToken }
    if (env.apiImagesUrl === '' && env.imageSizes.length === 0) {
      this.getApiConfig()
    }
  },

  mounted () {
    // If there is a movie list in sessionStorage, get it, otherwise, fetch a new list
    const storedMoviesList = sessionStorage.getItem('movies')

    if (storedMoviesList == null) {
      // No movie list in sessionStorage, fetch one
      this.fetchMovies()
    } else {
      // Get the movie list in sessionStorage
      this.movies = JSON.parse(storedMoviesList)
    }
  },

  methods: {
    /**
     * Fetch 5 movies from a year between 2012 & 2019, with a title containing the word "the"
     */
    fetchMovies () {
      // Generate a random "year" value to fetch movies
      const min = 2012
      const max = 2020
      const range = max - min
      const year = Math.floor((Math.random() * (range)) + min)

      // Make the API call to TheMovieDB.org to get movies containing the word "the"
      axios({
        method: 'get',
        url: env.apiUrl + env.apiVersion + '/search/movie?query="the"&primary_release_year=' + year,
        headers: env.apiHeaders
      }).then((response) => {
        const initialMovies = []

        // Make sure at least five movies were fetched
        if (response.data.results.length >= 5) {
          const moviesFromApi = response.data.results

          // Get 5 movies randomly from the results (since the searched word is very common, there should be at least 20 movies)
          const randIdx = Math.floor((Math.random() * 16))

          for (let i = 0; i < 5; i++) {
            const movie = moviesFromApi[randIdx + i]

            initialMovies.push({
              id: movie.id,
              title: movie.title,
              year: movie.release_date,
              img_url: env.apiImagesUrl + env.imageSizes[1] + movie.poster_path,
              description: movie.overview
            })
          }
        }

        // Save the movie list in the browser's sessionStorage so it is not lost when refreshing the page
        sessionStorage.setItem('movies', JSON.stringify(initialMovies))
        this.movies = initialMovies
      })
    },

    /**
     * Add a movie to the list
     */
    addMovie (movie) {
      const movieAlreadyInList = this.movies.find((movieInList) => {
        return movieInList.id === movie.id
      })

      if (movieAlreadyInList !== undefined) {
        this.showAlert(movieAlreadyInList.title + ' is already in the list!!!', 3)
        return
      }

      this.movies.push({
        id: movie.id,
        title: movie.title,
        year: movie.release_date,
        img_url: env.apiImagesUrl + env.imageSizes[1] + movie.poster_path,
        description: movie.overview
      })

      // Save the modified list in the browser
      sessionStorage.setItem('movies', JSON.stringify(this.movies))
    },

    /**
     * Removes a movie from the list
     */
    removeMovie (movie) {
      let foundMovieIdx = -1

      const movieAlreadyInList = this.movies.find((movieInList, index) => {
        if (movieInList.id === movie.id) {
          foundMovieIdx = index
        }
        return movieInList.id === movie.id
      })

      if (movieAlreadyInList === undefined) {
        this.showAlert(movieAlreadyInList.title + ' was not found in the List', 5)
        return
      }

      this.movies.splice(foundMovieIdx, 1)

      // Save the modified list in the browser
      sessionStorage.setItem('movies', JSON.stringify(this.movies))
    }
  }
}

</script>

<style lang="scss">

</style>
