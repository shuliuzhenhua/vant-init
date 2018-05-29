<template>
    <div>
       demo
    </div>
</template>

<script>
export default {
  name: 'Demo',
  mounted () {
    this.post({
      url: 'token/user'
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err.response)
    })
  }
}
</script>

<style scoped lang="stylus">

</style>
