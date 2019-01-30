<template>
    <div class="editGoods-box">
        <div class="beaforeUpload" v-show="form.productPic.length===0">
            <div class="uploadBtn" @click="uploadImg">
                <i class="iconfont icon-tianjiatupian"></i>
            </div>
        </div>
        <div class="afterUpload" v-show="form.productPic.length>0" @click="showDialog">
            <div class="uploadBtn" @click="uploadImg">
                <i class="iconfont icon-tianjiatupian"></i>
            </div>
            <swiper :options="bannerOption" ref="mySwiper" class="swiper-box">
                <swiper-slide class="swiper-item" key="index" v-for="(item, index) in form.productPic">
                    <img :src="item + '?imageView2/1/w/750/h/1000/interlace/1/q/100'" alt="banner">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="floatPicList" v-show="dialogStatus">
            <div class="bar">
                <div class="back" @click="dialogStatus=false">
                    <i class="iconfont icon-fanhui"></i>返回
                </div>
                <div class="num">
                {{floatPicIndex}}/{{form.productPic.length}}
                </div>
                <div class="delete" @click="deleteMainPic">
                    <i class="iconfont icon-delete"></i>
                </div>
            </div>
            <swiper :options="dialogOption" ref="dialogSwiper" class="swiper-box">
                <swiper-slide class="swiper-item" key="index" v-for="(item, index) in form.productPic">
                    <img :src="item + '?imageView2/1/w/750/h/1000/interlace/1/q/100'" alt="banner">
                </swiper-slide>
            </swiper>
        </div>
        <div class="editArea">
            <div class="commonInfo">
                <div class="item border-min productTit">
                    <textarea name="" id="" rows="2" placeholder="请输入标题" v-model="form.productName"></textarea>
                    <span class="count">{{form.productName.length}}/60</span>
                </div>
                <div class="item border-min" @click="typeModalStatus=true">
                    <p class="label">类目</p>
                    <p class="name">{{form.typeName}}<i class="iconfont icon-qianjin"></i></p>
                </div>
                <div class="item border-min" @click="styleModalStatus=true">
                    <p class="label">风格</p>
                    <p class="name">{{form.styleName}}<i class="iconfont icon-qianjin"></i></p>
                </div>
                <div class="item border-min">
                    <p class="label">款号</p>
                    <input type="text" v-model="form.patternCode" placeholder="请输入款号">
                </div>
                <div class="item border-min" @click="selectPostMethod=true">
                    <p class="label">配送方式</p>
                    <p class="name">{{form.distributeMode===1?'仅自提':'自提或快递'}}<i class="iconfont icon-qianjin"></i></p>
                </div>
                <div class="item" @click="selectDiscount=true">
                    <p class="label">是否支持折扣</p>
                    <p class="name">{{form.isDiscountSupport===0?'否':'是'}}<i class="iconfont icon-qianjin"></i></p>
                </div>
            </div>
            <div class="colorList">
                <div class="title">颜色</div>
                <div class="contain">
                    <div class="item-contain" v-for="(item,index) in colorList">
                        <div class="close" @click="removeColor(index)">
                            <img src="../../assets/images/common/close.png" alt="">
                        </div>
                        <div class="color">{{item}}</div>
                    </div>
                    <div class="item-contain input">
                        <input type="text" placeholder="自定义颜色" v-model="newColor" ref="newColor" @keyup="newColorInput" @blur="newColorBlur">
                    </div>
                    <div class="item-contain input" v-show="newColorStatus">
                        <input type="text" placeholder="自定义颜色">
                    </div>
                </div>
            </div>
            <div class="sizeList">
                <div class="title">尺码</div>
                <div class="contain">
                    <div class="item-contain" v-for="(item,index) in sizeList">
                        <div class="close" @click="removeSize(index)">
                            <img src="../../assets/images/common/close.png" alt="">
                        </div>
                        <div class="size">{{item}}</div>
                    </div>
                    <div class="item-contain input">
                        <input type="text" placeholder="自定义尺码" v-model="newSize" ref="newSize" @keyup="newSizeInput" @blur="newSizeBlur">
                    </div>
                    <div class="item-contain input" v-show="newSizeStatus">
                        <input type="text" placeholder="自定义尺码">
                    </div>
                </div>
            </div>
            <div class="skuList">
                <div class="color" v-for="(cItem,cIndex) in form.skuList">
                    <div class="item border-min">
                        <p class="label">{{cItem.color}}</p>
                    </div>
                    <div class="item item-colorPic border">
                        <p class="label">图片</p>
                        <div class="colorPic" v-show="cItem.colorPicUrl===''">
                            <img class="pic" src="../../assets/images/common/upload.png" alt="" @click="uploadColorPic(cItem)">
                        </div>
                        <div class="colorPic" v-show="cItem.colorPicUrl!==''">
                            <img class="close" src="../../assets/images/common/close.png" alt="" @click="removeColorPic(cItem)">
                            <img class="pic" :src="cItem.colorPicUrl" alt="">
                        </div>
                    </div>
                    <div class="size" v-for="(sItem,sIndex) in cItem.sizeList">
                        <div class="sizeName">{{sItem.size}}</div>
                        <div class="value">
                            <div class="item storeSum">
                                <p class="label">库存</p>
                                <input type="number" class="min-input" v-model="sItem.storeSum" placeholder="输入库存（必填）">
                            </div>
                            <div class="item price">
                                <p class="label">价格</p>
                                <input type="number" class="min-input" v-model="sItem.price" placeholder="输入价格（必填）">
                            </div>
                            <div class="item barCode">
                                <p class="label">条码</p>
                                <input type="text" class="min-input barcodeInput" v-model="sItem.barCode">
                                <div class="barcode" @click="getBarcode(sItem)">
                                    <i class="iconfont icon-tiaoxingma"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="whiteSpace">

            </div>
        </div>
        <div class="alldone" @click="releaseCommodity">
            下一步
        </div>
        <div class="selectType selectBox" v-show="typeModalStatus">
            <div class="mask" @click="typeModalStatus=false"></div>
            <div class="list-box">
                <div class="list-contain">
                    <div :class="'list-item ' + [form.typeCode===item.typeCode?'sel':'']" v-for="(item,index) in commProductTypeList" @click="selectType(index)">
                        {{item.typeName}}
                    </div>
                </div>
                <div class="btn" @click="typeModalStatus=false">确定</div>
            </div>
        </div>
        <div class="selectStyle selectBox" v-show="styleModalStatus">
            <div class="mask" @click="styleModalStatus=false"></div>
            <div class="list-box">
                <div class="list-contain">
                    <div :class="'list-item ' + [styleCode.indexOf(item.styleCode)>-1?'sel':'']" v-for="(item,index) in storeStyleList" @click="selectStyle(index)">
                        {{item.styleName}}
                    </div>
                </div>
                <div class="btn" @click="styleModalStatus=false">确定</div>
            </div>
        </div>
        <div class="selectPostMethod selectBox" v-show="selectPostMethod">
            <div class="mask" @click="selectPostMethod=false"></div>
            <div class="contain">
                <div class="item" @click="form.distributeMode=1;selectPostMethod=false">
                    <img class="status" v-if="form.distributeMode===1" src="../../assets/images/common/default_true.png" alt="">
                    <img class="status" v-else src="../../assets/images/common/default.png" alt="">
                    <div class="value">自提</div>
                </div>
                <div class="item" @click="form.distributeMode=2;selectPostMethod=false">
                    <img class="status" v-if="form.distributeMode===2" src="../../assets/images/common/default_true.png" alt="">
                    <img class="status" v-else src="../../assets/images/common/default.png" alt="">
                    <div class="value">自提或快递</div>
                </div>
            </div>
        </div>
        <div class="selectDiscount selectBox" v-show="selectDiscount">
            <div class="mask" @click="selectDiscount=false"></div>
            <div class="contain">
                <div class="item" @click="form.isDiscountSupport=1;selectDiscount=false">
                    <img class="status" v-if="form.isDiscountSupport===1" src="../../assets/images/common/default_true.png" alt="">
                    <img class="status" v-else src="../../assets/images/common/default.png" alt="">
                    <div class="value">是</div>
                </div>
                <div class="item" @click="form.isDiscountSupport=0;selectDiscount=false">
                    <img class="status" v-if="form.isDiscountSupport===0" src="../../assets/images/common/default_true.png" alt="">
                    <img class="status" v-else src="../../assets/images/common/default.png" alt="">
                    <div class="value">否</div>
                </div>
            </div>
        </div>
        <div class="timestamp">{{timestamp}}</div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import api from '../../fetch/api'
import * as _validate from "../../util/validate"
import * as _tool from "../../util/tool"
export default {
    components: {
        swiper,
        swiperSlide,
    },
    data() {
        return {
            staffCode: this.$route.query.staffCode,
            id: this.$route.query.id,
            token: this.$route.query.token,
            type: this.$route.query.type,
            bannerOption: {
                notNextTick: true,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                slidesPerView: 1,
                autoplayDisableOnInteraction: false
            },
            //颜色尺寸列表
            commProductTypeList: [],
            storeStyleList: [],
            //已选颜色尺寸
            sizeList: [],
            colorList: [],
            styleCode: [],
            styleName: [],
            //新增颜色尺寸状态
            newColor: "",
            newSize: "",
            newColorStatus: false,
            newSizeStatus: false,
            //上传前表单
            form: {
                productPic: [],
                staffCode: this.$route.query.staffCode,
                productName: "",
                typeCode: "",
                typeName: "",
                styleCode: "",
                styleName: "",
                patternCode: "",
                distributeMode: 1, //1仅自提、2自提或快递
                isDiscountSupport: 0, //0不支持 1支持
                skuList: []
            },
            dialogOption: {
                notNextTick: true,
                paginationClickable: true,
                slidesPerView: 1,
                autoplayDisableOnInteraction: false,
                onTransitionEnd: swiper => {
                    this.floatPicIndex = swiper.realIndex+1;
                }
            },
            productTitle: "",
            count: 0,
            //空的数据
            emptySku: {
                color: "",
                colorPicUrl: "",
                sizeList: []
            },
            emptySize: {
                size: "",
                storeSum: "",
                barCode: "",
                price: ""
            },
            //图片弹窗
            floatPicIndex: 1,
            dialogStatus: false,
            typeModalStatus: false,
            styleModalStatus: false,
            selectPostMethod: false,
            selectDiscount: false,
            //手动刷新view数据
            timestamp: new Date().getTime()
        }
    },
    methods: {
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
        },
        //上传图片
        uploadImg(e){
            var that = this;
            e.stopPropagation();
            WebViewJavascriptBridge.callHandler('selectPicture',null,function(response) {
                that.form.productPic.push(response);
                that.timestamp = new Date().getTime();
            });
        },
        uploadColorPic(item){
            var that = this;
            WebViewJavascriptBridge.callHandler('selectPicture',null,function(response) {
                item.colorPicUrl = response;
                that.timestamp = new Date().getTime();
            });
        },
        //删除主图
        deleteMainPic(){
            this.form.productPic.splice(this.floatPicIndex-1,1);
            this.$refs.mySwiper.swiper.slideTo(0,0,false)
            // console.log(this.$refs.mySwiper.swiper);
            // this.floatPicIndex = this.$refs.mySwiper.swiper.realIndex+1;
            this.timestamp = new Date().getTime();
        },
        removeColorPic(item){
            item.colorPicUrl = "";
            this.timestamp = new Date().getTime();
        },
        //获取条码
        getBarcode(a){
            var that = this;
            WebViewJavascriptBridge.callHandler('getBarcode',null,function(response) {
                that.$set(a,'barCode',response);
                that.timestamp = new Date().getTime();
            });
        },
        //选择分类
        selectType(index){
            this.form.typeCode = this.commProductTypeList[index].typeCode;
            this.form.typeName = this.commProductTypeList[index].typeName;
        },
        //选择风格
        selectStyle(index){
            if (this.styleCode.indexOf(this.storeStyleList[index].styleCode)===-1) {
                this.styleCode.push(this.storeStyleList[index].styleCode);
                this.styleName.push(this.storeStyleList[index].styleName);
                this.form.styleCode = this.styleCode.join(",");
                this.form.styleName = this.styleName.join(",");
            }else{
                this.styleCode.splice(this.styleCode.indexOf(this.storeStyleList[index].styleCode),1);
                this.styleName.splice(this.styleName.indexOf(this.storeStyleList[index].styleName),1);
                this.form.styleCode = this.styleCode.join(",");
                this.form.styleName = this.styleName.join(",");
            }
        },
        //颜色标签
        newColorInput(e){
            if (this.newColor.length>0) {
                this.newColorStatus = true;
            }else{
                this.newColorStatus = false;
            }
        },
        newColorBlur(e){
            if(this.colorList.indexOf(this.newColor)>-1){
                this.newColor = "";
                this.newColorStatus = false;
                return;
            }
            if (this.newColor.length>0) {
                this.colorList.push(this.newColor);
                let obj = JSON.parse(JSON.stringify(this.emptySku));
                obj.color = this.newColor;
                this.form.skuList.push(obj);
                //新增尺寸输入框情况
                this.newColor = "";
                this.newColorStatus = false;
            }
        },
        removeColor(index){
            this.colorList.splice(index,1);
            this.form.skuList.splice(index, 1);
        },
        //尺寸标签
        newSizeInput(e){
            if (this.newSize.length>0) {
                this.newSizeStatus = true;
            }else{
                this.newSizeStatus = false;
            }
        },
        newSizeBlur(e){
            if(this.sizeList.indexOf(this.newSize)>-1){
                this.newSize = "";
                this.newSizeStatus = false;
                return;
            }
            if (this.newSize.length>0) {
                this.sizeList.push(this.newSize);
                //获取空尺寸
                let emptySize = JSON.parse(JSON.stringify(this.emptySize));
                emptySize.size = this.newSize;
                //添加空列的规格
                this.emptySku.sizeList.push(emptySize);
                //添加skuList对应规格
                this.form.skuList.forEach((value, i, array) => {
                    //每次遍历重新定义emptySize,避免数据联动
                    let emptySize = JSON.parse(JSON.stringify(this.emptySize));
                    emptySize.size = this.newSize;
                    value.sizeList.push(emptySize);
                });
                //新增尺寸输入框情况
                this.newSize = "";
                this.newSizeStatus = false;
            }
        },
        removeSize(index){
            this.sizeList.splice(index,1);
            //移除空列的规格
            this.emptySku.sizeList.splice(index, 1);
            //移除skuList对应规格
            this.form.skuList.forEach((value, i, array) => {
                value.sizeList.splice(index, 1);
            });
        },
        //显示图片dialog
        showDialog(){
            this.dialogStatus = true;
        },
        //发布商品
        releaseCommodity(){
            this.form.colorList = this.colorList;
            this.form.sizeList = this.sizeList;
            /**
             * 奇葩验证
             */
            if (this.colorList.length===0||this.sizeList.length===0) {
                alert("请至少添加一个颜色/尺码");
                return;
            }
            let checkStatus = "success";
            let errTip = "";
            this.form.skuList.forEach((val,index)=>{
                if (checkStatus === "fail") {
                    return;
                }
                let tempPrice = "";
                val.sizeList.forEach((sVal,sIndex)=>{
                    if (tempPrice==="") {
                        tempPrice = sVal.price;
                    }
                    if (checkStatus === "fail") {
                        return;
                    }
                    //价格检查
                    if (sVal.price!==""&&/^[0-9]+(.[0-9]{0,2})?$/.test(sVal.price) === false) {
                        errTip = "请检查价格输入（最多两位小数）";
                        checkStatus = "fail";
                        return;
                    }
                    //库存检查
                    if (sVal.storeSum!==""&&/^[0-9]\d{0,6}$/.test(sVal.storeSum) === false) {
                        errTip = "请检查库存输入（99万以下正整数或0）";
                        checkStatus = "fail";
                        return;
                    }
                    //价格和库存同时填写或同时为空
                    if (sVal.storeSum!==""&&sVal.price===""||sVal.storeSum===""&&sVal.price!=="") {
                        errTip = "某个尺寸信息不完善（没有请清空）";
                        checkStatus = "fail";
                        return;
                    }
                    //某个尺寸对应所有颜色为空
                    if (sVal.price==="") {
                        let allEmpty = true;
                        for (var i = 0; i < this.form.skuList.length; i++) {
                            if (this.form.skuList[i].sizeList[sIndex].price!=="") {
                                allEmpty = false;
                            }
                        }
                        if (allEmpty===true) {
                            errTip = "请完善" + sVal.size + "尺码下的信息，没有请删除";
                            checkStatus = "fail";
                            return;
                        }
                    }
                });
                //颜色下尺寸全部为空
                if (tempPrice==="") {
                    errTip = "请完善" + val.color + "颜色下的信息，没有请删除";
                    checkStatus = "fail";
                    return;
                }
            });
            if (checkStatus==="fail") {
                alert(errTip);
                return;
            }
            if (this.id==="0") {
                api.saveProduct("post",this.form,this.token).then(res => {
                    //接口返回成功
                    if (res.returnCode==="0") {
                        WebViewJavascriptBridge.callHandler('saveSuccess',{productCode: res.returnContent},function() {});
                    }
                    //返回失败
                    else{
                        alert(res.message);
                    }
                })
            }else{
                api.updateProduct("post",this.form,this.token).then(res => {
                    //接口返回成功
                    if (res.returnCode==="0") {
                        WebViewJavascriptBridge.callHandler('saveSuccess',{productCode: this.form.productCode},function() {});
                    }
                    //返回失败
                    else{
                        alert(res.message);
                    }
                })
            }
        },
        //获取商品信息
        getProductInfo: function () {
            api.getProduct("get",{staffCode: this.staffCode,id: this.id},this.token).then(res => {
                //接口返回成功
                if (res.returnCode==="0") {
                    if (this.id==="0") {
                        this.commProductTypeList = res.returnContent.commProductTypeList;
                        this.storeStyleList = res.returnContent.storeStyleList;
                    }else{
                        this.commProductTypeList = res.returnContent.commProductTypeList;
                        this.storeStyleList = res.returnContent.storeStyleList;
                        this.form = res.returnContent.commProduct;
                        this.form.productPic = res.returnContent.productPicList;
                        //数据转换
                        res.returnContent.skuList.forEach((val,index)=>{
                            val.sizeList.forEach((sVal,sIndex)=>{
                                if (sVal.price===null) {
                                    sVal.price = "";
                                }
                                if (sVal.storeSum===null) {
                                    sVal.storeSum = "";
                                }
                            });
                        });
                        this.form.skuList = res.returnContent.skuList;
                        res.returnContent.colorList.forEach((val,index)=>{
                            this.colorList.push(val.color);
                        });
                        let emptySize = JSON.parse(JSON.stringify(this.emptySize));
                        this.styleCode = res.returnContent.commProduct.styleCode.split(",");
                        this.storeStyleList.forEach((val,index)=>{
                            if (this.styleCode.indexOf(val.styleCode)>0) {
                                this.styleName.push(val.styleName);
                            }
                        });
                        this.form.styleName = this.styleName.join(',');
                        res.returnContent.sizeList.forEach((val,index)=>{
                            this.sizeList.push(val.size);
                            //添加空列的规格
                            emptySize.size = val.size;
                            this.emptySku.sizeList.push(emptySize);
                        });
                    }
                }
                //返回失败
                else{
                    alert(res.message);
                }
            })
        }
    },
    mounted(){
        this.getProductInfo();
        //文本框高度自适应
        _tool.autoTextarea(document.getElementsByTagName("textarea")[0]);
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
    @import '../../assets/css/function';
    .editGoods-box{
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .timestamp{
            position: absolute;
            top: 0;
            opacity: 0;
        }
        //上传按钮样式
        .uploadBtn{
            position: relative;
            display: inline-block;
            width: px2rem(120px);
            height: px2rem(120px);
            border-radius: 50%;
            background-color: #fe5a59;
            text-align: center;
            z-index: 2;
            i{
                color: #FFF;
                font-size: px2rem(60px);
                line-height: px2rem(120px);
            }
        }
        //上传前详情图片区域
        .beaforeUpload{
            position: relative;
            width: 100%;
            height: px2rem(320px);
            background-color: #f7f7f7;
            text-align: center;
            .uploadBtn{
                position: absolute;
                left: 50%;
                margin-left: px2rem(-60px);
                top: 50%;
                margin-top: px2rem(-60px);
            }
        }
        //上传后详情图片区域
        .afterUpload{
            position: relative;
            width: 100%;
            height: px2rem(1000px);
            overflow: hidden;
            .swiper-box{
                position: relative;
                z-index: 1;
                img{
                    width: 100%;
                }
            }
            .uploadBtn{
                position: absolute;
                left: px2rem(28px);
                bottom: px2rem(28px);
                z-index: 2;
            }
        }
        //浮出层删除图片
        .floatPicList{
            position: fixed;
            top: 0;
            left: 0;
            background-color: #000;
            z-index: 999;
            width: 100%;
            height: 100%;
            .bar{
                background-color: #1a181d;
                height: px2rem(100px);
                .back{
                    float: left;
                    margin-left: px2rem(15px);
                    display: inline-block;
                    color: #FFF;
                    width: px2rem(120px);
                    line-height: px2rem(100px);
                    font-size: px2rem(32px);
                    i{
                        // vertical-align: middle;
                    }
                }
                .num{
                    position: absolute;
                    top: 0;
                    left: 25%;
                    width: 50%;
                    text-align: center;
                    line-height: px2rem(100px);
                    color: #FFF;
                    font-size: px2rem(32px);
                }
                .delete{
                    float: right;
                    display: inline-block;
                    margin-right: px2rem(15px);
                    font-size: px2rem(32px);
                    line-height: px2rem(100px);
                    font-weight: bold;
                    color: #FFF;
                }
            }
            .swiper-box{
                position: absolute;
                width: 100%;
                top: 50%;
                margin-top: px2rem(-375px);
                z-index: 1;
                img{
                    width: 100%;
                }
            }
        }
        //内容编辑
        .editArea{
            background-color: #eaeaea;
            padding-bottom: 1px;
            //统一栏目编辑
            .item{
                position: relative;
                height: px2rem(100px);
                background-color: #FFF;
                overflow: hidden;
                //截断下划线
                &.border-min{
                    &:after{
                        content: "";
                        position: absolute;
                        left: px2rem(40px);
                        bottom: 0;
                        width: px2rem(710px);
                        border-bottom: 1px solid #e7e7e7;
                    }
                }
                //下划线
                &.border{
                    &:after{
                        content: "";
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        border-bottom: 1px solid #e7e7e7;
                    }
                }
                //属性名
                .label{
                    text-indent: px2rem(20px);
                    font-size: px2rem(32px);
                    line-height: px2rem(100px);
                }
                .name{
                    position: absolute;
                    top: 0;
                    right: px2rem(25px);
                    height: px2rem(100px);
                    line-height: px2rem(100px);
                    text-align: right;
                    font-size: px2rem(32px);
                    width: px2rem(615px);
                    .iconfont{
                        margin-left: px2rem(20px);
                    }
                }
                //标题
                .tit{
                    font-size: px2rem(42px);
                    color: #7d7d7d;
                    line-height: px2rem(100px);
                    text-align: center;
                }
                //输入框
                input{
                    position: absolute;
                    top: 0;
                    right: px2rem(25px);
                    line-height: px2rem(100px);
                    text-align: right;
                    font-size: px2rem(32px);
                    width: px2rem(615px);
                    &.min-input{
                        width: px2rem(443px);
                        //条码输入框
                        &.barcodeInput{
                            left: px2rem(105px);
                            width: px2rem(383px);
                            text-align: left;
                        }
                    }
                }
                //条形码
                .barcode{
                    position: absolute;
                    top: 50%;
                    margin-top: px2rem(-22px);
                    right: px2rem(30px);
                    width: px2rem(44px);
                    height: px2rem(44px);
                    background-color: #FFF;
                    text-align: center;
                    i{
                        color: #000;
                        font-size: px2rem(44px);
                        line-height: px2rem(44px);
                    }
                }
            }
            //商品标题
            .productTit{
                height: auto;
                box-sizing: border-box;
                textarea{
                    width: px2rem(705px);
                    font-size: px2rem(32px);
                    line-height: px2rem(48px);
                    margin: px2rem(20px);
                    overflow: auto;
                    word-break:break-all;
                }
                .count{
                    position: absolute;
                    bottom: px2rem(15px);
                    right: px2rem(25px);
                    color: #bebebe;
                    font-size: px2rem(32px);
                }
            }
            //公共信息
            .commonInfo{
                border-bottom: 1px solid #e7e7e7;
            }
            //规格
            .standard{
                margin-top: px2rem(20px);
                background-color: #f7f7f7;
                //尺寸
                .size{
                    margin-top: px2rem(10px);
                    border-bottom: 1px solid #e7e7e7;
                    .item{
                        .label{
                            text-indent: px2rem(25px);
                        }
                    }
                    .tit{
                        text-indent: px2rem(20px);
                        font-size: px2rem(32px);
                        text-align: left;
                    }
                }
                .addSize{
                    height: px2rem(100px);
                    border-bottom: 1px solid #e7e7e7;
                    background-color: #FFF;
                    p{
                        text-align: center;
                        font-size: px2rem(32px);
                        line-height: px2rem(100px);
                    }
                }
            }
            //添加规格按钮
            .addStandard{
                height: px2rem(100px);
                margin: px2rem(20px) 0;
                border-top: 1px solid #e7e7e7;
                border-bottom: 1px solid #e7e7e7;
                background-color: #FFF;
                p{
                    text-align: center;
                    font-size: px2rem(32px);
                    line-height: px2rem(100px);
                    color: #fe5a59;
                }
            }
            .whiteSpace{
                height: px2rem(205px);
                background-color: #FFF;
            }
            .colorList,.sizeList{
                margin-top: px2rem(20px);
                border-top: 1px solid #e7e7e7;
                border-bottom: 1px solid #e7e7e7;
                background-color: #fff;
                text-indent: px2rem(20px);
                overflow: hidden;
                // padding: 0 px2rem(20px) px2rem(30px) px2rem(20px);
                .title{
                    height: px2rem(88px);
                    line-height: px2rem(88px);
                    font-size: px2rem(32px);
                }
                .contain{
                    // overflow: hidden;
                    // zoom: 1;
                    .item-contain{
                        position: relative;
                        float: left;
                        margin: 0 0 px2rem(20px) px2rem(20px);
                        display: inline-block;
                        width: px2rem(220px);
                        height: px2rem(68px);
                        line-height: px2rem(68px);
                        background-color: #fff;
                        border: 2px solid #fe5a59;
                        border-radius: px2rem(6px);
                        font-size: px2rem(32px);
                        // overflow: hidden;
                        text-align: center;
                        &.input{
                            border: 2px solid #eee;
                        }
                        input{
                            display: block;
                            width: 100%;
                            height: 100%;
                            background-color: #eee;
                            text-align: center;
                        }
                        .close{
                            position: absolute;
                            top: px2rem(-19px);
                            right: px2rem(-19px);
                            width: px2rem(38px);
                            height: px2rem(38px);
                            img{
                                display: block;
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }
            .skuList{
                margin-top: px2rem(20px);
                border-top: 1px solid #e7e7e7;
                border-bottom: px2rem(10px) solid #f7f7f7;
                background-color: #fff;
                .item-colorPic{
                    height: px2rem(140px);
                    .label{
                        line-height: px2rem(140px);
                    }
                    .colorPic{
                        position: absolute;
                        top: px2rem(19px);
                        left: px2rem(100px);
                        width: px2rem(102px);
                        height: px2rem(102px);
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                            border-radius: px2rem(6px);
                        }
                        .close{
                            position: absolute;
                            top: px2rem(-19px);
                            right: px2rem(-19px);
                            width: px2rem(38px);
                            height: px2rem(38px);
                        }
                    }
                }
                .size{
                    border-top: px2rem(10px) solid #f7f7f7;
                    border-bottom: 1px solid #e7e7e7;
                    height: px2rem(300px);
                    // overflow: hidden;
                    .sizeName{
                        float: left;
                        width: 23%;
                        height: 100%;
                        text-align: center;
                        line-height: px2rem(300px);
                        font-size: px2rem(32px);
                        border-right: 1px solid #e7e7e7;
                    }
                    .value{
                        float: left;
                        width: 76%;
                        height: 100%;
                        overflow: visible;
                        .item{
                            height: px2rem(100px);
                        }
                    }
                }
            }
        }
        //下一步
        .alldone{
            position: fixed;
            bottom: 0;
            width: 100%;
            height: px2rem(100px);
            line-height: px2rem(100px);
            background-color: #fe5a59;
            color: #FFF;
            font-size: px2rem(32px);
            text-align: center;
        }
        /*弹窗*/
        .selectBox{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999;
        }
        .selectBox .mask{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.6);
        }
        .selectBox .mask{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.6);
        }
        .selectBox .list-box{
            position: fixed;
            top: 50%;
            left: 50%;
            width: px2rem(620px);
            height: px2rem(750px);
            margin-top: px2rem(-375px);
            margin-left: px2rem(-310px);
            background-color: #fff;
            border-radius: px2rem(10px);
            overflow: hidden;
        }
        .selectBox .list-box .list-contain{
            // width: px2rem(620px);
            padding: px2rem(20px) px2rem(20px) px2rem(110px);
            // height: px2rem(660px);
          height:px2rem(650px);
          overflow: scroll;
        }
        .selectBox .list-box .list-contain .list-item{
            display: inline-block;
            padding: 0 px2rem(30px);
            margin: 0 px2rem(20px) px2rem(20px) 0;
            height: px2rem(72px);
            line-height: px2rem(72px);
            background-color: #efefef;
            border-radius: px2rem(8px);
            color: #2a2a2a;
        }
        .selectBox .list-box .list-contain .list-item.sel{
            background-color: #252525;
            color: #fff;
        }
        .selectBox .list-box .btn{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: px2rem(90px);
            line-height: px2rem(90px);
            text-align: center;
            background-color: #fe5a59;
            color: #FFF;
            font-size: px2rem(32px);
        }
        .selectBox .contain{
            position: absolute;
            top: 50%;
            left: px2rem(65px);
            width: px2rem(620px);
            margin-top: px2rem(-150px);
            background-color: #FFF;
            border-radius: px2rem(10px);
            padding: px2rem(20px) 0;
            .item{
                padding: 0 px2rem(30px);
                height: px2rem(100px);
                line-height: px2rem(100px);
                img{
                    float: left;
                    display: inline-block;
                    width: px2rem(40px);
                    height: px2rem(40px);
                    margin: px2rem(30px) px2rem(30px) px2rem(30px) 0;
                }
                .value{
                    float: left;
                }
            }
        }
    }
</style>
