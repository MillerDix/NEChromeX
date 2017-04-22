let APIModule = {};
// api
let main_domain = "http://127.0.0.1:5000";
main_domain = "http://104.223.65.66:5000";  // VPS LA.
main_domain = "http://121.41.12.223:5000"   // VPS Alibaba
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
// 当前选中信息
APIModule.currentSelection = {playlist: {id: '', element: ''}, song: {id: '', element: ''}};

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
                    // 重复点击控制
                    if (self.currentSelection.playlist.id === data[i]['id']) {
                        return;
                    }
                    // 选中状态控制
                    if (self.currentSelection.playlist.element !== '') {
                        self.currentSelection.playlist.element.css("background-color", "transparent");
                    }
                    li.css("background-color", "#bac4d1");
                    self.currentSelection.playlist.id = data[i]['id'];
                    self.currentSelection.playlist.element = li;
                    self.playlistDetail(data[i]['id']);
                })
                $(".mylist").append(li);
            }
        }
    })
    .fail(function(e) {
        console.log(e);
    })
    .always(function() {console.log('mylist complete');});
}

// 播放列表内容
APIModule.playlistDetail = function(playlistId) {
    let self = this;
    $(".playlist_detail").empty();
    let playlist_detail = $.post(this.api.playlist_detail+"/"+playlistId, "", function() {
        console.log('fetching list detail');
    })
    .done(function(data) {
        for (let i = 0; i < data.length; i++) {
            let li = $("<li class='myalbum'>" + data[i]['name'] + "</li>");
            li.click(function() {
                // 重复点击控制
                if (self.currentSelection.song.id === data[i]['id']) {
                    return;
                }
                console.log(data[i]);
                // 选中状态控制
                if (self.currentSelection.song.element !== '') {
                    self.currentSelection.song.element.css("background-color", "transparent");
                }
                li.css("background-color", "#bac4d1");
                self.currentSelection.song.id = data[i]['id'];
                self.currentSelection.song.element = li;
                // 歌曲信息展示
                $("#playing-pic").attr("src", data[i]['album']['picUrl']);
                // 播放
                self.playSong(data[i]['mp3Url']);

            })
            $(".playlist_detail").append(li);
        }
    })
    .fail(function(e) {
        console.log(e);
    })
    .always(function() {
        console.log('list detail complete');
    });
}

// 播放 通过songUrl
APIModule.playSong = function(songUrl) {
    $("#player").attr("src", songUrl);
}
