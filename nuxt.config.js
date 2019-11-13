
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  /*
  ** Environment configuration
  */
  env: {
    apiUrl: 'https://api.themoviedb.org/',
    apiVersion: 3,
    apiToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDg1M2QwYWEwYTQ3N2NiZmE4NmI4NDdkZjQ1OGFjZiIsInN1YiI6IjU5MjIxZjc5YzNhMzY4Nzk5YjA1Y2E3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ndlfHbYsa5o4aeIXo9ttQVBXFXtvvuOGTgCYTx0UUCM',
    apiImagesUrl: 'http://image.tmdb.org/t/p/',
    imageSizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
    apiHeaders: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDg1M2QwYWEwYTQ3N2NiZmE4NmI4NDdkZjQ1OGFjZiIsInN1YiI6IjU5MjIxZjc5YzNhMzY4Nzk5YjA1Y2E3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ndlfHbYsa5o4aeIXo9ttQVBXFXtvvuOGTgCYTx0UUCM' }
  }
}
