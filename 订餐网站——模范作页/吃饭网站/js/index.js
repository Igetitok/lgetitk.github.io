$(function(){
    var layer = layui.layer
    console.log('index page !!!!')
    getbooklist()

    function getbooklist() {
        $.ajax({
            method:'GET',
            url:'/api/getbooklist',
            success: function(res) {
                console.log(res)
                var htmlStr = template('teml-booklist',res)
                // console.log(htmlStr)
                $('#booklist').html(htmlStr)
             }
       })
    }
})