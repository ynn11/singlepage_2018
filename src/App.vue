<template>
    <div id="app">
        <div class="shareImg">
            <img src='http://static.storeer.com/getheadimg_300.png' alt="">
        </div>
        <transition name="slide-left">
            <router-view class="content"></router-view>
        </transition>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'app',
    components: {

    },
    data () {
        return {

        }
    },
    watch: {

    },
    methods: {

    },
    mounted(){
      //去掉ios弹出alert的时候标题栏带地址
      window.alert = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
      }
      //重写confirm方法，去掉地址显示
      window.confirm = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        var result = window.frames[0].window.confirm(name);
        iframe.parentNode.removeChild(iframe);
        return result;
      }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import './assets/css/function';
.shareImg{
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    overflow: hidden;
}
.icon {
    font-family:"icon" !important;
    font-size:18px;
    font-style:normal;
    color: #ffffff;
}

html,body {
    /*写了高度ios上会出现滚动卡死*/
    height: 100%;
    overflow: hidden;
}
a.active,a:hover {
    text-decoration: none;
}
/*
    清除textarea,input默认样式
 */
textarea{
    outline:none;
    resize:none;
    background: none;
    border: none;
    box-shadow: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
}
input{
    background: none;
    outline: none;
    box-shadow: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    .content{
        position: relative;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling : touch;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .tabar {
        margin-bottom: px2rem(120px);
    }
    .slide-left-enter-active {
        animation: slideLeft .3s;
    }
}
@keyframes slideLeft {
    from {
        transform: translate3d(100%,0, 0);
        visibility: visible;
    }
    to {
        transform: translate3d(0, 0, 0);
    }
}
</style>
