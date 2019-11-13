<template>
  <div>
    <div
      v-if="type == 'cards'"
      class="mt-5 d-flex flex-wrap"
    >
      <b-card
        v-for="listItem in filteredList"
        :key="listItem.id"
        :title="listItem.title"
        :sub-title="listItem.year"
        :img-src="listItem.img_url"
        :img-alt="listItem.title"
        class="card-item mb-3 mx-2"
        img-left
      >
        <div
          class="card-text-wrapper mb-3"
        >
          <b-card-text
            class="overflow-hidden"
          >
            {{ listItem.description }}
          </b-card-text>
        </div>
        <b-button
          @click="removeItem(listItem)"
          variant="danger"
        >
          Remove
        </b-button>
      </b-card>
    </div>

    <div
      v-else-if="type === 'searchResults' && listFilter.length > 0 && showSearchResults"
    >
      <div
        class="searchResults"
      >
        <b-list-group>
          <b-list-group-item
            v-for="listItem in list"
            :key="listItem.id"
            @click="selectItem(listItem)"
            @hover.native="showSearchResults = true;"
            @blur.native="showSearchResults = false;"
            class="searchResultsItem"
            button
          >
            {{ listItem.title }}
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },

    listFilter: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      showSearchResults: true
    }
  },

  computed: {
    filteredList () {
      return this.list.filter((listItem) => {
        return listItem.title.toLowerCase().includes(this.listFilter.toLowerCase())
      })
    }
  },

  methods: {
    selectItem (item) {
      this.$emit('itemSelected', item)
    },

    removeItem (item) {
      this.$emit('removeItem', item)
    }
  }

}
</script>

<style lang="scss" scoped>
  .searchResults {
    position: absolute;
    z-index: 10;
    max-height: 14rem;
    overflow-y: scroll;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  }

  .searchResultsItem:hover {
    background-color: #007bff;
    color: white;
  }

  .card-item {
    max-width: 33rem;
  }

  .card-text-wrapper {
    max-height: 5rem;
    overflow: auto;
  }
</style>
