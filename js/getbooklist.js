$(function(){
    var layer = layui.layer
    console.log('!!!!')
    getbooklist()

    function getbooklist() {
        $.ajax({
            method:'GET',
            url:'/api/getbooklist',
            success: function(res) {
                console.log(res)
                var htmlStr = template('teml-booklist111',res)
                console.log('items ',res.length)
                $('#booklist').html(htmlStr)
             }
       })
    }
})