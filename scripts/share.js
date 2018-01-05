//创建动态标签
function createBodyElement(){
    var movie_list_allbox = document.createElement("div");
    movie_list_allbox.setAttribute("id","movie_list_allbox");
    var list_box_right = document.getElementById("list_box_right");
    list_box_right.appendChild(movie_list_allbox);

}

//在目标元素之后插入新元素
function insertAfter(newElement,targetElement) {
    var parent=targetElement.parentNode;
    // 返回元素的父节点
    if (parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
//标头
function Title(result){
    var Title=document.getElementById("_Title");
    var movieTitle=result.title;
    Title.innerHTML=movieTitle;

}
//subjects（影片主要内容）数组内容挑选
function subjectsArrayContent(result){
    var subjects=result.subjects;
    //遍历对象
    for (var i = 0; i < subjects.length; i++) {
        var subjectsObj=subjects[i];
        //获取内容
        var subGenres=subjectsObj.genres;
        var subTitle=subjectsObj.title;
        var subYear=subjectsObj.year;
        var subId=subjectsObj.id;

        var subDirectors=function(){
            var directors=subjectsObj.directors;
            var directorsArr=new Array();
            for (var i = 0; i < directors.length; i++) {
                var dirName=directors[i].name;
                directorsArr.push(dirName);
            }
            return directorsArr;

        }

        var subCasts=function(){
            var casts=subjectsObj.casts;
            var castsArr=new Array();
            for (var j = 0; j < casts.length; j++) {
                var castsName=casts[j].name;
                castsArr.push(castsName);
            }
            return castsArr;
        }

        var subRating=subjectsObj.rating.average;
        var subImg=subjectsObj.images.small;

        // console.log("类型: " + subGenres);
        // console.log("标题: " + subTitle);
        // console.log("年份: " + subYear);
        // console.log("导演: " + subDirectors());
        // console.log("主演: " + subCasts());
        // console.log("评分: " + subRating);
        // console.log("照片: " + subImg);
        // console.log(" ");

        //创建动态元素
        var movie_list_box=document.createElement("div"); movie_list_box.setAttribute("class","movie_list_box");

        var movie_img_box=document.createElement("div");movie_img_box.setAttribute("class","movie_img_box");

        var movie_img=document.createElement("img");movie_img.setAttribute("src",subImg);

        // var movie_text_box=document.createElement("div");movie_text_box.setAttribute("class","movie_text_box");

        var movie_text=document.createElement("div");movie_text.setAttribute("class","movie_text");

        var movie_name=document.createElement("h3");movie_name.innerHTML=subTitle;

        var movie_content=document.createElement("div");movie_content.setAttribute("class","movie_content");

        var movie_a=document.createElement("a");movie_a.setAttribute("href","#");movie_a.setAttribute("title",subId);

        var movie_genres=document.createElement("span");
        movie_genres.setAttribute("id","movie_genres");
        movie_genres.innerHTML="类型: "+subGenres;

        var movie_year=document.createElement("span");
        movie_year.setAttribute("id","movie_year");
        movie_year.innerHTML="上映年份: "+subYear;

        var movie_directors=document.createElement("span");
        movie_directors.setAttribute("id","movie_directors");
        movie_directors.innerHTML="导演: "+subDirectors();

        var movie_casts=document.createElement("span");
        movie_casts.setAttribute("id","movie_casts");
        movie_casts.innerHTML="主演: "+subCasts();

        var movie_rating=document.createElement("span");
        movie_rating.setAttribute("id","movie_rating");
        movie_rating.setAttribute("class","badge pull-right")
        movie_rating.innerHTML="评分: "+subRating;



        //动态添加元素
        movie_list_box.appendChild(movie_img_box);
        movie_img_box.appendChild(movie_img);
        // movie_list_box.appendChild(movie_text_box);
        movie_list_box.appendChild(movie_text);
        // movie_text_box.appendChild(movie_text);
        movie_text.appendChild(movie_name);
        movie_text.appendChild(movie_content);
        movie_content.appendChild(movie_genres);
        movie_content.appendChild(movie_year);
        movie_content.appendChild(movie_directors);
        movie_content.appendChild(movie_casts);
        movie_name.appendChild(movie_rating);
        movie_a.appendChild(movie_list_box);


        //把遍历的结果一个个添加到父级元素的最后一个子元素后面
        //1.找到父级元素
        var movie_list_allbox=document.getElementById("movie_list_allbox");
        //2.找到父级元素的最后一个子元素
        var MLBlastChild=movie_list_allbox.lastChild;
        //3.判断如果没有最后一个子元素则把子元素添加到父级，否则在添加到已有的最后一个子元素之后
        if (!MLBlastChild) {movie_list_allbox.appendChild(movie_a);
        }else{
            insertAfter(movie_a,MLBlastChild);
        }

    };
}

//分页展示（开始页数，分页栏展示页数）
function showPage(startNum,showLiNum){
    var pageDiv = document.getElementById("pageDiv");
    // alert(pageBox);
    var num = pageDiv.children[0].children.length;//所有li个数
    // alert("num:"+num);
    var startNum = startNum + 1;

    var endNum = startNum + showLiNum - 1;//结束显示的数

    if (endNum>num) {num}else{endNum};

    for(var i = 2;i < (num-2); i++){
        var iLI = pageDiv.children[0].children[i];
        if(i>=startNum && i<=endNum){
            iLI.style.display = "inline";//显示
        }else{
            iLI.style.display = "none";//隐藏
        }
    }
}

//跳转页面函数goPage（当前页数，每页显示行数）
function goPage(k,showRowNum){
    var pageBox = document.getElementById("movie_list_allbox");
    // alert(pageBox);
    var num = pageBox.childNodes.length;//表格所有行数(所有记录数)
    var totalPage = 0;//总页数
    var pageSize = showRowNum;//每页显示行数

    //总共分几页
    if(num/pageSize > parseInt(num/pageSize)){
        totalPage=parseInt(num/pageSize)+1;
    }else{
        totalPage=parseInt(num/pageSize);
    }
    var currentPage = k;//当前页数
    var startRow = (currentPage - 1) * pageSize+1;//开始显示的行  1
    var endRow = currentPage * pageSize;//结束显示的行
    // endRow = (endRow > num)? num : endRow;   // 10
    if (endRow>num) {num}else{endRow};
    // console.log(endRow);
    //遍历显示数据实现分页 //不在现实范围就隐藏
    for(var i=1;i<(num+1);i++){
        var irow = pageBox.children[i-1];
        if(i>=startRow && i<=endRow){
            irow.style.display = "block";//显示
        }else{
            irow.style.display = "none";//隐藏
        }
    }


    var oBox = document.getElementById("pageDiv");
    // alert("点击跳转到第"+currentPage+"页");
    console.log("当前currentPage:"+currentPage);
    //当前页面为1时 让“上一页”“首页”功能失效
    if (currentPage == 1) {
        oBox.children[0].children[0].setAttribute("class","previous disabled");
        oBox.children[0].children[1].setAttribute("class","previous disabled");
        oBox.children[0].children[2].setAttribute("class","active");
        oBox.children[0].children[9].setAttribute("class"," ");
        oBox.children[0].children[10].setAttribute("class"," ");
        showPage(1,5);
    }
    else if (currentPage == totalPage) {
        oBox.children[0].children[0].setAttribute("class"," ");
        oBox.children[0].children[1].setAttribute("class"," ");
        oBox.children[0].children[9].setAttribute("class","previous disabled");
        oBox.children[0].children[10].setAttribute("class","previous disabled");
        showPage(3,5);

    }else if (currentPage>3 && currentPage < 6) {
        oBox.children[0].children[0].setAttribute("class"," ");
        oBox.children[0].children[1].setAttribute("class"," ");
        oBox.children[0].children[9].setAttribute("class"," ");
        oBox.children[0].children[10].setAttribute("class"," ");
        showPage((+currentPage-2),5);

    }
    else if(currentPage>1 && currentPage <= 3){
        oBox.children[0].children[0].setAttribute("class"," ");
        oBox.children[0].children[1].setAttribute("class"," ");
        oBox.children[0].children[9].setAttribute("class"," ");
        oBox.children[0].children[10].setAttribute("class"," ");
        showPage(1,5);
    }else{
        oBox.children[0].children[0].setAttribute("class"," ");
        oBox.children[0].children[1].setAttribute("class"," ");
        oBox.children[0].children[9].setAttribute("class"," ");
        oBox.children[0].children[10].setAttribute("class"," ");
        showPage(3,5);
    }

    //事件委托
    oBox.onclick=function(ev){
        var el = ev.target ;
        ev.stopPropagation();
        console.log(ev.target);//返回到点击事件发生的元素节点
        console.log(el.tagName);

        if(el.tagName.toLowerCase()=="a") {
            var currentPageValue = el.firstChild.nodeValue;
            // alert("点击之前的当前页面: 第"+currentPage+"页");
            // alert("点击时获取a标签的值:"+currentPageValue);
            var pageLI=oBox.children[0].children;

            //遍历找到每个li 先清掉class
            for (var i = 0; i < pageLI.length; i++) {

                pageLI[i].setAttribute("class"," ");
            }

            //判断是否为数字
            if (!isNaN(currentPageValue)) {
                // currentPage=currentPageValue;
                // console.log("点击之前的当前页面: 第"+currentPage+"页");
                var currentPageLi = oBox.children[0].children[+currentPageValue+1];

                currentPageLi.setAttribute("class","active");
                return goPage(currentPageValue,showRowNum);
                //（当前页面，每个页面显示电影个数）
            }else{
                if (currentPageValue === "下一页" && currentPage != totalPage) {
                    console.log("点击之前的当前页面: 第"+currentPage+"页");
                    oBox.children[0].children[+currentPage+2].setAttribute("class","active");//选中移动
                    console.log("xxxx:"+currentPage);
                    return goPage((+currentPage+1),showRowNum);
                    // alert("点击之前的当前页面: 第"+currentPage+"页");
                }else if(currentPageValue === "下一页" && currentPage == totalPage){
                    oBox.children[0].children[9].setAttribute("class","previous disabled");
                    oBox.children[0].children[10].setAttribute("class","previous disabled");
                    oBox.children[0].children[8].setAttribute("class","active");

                    return false;

                }else if (currentPageValue === "上一页" && currentPage != 1) {
                    oBox.children[0].children[+currentPage].setAttribute("class","active");
                    return goPage((currentPage-1),showRowNum);

                }else if(currentPageValue === "上一页" && currentPage == 1){
                    oBox.children[0].children[0].setAttribute("class","previous disabled");
                    oBox.children[0].children[1].setAttribute("class","previous disabled");
                    oBox.children[0].children[2].setAttribute("class","active");
                    return false;

                }else if (currentPageValue === "首页") {
                    return goPage(1,showRowNum);

                }else{     oBox.children[0].children[8].setAttribute("class","active");
                    return goPage((totalPage),showRowNum); }
            }



        } else{ alert("事件委托没有绑定到a标签") }
    }

}

//点击现实电影详细条目
function movieDetail(){
    var movieAllBox=document.getElementById("movie_list_allbox");
    movieAllBox.onclick=function(ev){
        var findA = ev.target ;//返回的是a标签的子元素 需要找到a标签
        // alert("el:"+ev.target.innerHTML);
        // console.log("el:"+ev.target);//返回到点击事件发生的元素节点
        // console.log(el.tagName);

        //如果findA不是a标签，则一直往上找父级直到找到a标签位置
        if(findA.tagName.toLowerCase()!=="a"){
            do{ findA = findA.parentNode;}while(findA.tagName.toLowerCase()!=="a")
            var titleValue = findA.getAttribute("title");
            // alert("titleValue:"+titleValue);
            $.ajax({
                url:"http://api.douban.com/v2/movie/subject/"+titleValue,
                // ?start=0&count=10
                type:"get",
                dataType:"jsonp",
                success:function(result) {
                    console.log(result);
                    if (document.getElementById("list_box_right")) {
                        document.getElementById("list_box_right").innerHTML="";

                    }

                    //数据

                    function getData(){
                        var movieRating=result.rating.average;
                        var movieYear=result.year;
                        var movieImg=result.images.large;
                        var movieName=result.title;
                        var movieCountries=result.countries;
                        var movieGenres=result.genres;
                        var movieSummary=result.summary;
                        var movieCasts=function(){
                            var casts=result.casts;
                            var castsArr=new Array();
                            for (var j = 0; j < casts.length; j++) {
                                var castsName=casts[j].name;
                                castsArr.push(castsName);
                            }
                            return castsArr;
                        }
                        var movieDirectors=function(){
                            var directors=result.directors;
                            var directorsArr=new Array();
                            for (var y = 0; y < directors.length; y++) {
                                var directorsName=directors[y].name;
                                directorsArr.push(directorsName);
                            }
                            return directorsArr;
                        }

                        console.log("类型: " + movieGenres);
                        console.log("标题: " + movieName);
                        console.log("年份: " + movieYear);
                        console.log("导演: " + movieDirectors());
                        console.log("主演: " + movieCasts());
                        console.log("评分: " + movieRating);
                        console.log("产地: " + movieCountries);
                        console.log("照片: " + movieImg);
                        // console.log("照片: " + movieImg);
                        console.log(" ");



                        // var list_box_right=document.createElement("div");
                        // list_box_right.setAttribute("id","list_box_right");

                        var movie_detail_allbox=document.createElement("div");
                        movie_detail_allbox.setAttribute("id","movie_detail_allbox");

                        var movie_detail_imgbox=document.createElement("div");
                        movie_detail_imgbox.setAttribute("id","movie_detail_imgbox");

                        var movie_detail_img=document.createElement("img");
                        movie_detail_img.setAttribute("id","movie_detail_img");
                        movie_detail_img.setAttribute("src",movieImg);

                        var movie_detail_textbox=document.createElement("div");
                        movie_detail_textbox.setAttribute("id","movie_detail_textbox");

                        var movie_detail_name=document.createElement("h4");
                        movie_detail_name.setAttribute("id","movie_detail_name");
                        movie_detail_name.innerHTML=movieName;

                        var movie_detail_content=document.createElement("div");
                        movie_detail_content.setAttribute("id","movie_detail_content");

                        var movie_detail_genres=document.createElement("span");
                        movie_detail_genres.setAttribute("id","movie_detail_genres");
                        movie_detail_genres.innerHTML="评分:"+movieGenres;

                        var movie_detail_year=document.createElement("span");
                        movie_detail_year.setAttribute("id","movie_detail_year");
                        movie_detail_year.innerHTML="年份:"+movieYear;

                        var movie_detail_directors=document.createElement("span");
                        movie_detail_directors.setAttribute("id","movie_detail_directors");
                        movie_detail_directors.innerHTML="导演:"+movieDirectors();

                        var movie_detail_casts=document.createElement("span");
                        movie_detail_casts.setAttribute("id","movie_detail_casts");
                        movie_detail_casts.innerHTML="主演:"+movieCasts();

                        var movie_detail_rating=document.createElement("span");
                        movie_detail_rating.setAttribute("id","movie_detail_rating");
                        movie_detail_rating.innerHTML="评分:"+movieRating;

                        var movie_detail_countries=document.createElement("span");
                        movie_detail_countries.setAttribute("id","movie_detail_countries");
                        movie_detail_countries.innerHTML="国家:"+movieCountries;

                        var movie_detail_summary=document.createElement("span");
                        movie_detail_summary.setAttribute("id","movie_detail_summary");
                        movie_detail_summary.innerHTML="简介:"+movieSummary;


                        movie_detail_content.appendChild(movie_detail_rating);
                        movie_detail_content.appendChild(movie_detail_countries);
                        movie_detail_content.appendChild(movie_detail_year);
                        movie_detail_content.appendChild(movie_detail_genres);
                        movie_detail_content.appendChild(movie_detail_directors);
                        movie_detail_content.appendChild(movie_detail_casts);
                        movie_detail_content.appendChild(movie_detail_summary);
                        movie_detail_textbox.appendChild(movie_detail_name);
                        movie_detail_textbox.appendChild(movie_detail_content);
                        movie_detail_imgbox.appendChild(movie_detail_img);
                        movie_detail_allbox.appendChild(movie_detail_imgbox);
                        movie_detail_allbox.appendChild(movie_detail_textbox);

                        var list_box_right = document.getElementById("list_box_right");
                        list_box_right.appendChild(movie_detail_allbox);



                    }

                    getData();





                }

            })
        }

    }
}


