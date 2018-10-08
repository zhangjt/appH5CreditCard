<template>
  <div class="index">
    index1321321{{a}}
  </div>
</template>
<style lang="postcss">
@svg 1px-border {
  height: 2px;
  @rect {
    fill: var(--color, black);
    width: 100%;
    height: 50%;
  }
}
html{
  overflow-x: hidden;
}
body {
  
}
</style>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      a: '2123123sdfs123'
    }
  },
  methods: {
    // ...mapState(['test']),
    // ...mapMutations(['changeState', 'getState'])
  },
  created () {
  },
  mounted () {

  }
}
</script>
