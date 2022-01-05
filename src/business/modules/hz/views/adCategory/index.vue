<template>
  <div>
    <template slot="header">广告分类</template>
    <category-list :biztype="constants.categoryType[4]" />
  </div>
</template>

<script>
import categoryList from '@/components/Category/list'
export default {
  // name: "list",
  components: { categoryList },
  data () {
    return {
      constants: this.$constants
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
