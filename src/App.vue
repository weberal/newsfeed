<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <div>
        <router-link to="/" class="me-3">Home</router-link>
        <router-link to="/sample-1" class="me-3">Sample 1</router-link>
        <router-link to="/sample-2" class="me-3">Sample 2</router-link>
        <router-link to="/imprint">Imprint</router-link>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>
import { useStore } from "vuex";


export default {
  setup() {
    const store = useStore();

    return {
      store
    }
  },
}
</script>
