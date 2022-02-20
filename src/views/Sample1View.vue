<template>
  <div class="sample-1">
    <PageTitle title="Sample 1"/>
  </div>
</template>

<script>
// @ is an alias to /srcj
import PageTitle from '@/components/PageTitle.vue';

export default {
  name: 'Sample1View',
  components: {
    PageTitle,
  },
}
</script>