$(function(){
    getbooktype()
    
    //获得文章分类列表
    function getbooktype() {
        // console.log('~~~~111111')
        $.ajax({
            method:'GET',
            url:'/admin/getbooktype',
            success: function(res){  
                //  console.log(res.data)
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

    //1、定义属性
    var tableId='editTable';
    var $tableId ='#editTable';
    var tableData=[];


    function insert(data){
        $.ajax({
            method:'POST',
            url:'/admin/addbook',
            data:'aaa',
            success: function(res){  
                // console.log(res.data)
                if (res.status == 200) {
                            // alert('添加信息成功',res.data)
                            var htmlStr = template('teml-getbookbytype11',res)                       
                            // console.log(htmlStr)
                            // $('#teml-getbookbytype11').html(htmlStr)
                            $('.selecttype').html(htmlStr)
                }
                else alert('新增失败')                
            }
        })
    }

})
