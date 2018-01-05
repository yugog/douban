//点击按钮触发搜索功能
// 找到按钮
var myBtn=document.getElementById("myBtn");
myBtn.onclick=function(){                               //按钮绑定点击事件
   var myForm=document.getElementById("myForm");        //找到form表单
   var formValue=myForm.children[0].children[0].value;  //找到表单输入的内容
   if (formValue == null || formValue == ""){           //判断是否为空值
      alert("请输入您想查找的内容");
      return false;
  }else{
       console.log(formValue);
       var searchValue=formValue;

       //判断是否有 movie_list_allbox 有则消除其内容
       if(document.getElementById("movie_list_allbox")) {
        document.getElementById("movie_list_allbox").innerHTML="";
       }else if(document.getElementById("movie_detail_allbox")){
        // alert("find movie_detail_allbox");
            var removeDIV=document.getElementById("list_box_right");
            removeDIV.innerHTML="<h2 id=\"_Title\">loading...</h2><div id=\"pageDiv\" name=\"pageDiv\" ><ul class=\"pagination\"><li><a href=\"#\" >首页</a></li><li><a href=\"#\" >上一页</a></li><li style=\"display: none;\"><a href=\"#\" >1</a></li><li style=\"display: none;\"><a href=\"#\" >2</a></li><li style=\"display: none;\"><a href=\"#\" >3</a></li><li style=\"display: none;\"><a href=\"#\" >4</a></li><li style=\"display: none;\"><a href=\"#\" >5</a></li><li style=\"display: none;\"><a href=\"#\" >6</a></li><li style=\"display: none;\"><a href=\"#\" >7</a></li><li ><a href=\"#\" >下一页</a></li><li><a href=\"#\" >尾页</a></li></ul></div>";

      }else{ alert("xxxx") }
      $.ajax({
          url:"http://api.douban.com/v2/movie/search?q="+searchValue,
    // ?start=0&count=10
          type:"get",
          dataType:"jsonp",
          success:function(result){
              console.log(result);
        Title(result);
        createBodyElement();
        showPage(1,5);
        subjectsArrayContent(result);
        goPage(1,3);
        movieDetail();
      }
    })
    


  }
}

  
