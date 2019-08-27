import shopView from '../views/shop.art'
import shopAddView from '../views/shop-add.art'
import shopEditView from '../views/shop-edit.art'
import _ from 'lodash'
let count = 6
function remove(id,res){
    $.ajax({
        url:'/api/shop/delete',
        data:{
            id
        },
        dataType:'json',
        type:'DELETE',
        success(result){
            if(result.ret){
                // res.go('/shop?_='+new Date().getTime())
                loadData(res.pageNo,res)
            }
        }
    })
}
function loadData(pageNo, res) {
    let start = pageNo * count
    res.pageNo = pageNo
    $.ajax({
      url: '/api/shop/list',
      data: {
        start,
        count: count
      },
      dataType:'json',
      success(result) {
        if (result.ret) {
          // 当不是第一页 且 本页数据删除完毕时
          if (result.data.list.length === 0 && pageNo !== 0) {
            pageNo--
            loadData(pageNo, res)
          }
  
          res.render(shopView({
            ...result.data,
            showPage: true,
            pageNo,
            pageCount: _.range(Math.ceil(result.data.total / count))
          }))
          
          $('#select').on('change',function(){
            count = $('#select').val()
            loadData(res.pageNo,res)
          })
        } else {
          res.go('/')
        }
      }
    })
  }

export default {
    render(req,res,next){
       loadData(0,res)
        $('#router-view').on('click','#add-shop',function(){
            res.go('/shop_add')
        })
        $('#router-view').on('click','.btn-shop-update',function(){
            res.go('/shop_edit',{
                id:$(this).attr('data-id')
            })
        })
        $('#router-view').on('click','.btn-shop-delete',function(){
            remove($(this).attr('data-id'),res)
        })
        $('#router-view').on('click','#example1_paginate li[data-index]',function(){
            loadData($(this).attr('data-index'),res)
        })
        $('#router-view').on('click','#example1_paginate .previous',function(){
             let index = $('#example1_paginate .active').attr('data-index')
            let pageLength= $('#example1_paginate li[data-index]').length
            if(index == 0){
              index = pageLength -1
            }else{
              index--
            }
            loadData(index,res)
          })
        $('#router-view').on('click','#example1_paginate .next',function(){
            let index = $('#example1_paginate .active').attr('data-index')
            let pageLength = $('#example1_paginate li[data-index]').length
            if(index == pageLength -1){
              index = 0
            }else{
              index++
            }
            loadData(index,res)
        })
        $('#router-view').on('change','#search',function(){
            let keywords = $('#search').val()
          $.ajax({
            url: '/api/shop/search',
            type: 'post',
            data: {
              keywords
            },
            dataType:'json',
            success(result) {
                res.render(shopView({
                  ...result.data,
                  showPage: false
                }))
            }
          })
        })

    },
    add(req,res,next){
        res.render(shopAddView())
        $('#shop-add-possubmit').on('click',function(){
            let data = $('#shopsave').serialize()
            $.ajax({
                url:'/api/shop/save',
                type:'POST',
                data,
                dataType:'json',
                success(result){
                    if(result.ret){
                        res.go('/shop')
                    }
                }
            })
        })
        $('#router-view').on('click','#shop-add-posback',function(){
            res.back()
        })
        
    },
    edit(req,res,next){
        $.ajax({
            url:'/api/shop/findone',
            type:'POST',
            dataType:'json',
            data:{
                id:req.body.id
            },
            success(result){
                res.render(shopEditView(result.data))
                $('#router-view').on('click','#shop-edit-posback',function(){
                    res.back()
                })
                $('#router-view').on('click','#shop-edit-possubmit',function(){
                    let data = $('#shop-edit-shopsave').serialize()
                    $.ajax({
                        url:'/api/shop/put',
                        type:'PUT',
                        data:data+'&id='+req.body.id,
                        dataType:'json',
                        success(result){
                            if(result.ret){
                                res.back()
                            }
                        }
                    })
                })
            }
        })
    }
}