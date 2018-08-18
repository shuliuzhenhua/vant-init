<template>
    <div>
       demo
    </div>
</template>

<script>
export default {
  name: 'Demo',
  mounted () {
    this.$post({
      url: 'token/user',
      handle: true
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="stylus">

</style>
