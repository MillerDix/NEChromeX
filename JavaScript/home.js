(function(){
    window.onload = function(){
        // 时间,问候语计算
        ClockModule.real_time();
        setInterval(function(){
            ClockModule.real_time();
        }, 1000);

        //TODO todolist
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
                APIModule.myList();
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
