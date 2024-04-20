$(function(){
    var layer = layui.layer
    getbooktype()

    console.log('aaaaaaabbbbbb')
    function getbooktype() {
        $.ajax({
            method:'GET',
            url:'/admin/getbooktype',
            success: function(res) {
                  console.log('12######')
                var htmlStr = template('teml-booktype',res)
                // console.log(htmlStr)
                $('tbody').html(htmlStr)
             }
       })
    }

    //为添加图书类别添加点击事件
    $('#btnAddtype').on('click',function(){
        console.log('~~~~~~~~~~~~')
        var index=layer.open({
            type:1,
            area:['500px','300px'],
            title:'添加图书类别',
            //   content:'aaaaaaaa',  templ-addbooktype111  
            content:$('#templ-addbooktype111').html(),
        })
        $('body').on('submit','#formaddbooktype',function(e){
            e.preventDefault();
            console.log('submit add book type')
            layer.msg('123123')
            $.ajax({
                method:'POST',
                data:$(this).serialize(),
                url:'/admin/addbooktype',
                success: function(res) {
                    console.log('res    ',res)
                    if (res.status !==200) {
                        return alert('添加失败')
                    }
                    else {
                        layer.msg('添加成功')
                        getbooktype()
                        layer.close(index)                        
                    }                    
                }
            })
        })
    })

    ////为修改图书类别添加点击事件，通过代理形式完成，因为页面是后加载的
    $('tbody').on('click','.aUpdate',function(){
        console.log('ok 111')
        var indexupdate=layer.open({
            type:1,
            area:['500px','300px'],
            title:'修改图书类别',
            // content:'aaaaaaaa'
            content:$('#templ-updatebooktype111').html(),
        })
        // var id =$(this).attr('data-id')
        // console.log(id)
        $('#i1').val($(this).attr('data-id'))
        $('#i2').val($(this).attr('data-t'))       
        $('#i3').val($(this).attr('data-c'))

        // formupbooktype
        $('body').on('submit','#formupbooktype',function(e){
            e.preventDefault();
            console.log('submit update book type id')
            layer.msg('123123')
            $.ajax({
                method:'POST',
                data:$(this).serialize(),
                url:'/admin/updatebooktype',
                success: function(res) {
                    // console.log('res    ',res)
                    if (res.status !==200) {
                        return alert('修改类别失败')
                    }
                    else {
                     console.log('indes ~~')
                        layer.msg('修改类别成功')
                        getbooktype()
                        layer.close(indexupdate)                        
                    }                    
                }
            })
        }) 
    })

    //删除图书分类
    $('tbody').on('click','.aDel',function(){
        // console.log('ok will delete')
        var id =$(this).attr('data-id')
        console.log(id)

        // form del booktype
            // console.log('del book type id')
            layer.msg('123123')
            $.ajax({
                method:'POST',
                data:{id:id},
                url:'/admin/delbooktype',
                success: function(res) {
                    // console.log('res    ',res)
                    if (res.status !==200) {
                        return alert('删除类别失败')
                    }
                    else {
                    //  console.log('indes ~~')
                        layer.msg('删除类别成功')
                        getbooktype()                                              
                    }                    
                }
            })
        }) 
    
})