
var curDisplay = 0; //记录当前展示图片索引
// 锁  防止连续点击
var flag = true;
var timer;
var imgLen = $('img').length;
// 初始化函数
function init() {
    move();
    bindEvent();
}
init();

function move() {
    var hLen = $('img').length / 2;
    // 记录分散在左右得图片索引
    var lNum, rNum;
    // 利用for循环与中间值为左右索引赋值
    for (var i = 0; i < hLen; i++) { // 0 1 2
        // 左侧图片索引赋值
        lNum = curDisplay - i - 1; // -1 -2 -3  // 
        console.log(lNum);
        // 左侧图片平移
        $('img').eq(lNum).css({
            transform: 'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(30deg)'
        });
        // 计算右侧图片索引值
        rNum = curDisplay + i + 1;
        // 临界值判断
        if (rNum > imgLen - 1) {
            rNum -= imgLen;
        }
        // 右侧图片向右平移
        $('img').eq(rNum).css({
            transform: 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(-30deg)'
        });
    }
    // 中间显示图片向前平移
    $('img').eq(curDisplay).css({
        transform: 'translateZ(300px)'
    });
    // 绑定动画运动结束事件  当一次动画结束后才能进行下一次运动
    $('img').on('transitionend', function () {
        flag = true;
    })
}

// 将每一张图片绑定上点击事件
function bindEvent() {
    $('img').on('click', function (e) {
        if (flag) {
            flag = false;
            // 将当前显示图片切换为当前点击图片
            curDisplay = $(this).index();
            move();
        }
    }).hover(function () {
        // 鼠标覆盖清除定时器
        clearInterval(timer);
    }, function () {
        // 鼠标移走设置定时器
        timer = setInterval(function () {
            play();
        }, 2000);
    });
    timer = setInterval(function () {
        play();
    }, 2000);
}

// 自动播放
function play(){
    if (curDisplay == imgLen - 1) {
        curDisplay = 0;
    } else {
        curDisplay++;
    }
    move();
}

