import PositionView from '../views/position.art'
import PositionAddView from '../views/position-add.art'
import PositionEditView from '../views/position-edit.art'
import _ from 'lodash'

const COUNT = 6
function remove(id,res){
  $.ajax({
    url:'/api/position/delete',
    type:'DELETE',
    dataType:'json',
    data:{
      id
    },
    success(result){
      if(result.ret){
        res.go('/position?_='+new Date().getTime())
      }
    }
  })
}
function loadData(pageNo,res){
  let start = pageNo * COUNT
  $.ajax({
    url: '/api/position/list',
    dataType:'json',
    data:{
      start,
      count:COUNT
    },
    success(result) {
      if (result.ret) {
        res.render(PositionView({
          ...result.data,
          pageNo,
          pageCount:_.range(Math.ceil(result.data.total/COUNT))
        }))
      } else {
        res.go('/')
      }
    }
  })
}

export default {
    render(req,res,next){
       loadData(0,res)
        $('#router-view').on('click','#addbtn',function(){
          res.go('/position_add')
        })
        $('#router-view').on('click','.btn-update',function(){
          res.go('/position_edit',{
            id:$(this).attr('data-id')
          })
        })
        $('#router-view').on('click','.btn-delete',function(){
          remove($(this).attr('data-id'),res)
        })
        $('#router-view').on('click','#page li[data-index]',function(){
          loadData($(this).attr('data-index'),res)
        })
        $('#router-view').on('click','#page #prev',function(){
          let index = $('#page .active').attr('data-index')
          let pageLength = $('#page li[data-index]').length
          if(index == 0){
            index = pageLength -1
          }else{
            index--
          }
          loadData(index,res)
        })
        $('#router-view').on('click','#page #next',function(){
          let index = $('#page .active').attr('data-index')
          let pageLength = $('#page li[data-index]').length
          if(index == pageLength -1){
            index = 0
          }else{
            index++
          }
          loadData(index,res)
        })
        
    },
    add(req,res,next){
      res.render(PositionAddView())
      $('#possubmit').on('click',function(){
        let data = $('#possave').serialize()
        $.ajax({
          url:'/api/position/save',
          type:'POST',
          data,
          dataType:'json',
          success(result){
            if(result.ret){
              res.back()
            }
          }
        })
      })
      $('#posback').on('click',function(){
        res.back()
      })
    },
    edit(req,res,next){
      $.ajax({
        url:'/api/position/findone',
        type:'POST',
        dataType:'json',
        data:{
          id:req.body.id
        },
        success(result){
          res.render(PositionEditView(result.data))

          $('#posback').on('click', () => {
            res.back()
          })
          $('#possubmit').on('click',() => {
            let data = $('#posedit').serialize()
            $.ajax({
              url:'/api/position/put',
              dataType:'json',
              type:'PUT',
              data:data + "&id="+req.body.id,
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