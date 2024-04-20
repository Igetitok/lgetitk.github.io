$(function(){
    var layer = layui.layer
    console.log('get book list !!!!!!')
    getbooklist()
    // getbooktype()

    function getbooklist() {
        // console.log('~~~~~$$$$')
        $.ajax({
            method:'GET',
            url:'/api/getbooklist',
            success: function(res) {
                //  console.log('12######')
                var htmlStr = template('teml-booklist',res)
                // console.log(htmlStr)
                $('#booklist').html(htmlStr)
             }
       })
    }

/*    
    //定义查询参数，可以按类别、按页查询图书信息
    var bookparam={
        pagenum:1, //页码值，默认请求第一页
        pagesize:10, //每页显示几条数据，默认一页显示10条
        cate_id:'',  //图书分类的id
        state:''   //图书状态，1表示正常，0表示被删除
    }

    function initbooklist(){
        $.ajax({
            method: 'GET',
            url: '/api/getbookbytype',
            data: bookparam,
            success: function (res) {
                if (res.status == 200) {
                    var htmlStr = template('teml-getbookbytype',res)
                    // console.log(htmlStr)
                    $('tbody').html(htmlStr)
                }
                else alert('获取信息失败')
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
        console.log('111111')
        $.ajax({
            method:'GET',
            url:'/admin/getbooktype',
            success: function(res){  
                console.log(res.data)
                if (res.status == 200) {
                    alert('获取信息成功',res.data)
                    var htmlStr = template('teml-getbookbytype11',res)
                    console.log(htmlStr)
                    // $('[name=booktype111]').html(htmlStr)
                }
                else alert('获取信息失败')                
            }
        })
    }

*/    // teml-booklistbytype
})