(function(){
    window.onload = function(){
        // api
        let main_domain = "http://127.0.0.1:5000";
        // main_domain = "http://104.223.65.66:5000";
        let api = {
            test: main_domain+'/test',
            login: main_domain+'login',
            top_list_all: main_domain+'/hot_list',
            mylist: main_domain+'/mylist',
            playlist_detail: main_domain+'/playlist'
        }
        // 动态时间
        let el_clock = document.getElementById("clock");
        let el_greeting = document.getElementById("greeting");
        let clockString = "";
        let greetingString = "";
        function real_time() {
            let date = new Date();
            // clock补0
            let hours = date.getHours().toString().length < 2 ? "0" + date.getHours().toString() : date.getHours().toString();
            let minutes = date.getMinutes().toString().length < 2 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();

            if (hours+":"+minutes !== clockString) {
                el_clock.innerHTML = hours + ":" + minutes;
                clockString = hours+":"+minutes;
            }else{
                return;
            }

            // greetings
            if (date.getHours() >= 0 && date.getHours() <= 11) {
                greetingString = "morning";
            }else if (date.getHours() >= 12 && date.getHours() <= 18) {
                greetingString = "afternoon";
            }else{
                greetingString = "evening";
            }
            el_greeting.innerHTML = "Good " + greetingString + "," + " MillerD.";
        }
        // 时间,问候语计算
        real_time();
        setInterval(function(){
            real_time();
        }, 1000);

        // 登录
        function login() {
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
            let mylist = $.post(api.mylist, "", function() {
                console.log('fetching my list');
            })
            .done(function(data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].creator.userId === 9586316) {
                        let li = $("<li class='myalbum'>" + data[i]['name'] + "</li>");

                        // 获取歌单详情
                        li.click(function() {
                            let playlist_detail = $.post(api.playlist_detail+"/"+data[i]['id'], "", function() {
                                console.log('fetching list detail');
                            })
                            .done(function(data) {
                                $("#player").attr("src", data[14]['mp3Url']);
                            })
                            .fail(function(e) {
                                console.log(e);
                            })
                            .always(function() {
                                console.log('list detail complete');
                            });
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

        // todo btn
        $("#todoBtn").click(function() {
            console.log('todo_click');
        })

        // play btn toggle
        let music_mode = false;
        function music_box() {
            if(!music_mode) {
                $(".background-cover").addClass('blur');
                $(".wrap").hide();
                $(".music-wrap").removeClass('no-display');

                // 登录
                login();
            }else{
                $(".background-cover").removeClass("blur");
                $(".wrap").show();
                $(".music-wrap").addClass('no-display');
            }
            music_mode = !music_mode;
        }
        $("#playBtn").click(music_box);
        $("#music-close").click(music_box);
        // let el_playBtn = document.getElementById("playBtn");
        // el_playBtn.addEventListener("click", music_box);
        // let el_close = document.getElementById("music-close");
        // el_close.addEventListener("click", music_box);

    }
})();
