import request from '@/utils/request'
export const getPicCode = () => {
  return request.get('/captcha/image')
}

export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

export const codeLogin = (mobile, smsCode) => {
  return request.post('http://smart-shop.itheima.net/index.php?s=/api/passport/login', {
    form: {
      smsCode,
      mobile,
      isParty: false,
      partyData: {}
    }
  },
  {
    headers: {
      platform: 'h5'
    }
  })
}
