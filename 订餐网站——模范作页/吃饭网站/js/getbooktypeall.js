$(function(){
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    console.log('get book type !!!!!!')    
    getbooktype()
    initbooklist()

    //定义查询参数，可以按类别、按页查询图书信息
    var bookparam={
        page:1, //页码值，默认请求第一页        
        type_id:null,  //图书分类的id
    }

    function initbooklist(){
        // console.log('111111')
        $.ajax({
            method: 'GET',
            url: '/api/getbooklist',
            data: bookparam,
            success: function (res) {
                if (res.status == 200) {
                    // var htmlStr = template('teml-getbookbytype',res)
                    htmlStr = template('teml-booklistbytype',res)
                //  console.log('!!!   ',htmlStr)
                // console.log('!!!   ')
                     $('#tbody1').html(htmlStr)
                    form.render()                    
                    renderPagenumber(res.data.length)
                }
                else if (res.status==2){
                     alert('无该类图书信息')
                     bookparam.page=1
                     bookparam.type_id=null
                }
                else alert('无该类图书信息，敬请期待')
            }
        })

    }

    //定义时间过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
        var y=dt.getFullYear()
        var m=dt.getMonth()
        var d=dt.getDate()
        var hh=dt.getHours()
        var mm=dt.getMinutes()
        var ss=dt.getSeconds()
        return y+ '-' + m +'-' +d +' ' + hh + ':' +mm +":"+ss
    }

    //获得文章分类列表
    function getbooktype() {
        // console.log('~~~~111111')
        $.ajax({
            method:'GET',
            url:'/admin/getbooktype',
            success: function(res){  
                 console.log(res.data)
                if (res.status == 200) {
                    // alert('获取信息成功',res.data)
                    var htmlStr = template('teml-getbookbytype11',res)
                    
                    // console.log(htmlStr)
                    // $('#teml-getbookbytype11').html(htmlStr)
                    $('.selecttype').html(htmlStr)
                }
                else if(res.status == 2) 
                  {alert(res.data.msg)}
                else alert('无该类图书信息，敬请期待')                
            }
        })
    }

    $('#form-selectid').on('submit',function(e){
        e.preventDefault()
        var type_id= $('.selecttype').val()
        // console.log('type id   ',parseInt(type_id))
        bookparam.type_id=type_id;
        //按分类和分页查询图书
        // console.log(bookparam)
        $.ajax({
            method:'POST',
            url:'/admin/getbookbypage',
            data:bookparam,
            success: function(res){  
                // console.log(res.data)
                if (res.status == 200) {
                    // alert('获取信息成功',res.data)
                                     
                    var htmlStr = template('teml-booklistbytype',res)               
                    $('#tbody1').html(htmlStr)
                    form.render();
                    $('.selecttype').html(htmlStr)
                    $('#form-selectid').val(''); 
                    getbooktype();
                    renderPagenumber(res.data.length)
                }
                else if(res.status==2){
                    alert('无该类图书信息')
                    bookparam.page=1
                    bookparam.type_id=null
                }
                else alert('获取信息失败')                
            }
        })
    })

    //按分页查询
    function getpage(){
        $.ajax({
            method:'POST',
            url:'/admin/getbookbypage',
            data:bookparam,
            success: function(res){  
                 console.log('aaa',res.data)
                if (res.status == 200) {
                    // alert('获取信息成功',res.data)
                                     
                    var htmlStr = template('teml-booklistbytype',res)               
                    $('#tbody1').html(htmlStr)
                    form.render();
                    $('.selecttype').html(htmlStr)
                    $('#form-selectid').val(''); 
                    getbooktype();
                }
                else if(res.status == 2) 
                  {alert(res.data.msg)}
                else {alert('无该类图书信息')  
                      bookparam.page=1
                      bookparam.type_id=null
                }

            }
        })
    }
    // 处理分页，在底部显示，每页显示10条，根据返回条数进行分页
    function renderPagenumber(length){
        console.log('分页部分--',length)         
          // 完整显示
          laypage.render({
            elem: 'demo-laypage-all', // 元素 id，渲染在哪个元素上面
            count: length, // 数据总数
            limit:10,   //每页显示的数据条数
            curr:1,   //当前页码
          //   layout: ['count', 'prev', 'page', 'next', '10', 'refresh', 'skip'], // 功能布局
            jump: function(obj){
              console.log(obj);
            //   把当前的页码存放在页码对象参数上，以便点击某页进行显示
              bookparam.page= obj.curr
              getpage()
              bookparam.page=1
              bookparam.type_id=null
            }
          });     
      }
})