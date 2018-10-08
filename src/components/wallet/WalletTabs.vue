<template>
    <div>
        <div class="tabs-top">
            <div v-for="(item, index) in tabs" :key="index" :class="actIndex == index ? 'is-active':''"  @click="switchTab(index)">
                <span>{{item}}</span>
            </div>
        </div>
        
        <div class="tabs-bottom">
            <div v-for="(item, index) in tabs" :key="index">
                <div :class="actIndex == index ? 'is-active-border':'arrow-down'"></div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
  components: {},
  props: {
    tabs: Array,
    activeIndex: Number
  },
  data() {
    return {
      actIndex: 0
    };
  },
  watch: {},
  computed: {},
  methods: {
    switchTab(ind) {
      this.actIndex = ind;
      this.$emit("tabSelected", ind);
    }
  },
  created() {
    this.actIndex = this.activeIndex;
  },
  mounted() {}
};
</script>
<style lang="postcss" scoped>
.tabs-top {
  display: flex;
  color: #1c2042;
  font-size: 14px;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    flex-grow: 1;
    border-bottom: 1px solid #ececec;
  }
}
.tabs-bottom {
  display: flex;
  color: #1c2042;
  font-size: 14px;
  justify-content: space-between;
  margin-top: -2px;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    flex-grow: 1;
  }
}
.is-active {
  background-color: #649afe;
  color: white;
  border-bottom: none !important;
}

.is-active-border {
  border-top: 10px solid #649afe;
  width: 0;
  height: 0;
  border-right: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid transparent;
}

.arrow-down {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid transparent;
}
</style>