<template>
  <div>
    <div>
      <b-button
        id="resetListBtn"
        @click="fetchMovies()"
        variant="primary"
      >
        Reset list
      </b-button>
      <b-alert
        :show="dismissCountDown"
        :variant="alertType"
        @dismiss-count-down="countDownChanged"
        dismissible
        fade
        class="float-right"
      >
        {{ alertMessage }}
      </b-alert>
      <b-popover
        target="resetListBtn"
        triggers="hover"
      >
        Removes all movies from the list and adds 5 new movies. Note: The new list could the same ;-)
      </b-popover>

      <SearchBar
        @searchInputAvailable="searchMovies"
        @resultSelected="addMovie"
        :searchResults="searchResults"
      />
    </div>

    <b-alert
      :show="isListEmpty"
      dismissible
      fade
      variant="danger"
    >
      The movie list is empty :-(
    </b-alert>
    <ItemList
      :list="movies"
      :listFilter="movieListFilter"
      @removeItem="removeMovie"
      :type="'cards'"
    />
  </div>
</template>

<script>
import axios from 'axios'

import ItemList from '~/components/ItemList'
import SearchBar from '~/components/SearchBar'

export default {
  components: {
    ItemList, SearchBar
  },

  data () {
    return {
      movies: [],
      movieListFilter: '',
      searchResults: [],
      alertType: 'danger',
      alertMessage: '',
      alertTimeout: 3,
      dismissCountDown: 0
    }
  },

  computed: {
    isListEmpty () {
      return this.movies.length === 0
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
        url: process.env.apiUrl + process.env.apiVersion + '/search/movie?query="the"&primary_release_year=' + year,
        headers: process.env.apiHeaders
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
              img_url: process.env.apiImagesUrl + process.env.imageSizes[1] + movie.poster_path,
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
     * Search movies by title using themoviedb's API
     */
    searchMovies (title) {
      this.movieListFilter = title

      if (title.length < 3) {
        return
      }

      axios({
        method: 'get',
        url: process.env.apiUrl + process.env.apiVersion + '/search/movie?query="' + title + '"',
        headers: process.env.apiHeaders
      }).then((response) => {
        this.searchResults = response.data.results
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
        this.showAlert('warning', movieAlreadyInList.title + ' is already in the list!!!', 3)
        return
      }

      this.movies.push({
        id: movie.id,
        title: movie.title,
        year: movie.release_date,
        img_url: process.env.apiImagesUrl + process.env.imageSizes[1] + movie.poster_path,
        description: movie.overview
      })

      // Save the modified list in the browser
      sessionStorage.setItem('movies', JSON.stringify(this.movies))
      this.showAlert('success', movie.title + ' was added to the List', 5)
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
        this.showAlert('danger', movieAlreadyInList.title + ' was not found in the List', 5)
        return
      }

      this.movies.splice(foundMovieIdx, 1)

      // Save the modified list in the browser
      sessionStorage.setItem('movies', JSON.stringify(this.movies))
    },

    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    showAlert (type, message, timeout) {
      this.alertType = type
      this.alertMessage = message
      this.dismissCountDown = timeout
    }

  }

}

</script>

<style lang="scss">

</style>
