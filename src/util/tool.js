/**
 * 工具类引用方法
 */
var getFirstUpperChar = function(str){
    var string = String(str);
    var c = string[0];
    if (/[^\u4e00-\u9fa5]/.test(c)) {
        return c.toUpperCase();
    }
    else {
        return chineseToEnglish(c);
    }
};
var chineseToEnglish = function(c){
    var idx = -1;
    var MAP = 'ABCDEFGHJKLMNOPQRSTWXYZ';
    var boundaryChar = '驁簿錯鵽樲鰒餜靃攟鬠纙鞪黁漚曝裠鶸蜶籜鶩鑂韻糳';
    if (!String.prototype.localeCompare) {
        alert("存在非法姓名");
        throw Error('String.prototype.localeCompare not supported.');
    }
    if (/[^\u4e00-\u9fa5]/.test(c)) {
        return c;
    }
    for (var i = 0; i < boundaryChar.length; i++) {
        if (boundaryChar[i].localeCompare(c, 'zh-CN-u-co-pinyin') >= 0) {
            idx = i;
            break;
        }
    }
    return MAP[idx];
};

/**
 * 随机生成
 */
export function uuid(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

/**
 * textarea高度自适应
 */
export  function autoTextarea (elem, extra, maxHeight) {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
    isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function (type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ? function (name) {
            var val = elem.currentStyle[name];

            if (name === 'height' && val.search(/px/i) !== 1) {
                var rect = elem.getBoundingClientRect();
                return rect.bottom - rect.top -
                    parseFloat(getStyle('paddingTop')) -
                    parseFloat(getStyle('paddingBottom')) + 'px';
            };

            return val;
        } : function (name) {
                return getComputedStyle(elem, null)[name];
        },
        minHeight = parseFloat(getStyle('height'));


    elem.style.resize = 'none';

    var change = function () {
        var scrollTop, height,
            padding = 0,
            style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };

    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
}

/**
 * webviewBridge
 */
export  function webviewBridgeInit(type){
    //wkwebviewBridge
    var setupWebViewJavascriptBridge = function(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    };
    //webviewBridge
    var connectWebViewJavascriptBridge = function(callback) {
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
    if (sessionStorage.webviewInited == "installed") {
        return;
    }else{
        sessionStorage.webviewInited = "installed"
    }
    if (type==="android") {
        connectWebViewJavascriptBridge(function(bridge) {
            bridge.init(function(message, responseCallback) {
                console.log('JS got a message', message);
                var data = {
                    'Javascript Responds': '测试中文!'
                };
                console.log('JS responding with', data);
                responseCallback(data);
            });
        });
    }else{
        setupWebViewJavascriptBridge();
    }
}

//日期格式化
export function DateFormat(){
    Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
    }
}

/**
 * 2018-10-29转换成10月29日格式
 *
 */
export function formateDate(date) {
  var month=data.split("-")[1];
  var day=data.split("-")[2];
  return month+"月"+day+"日";
}

/**
 * 洗牌算法
 * 在Array对象上注册洗牌算法
 */
export function shuffle(){
    Array.prototype.shuffle = function() {
        var input = this;

        for (var i = input.length-1; i >=0; i--) {

            var randomIndex = Math.floor(Math.random()*(i+1));
            var itemAtIndex = input[randomIndex];

            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }
}

/**
 * 用户名排序
 */

export function parseData(data,keyName){
    var map = {};
    var c = 'A'.charCodeAt();
    for(; c <= 'Z'.charCodeAt(); c++ ){
        map[String.fromCharCode(c)] = [];
    }
    map['#'] = [];
    var firstCharUpper;
    data.forEach(function(item){
        firstCharUpper = getFirstUpperChar(item[keyName]);
        if (map.hasOwnProperty(firstCharUpper)) {
            map[firstCharUpper].push(item);
        } else {
            map['#'].push(item);
        }
    });

    //排序
    for(var key in map) {
        if( map.hasOwnProperty( key ) && (map[key].length != 0)) {
            map[key].sort(function(a, b){
                return a[keyName].localeCompare(b[keyName], 'zh-CN-u-co-pinyin');
            });
        }
    }

    this.dictMap = map;
    return map;
}
