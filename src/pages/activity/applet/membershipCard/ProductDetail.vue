<template>
    <div class="membership-product">
        <div class="main-content">
            <img :src="productPic" alt="" class="product-pic">
        </div>
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import loading from '@/components/common/loading'
    export default {
        components: {
            "v-loading": loading
        },
        data() {
            return {
                productPic: this.$route.query.productPic,
                loading: false
            }
        },
        methods: {

        },
        created(){

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .membership-product{
        position: relative;
        .main-content{
            min-height: 101%;
            .product-pic{
                display: block;
                width: 100%;
            }
        }
    }
</style>
