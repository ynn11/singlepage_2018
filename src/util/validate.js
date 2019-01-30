/**
 * 验证公用js
 */
/**
 * 手机号验证
 */
export function mobile(mobileNum) {
  if (!/^1\d{10}$/.test(mobileNum)) {
    let tip = "输入号码有误";
    return tip;
  } else {
    return true;
  }
}
/**
 * 真实姓名验证
 */
export function trueName(trueName) {
  let len = gblen(trueName);
  if (len < 4 || len > 10) {
    let tip = "请输入正确姓名";
    return tip;
  } else if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(trueName)) {
    let tip = "请输入中英文";
    return tip;
  } else {
    return true;
  }
}
/**
 * 昵称验证
 */
export function nickName(nickName) {
  let len = gblen(nickName);
  if (len < 4 || len > 20) {
    let tip = "请输入4-20个字符";
    return tip;
  } else if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(nickName)) {
    let tip = "请输入中英文";
    return tip;
  } else {
    return true;
  }
}
/**
 * 邮箱验证
 */
export function email(email) {
  if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(email)) {
    let tip = "输入邮箱有误";
    return tip;
  } else {
    return true;
  }
}
/**
 * 验证码验证
 */
export function verificationCode(verificationCode) {
  if (!/\d{4}$/.test(verificationCode)) {
    let tip = "请输入4位数字验证码";
    return tip;
  } else {
    return true;
  }
}
/**
 * 折扣正则匹配
 */
export function discount(discount) {
  if (!/^((0\.[1-9]{1})|(([1-9]{1})(\.\d{1})?))$/.test(discount)) {
    let tip = "请输入正确的折扣 * 或者*.*";
    return tip;
  } else {
    return true;
  }
}
/**
 * 大于0的正整数
 */
export function positiveInteger(data) {
  if (!/^[1-9]\d*$/.test(Number(data))) {
    let tip = "请输入大于0的正整数";
    return tip;
  } else {
    return true
  }
}
/**
 * 公共方法
 */
const gblen = function (a) {
  let len = 0;
  for (let i = 0; i < a.length; i++) {
    if (a.charCodeAt(i) > 127 || a.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
};
