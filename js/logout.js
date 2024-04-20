$(function() {

  $('#logoutID').click(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/logout',
      method: 'POST',
      // 快速获取表单中的数据
      success: function(res) {
        if (res.status !== 200) {
          return alert('注销失败,用户已注销或系统连接错误')
        }
        alert('注销成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.clear()
      }
    })
  })
})
