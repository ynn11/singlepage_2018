<template>
    <div class="tp_001">
        <div class="page-header">
            <div class="header-icon" @click="goBack"><i class="iconfont icon-fanhui"></i></div>
            <div class="header-cont"><p>详情编辑</p></div>
        </div>
        <div class="handle">
            <div class="item" @click="historyBack">
                <i class="iconfont icon-chexiao"></i>
            </div>
            <div class="item" @click="historyReback">
                <i class="iconfont icon-fanchexiao"></i>
            </div>
            <div class="item" @click="saveTemplate">
                <i class="iconfont icon-save"></i>
            </div>
            <div class="item" @click="savePic">
                <i class="iconfont icon-fabu"></i>
            </div>
        </div>
        <div class="editArea">
            <div class="main-contain canvas">
                <div class="main"
                data-handleline="main"
                @touchstart="touchstart"
                @touchmove="touchmove"
                @touchend="touchend">
                    <div class="img-border"
                    @click="cancleHandleLine"
                    v-show="showHandleLine==='main'">
                        <div class="upload-btn" @click="uploadPic">
                            <i class="iconfont icon-tianjiatupian"></i>
                        </div>
                    </div>
                    <div class="img-contain" @click="setHandleLine('main')">
                        <img
                        :src="pageData.imgList.main"
                        :style="'top:' + pageData.main.top/75 + 'rem;left:' + pageData.main.left/75 + 'rem;width:' + pageData.main.width/75 + 'rem;height:' + pageData.main.height/75 + 'rem;'" />
                    </div>
                </div>
            </div>
            <div class="structure-contain canvas">
                <div class="structure">
                    <div class="header">
                        <img :src="title_bg.structure" alt="">
                    </div>
                    <div class="structure_1 structure-item clearfix">
                        <div class="box"
                        data-handleline="structure_1"
                        @touchstart="touchstart"
                        @touchmove="touchmove"
                        @touchend="touchend">
                            <div class="img-border"
                            @click="cancleHandleLine"
                            v-show="showHandleLine==='structure_1'">
                                <div class="upload-btn" @click="uploadPic">
                                    <i class="iconfont icon-tianjiatupian"></i>
                                </div>
                            </div>
                            <div class="img-contain" @click="setHandleLine('structure_1')">
                                <img
                                :src="pageData.imgList.structure_1"
                                :style="'top:' + pageData.structure_1.top/75 + 'rem;left:' + pageData.structure_1.left/75 + 'rem;width:' + pageData.structure_1.width/75 + 'rem;height:' + pageData.structure_1.height/75 + 'rem;'">
                            </div>
                        </div>
                        <div class="words">
                            <p>——</p>
                            <textarea name=""
                            v-model="pageData.structure_1.words"
                            class="structure_words_1"
                            @focus="focus('structure_1')"
                            @blur="blur('structure_1')"
                            @keyup="keyup($event)"></textarea>
                        </div>
                    </div>
                    <div class="structure_2 structure-item clearfix">
                        <div class="box"
                        data-handleline="structure_2"
                        @touchstart="touchstart"
                        @touchmove="touchmove"
                        @touchend="touchend">
                            <div class="img-border"
                            @click="cancleHandleLine"
                            v-show="showHandleLine==='structure_2'">
                                <div class="upload-btn" @click="uploadPic">
                                    <i class="iconfont icon-tianjiatupian"></i>
                                </div>
                            </div>
                            <div class="img-contain" @click="setHandleLine('structure_2')">
                                <img
                                :src="pageData.imgList.structure_2"
                                :style="'top:' + pageData.structure_2.top/75 + 'rem;left:' + pageData.structure_2.left/75 + 'rem;width:' + pageData.structure_2.width/75 + 'rem;height:' + pageData.structure_2.height/75 + 'rem;'">
                            </div>
                        </div>
                        <div class="words">
                            <p>——</p>
                            <textarea name=""
                            v-model="pageData.structure_2.words"
                            class="structure_words_2"
                            @focus="focus('structure_2')"
                            @blur="blur('structure_2')"
                            @keyup="keyup($event)"></textarea>
                        </div>
                    </div>
                    <div class="structure_3 structure-item clearfix">
                        <div class="box"
                        data-handleline="structure_3"
                        @touchstart="touchstart"
                        @touchmove="touchmove"
                        @touchend="touchend">
                            <div class="img-border"
                            @click="cancleHandleLine"
                            v-show="showHandleLine==='structure_3'">
                                <div class="upload-btn" @click="uploadPic">
                                    <i class="iconfont icon-tianjiatupian"></i>
                                </div>
                            </div>
                            <div class="img-contain" @click="setHandleLine('structure_3')">
                                <img
                                :src="pageData.imgList.structure_3"
                                :style="'top:' + pageData.structure_3.top/75 + 'rem;left:' + pageData.structure_3.left/75 + 'rem;width:' + pageData.structure_3.width/75 + 'rem;height:' + pageData.structure_3.height/75 + 'rem;'">
                            </div>
                        </div>
                        <div class="words">
                            <p>——</p>
                            <textarea name=""
                            v-model="pageData.structure_3.words"
                            class="structure_words_3"
                            @focus="focus('structure_3')"
                            @blur="blur('structure_3')"
                            @keyup="keyup($event)"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="canvas-colloction canvas">
                <div class="collocation">
                    <div class="header">
                        <img :src="title_bg.collocation" alt="">
                    </div>
                    <div class="collocation-item clearfix">
                        <div class="item" v-for="(item,index) in pageData.collocation" @click="selectCollocation(index)">
                            <img :src="item.picUrl" alt="">
                            <p class="name textOver2">{{item.name}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="canvas-show canvas">
                <div class="show">
                    <div class="header">
                        <img :src="title_bg.show" alt="">
                    </div>
                    <div class="show_1 show-item">
                        <div class="box box-1"
                        data-handleline="show_1"
                        @touchstart="touchstart"
                        @touchmove="touchmove"
                        @touchend="touchend">
                            <div class="img-border"
                            @click="cancleHandleLine"
                            v-show="showHandleLine==='show_1'">
                                <div class="upload-btn" @click="uploadPic">
                                    <i class="iconfont icon-tianjiatupian"></i>
                                </div>
                            </div>
                            <div class="img-contain" @click="setHandleLine('show_1')">
                                <img :src="pageData.imgList.show_1" :style="'top:' + pageData.show_1.top/75 + 'rem;left:' + pageData.show_1.left/75 + 'rem;width:' + pageData.show_1.width/75 + 'rem;height:' + pageData.show_1.height/75 + 'rem;'" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="show_2 show-item clearfix">
                        <div class="box box-2"
                        data-handleline="show_2"
                        @touchstart="touchstart"
                        @touchmove="touchmove"
                        @touchend="touchend">
                            <div class="img-border"
                            @click="cancleHandleLine"
                            v-show="showHandleLine==='show_2'">
                                <div class="upload-btn" @click="uploadPic">
                                    <i class="iconfont icon-tianjiatupian"></i>
                                </div>
                            </div>
                            <div class="img-contain" @click="setHandleLine('show_2')">
                                <img :src="pageData.imgList.show_2" :style="'top:' + pageData.show_2.top/75 + 'rem;left:' + pageData.show_2.left/75 + 'rem;width:' + pageData.show_2.width/75 + 'rem;height:' + pageData.show_2.height/75 + 'rem;'" alt="">
                            </div>
                        </div>
                        <div class="box box-3"
                        data-handleline="show_3"
                        @touchstart="touchstart"
                        @touchmove="touchmove"
                        @touchend="touchend">
                            <div class="img-border"
                            @click="cancleHandleLine"
                            v-show="showHandleLine==='show_3'">
                                <div class="upload-btn" @click="uploadPic">
                                    <i class="iconfont icon-tianjiatupian"></i>
                                </div>
                            </div>
                            <div class="img-contain" @click="setHandleLine('show_3')">
                                <img :src="pageData.imgList.show_3" :style="'top:' + pageData.show_3.top/75 + 'rem;left:' + pageData.show_3.left/75 + 'rem;width:' + pageData.show_3.width/75 + 'rem;height:' + pageData.show_3.height/75 + 'rem;'" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="show_3 show-item">
                        <div class="box box-4"
                        data-handleline="show_4"
                        @touchstart="touchstart"
                        @touchmove="touchmove"
                        @touchend="touchend">
                            <div class="img-border"
                            @click="cancleHandleLine"
                            v-show="showHandleLine==='show_4'">
                                <div class="upload-btn" @click="uploadPic">
                                    <i class="iconfont icon-tianjiatupian"></i>
                                </div>
                            </div>
                            <div class="img-contain" @click="setHandleLine('show_4')">
                                <img :src="pageData.imgList.show_4" :style="'top:' + pageData.show_4.top/75 + 'rem;left:' + pageData.show_4.left/75 + 'rem;width:' + pageData.show_4.width/75 + 'rem;height:' + pageData.show_4.height/75 + 'rem;'" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="show_4 show-item">
                        <div class="box box-5"
                        data-handleline="show_5"
                        @touchstart="touchstart"
                        @touchmove="touchmove"
                        @touchend="touchend">
                            <div class="img-border"
                            @click="cancleHandleLine"
                            v-show="showHandleLine==='show_5'">
                                <div class="upload-btn" @click="uploadPic">
                                    <i class="iconfont icon-tianjiatupian"></i>
                                </div>
                            </div>
                            <div class="img-contain" @click="setHandleLine('show_5')">
                                <img :src="pageData.imgList.show_5" :style="'top:' + pageData.show_5.top/75 + 'rem;left:' + pageData.show_5.left/75 + 'rem;width:' + pageData.show_5.width/75 + 'rem;height:' + pageData.show_5.height/75 + 'rem;'" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="recommendList" v-if="collocationInfo.showRecommendList">
            <div class="mask" @click="collocationInfo.showRecommendList=false;"></div>
            <div class="rec-content">
                <div class="rec-item" v-for="(item,index) in collocationInfo.list" @click="selectThis(item)">
                    <div class="pic">
                        <img :src="item.productPicUrl" alt="">
                    </div>
                    <div class="name">{{item.productName}}</div>
                </div>
                <div class="rec-none" v-if="collocationInfo.list.length===0">
                    您的店铺中还没有上架商品哦！
                </div>
            </div>
        </div>

        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import loading from '@/components/common/loading'

    import api from '../../../../fetch/api'
    import * as _tool from '../../../../util/tool'
    export default {
        components: {
            "v-loading": loading
        },
        data() {
            return {
                templateCode: "tp_001",
                id: this.$route.query.id,
                productCode: this.$route.query.productCode,
                token: this.$route.query.token,
                //页面来源 ios/android
                type: this.$route.query.type,
                //页面内容数据
                pageData: {
                    imgList: {
                        main: "/static/images/sbTemplate/template1/main.jpg",
                        structure_1: "/static/images/sbTemplate/template1/structure_1.jpg",
                        structure_2: "/static/images/sbTemplate/template1/structure_2.jpg",
                        structure_3: "/static/images/sbTemplate/template1/structure_3.jpg",
                        show_1: "/static/images/sbTemplate/template1/show_1.jpg",
                        show_2: "/static/images/sbTemplate/template1/show_2.jpg",
                        show_3: "/static/images/sbTemplate/template1/show_3.jpg",
                        show_4: "/static/images/sbTemplate/template1/show_4.jpg",
                        show_5: "/static/images/sbTemplate/template1/show_5.jpg"
                    },
                    collocation: [{
                        picUrl: "/static/images/sbTemplate/template1/collocation_1.jpg",
                        productCode: "",
                        storeCode: "",
                        name: "推荐搭配1"
                    },{
                        picUrl: "/static/images/sbTemplate/template1/collocation_2.jpg",
                        productCode: "",
                        storeCode: "",
                        name: "推荐搭配2"
                    },{
                        picUrl: "/static/images/sbTemplate/template1/collocation_3.jpg",
                        productCode: "",
                        storeCode: "",
                        name: "推荐搭配3"
                    }],
                    main: {
                        width: 734,
                        height: 920,
                        top: 0,
                        left: 0,
                    },
                    structure_1: {
                        width: 410,
                        height: 270,
                        top: 0,
                        left: 0,
                        words: "根据不同内容可自由更换"
                    },
                    structure_2: {
                        width: 410,
                        height: 270,
                        top: 0,
                        left: 0,
                        words: "根据不同内容可自由更换"
                    },
                    structure_3: {
                        width: 410,
                        height: 270,
                        top: 0,
                        left: 0,
                        words: "根据不同内容可自由更换"
                    },
                    show_1: {
                        width: 654,
                        height: 765,
                        top: 0,
                        left: 0,
                    },
                    show_2: {
                        width: 315,
                        height: 540,
                        top: 0,
                        left: 0,
                    },
                    show_3: {
                        width: 315,
                        height: 540,
                        top: 0,
                        left: 0,
                    },
                    show_4: {
                        width: 654,
                        height: 765,
                        top: 0,
                        left: 0,
                    },
                    show_5: {
                        width: 654,
                        height: 765,
                        top: 0,
                        left: 0,
                    }
                },
                //图片地址前缀
                imgBaseUrl: 'http://static.storeer.com/',
                //操作
                showHandleLine: "",
                selecting: false,
                currentData: {
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0,
                },
                transPosition: "",
                startX: [],
                startY: [],
                endX: [],
                endY: [],
                tempRate: 1,
                history: [],
                historyIndex: 0,
                touchLength: 0,
                positionChanged: false,
                //临时文本记录
                tempText: "",
                title_bg: {
                    structure: "/static/images/sbTemplate/template1/title_structure.jpg",
                    collocation: "/static/images/sbTemplate/template1/title_collocation.jpg",
                    show: "/static/images/sbTemplate/template1/title_show.jpg"
                },
                //loading
                loading: false,
                //推荐商品
                collocationInfo: {
                    //选择推荐商品
                    showRecommendList: false,
                    //标记位
                    index: -1,
                    //商品列表
                    list: []
                }
            }
        },
        methods: {
            //返回上一级
            goBack: function(){
                this.$router.replace("/selectTemplate?productCode=" + this.productCode + "&id=" +  + this.id + "&token=" + this.token);
            },
            //撤销，反撤销
            historyBack(){
                // return;
                if (this.historyIndex===0) {
                    alert('已经是第一步咯，不能再撤销了');

                }else{
                    this.historyIndex--;
                    this.pageData = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
                }
            },
            historyReback(){
                if (this.historyIndex===(this.history.length-1)) {
                    alert('已经是最后一步咯，不能再前进了');
                }else{
                    this.historyIndex++;
                    this.pageData = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
                }
            },
            //保存编辑信息
            saveTemplate(exit){
                api.saveProductTemplate("post",{templateCode: this.templateCode,productCode: this.productCode,templateEditContent: JSON.stringify(this.pageData)},this.token).then((res) => {
                    if(res.returnCode==="0"){
                        alert('编辑信息保存成功，下次可继续编辑');
                        if(exit===true){
                            this.$router.back();
                        }
                    }else{
                        //错误处理
                        alert(res.message);
                    }
                });
            },
            //canvas绘制图片
            savePic(){
                //开启loading
                this.loading = true;
                //数据处理及操作
                this.canvas_main_num = 0;
                this.canvas_collocation_num = 0;
                this.canvas_structure_1_num = 0;
                this.canvas_structure_2_num = 0;
                this.canvas_show_1_num = 0;
                this.canvas_show_2_num = 0;
                this.canvas_show_3_num = 0;
                this.canvas_show_4_num = 0;
                this.uploadNum = 0;
                this.canvas_main_url = '';
                this.canvas_collocation_url = '';
                this.canvas_structure_url = [];
                this.canvas_show_url = [];
                //生成主图
                    //底色
                    let canvas_main = document.createElement("canvas");
                    canvas_main.width = 750;
                    canvas_main.height = 966;
                    let ctx_main = canvas_main.getContext("2d");
                    ctx_main.fillStyle = '#FFF';
                    ctx_main.fillRect(0,0,750,966);
                    ctx_main.fillStyle = '#777';
                    ctx_main.fillRect(8,8,734,920);
                    //图片绘制
                    let img_main = new Image();
                    img_main.crossOrigin = 'Anonymous';
                    img_main.src = this.pageData.imgList.main + "?" + new Date().getTime();
                    img_main.onload = ()=>{
                        let rate_main = img_main.height/this.pageData.main.height;
                        let width_main;
                        if (this.pageData.main.left>0) {
                            if (this.pageData.main.width+this.pageData.main.left<734) {
                                width_main = this.pageData.main.width;
                            }else{
                                width_main = 734 - this.pageData.main.left;
                            }
                        }else{
                            if (this.pageData.main.width+this.pageData.main.left<734) {
                                width_main = this.pageData.main.width+this.pageData.main.left;
                            }else{
                                width_main = 734;
                            }
                        }
                        let height_main;
                        if (this.pageData.main.top>0) {
                            if (this.pageData.main.height+this.pageData.main.top<920) {
                                height_main = this.pageData.main.height;
                            }else{
                                height_main = 920 - this.pageData.main.top;
                            }
                        }else{
                            if (this.pageData.main.height+this.pageData.main.top<920) {
                                height_main = this.pageData.main.height+this.pageData.main.top;
                            }else{
                                height_main = 920;
                            }
                        }
                        ctx_main.drawImage(img_main,
                            (this.pageData.main.left>0?0:(0-this.pageData.main.left))*rate_main,
                            (this.pageData.main.top>0?0:(0-this.pageData.main.top))*rate_main,
                            width_main*rate_main,
                            height_main*rate_main,
                            this.pageData.main.left<0?8:(8+this.pageData.main.left),
                            this.pageData.main.top<0?8:(8+this.pageData.main.top),
                            width_main,
                            height_main);
                        this.canvas_main_num ++;
                    };

                //生成设计结构图
                    //画线和文本
                    //第一张
                    //底色绘制
                    let canvas_structure_1 = document.createElement("canvas");
                    canvas_structure_1.width = 750;
                    canvas_structure_1.height = 440;
                    let ctx_structure_1 = canvas_structure_1.getContext("2d");
                    ctx_structure_1.fillStyle = '#FFF';
                    ctx_structure_1.fillRect(0,0,750,440);
                    ctx_structure_1.fillStyle = '#777';
                    ctx_structure_1.fillRect(8,80,410,270);
                    //header
                    let img_structure_header = new Image();
                    img_structure_header.src = this.title_bg.structure;
                    ctx_structure_1.drawImage(img_structure_header,8,0,734,40);
                    //结构1绘制
                    let img_structure_1 = new Image();
                    img_structure_1.crossOrigin = 'Anonymous';
                    img_structure_1.src = this.pageData.imgList.structure_1 + "?" +new Date().getTime();
                    img_structure_1.onload = ()=>{
                        let rate_structure_1 = img_structure_1.height/this.pageData.structure_1.height;
                        let width_structure_1;
                        if (this.pageData.structure_1.left>0) {
                            if (this.pageData.structure_1.width+this.pageData.structure_1.left<410) {
                                width_structure_1 = this.pageData.structure_1.width;
                            }else{
                                width_structure_1 = 410 - this.pageData.structure_1.left;
                            }
                        }else{
                            if (this.pageData.structure_1.width+this.pageData.structure_1.left<410) {
                                width_structure_1 = this.pageData.structure_1.width+this.pageData.structure_1.left;
                            }else{
                                width_structure_1 = 410;
                            }
                        }
                        let height_structure_1;
                        if (this.pageData.structure_1.top>0) {
                            if (this.pageData.structure_1.height+this.pageData.structure_1.top<270) {
                                height_structure_1 = this.pageData.structure_1.height;
                            }else{
                                height_structure_1 = 270 - this.pageData.structure_1.top;
                            }
                        }else{
                            if (this.pageData.structure_1.height+this.pageData.structure_1.top<270) {
                                height_structure_1 = this.pageData.structure_1.height+this.pageData.structure_1.top;
                            }else{
                                height_structure_1 = 270;
                            }
                        }
                        ctx_structure_1.drawImage(img_structure_1,
                            (this.pageData.structure_1.left>0?0:(0-this.pageData.structure_1.left))*rate_structure_1,
                            (this.pageData.structure_1.top>0?0:(0-this.pageData.structure_1.top))*rate_structure_1,
                            width_structure_1*rate_structure_1,
                            height_structure_1*rate_structure_1,
                            this.pageData.structure_1.left<0?8:(8+this.pageData.structure_1.left),
                            this.pageData.structure_1.top<0?80:(80+this.pageData.structure_1.top),
                            width_structure_1,
                            height_structure_1);
                        this.canvas_structure_1_num ++;
                    }
                    ctx_structure_1.lineWidth = 2;
                    ctx_structure_1.moveTo(490, 110);
                    ctx_structure_1.lineTo(514, 110);
                    ctx_structure_1.fill();
                    ctx_structure_1.strokeStyle = '#7d7d7d';
                    ctx_structure_1.stroke();
                    //结构1文字
                    let structure_1_words = this.pageData.structure_1.words.split("\n");
                    for (var i = 0,j=0; i < structure_1_words.length; i++) {
                        if (j>=4) {
                            break;
                        }
                        if (structure_1_words[i].length>8) {
                            let temp_words = structure_1_words[i];
                            for (var k = 0; k < temp_words.length; k+=8) {
                                if (j>=4) {
                                    break;
                                }
                                ctx_structure_1.font = "21px Arial";
                                ctx_structure_1.fillStyle = "#000";
                                ctx_structure_1.fillText(temp_words.substring(k,k+8), 490, 140+j*42);
                                j++;
                            }
                            continue;
                        }
                        ctx_structure_1.font = "21px Arial";
                        ctx_structure_1.fillStyle = "#000";
                        ctx_structure_1.fillText(structure_1_words[i], 490, 140+j*42);
                        j++;
                    }
                    this.canvas_structure_1_num ++;
                    //第二张
                    //底色绘制
                    let canvas_structure_2 = document.createElement("canvas");
                    canvas_structure_2.width = 750;
                    canvas_structure_2.height = 776;
                    let ctx_structure_2 = canvas_structure_2.getContext("2d");
                    ctx_structure_2.fillStyle = '#FFF';
                    ctx_structure_2.fillRect(0,0,750,776);
                    ctx_structure_2.fillStyle = '#777';
                    ctx_structure_2.fillRect(332,0,410,270);
                    ctx_structure_2.fillRect(8,360,410,270);
                    //结构2绘制
                    let img_structure_2 = new Image();
                    img_structure_2.crossOrigin = 'Anonymous';
                    img_structure_2.src = this.pageData.imgList.structure_2 + "?" +new Date().getTime();
                    img_structure_2.onload = ()=>{
                        let rate_structure_2 = img_structure_2.height/this.pageData.structure_2.height;
                        let width_structure_2;
                        if (this.pageData.structure_2.left>0) {
                            if (this.pageData.structure_2.width+this.pageData.structure_2.left<410) {
                                width_structure_2 = this.pageData.structure_2.width;
                            }else{
                                width_structure_2 = 410 - this.pageData.structure_2.left;
                            }
                        }else{
                            if (this.pageData.structure_2.width+this.pageData.structure_2.left<410) {
                                width_structure_2 = this.pageData.structure_2.width+this.pageData.structure_2.left;
                            }else{
                                width_structure_2 = 410;
                            }
                        }
                        let height_structure_2;
                        if (this.pageData.structure_2.top>0) {
                            if (this.pageData.structure_2.height+this.pageData.structure_2.top<270) {
                                height_structure_2 = this.pageData.structure_2.height;
                            }else{
                                height_structure_2 = 270 - this.pageData.structure_2.top;
                            }
                        }else{
                            if (this.pageData.structure_2.height+this.pageData.structure_2.top<270) {
                                height_structure_2 = this.pageData.structure_2.height+this.pageData.structure_2.top;
                            }else{
                                height_structure_2 = 270;
                            }
                        }
                        ctx_structure_2.drawImage(img_structure_2,
                            (this.pageData.structure_2.left>0?0:(0-this.pageData.structure_2.left))*rate_structure_2,
                            (this.pageData.structure_2.top>0?0:(0-this.pageData.structure_2.top))*rate_structure_2,
                            width_structure_2*rate_structure_2,
                            height_structure_2*rate_structure_2,
                            this.pageData.structure_2.left<0?332:(332+this.pageData.structure_2.left),
                            this.pageData.structure_2.top<0?0:(0+this.pageData.structure_2.top),
                            width_structure_2,
                            height_structure_2);
                        this.canvas_structure_2_num ++;
                    }
                    //结构3绘制
                    let img_structure_3 = new Image();
                    img_structure_3.crossOrigin = 'Anonymous';
                    img_structure_3.src = this.pageData.imgList.structure_3 + "?" +new Date().getTime();
                    img_structure_3.onload = ()=>{
                        let rate_structure_3 = img_structure_3.height/this.pageData.structure_3.height;
                        let width_structure_3;
                        if (this.pageData.structure_3.left>0) {
                            if (this.pageData.structure_3.width+this.pageData.structure_3.left<410) {
                                width_structure_3 = this.pageData.structure_3.width;
                            }else{
                                width_structure_3 = 410 - this.pageData.structure_3.left;
                            }
                        }else{
                            if (this.pageData.structure_3.width+this.pageData.structure_3.left<410) {
                                width_structure_3 = this.pageData.structure_3.width+this.pageData.structure_3.left;
                            }else{
                                width_structure_3 = 410;
                            }
                        }
                        let height_structure_3;
                        if (this.pageData.structure_3.top>0) {
                            if (this.pageData.structure_3.height+this.pageData.structure_3.top<270) {
                                height_structure_3 = this.pageData.structure_3.height;
                            }else{
                                height_structure_3 = 270 - this.pageData.structure_3.top;
                            }
                        }else{
                            if (this.pageData.structure_3.height+this.pageData.structure_3.top<270) {
                                height_structure_3 = this.pageData.structure_3.height+this.pageData.structure_3.top;
                            }else{
                                height_structure_3 = 270;
                            }
                        }
                        ctx_structure_2.drawImage(img_structure_3,
                            (this.pageData.structure_3.left>0?0:(0-this.pageData.structure_3.left))*rate_structure_3,
                            (this.pageData.structure_3.top>0?0:(0-this.pageData.structure_3.top))*rate_structure_3,
                            width_structure_3*rate_structure_3,
                            height_structure_3*rate_structure_3,
                            this.pageData.structure_3.left<0?8:(8+this.pageData.structure_3.left),
                            this.pageData.structure_3.top<0?360:(360+this.pageData.structure_3.top),
                            width_structure_3,
                            height_structure_3);
                        this.canvas_structure_2_num ++;
                    }
                    //画线和文本
                    ctx_structure_2.lineWidth = 2;
                    ctx_structure_2.moveTo(78, 30);
                    ctx_structure_2.lineTo(102, 30);
                    ctx_structure_2.moveTo(490, 390);
                    ctx_structure_2.lineTo(514, 390);
                    ctx_structure_2.fill();
                    ctx_structure_2.strokeStyle = '#7d7d7d';
                    ctx_structure_2.stroke();
                    //结构2文字
                    let structure_2_words = this.pageData.structure_2.words.split("\n");
                    for (var i = 0,j=0; i < structure_2_words.length; i++) {
                        if (j>=4) {
                            break;
                        }
                        if (structure_2_words[i].length>8) {
                            let temp_words = structure_2_words[i];
                            for (var k = 0; k < temp_words.length; k+=8) {
                                if (j>=4) {
                                    break;
                                }
                                ctx_structure_2.font = "21px Arial";
                                ctx_structure_2.fillStyle = "#000";
                                ctx_structure_2.fillText(temp_words.substring(k,k+8), 78, 60+j*42);
                                j++;
                            }
                            continue;
                        }
                        ctx_structure_2.font = "21px Arial";
                        ctx_structure_2.fillStyle = "#000";
                        ctx_structure_2.fillText(structure_2_words[i], 78, 60+j*42);
                        j++;
                    }
                    this.canvas_structure_2_num ++;
                    //结构3文字
                    let structure_3_words = this.pageData.structure_3.words.split("\n");
                    for (var i = 0,j=0; i < structure_3_words.length; i++) {
                        if (j>=4) {
                            break;
                        }
                        if (structure_3_words[i].length>8) {
                            let temp_words = structure_3_words[i];
                            for (var k = 0; k < temp_words.length; k+=8) {
                                if (j>=4) {
                                    break;
                                }
                                ctx_structure_2.font = "21px Arial";
                                ctx_structure_2.fillStyle = "#000";
                                ctx_structure_2.fillText(temp_words.substring(k,k+8), 490, 420+j*42);
                                j++;
                            }
                            continue;
                        }
                        ctx_structure_2.font = "21px Arial";
                        ctx_structure_2.fillStyle = "#000";
                        ctx_structure_2.fillText(structure_3_words[i], 490, 420+j*42);
                        j++;
                    }
                    this.canvas_structure_2_num ++;

                //时尚搭配背景图
                    //绘制底色
                    let canvas_collocation = document.createElement("canvas");
                    canvas_collocation.width = 750;
                    canvas_collocation.height = 473;
                    let ctx_collocation = canvas_collocation.getContext("2d");
                    ctx_collocation.fillStyle = '#FFF';
                    ctx_collocation.fillRect(0,0,750,473);
                    let img_collocation_header = new Image();
                    img_collocation_header.src = this.title_bg.collocation;
                    ctx_collocation.drawImage(img_collocation_header,8,0,734,40);
                    this.canvas_collocation_num++;

                //生成模特展示图
                    //图一
                    //绘制底色
                    let canvas_show_1 = document.createElement("canvas");
                    canvas_show_1.width = 750;
                    canvas_show_1.height = 845;
                    let ctx_show_1 = canvas_show_1.getContext("2d");
                    ctx_show_1.fillStyle = '#FFF';
                    ctx_show_1.fillRect(0,0,750,845);
                    ctx_show_1.fillStyle = '#777';
                    ctx_show_1.fillRect(48,80,654,765);
                    //header
                    let img_show_header = new Image();
                    img_show_header.src = this.title_bg.show;
                    ctx_show_1.drawImage(img_show_header,8,0,734,40);
                    //展示1绘制
                    let img_show_1 = new Image();
                    img_show_1.crossOrigin = 'Anonymous';
                    img_show_1.src = this.pageData.imgList.show_1 + "?" +new Date().getTime();
                    img_show_1.onload = ()=>{
                        let rate_show_1 = img_show_1.height/this.pageData.show_1.height;
                        let width_show_1;
                        if (this.pageData.show_1.left>0) {
                            if (this.pageData.show_1.width+this.pageData.show_1.left<654) {
                                width_show_1 = this.pageData.show_1.width;
                            }else{
                                width_show_1 = 654 - this.pageData.show_1.left;
                            }
                        }else{
                            if (this.pageData.show_1.width+this.pageData.show_1.left<654) {
                                width_show_1 = this.pageData.show_1.width+this.pageData.show_1.left;
                            }else{
                                width_show_1 = 654;
                            }
                        }
                        let height_show_1;
                        if (this.pageData.show_1.top>0) {
                            if (this.pageData.show_1.height+this.pageData.show_1.top<765) {
                                height_show_1 = this.pageData.show_1.height;
                            }else{
                                height_show_1 = 765 - this.pageData.show_1.top;
                            }
                        }else{
                            if (this.pageData.show_1.height+this.pageData.show_1.top<765) {
                                height_show_1 = this.pageData.show_1.height+this.pageData.show_1.top;
                            }else{
                                height_show_1 = 765;
                            }
                        }
                        ctx_show_1.drawImage(img_show_1,
                            (this.pageData.show_1.left>0?0:(0-this.pageData.show_1.left))*rate_show_1,
                            (this.pageData.show_1.top>0?0:(0-this.pageData.show_1.top))*rate_show_1,
                            width_show_1*rate_show_1,
                            height_show_1*rate_show_1,
                            this.pageData.show_1.left<0?48:(48+this.pageData.show_1.left),
                            this.pageData.show_1.top<0?80:(80+this.pageData.show_1.top),
                            width_show_1,
                            height_show_1);
                        this.canvas_show_1_num ++;
                    }
                    //图二
                    //绘制底色
                    let canvas_show_2 = document.createElement("canvas");
                    canvas_show_2.width = 750;
                    canvas_show_2.height = 565;
                    let ctx_show_2 = canvas_show_2.getContext("2d");
                    ctx_show_2.fillStyle = '#FFF';
                    ctx_show_2.fillRect(0,0,750,565);
                    ctx_show_2.fillStyle = '#777';
                    ctx_show_2.fillRect(48,25,315,540);
                    ctx_show_2.fillRect(387,25,315,540);
                    //展示2绘制
                    let img_show_2 = new Image();
                    img_show_2.crossOrigin = 'Anonymous';
                    img_show_2.src = this.pageData.imgList.show_2 + "?" +new Date().getTime();
                    img_show_2.onload = ()=>{
                        let rate_show_2 = img_show_2.height/this.pageData.show_2.height;
                        let width_show_2;
                        if (this.pageData.show_2.left>0) {
                            if (this.pageData.show_2.width+this.pageData.show_2.left<315) {
                                width_show_2 = this.pageData.show_2.width;
                            }else{
                                width_show_2 = 315 - this.pageData.show_2.left;
                            }
                        }else{
                            if (this.pageData.show_2.width+this.pageData.show_2.left<315) {
                                width_show_2 = this.pageData.show_2.width+this.pageData.show_2.left;
                            }else{
                                width_show_2 = 315;
                            }
                        }
                        let height_show_2;
                        if (this.pageData.show_2.top>0) {
                            if (this.pageData.show_2.height+this.pageData.show_2.top<540) {
                                height_show_2 = this.pageData.show_2.height;
                            }else{
                                height_show_2 = 540 - this.pageData.show_2.top;
                            }
                        }else{
                            if (this.pageData.show_2.height+this.pageData.show_2.top<540) {
                                height_show_2 = this.pageData.show_2.height+this.pageData.show_2.top;
                            }else{
                                height_show_2 = 540;
                            }
                        }
                        ctx_show_2.drawImage(img_show_2,
                            (this.pageData.show_2.left>0?0:(0-this.pageData.show_2.left))*rate_show_2,
                            (this.pageData.show_2.top>0?0:(0-this.pageData.show_2.top))*rate_show_2,
                            width_show_2*rate_show_2,
                            height_show_2*rate_show_2,
                            this.pageData.show_2.left<0?48:(48+this.pageData.show_2.left),
                            this.pageData.show_2.top<0?25:(25+this.pageData.show_2.top),
                            width_show_2,
                            height_show_2);
                        this.canvas_show_2_num ++;
                    }
                    //展示3绘制
                    let img_show_3 = new Image();
                    img_show_3.crossOrigin = 'Anonymous';
                    img_show_3.src = this.pageData.imgList.show_3 + "?" +new Date().getTime();
                    img_show_3.onload = ()=>{
                        let rate_show_3 = img_show_3.height/this.pageData.show_3.height;
                        let width_show_3;
                        if (this.pageData.show_3.left>0) {
                            if (this.pageData.show_3.width+this.pageData.show_3.left<315) {
                                width_show_3 = this.pageData.show_3.width;
                            }else{
                                width_show_3 = 315 - this.pageData.show_3.left;
                            }
                        }else{
                            if (this.pageData.show_3.width+this.pageData.show_3.left<315) {
                                width_show_3 = this.pageData.show_3.width+this.pageData.show_3.left;
                            }else{
                                width_show_3 = 315;
                            }
                        }
                        let height_show_3;
                        if (this.pageData.show_3.top>0) {
                            if (this.pageData.show_3.height+this.pageData.show_3.top<540) {
                                height_show_3 = this.pageData.show_3.height;
                            }else{
                                height_show_3 = 540 - this.pageData.show_3.top;
                            }
                        }else{
                            if (this.pageData.show_3.height+this.pageData.show_3.top<540) {
                                height_show_3 = this.pageData.show_3.height+this.pageData.show_3.top;
                            }else{
                                height_show_3 = 540;
                            }
                        }
                        ctx_show_2.drawImage(img_show_3,
                            (this.pageData.show_3.left>0?0:(0-this.pageData.show_3.left))*rate_show_3,
                            (this.pageData.show_3.top>0?0:(0-this.pageData.show_3.top))*rate_show_3,
                            width_show_3*rate_show_3,
                            height_show_3*rate_show_3,
                            this.pageData.show_3.left<0?387:(387+this.pageData.show_3.left),
                            this.pageData.show_3.top<0?25:(25+this.pageData.show_3.top),
                            width_show_3,
                            height_show_3);
                        this.canvas_show_2_num ++;
                    }
                    //图三
                    //绘制底色
                    let canvas_show_3 = document.createElement("canvas");
                    canvas_show_3.width = 750;
                    canvas_show_3.height = 790;
                    let ctx_show_3 = canvas_show_3.getContext("2d");
                    ctx_show_3.fillStyle = '#FFF';
                    ctx_show_3.fillRect(0,0,750,790);
                    ctx_show_3.fillStyle = '#777';
                    ctx_show_3.fillRect(48,25,654,765);
                    //展示4绘制
                    let img_show_4 = new Image();
                    img_show_4.crossOrigin = 'Anonymous';
                    img_show_4.src = this.pageData.imgList.show_4 + "?" +new Date().getTime();
                    img_show_4.onload = ()=>{
                        let rate_show_4 = img_show_4.height/this.pageData.show_4.height;
                        let width_show_4;
                        if (this.pageData.show_4.left>0) {
                            if (this.pageData.show_4.width+this.pageData.show_4.left<654) {
                                width_show_4 = this.pageData.show_4.width;
                            }else{
                                width_show_4 = 654 - this.pageData.show_4.left;
                            }
                        }else{
                            if (this.pageData.show_4.width+this.pageData.show_4.left<654) {
                                width_show_4 = this.pageData.show_4.width+this.pageData.show_4.left;
                            }else{
                                width_show_4 = 654;
                            }
                        }
                        let height_show_4;
                        if (this.pageData.show_4.top>0) {
                            if (this.pageData.show_4.height+this.pageData.show_4.top<765) {
                                height_show_4 = this.pageData.show_4.height;
                            }else{
                                height_show_4 = 765 - this.pageData.show_4.top;
                            }
                        }else{
                            if (this.pageData.show_4.height+this.pageData.show_4.top<765) {
                                height_show_4 = this.pageData.show_4.height+this.pageData.show_4.top;
                            }else{
                                height_show_4 = 765;
                            }
                        }
                        ctx_show_3.drawImage(img_show_4,
                            (this.pageData.show_4.left>0?0:(0-this.pageData.show_4.left))*rate_show_4,
                            (this.pageData.show_4.top>0?0:(0-this.pageData.show_4.top))*rate_show_4,
                            width_show_4*rate_show_4,
                            height_show_4*rate_show_4,
                            this.pageData.show_4.left<0?48:(48+this.pageData.show_4.left),
                            this.pageData.show_4.top<0?25:(25+this.pageData.show_4.top),
                            width_show_4,
                            height_show_4);
                        this.canvas_show_3_num ++;
                    }
                    //图四
                    //绘制底色
                    let canvas_show_4 = document.createElement("canvas");
                    canvas_show_4.width = 750;
                    canvas_show_4.height = 870;
                    let ctx_show_4 = canvas_show_4.getContext("2d");
                    ctx_show_4.fillStyle = '#FFF';
                    ctx_show_4.fillRect(0,0,750,870);
                    ctx_show_4.fillStyle = '#777';
                    ctx_show_4.fillRect(48,25,654,765);
                    //展示5绘制
                    let img_show_5 = new Image();
                    img_show_5.crossOrigin = 'Anonymous';
                    img_show_5.src = this.pageData.imgList.show_5 + "?" +new Date().getTime();
                    img_show_5.onload = ()=>{
                        let rate_show_5 = img_show_5.height/this.pageData.show_5.height;
                        let width_show_5;
                        if (this.pageData.show_5.left>0) {
                            if (this.pageData.show_5.width+this.pageData.show_5.left<654) {
                                width_show_5 = this.pageData.show_5.width;
                            }else{
                                width_show_5 = 654 - this.pageData.show_5.left;
                            }
                        }else{
                            if (this.pageData.show_5.width+this.pageData.show_5.left<654) {
                                width_show_5 = this.pageData.show_5.width+this.pageData.show_5.left;
                            }else{
                                width_show_5 = 654;
                            }
                        }
                        let height_show_5;
                        if (this.pageData.show_5.top>0) {
                            if (this.pageData.show_5.height+this.pageData.show_5.top<765) {
                                height_show_5 = this.pageData.show_5.height;
                            }else{
                                height_show_5 = 765 - this.pageData.show_5.top;
                            }
                        }else{
                            if (this.pageData.show_5.height+this.pageData.show_5.top<765) {
                                height_show_5 = this.pageData.show_5.height+this.pageData.show_5.top;
                            }else{
                                height_show_5 = 765;
                            }
                        }
                        ctx_show_4.drawImage(img_show_5,
                            (this.pageData.show_5.left>0?0:(0-this.pageData.show_5.left))*rate_show_5,
                            (this.pageData.show_5.top>0?0:(0-this.pageData.show_5.top))*rate_show_5,
                            width_show_5*rate_show_5,
                            height_show_5*rate_show_5,
                            this.pageData.show_5.left<0?48:(48+this.pageData.show_5.left),
                            this.pageData.show_5.top<0?25:(25+this.pageData.show_5.top),
                            width_show_5,
                            height_show_5);
                        this.canvas_show_4_num ++;
                    }
                //统一发起图片转码
                this.canvasToBase(canvas_main,"main",1);
                this.canvasToBase(canvas_collocation,"collocation",1);
                this.canvasToBase(canvas_structure_1,"structure_1",2);
                this.canvasToBase(canvas_structure_2,"structure_2",4);
                this.canvasToBase(canvas_show_1,"show_1",1);
                this.canvasToBase(canvas_show_2,"show_2",2);
                this.canvasToBase(canvas_show_3,"show_3",1);
                this.canvasToBase(canvas_show_4,"show_4",1);
            },
            //转码
            canvasToBase(a,b,c){
                let num;
                switch (b){
                    case "main":
                        num = this.canvas_main_num;
                    break;
                    case "collocation":
                        num = this.canvas_collocation_num;
                    break;
                    case "structure_1":
                        num = this.canvas_structure_1_num;
                    break;
                    case "structure_2":
                        num = this.canvas_structure_2_num;
                    break;
                    case "show_1":
                        num = this.canvas_show_1_num;
                    break;
                    case "show_2":
                        num = this.canvas_show_2_num;
                    break;
                    case "show_3":
                        num = this.canvas_show_3_num;
                    break;
                    case "show_4":
                        num = this.canvas_show_4_num;
                    break;
                    default:
                    break;
                }
                if (num==c) {
                    this.canvasUpload(a.toDataURL("image/jpeg"),b);
                }else{
                    console.log("else",num,c);
                    setTimeout(()=>{
                        this.canvasToBase(a,b,c);
                    },500)
                }
            },
            //上传
            canvasUpload(a,b){
                //上传文件命名
                let uuid = _tool.uuid();
                let key = encodeURI('wlwb/sbTemplate/' + uuid + new Date().getTime());
                //预先插入至图片列表
                api.getImageToken("get",{saveKey:key})
                .then(res => {
                    if(res.returnCode==="0"){
                        this.uploadData ={
                            key,
                            token: res.returnContent
                        }
                        var pic = a.substring(23);
                        var url = "https://up-z2.qbox.me/putb64/-1/"+((this.uploadData.key).replace(/\//g,"_")).replace(/\+/g,"-");
                        var xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = ()=>{
                            if (xhr.readyState==4&&xhr.status==200){
                                let response = JSON.parse(xhr.response);
                                switch (b){
                                    case "main":
                                    this.canvas_main_url = this.imgBaseUrl + response.key;
                                    break;
                                    case "collocation":
                                    this.canvas_collocation_url = this.imgBaseUrl + response.key;
                                    break;
                                    case "structure_1":
                                    this.canvas_structure_url[0] = this.imgBaseUrl + response.key;
                                    break;
                                    case "structure_2":
                                    this.canvas_structure_url[1] = this.imgBaseUrl + response.key;
                                    break;
                                    case "show_1":
                                    this.canvas_show_url[0] = this.imgBaseUrl + response.key;
                                    break;
                                    case "show_2":
                                    this.canvas_show_url[1] = this.imgBaseUrl + response.key;
                                    break;
                                    case "show_3":
                                    this.canvas_show_url[2] = this.imgBaseUrl + response.key;
                                    break;
                                    case "show_4":
                                    this.canvas_show_url[3] = this.imgBaseUrl + response.key;
                                    break;
                                    default:
                                    break;
                                }
                                this.uploadNum ++;
                                if (this.uploadNum===8) {
                                    this.createProductDetail();
                                }
                            }else if(xhr.readyState==4){
                                alert(" 上传出错了！");
                            }
                        }
                        xhr.open("POST", url, true);
                        xhr.setRequestHeader("Content-Type", "application/octet-stream");
                        xhr.setRequestHeader("Authorization", "UpToken "+this.uploadData.token);
                        xhr.send(pic);
                    }else{
                        //错误处理
                        alert(res.message);
                    }
                    this.pageData.selecting = false;
                });
            },
            //生成详情html并提交
            createProductDetail(){
                var prefix = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1"><title>商品详情</title><style type="text/css" media="screen">html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,menu,nav,output,ruby,section,summary,time,mark,audio,video,input{margin:0;padding:0;border:0;font-weight:400;vertical-align:baseline}html,body{width:100%}a{text-decoration:none;color:#333}a:hover{text-decoration:none;color:#333}a:hover img{border:none}.contain{width:100%;overflow-x:hidden;overflow-y:auto;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.contain .autoWidth{display:block;width:100%}.contain .collocation{position:relative;width:100%;overflow:hidden}.contain .collocation .bg{width:100%}.contain .collocation .item-contain{position:absolute;top:12%;width:100%}.contain .collocation .item-contain .item{float:left;width:32%;margin-left:1%}.contain .collocation .item-contain .item img{width:100%}.contain .collocation .item-contain .item .name{word-wrap:break-word;text-align:center;font-size:.6rem}</style></head><body><div class="contain">'
                var profix = '</div></body></html>';
                //如果不选择推荐商品则不予以显示
                var collocationChoosed = [];
                this.pageData.collocation.forEach((item,index)=>{
                    if (item.productCode!=="") {
                        collocationChoosed.push(item);
                    }
                });
                var htmlStr =  '';
                htmlStr += prefix;
                htmlStr += '<img class="autoWidth" src="' + this.canvas_main_url + '" alt="">';
                htmlStr += '<img class="autoWidth" src="' + this.canvas_structure_url[0] + '" alt="">';
                htmlStr += '<img class="autoWidth" src="' + this.canvas_structure_url[1] + '" alt="">';
                if (collocationChoosed.length!==0) {
                    htmlStr += '<div class="collocation"><img src="' + this.canvas_collocation_url + '" alt="" class="bg"><div class="item-contain">'
                    collocationChoosed.forEach((item,index)=>{
                        htmlStr += '<div class="item">';
                        htmlStr += '<a href="https://wap.storeer.com?productCode=' + item.productCode + '&storeCode=' + item.storeCode + '">';
                        htmlStr += '<img src="' + item.picUrl + '" alt="">';
                        htmlStr += '<div class="name">' + item.name + '</div>';
                        htmlStr += '</a>';
                        htmlStr += '</div>';
                    });
                    htmlStr += '</div></div>';
                }
                for (var i = 0; i < this.canvas_show_url.length; i++) {
                    htmlStr += '<img class="autoWidth" src="' + this.canvas_show_url[i] + '" alt="">';
                }
                htmlStr += profix;
                var jsonData = [{
                    type: "img",
                    url: this.canvas_main_url
                }];
                for (var i = 0; i < this.canvas_structure_url.length; i++) {
                    jsonData.push({
                        type: "img",
                        url: this.canvas_structure_url[i]
                    });
                }
                jsonData.push({
                    type: "collocation",
                    url: this.canvas_collocation_url,
                    data: collocationChoosed
                });
                for (var i = 0; i < this.canvas_show_url.length; i++) {
                    jsonData.push({
                        type: "img",
                        url: this.canvas_show_url[i]
                    });
                };
                //保存
                api.saveProductTemplate("post",{templateCode: this.templateCode,productCode: this.productCode,templateEditContent: JSON.stringify(this.pageData)},this.token).then((res) => {
                    if(res.returnCode==="0"){

                    }else{
                        //错误处理
                        alert(res.message);
                    }
                });
                //请求发布接口
                api.publishProduct("post",{
                    templateCode: this.templateCode,
                    productCode: this.productCode,
                    productDetailHtml: htmlStr,
                    productDetailJson: JSON.stringify(jsonData)
                },this.token).then((res) => {
                    if(res.returnCode==="0"){
                        alert("发布完成");
                        WebViewJavascriptBridge.callHandler('backToList',null,function() {});
                        this.loading = false;
                    }else{
                        //错误处理
                        this.loading = false;
                        alert(res.message);
                    }
                });
            },
            //推荐商品选择
            selectCollocation(index){
                this.collocationInfo.index = index;
                if (this.collocationInfo.list.length>0) {
                    this.collocationInfo.showRecommendList = true;
                    return;
                }
                api.showRecommendGoodsList("get",{productCode: this.productCode},this.token).then((res) => {
                    if(res.returnCode==="0"){
                        this.collocationInfo.list = res.returnContent;
                        this.collocationInfo.showRecommendList = true;
                    }else{
                        //错误处理
                        alert(res.message);
                    }
                });
            },
            selectThis: function (item) {
                this.pageData.collocation[this.collocationInfo.index].picUrl = item.productPicUrl;
                this.pageData.collocation[this.collocationInfo.index].productCode = item.productCode;
                this.pageData.collocation[this.collocationInfo.index].storeCode = item.storeCode;
                this.pageData.collocation[this.collocationInfo.index].name = item.productName;
                this.collocationInfo.showRecommendList = false;
            },
            //图片编辑
            touchstart: function(e){
                //标记当前操作对象
                switch (this.showHandleLine){
                    case "main":
                    this.currentData = this.pageData.main;
                    break;
                    case "structure_1":
                    this.currentData = this.pageData.structure_1;
                    break;
                    case "structure_2":
                    this.currentData = this.pageData.structure_2;
                    break;
                    case "structure_3":
                    this.currentData = this.pageData.structure_3;
                    break;
                    case "show_1":
                    this.currentData = this.pageData.show_1;
                    break;
                    case "show_2":
                    this.currentData = this.pageData.show_2;
                    break;
                    case "show_3":
                    this.currentData = this.pageData.show_3;
                    break;
                    case "show_4":
                    this.currentData = this.pageData.show_4;
                    break;
                    case "show_5":
                    this.currentData = this.pageData.show_5;
                    break;
                    default:
                    break;
                }
                //记录初始点
                if (e.targetTouches.length===1) {
                    this.touchLength = 1;
                    this.startX = [e.targetTouches[0].pageX,0];
                    this.startY = [e.targetTouches[0].pageY,0];
                }else if(e.targetTouches.length===2){
                    this.touchLength = 2;
                    this.startX = [e.targetTouches[0].pageX,e.targetTouches[1].pageX];
                    this.startY = [e.targetTouches[0].pageY,e.targetTouches[1].pageY];
                }
                //初始化临时比例
                this.tempRate = 1;
            },
            touchmove: function(e){
                if (this.showHandleLine !== e.currentTarget.dataset.handleline) {
                    return;
                }
                if (this.showHandleLine !== "") {
                    e.stopPropagation();
                    e.preventDefault();
                }
                if (e.targetTouches.length===1) {
                    if (this.touchLength===2) {
                        return;
                    }
                    this.currentData.left += e.targetTouches[0].pageX - this.startX[0];
                    this.currentData.top += e.targetTouches[0].pageY - this.startY[0];
                    this.startX = [e.targetTouches[0].pageX,0];
                    this.startY = [e.targetTouches[0].pageY,0];
                    this.positionChanged = true;
                }else if( e.targetTouches.length===2){
                    this.endX = [e.targetTouches[0].pageX,e.targetTouches[1].pageX];
                    this.endY = [e.targetTouches[0].pageY,e.targetTouches[1].pageY];
                    let rate = Math.sqrt((Math.abs(this.endX[1]-this.endX[0])^2)+(Math.abs(this.endY[1]-this.endY[0])^2))/Math.sqrt((Math.abs(this.startX[1]-this.startX[0])^2)+(Math.abs(this.startY[1]-this.startY[0])^2));
                    this.currentData.width = this.currentData.width*rate/this.tempRate;
                    this.currentData.height = this.currentData.height*rate/this.tempRate;
                    this.currentData.top = this.currentData.top - (this.currentData.height*rate/this.tempRate - this.currentData.height)/2;
                    this.currentData.left = this.currentData.left - (this.currentData.width*rate/this.tempRate - this.currentData.width)/2;
                    this.tempRate = rate;
                }
            },
            touchend: function(e){
                this.currentData = [];
                if (this.showHandleLine !== ""&&this.positionChanged === true) {
                    //截取当前索引前的历史记录
                    this.history = JSON.parse(JSON.stringify(this.history.slice(0, (this.historyIndex+1))));
                    //临时pageData,并清空操作区
                    let tempPageData = JSON.parse(JSON.stringify(this.pageData));
                    this.history.push(tempPageData);
                    this.historyIndex++;
                    this.positionChanged = false;
                }
            },
            //文本是否加入到历史
            focus(name){
                this.showHandleLine = "";
                switch (name){
                    case "structure_1":
                    this.tempText = "" + this.pageData.structure_1.words;
                    break;
                    case "structure_2":
                    this.tempText = "" + this.pageData.structure_2.words;
                    break;
                    case "structure_3":
                    this.tempText = "" + this.pageData.structure_3.words;
                    break;
                    default:
                    break;
                }
            },
            blur(name){
                let status = false;
                switch (name){
                    case "structure_1":
                    if (this.tempText !== this.pageData.structure_1.words) {
                        status = true;
                    };
                    document.getElementsByClassName("structure_words_1")[0].scrollTop=0
                    break;
                    case "structure_2":
                    if (this.tempText !== this.pageData.structure_2.words) {
                        status = true;
                    };
                    document.getElementsByClassName("structure_words_2")[0].scrollTop=0
                    break;
                    case "structure_3":
                    if (this.tempText !== this.pageData.structure_3.words) {
                        status = true;
                    };
                    document.getElementsByClassName("structure_words_3")[0].scrollTop=0
                    break;
                    default:
                    break;
                }
                if(status){
                    //截取当前索引前的历史记录
                    this.history = JSON.parse(JSON.stringify(this.history.slice(0, (this.historyIndex+1))));
                    //临时pageData,并清空操作区
                    let tempPageData = JSON.parse(JSON.stringify(this.pageData));
                    this.history.push(tempPageData);
                    this.historyIndex++;
                }
            },
            keyup(e){
                // if(e.target.scrollHeight>170){
                //     this.$message('文本过长，请注意实际显示效果');
                // }
            },
            //图片上传
            uploadPic: function(e){
                var that = this;
                e.stopPropagation();
                WebViewJavascriptBridge.callHandler('selectPictureNoCrop',null,function(response) {
                    var tempImg = new Image();
                    tempImg.src = response;
                    let tempdata;
                    switch (that.showHandleLine){
                        case "main":
                        that.pageData.imgList.main = response;
                        tempdata = that.pageData.main;
                        break;
                        case "structure_1":
                        that.pageData.imgList.structure_1 = response;
                        tempdata = that.pageData.structure_1;
                        break;
                        case "structure_2":
                        that.pageData.imgList.structure_2 = response;
                        tempdata = that.pageData.structure_2;
                        break;
                        case "structure_3":
                        that.pageData.imgList.structure_3 = response;
                        tempdata = that.pageData.structure_3;
                        break;
                        case "show_1":
                        that.pageData.imgList.show_1 = response;
                        tempdata = that.pageData.show_1;
                        break;
                        case "show_2":
                        that.pageData.imgList.show_2 = response;
                        tempdata = that.pageData.show_2;
                        break;
                        case "show_3":
                        that.pageData.imgList.show_3 = response;
                        tempdata = that.pageData.show_3;
                        break;
                        case "show_4":
                        that.pageData.imgList.show_4 = response;
                        tempdata = that.pageData.show_4;
                        break;
                        case "show_5":
                        that.pageData.imgList.show_5 = response;
                        tempdata = that.pageData.show_5;
                        break;
                        default:
                        break;
                    }
                    tempImg.onload = () =>  {
                        tempdata.top = 0;
                        tempdata.left = 0;
                        tempdata.width = tempImg.width;
                        tempdata.height = tempImg.height;
                        //截取当前索引前的历史记录
                        that.history = JSON.parse(JSON.stringify(that.history.slice(0, (that.historyIndex+1))));
                        //临时pageData,并清空操作区
                        let tempPageData = JSON.parse(JSON.stringify(that.pageData));
                        that.history.push(tempPageData);
                        that.historyIndex++;
                    }
                });
            },
            //拉取已编辑信息
            getPenTemplateInfo: function () {
                api.getPenTemplateInfo("get",{templateCode: this.templateCode,productCode: this.productCode},this.token).then((res) => {
                    if(res.returnCode==="0"){
                        if (res.returnContent!==null) {
                            this.pageData = JSON.parse(res.returnContent.templateEditContent);
                            //历史记录初始化
                            this.history.push(JSON.parse(JSON.stringify(this.pageData)));
                        }
                    }else{
                        //错误处理
                        alert(res.message);
                    }
                });
            },
            //显示操作框
            setHandleLine(name){
                this.showHandleLine = name;
            },
            cancleHandleLine(){
                this.showHandleLine = "";
            },
            //wkwebviewBridge
            setupWebViewJavascriptBridge: function(callback) {
                if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
                if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
            },
            //webviewBridge
            connectWebViewJavascriptBridge: function(callback) {
                if (window.WebViewJavascriptBridge) {
                    callback(WebViewJavascriptBridge)
                } else {
                    document.addEventListener(
                        'WebViewJavascriptBridgeReady'
                        , function() {
                            callback(WebViewJavascriptBridge)
                        },
                        false
                    );
                }
            }
        },
        mounted(){
            //获取详情
            this.getPenTemplateInfo();
            //初始化webViewJavascriptBridge
            if (this.type==='android') {
                this.connectWebViewJavascriptBridge(function(bridge) {
                    bridge.init(function(message, responseCallback) {
                        console.log('JS got a message', message);
                        var data = {
                            'Javascript Responds': '测试中文!'
                        };
                        console.log('JS responding with', data);
                        responseCallback(data);
                    });
                })
            }else{
                this.setupWebViewJavascriptBridge();
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .tp_001{
        padding-top: px2rem(80px);
        .page-header{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: px2rem(80px);
            // display: flex;
            text-align: center;
            border-bottom: 1px solid #e4e4e4;
            background-color: #FFF;
            z-index: 999;
            .header-icon{
                position: absolute;
                left: 0;
                width: px2rem(80px);
                line-height: px2rem(80px);
            }
            .header-cont{
                width: 100%;
                line-height: px2rem(80px);
            }
            i{
                color: #c0c0c0;
            }
            p{
                font-size: px2rem(28px);
                color: #292929;
            }
        }
        .handle{
            position: fixed;
            top: px2rem(80px);
            left: 0;
            width: px2rem(750px);
            height: px2rem(90px);
            line-height: px2rem(90px);
            background-color: #2f2f2f;
            z-index: 3;
            .item{
                display: inline-block;
                width: px2rem(160px);
                height: px2rem(80px);
                margin: px2rem(5px) 0 0 px2rem(22px);
                font-size: px2rem(46px);
                line-height: px2rem(80px);
                color: #FFF;
                text-align: center;
            }
        }
        .editArea{
            position: relative;
            padding-top: px2rem(100px);
            .canvas{
                position: relative;
                padding: px2rem(8px);
                .img-border{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    outline: 1px solid #3089dc;
                    z-index: 2;
                    .upload-btn{
                        margin: px2rem(5px);
                        width: px2rem(60px);
                        height: px2rem(50px);
                        border-radius: px2rem(4px);
                        background-color: #77818C;
                        cursor: pointer;
                        text-align: center;
                        &:hover{
                            background-color: #8A939D;
                        }
                        i{
                            font-size: px2rem(40px);
                            line-height: px2rem(50px);
                            color: #FFF;
                        }
                    }
                }
                .img-contain{
                    position: relative;
                    overflow: hidden;
                    background-color: #777;
                    z-index: 1;
                    img{
                        position: absolute;
                    }
                }
            }
            //头部
            .header{
                position: relative;
                width: 100%;
                height: px2rem(40px);
                margin: px2rem(40px) 0;
                background: url(/static/images/sbTemplate/template1/title_bg.jpg) center center no-repeat;
                text-align: center;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            //主图
            .main-contain{
                .main{
                    position: relative;
                    width: px2rem(734px);
                    height: px2rem(920px);
                    margin-bottom: px2rem(30px);
                    .img-contain{
                        position: relative;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            //设计结构
            .structure{
                position: relative;
                .words{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: px2rem(190px);
                    padding: px2rem(30px) px2rem(70px) px2rem(30px) 0;
                    p{
                        font-size: px2rem(21px);
                        line-height: px2rem(42px);
                    }
                    textarea{
                        width: px2rem(190px);
                        height: px2rem(170px);
                        font-size: px2rem(21px);
                        line-height: px2rem(42px);
                        border: none;
                        overflow: hidden;
                        resize:none;
                        word-break: break-all;
                        &:focus{
                            outline: 1px dashed #3089dc;
                        }
                    }
                }
                .structure-item{
                    position: relative;
                    margin-bottom: px2rem(90px);
                    display: block;
                    zoom: 1;
                    .box{
                        position: relative;
                        .img-contain{
                            position: relative;
                            width: px2rem(410px);
                            height: px2rem(270px);
                        }
                    }
                }
                .structure_1{
                    .box{
                        float: left;
                    }
                }
                .structure_2{
                    .box{
                        float: right;
                    }
                    .words{
                        left: 0;
                        padding: px2rem(30px) 0 px2rem(30px) px2rem(70px);
                    }
                }
                .structure_3{
                    .box{
                        float: left;
                    }
                }
            }
            //搭配推荐
            .collocation{
                position: relative;
                overflow: hidden;
                .collocation-item{
                    .item{
                        float: left;
                        display: inline-block;
                        width: px2rem(240px);
                        // height: px2rem(240px);
                        margin-right: px2rem(7px);
                        cursor: pointer;
                        &:last-child{
                            margin: 0;
                            float: right;
                        }
                        img{
                            position: relative;
                            width: px2rem(240px);
                            height: px2rem(320px);
                        }
                        .name{
                            font-size: px2rem(16px);
                            line-height: px2rem(24px);
                            margin: px2rem(15px) 0;
                            height: px2rem(48px);
                            text-align: center;
                        }
                    }
                }
            }
            //模特展示
            .show{
                position: relative;
                .show-item{
                    position: relative;
                    padding: 0 px2rem(40px) px2rem(25px);
                    .box{
                        position: relative;
                        .img-contain{
                            position: relative;
                            width: px2rem(654px);
                            height: px2rem(765px);
                        }
                    }
                }
                .show_1{

                }
                .show_2{
                    .box{
                        .img-contain{
                            width: px2rem(315px);
                            height: px2rem(540px);
                        }
                    }
                    .box-2{
                        float: left;
                    }
                    .box-3{
                        float: right;
                    }
                }
                .show_3{
                }
                .show_4{

                }
            }
        }
        .recommendList{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            .mask{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                background-color: rgba(0,0,0,.7);
            }
            .rec-content{
                position: absolute;
                top: 50%;
                left: 50%;
                width: px2rem(640px);
                height: px2rem(750px);
                margin-left: px2rem(-320px);
                margin-top: px2rem(-375px);
                background-color: #fff;
                border-radius: px2rem(12px);
                z-index: 2;
                overflow-x: hidden;
                overflow-y: scroll;
                scroll-behavior: smooth;
                -webkit-overflow-scrolling : touch;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                .rec-item{
                    display: inline-block;
                    width: px2rem(288px);
                    height: px2rem(450px);
                    margin: px2rem(21px) 0 0 px2rem(21px);
                    cursor: pointer;
                    .pic{
                        width: px2rem(288px);
                        height: px2rem(384px);
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .name{
                        width: 100%;
                        height: px2rem(48px);
                        line-height: px2rem(48px);
                        text-align: center;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>
