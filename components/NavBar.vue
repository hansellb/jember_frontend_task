<template>
  <div class="mb-5">
    <b-navbar
      variant="dark"
      type="dark"
      toggleable="lg"
    >
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <NuxtLink to="/">
              Home
            </NuxtLink>
          </b-nav-item>
          <b-nav-item>
            <NuxtLink to="/movies">
              Movies
            </NuxtLink>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

</script>

<style lang="scss">
.nav-item {
  a {
    color: whitesmoke;

    &:hover {
      color: orange;
    }
  }
}
</style>
