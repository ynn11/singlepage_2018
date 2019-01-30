/**
 * 初始化微信方法
 */

import api from "../fetch/common_api"
//初始化微信
var wxInit = function (vue) {
  vue.initWxConfig=function (){
    api.getSignMap("post",{url: location.href}).then(res => {
      let content = res.returnContent;
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: content.appId, // 必填，公众号的唯一标识
        timestamp: content.timestamp, // 必填，生成签名的时间戳
        nonceStr: content.nonceStr, // 必填，生成签名的随机串
        signature: content.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    });
  };
  vue.initWxShare=function (options,cb){
    window.wx.ready(function(){
      // wx.showMenuItems({
      //     menuList: [
      //         "menuItem:share:appMessage",
      //         "menuItem:share:timeline"
      //     ] // 要显示的菜单项，所有menu项见附录3
      // });
      console.log(options);
      //获取“分享给朋友”按钮点击状态及自定义分享内容接口
      wx.onMenuShareAppMessage({
        title: options.title||'', // 分享标题
        desc: options.desc||'', // 分享描述
        link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: options.img||'http://static.storeer.com/getheadimg_300.png', // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: ()=> {
          typeof cb === "function"&&cb();
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
      wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
      //分享到朋友圈”按钮点击状态及自定义分享内容接口
      wx.onMenuShareTimeline({
        title: options.title, // 分享标题
        desc: options.desc, // 分享描述
        link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: options.img||'http://static.storeer.com/getheadimg_300.png', // 分享图标
        success: ()=> {
          typeof cb === "function"&&cb();
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
    });
  };

}
export default wxInit;

