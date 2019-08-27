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
        // res.go('/position?_='+new Date().getTime())
        loadData(res.pageNo,res)
      }
    }
  })
}
function loadData(pageNo, res) {
  let start = pageNo * COUNT
  res.pageNo = pageNo
  $.ajax({
    url: '/api/position/list',
    data: {
      start,
      count: COUNT
    },
    dataType:'json',
    success(result) {
      if (result.ret) {
        // 当不是第一页 且 本页数据删除完毕时
        if (result.data.list.length === 0 && pageNo !== 0) {
          pageNo--
          loadData(pageNo, res)
        }

        res.render(PositionView({
          ...result.data,
          showPage: true,
          pageNo,
          pageCount: _.range(Math.ceil(result.data.total / COUNT))
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
        $('#router-view').on('click', '#possearch', function() {
          let keywords = $('#keywords').val()
          $.ajax({
            url: '/api/position/search',
            type: 'post',
            data: {
              keywords
            },
            dataType:'json',
            success(result) {
                res.render(PositionView({
                  ...result.data,
                  showPage: false
                }))
            }
          })
        })
    },
    add(req, res) {
      res.render(PositionAddView({}))
  
      $('#posback').on('click', () => {
        res.back()
      })
  
      $('#possubmit').on('click', () => {
        $('#possave').ajaxSubmit({
          url: '/api/position/save',
          type: 'POST',
          clearForm: true,
          dataType:'json',
          success(result) {
            if (result.ret) {
              res.back()
            } else {
              // alert(result.data.msg)
            }
          }
        })
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
          $('#possubmit').on('click', () => {
            $('#posedit').ajaxSubmit({
              url: '/api/position/patch',
              type: 'PATCH',
              dataType:'json',
              success(result) {
                if (result.ret) {
                  res.back()
                } else {
                  // alert(result.data.msg)
                }
              }
            })
          })
        }

      })
    }
}