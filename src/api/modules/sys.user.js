export default ({ request }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN (data = {}) {
    return request({
      url: '/sys/login',
      method: 'post',
      data
    })
  }
})
