
$.ajax({
	url:"https://api.douban.com/v2/movie/top250",
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