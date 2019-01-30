<template>
    <div class="contain homeBanner">
        <img src="../assets/images/homeBanner/banner1.jpg" alt="">
        <img src="../assets/images/homeBanner/banner2.jpg" alt="">
        <img src="../assets/images/homeBanner/banner3.jpg" alt="">
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../assets/css/function';
    .homeBanner{
        position: relative;
        width: 100%;
        img{
            display: block;
            width: 100%;
        }
    }
</style>
