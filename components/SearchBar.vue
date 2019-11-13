<template>
  <div>
    <b-input-group class="mt-3">
      <b-input-group-prepend>
        <b-button
          @click="inputText = ''; processInput()"
          variant="danger"
        >
          X
        </b-button>
      </b-input-group-prepend>
      <b-form-input
        v-model="inputText"
        @keyup="processInput"
        @focus.native="processInput"
        placeholder="Enter a movie title"
      />
    </b-input-group>
    <ItemList
      @itemSelected="resultSelected"
      :list="searchResults"
      :listFilter="inputText"
      :type="'searchResults'"
    />
    <b-alert
      v-if="searchResults.length > 0"
      variant="danger"
    >
      Couldn't find any movies with that title
    </b-alert>
  </div>
</template>

<script>
import ItemList from '~/components/ItemList'

export default {
  components: {
    ItemList
  },

  props: {
    searchResults: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      inputText: ''
    }
  },

  methods: {
    processInput (event) {
      this.$emit('searchInputAvailable', this.inputText)
    },

    resultSelected (item) {
      this.$emit('resultSelected', item)
    }
  }

}
</script>

<style lang="scss">

</style>
