<template>
  <div>
    <b-jumbotron header="Hansell Baran's Movies List" header-level="5">
      <template v-slot:lead>
        Front-end task for <strong>Jember</strong>'s job interview
      </template>
      <p>This task was implemented using Nuxt.js</p>
      <p>
        Instead of having an initial number of movies in the list, this webapp uses API calls to <a href="https://developers.themoviedb.org/" target="_blank">The Movie Database</a> to add 5 movies to the list when the
        <NuxtLink
          to="/movies"
        >
          <strong><i>Movies</i></strong>
        </NuxtLink>
        page is loaded. If the list is empty, because all elements in the list were removed, then a message will be shown.
      </p>
      <p>
        The search bar has two functionalities:
        <ul>
          <li>Filter the movie list</li>
          <li>Search movies</li>
        </ul>
      </p>
      <p>
        Typing in the search bar will filter the movie list and show only movies with titles that contain the typed characters. At the same time, API calls are made to fetch movies which are displayed below the search bar. If one of those movie titles is clicked, it is added to the movie list.
      </p>
      <p>
        After the initial page load, the movies list is stored in the browser's session, therefore, refreshing the page successively will not change the list
      </p>

      <p>
        <strong><i>Note:</i></strong> The API used does not return movie titles from <u>partial</u> words, that is, typing <i>gladia</i> <strong>WILL NOT</strong> return the movie title <i>Gladiator</i>... The complete word <i>gladiator</i> <strong>MUST</strong> be typed
      </p>
    </b-jumbotron>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>
