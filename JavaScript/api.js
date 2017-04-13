let APIModule = {};
// api
let main_domain = "http://127.0.0.1:5000";
// main_domain = "http://104.223.65.66:5000";
// let  = {
//     test: main_domain+'/test',
//     login: main_domain+'login',
//     top_list_all: main_domain+'/hot_list',
//     mylist: main_domain+'/mylist',
//     playlist_detail: main_domain+'/playlist'
// }
APIModule.api = {
    test: main_domain+'/test',
    login: main_domain+'login',
    top_list_all: main_domain+'/hot_list',
    mylist: main_domain+'/mylist',
    playlist_detail: main_domain+'/playlist'
}
// 我的歌单
APIModule.myList = function() {
    // 登录
    // netease api test
    // $.post(api.test, "", function(data, status) {
    //     console.log(data + " " + status);
    // });


    // $.post(api.top_list_all, "", function(data, status) {
    //     console.log(data + " " + status);
    // });

    // 我的歌单
    if ($(".mylist:has(li)").length > 0) {
        return;
    }
    let self = this;
    let mylist = $.post(this.api.mylist, "", function() {
        console.log('fetching my list');
    })
    .done(function(data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].creator.userId === 9586316) {
                let li = $("<li class='myalbum'>" + data[i]['name'] + "</li>");

                // 获取歌单详情
                li.click(function() {
                    self.playlistDetail(data[i]['id']);
                })
                $(".mylist").append(li);
            }
        }
    })
    .fail(function(e) {
        alert(e);
    })
    .always(function() {console.log('mylist complete');});
}

APIModule.playlistDetail = function(playlistId) {
    let playlist_detail = $.post(this.api.playlist_detail+"/"+playlistId, "", function() {
        console.log('fetching list detail');
    })
    .done(function(data) {
        console.log(data);
        $("#player").attr("src", data[14]['mp3Url']);
    })
    .fail(function(e) {
        console.log(e);
    })
    .always(function() {
        console.log('list detail complete');
    });
}
