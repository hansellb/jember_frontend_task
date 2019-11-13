<template>
  <div>
    Reset / empty movie list
    Search Bar
    Search Results
    List of movies
    {{ apiBaseURL }}
    {{ imageSizes }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      apiUrl: 'https://api.themoviedb.org/',
      apiVersion: 3,
      apiToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDg1M2QwYWEwYTQ3N2NiZmE4NmI4NDdkZjQ1OGFjZiIsInN1YiI6IjU5MjIxZjc5YzNhMzY4Nzk5YjA1Y2E3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ndlfHbYsa5o4aeIXo9ttQVBXFXtvvuOGTgCYTx0UUCM',
      apiBaseURL: '',
      apiHeaders: '',
      imageSizes: [],
      movies: []
    }
  },

  created () {
    this.apiHeaders = { 'Authorization': 'Bearer ' + this.apiToken }
    this.getApiConfig()
  },

  methods: {
    /**
     * Get the API configuration for "The Movie Database" (https://developers.themoviedb.org/)
     */
    getApiConfig () {
      axios({
        method: 'get',
        url: this.apiUrl + this.apiVersion + '/configuration',
        headers: this.apiHeaders
      }).then((response) => {
        // Get the required data to fetch images, i.e., URL and image size
        this.apiBaseURL = response.data.images.secure_base_url
        this.imageSizes = response.data.images.poster_sizes
      })
    },

    /**
     * Fetch 5 movies from a year between 2012 & 2019, with a title containing the word "the"
     */
    async fetchMovies () {
      // Generate a random "year" value to fetch movies
      const min = 2012
      const max = 2020
      const range = max - min
      const year = Math.floor((Math.random() * (range)) + min)

      // Make the API call to TheMovieDB.org to get movies containing the word "the"
      await axios({
        method: 'get',
        url: this.apiUrl + this.apiVersion + '/search/movie?query="the"&primary_release_year=' + year,
        headers: this.apiHeaders
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
              img_url: this.apiBaseURL + this.imageSizes[1] + movie.poster_path,
              description: movie.overview
            })
          }
        }

        // Save the movie list in the browser's sessionStorage so it is not lost when refreshing the page
        sessionStorage.setItem('movies', JSON.stringify(initialMovies))
        this.movies = initialMovies
      })
    }
  }

}
</script>

<style lang="scss">

</style>
