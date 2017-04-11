(function(){
    // 监听icon点击事件，打开主页面
    chrome.browserAction.onClicked.addListener(function(activeTab) {
        var url = "./Html/home.html";
        chrome.tabs.create({url: url});
    });

    // 监听新标签触发
    chrome.tabs.onCreated.addListener(function(tab) {
        console.log(tab);
        if (tab.url === "chrome://newtab/") {
            var obj = {url: "./Html/home.html"};
            chrome.tabs.update(tab.id, obj, function(t) {
                console.log(t);
            });
        }
    });

    // 时间
})();
