
// 网页加载自执行
    $(document).ready(function(){
        let li = $(".active");
        for(let i = 0;i < li.length ; i++ ){
            webitems(li.get(0),i, 0);
        }
    });
   
    function webitems(that, parentid, subsetid) {
        // 获取对应的父元素
        let parent = $(that).parents(".panel");
        //更改当前样式
        let top = $(that).parent().children(".active");
        $(top).removeClass('active');
        $(that).addClass('active');
        let itemsnode = $(that).parents(".panel").children(".items");
        let parentfold = getparent(parentid);
        let subfold = getsubfold(parentid, subsetid);
        var url = "./json/" + parentfold + "/" + subfold +  ".json";

        let config = {
            type: "GET",
            url: url,
            callback: function (result) {
                let data = result.data;
                let items = "";
                for (let i = 0; i < data.length; i++) {
                    let item = `
                    <div class="item">
                            <div class="info">
                                <a href="${data[i].weburl}" target="_blank">${data[i].title}</a>
                            </div>
                            <div class="des-box">
                            `;

                    if (data[i].desctext != '') {
                        item += `<p>${data[i].desctext}</p>`
                    }
                    item += `</div ></div >`;
                    items += item;
                }
                itemsnode.html(items);
            }
        };
        ajaxdoing(config);

    }

    function getparent(parent) {
        switch (parent) {
            case 1:
                return "edu";
            case 2:
                return "data";
            case 3:
                return "software";
            case 4:
                return "resources";
            case 5:
                return "videoplay";
            case 6:
                return "design";
            case 7:
                return "lifeserve";
        }
    }

function getsubfold(parent, sub) {
    let sub1 = ["guojia", "xueshu", "kaoyan", "yingyu", "ketang", "shuku", "xuexi", "bcshequ", "bcedu"];
    let sub2 = ["shuju", "rank", "fenxi"];
    let sub3 = ["shiyong", "wangzhan", "zaixian", "bangong", "biaodan", "tupian", "xueshu"];
    let sub4 = ["wangpan", "wengdang", "bt"];
    let sub5 = ["zhibo","meiju",  "rihan","dongman","yingshi","yingyue","manhua","youxi"];
    let sub6 = ["chuangyi", "tuku", "bizhi", "tubiao"];
    let sub7 = ["zhichang", "baike", "shehui"];

    switch (parent) {
        case 1:
            return sub1[sub];
        case 2:
            return sub2[sub];
        case 3:
            return sub3[sub];
        case 4:
            return sub4[sub];
        case 5:
            return sub5[sub];
        case 6:
            return sub6[sub];
        case 7:
            return sub7[sub];
    }
}

// 封装请求
function ajaxdoing(config) {
    let { type, url, data, callback, errorback } = config;
    $.ajax({
        type, url, data,
        success: function (result) {
            callback(result);
        },
        error: function (e) {
            console.log(e)
        }
    });
}


