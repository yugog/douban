   $.ajax({
    url:"http://api.douban.com/v2/movie/in_theaters",
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



