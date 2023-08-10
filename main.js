// time
// console.log(123);
// const time = document.getElementById('time');

let now = new Date();
const today = now;
render(now);

g('#today').onclick = () => { 
    render(new Date());
}

g('#prevMonth').onclick = () => {
    const year_now = now.getFullYear();
    const month_now = now.getMonth() + 1;

    var endDayOfCurrentMonth = new Date(new Date(year_now, month_now, 1) - 3600 * 24 * 1000);
    // 当前月份有多少天
    var currentMonthDays = endDayOfCurrentMonth.getDate(); 
    render(new Date(now - 3600*24*1000*currentMonthDays));
}

g('#nextMonth').onclick = () => {
    const year_now = now.getFullYear();
    const month_now = now.getMonth() + 1;

    var endDayOfCurrentMonth = new Date(new Date(year_now, month_now, 1) - 3600 * 24 * 1000);
    // 当前月份有多少天
    var currentMonthDays = endDayOfCurrentMonth.getDate(); 
    render(new Date(now - 0 + 3600*24*1000*currentMonthDays));
}

function render(time) {
    const year_now = time.getFullYear();
    const month_now = time.getMonth() + 1;

    var endDayOfCurrentMonth = new Date(new Date(year_now, month_now, 1) - 3600 * 24 * 1000);
    // 当前月份有多少天
    var currentMonthDays = endDayOfCurrentMonth.getDate();

    initTime();
    generateDays();
    now = time;

    function initTime() {
        const timeEm = g('#time');
        // const now = new Date();
        timeEm.textContent = `${year_now}年${month_now}月`;
    }
    
    function generateDays() {
        // days
        // 当前月第一天
        const firstDayOfCurrentMonth = new Date(year_now, month_now - 1, 1);
        // 当前月第一天星期几
        let weekdayOfCurrentMonthsFirstDay = firstDayOfCurrentMonth.getDay();
        
        // 本月最后一天是星期几
        var weekdayOfCurrentMonthEndDay = endDayOfCurrentMonth.getDay();
    
        const days = g('#days');
        // 渲染 日历之前将内容清空
        days.innerHTML = "";
        let selectedDay;
        // 本月第一天星期几前面补齐
        // 上个月多少天，倒补
        const endDayOfPreMonth = new Date(firstDayOfCurrentMonth - 3600 * 24 * 1000);
        const preMonthDays = endDayOfPreMonth.getDate();
        if(weekdayOfCurrentMonthsFirstDay == 0) { // 第一天刚好是周日，则前面补6天
            weekdayOfCurrentMonthsFirstDay = 7;
        }
        let allDays = 0; // 控制日历的高度，只显示42天
        for(var i=preMonthDays-weekdayOfCurrentMonthsFirstDay + 2; i<=preMonthDays; i++) {
            const li = document.createElement('li');
            li.textContent = i;
            li.classList.add("calendar-days-disabled");
            days.append(li);
            allDays++;
        }
        
        // 本月
        for(var i=1; i <= currentMonthDays; i++) {
            const li = document.createElement('li');
            li.textContent = i;
            if(today.getDate() == i && today.getFullYear() == year_now && today.getMonth() == month_now -1) { // 今天
                li.classList.add('calendar-days-today');
            }
            li.onclick = () => { // 被选中
                if(selectedDay) {
                    selectedDay.classList.remove("calendar-days-selected");
                }
                li.classList.add("calendar-days-selected");
                selectedDay = li;
            }
            days.append(li);
            allDays++;
        }
        // 补齐下个月，日历总共显示42天
        //console.log("42 - allDays=" + (42 - allDays));
        //for(var i=weekdayOfCurrentMonthEndDay + 1; i <= 7; i++) {
        for(var i=allDays + 1; i <= 42; i++) {
            const li = document.createElement('li');
            li.textContent = i - allDays;
            li.classList.add("calendar-days-disabled");
            days.append(li);
        }
        
    }

}




// 帮助函数
function g(selector) {
    return document.querySelector(selector);
}

function gs(selector) {
    return document.querySelectorAll(selector);
}