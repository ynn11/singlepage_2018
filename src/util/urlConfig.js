/**
 * 统一uri管理
 */
//api URI
var devApiURI1 = 'http://192.168.1.172:8888';
var devApiURI2 = 'http://192.168.1.27:8888';//张正鹤的电脑ip
var devApiURI3 = 'http://192.168.1.102:8888';//测试机电脑的ip
var devApiURI4 = 'http://192.168.1.36:8888';//王海飞的电脑ip
var testApiUri = "https://apitest.storeer.com";//测试
var productApiURI = 'https://api.storeer.com';//生产环境

//redirectURI
var localRedirectURI = 'http://192.168.1.50:8088';//本机，测试不能正确分享，不在配置里面
var proxRedirectURI = 'https://sintest.storeer.com';//测试,可以正确分享
var devdiRectURI = 'http://192.168.1.102:8088';//测试机
var productRedirectURI = 'https://singlepage.storeer.com';//生产环境

export default {
  apiUri: testApiUri,
  redirectBaseredirectURI: proxRedirectURI
  //生产
  // apiUri: productApiURI,
  // redirectBaseredirectURI: productRedirectURI
  //测试
  // apiUri:                   testApiUri,
  // redirectBaseredirectURI:  proxRedirectURI
}
