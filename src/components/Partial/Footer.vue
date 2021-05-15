<template>
<footer class="p-2 bg-dark text-white mt-5 text-center shadow-sm fixed-bottom">
  Made With <b-icon icon="heart-fill" title="love" class="heart"></b-icon> By <a href="https://www.upwork.com/freelancers/~010fe6f2cc3754dad5" target="_blank" class="developer">AmmadKhalid</a>
</footer>
</template>

<script>
export default {
name: "Footer"
}
</script>

<style scoped lang="scss">
.heart {
  color: red;
}
.developer {

    &:hover {
      text-decoration: underline;
    }

    color: #f4f2f6;
    font-style: oblique;
}
</style>