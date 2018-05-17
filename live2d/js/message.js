function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

var re = /x/;
console.log(re);
loadRandModel();
re.toString = function() {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('你都复制了些什么呀，转载要记得加上出处哦~~', 5000);
});
$('#hitokoto').mouseover(function (){
    var text = '这句一言出处是 <span style="color:#0099cc;">『{source}』</span>，是 <span style="color:#0099cc;">{author}</span> 在 {date} 时投稿的！'
    var hitokoto = JSON.parse($(this)[0].dataset.raw);
    text = text.render({source: hitokoto.source, author: hitokoto.author, date: hitokoto.date});
    showMessage(text, 3000);
});

$('.model-tool .fui-home').click(function (){
    window.location = 'https://cutiepanther.github.io/';
});

$('.model-tool .fui-eye').click(function (){
    switchNightMode();
    showMessage('你会做眼保健操吗？', 3000, true);
});

$('.model-tool .fui-chat').click(function (){
    showHitokoto();
});

$('.model-tool .fui-user').click(function (){
    loadRandModel();
    showMessage('我的新衣服好看嘛', 3000, true);
});


$('.model-tool .fui-cross').click(function (){
    sessionStorage.setItem('model-dsiplay', 'none');
    showMessage('愿你有一天能与重要的人重逢', 1300, true);
    window.setTimeout(function() {$('#landlord').hide();}, 1300);
});

$('.model-tool .fui-photo').click(function (){
    showMessage('照好了嘛，是不是很可爱呢？', 5000, true);
    window.Live2D.captureName = 'Pio.png';
    window.Live2D.captureFrame = true;
});

$.ajax({
    cache: true,
    url: `${message_Path}message.json`,
    dataType: "json",
    success: function (result){
        $.each(result.mouseover, function (index, tips){
            $(tips.selector).mouseover(function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.renderTip({text: $(this).text()});
                showMessage(text, 3000);
            });
        });
        $.each(result.click, function (index, tips){
            $(tips.selector).click(function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.renderTip({text: $(this).text()});
                showMessage(text, 3000);
            });
        });
    }
});
(function (){
    var text;
    console.info('home',`${home_Path}`)

    if(document.referrer !== '' && document.referrer.indexOf('cutiepanther') == -1){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = '嗨！来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友！';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = '嗨！ 来自 百度搜索 的朋友，<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
        }else if (domain == 'so') {
            text = '嗨！ 来自 360搜索 的朋友，<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
        }else if (domain == 'google') {
            text = '嗨！ 来自 谷歌搜索 的朋友，<br>欢迎阅读<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }else {
        if (window.location.href == `${home_Path}`) { //如果是主页
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = '哼！这么晚还不睡觉，你是想挨打咯！';
            } else if (now > 7 && now <= 9) {
                text = '早上好！难得有像你这么勤劳的小伙伴！';
            } else if (now > 10 && now <= 11) {
                text = '嗨！不要埋头工作，多起来走动走动哦！';
            } else if (now > 11 && now <= 13) {
                text = '不知不觉忙碌了一个上午，肚子都咕咕叫啦！';
            } else if (now > 13 && now <= 15) {
                text = '午后很容易犯困呢，今天的运动目标完成了吗？';
            } else if (now > 17 && now <= 19) {
                text = '傍晚了！出门散个步吧，今天的夕阳很美呢！';
            } else if (now > 19 && now <= 21) {
                text = '晚上好，你没事做呀，想听我唱歌吗？';
            } else if (now > 21 && now <= 23) {
                text = '诶哟，已经这么晚了呀，早点休息吧！';
            } else {
                text = '加油~ 好好看书，我会陪你哒！';
            }
        }else {
            text = '欢迎阅读<span style="color:#0099cc;">「 ' + document.title.split(' | ')[0] + ' 」</span>';
        }
    }
    showMessage(text, 12000);
})();

window.setInterval(showHitokoto,30000);

function showHitokoto(){
    $.getJSON('https://v1.hitokoto.cn',function(result){
        showMessage(result.hitokoto, 5000);
    });
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    console.log('showMessage', text);
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.message').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
}

function loadRandModel(){
    var num = Math.ceil(Math.random()*33)
    var modelJSON = "/live2d/model/Pio/model." + num + ".json";
    localStorage.setItem('modelJSON', modelJSON);
    loadlive2d("live2d", modelJSON);
}


function formatSeconds(value) {
    var seconds = parseInt(value);// 秒
    var minutes = 0;
    var hours = 0;
    var days = 0;
    if(seconds > 60) {
        minutes = parseInt(seconds/60);
        seconds = parseInt(seconds%60);
        if(minutes > 60) {
            hours = parseInt(minutes/60);
            minutes = parseInt(minutes%60);
            if(hours > 24) {
                days = parseInt(hours/24);
                hours = parseInt(hours%24);
            }
        }
    }
    var result = "";
    if(minutes > 0)
        result = ""+parseInt(minutes)+"分";
    if(hours > 0 && hours <= 24)
        result = ""+parseInt(hours)+"小时"+result;
    if(days > 0)
        result = ""+parseInt(days)+"天"+result;
    return result;
}