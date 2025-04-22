/*初期化と1秒間ごとの更新*/
document.addEventListener('DOMContentLoaded', function () {
    updateDateTime(); // 初回表示（日付＋時刻）
    setInterval(updateDateTime, 1000); // 毎秒更新
});

/*現在の日付を取得する関数｀*/
function getNowDay() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var day  = now.getDay();
    var youbi = ["日", "月", "火", "水", "木", "金", "土"];

    return year + "年" + month + "月" + date + "日(" + youbi[day] + ")";
}

/*1桁の数字を2桁に整形する関数*/
function set2fig(num) {
    return num < 10 ? "0" + num : num;
}

/*現在の時間を取得する関数*/
function getNowTime() {
    var nowTime = new Date();
    var hours = set2fig(nowTime.getHours());
    var minutes = set2fig(nowTime.getMinutes());
    var seconds = set2fig(nowTime.getSeconds());
    return hours + ":" + minutes + ":" + seconds;
}

/*表示を更新する関数*/
function updateDateTime() {
    document.getElementById("viewNowDay").textContent = getNowDay();
    document.getElementById("viewNowTime").textContent = getNowTime();
}

// メニューの開閉機能
document.addEventListener('DOMContentLoaded', function() {
    const detailButton = document.querySelector('.detail-button');
    const closeButton = document.querySelector('.close-menu');
    const navigationMenu = document.querySelector('.navigation-menu');

    detailButton.addEventListener('click', function() {
        navigationMenu.classList.add('active');
    });

    closeButton.addEventListener('click', function() {
        navigationMenu.classList.remove('active');
    });
});
