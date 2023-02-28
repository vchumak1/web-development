function timer() {
    //Создаем timer
    const deadline = '2022-11-11';

    function getTimeRemaining(endtime) {
        //получаем разницу в миллисекундах между датой окончанчания события и текущей датой и временем
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            //чтобы часы, минуты и секунды не превышали значений 24, 60 и 60, производится деление по остатку на 24 и 60
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    //функция помощник, добавляет к таймеру ноль, если число меньше 10, если дата просрочена, то оставляет нули, чтобы не ползла вёрстка
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else if (num >= 0) {
            return num;
        } else {
            return '00';
        }
    }

    function setClock(selector, endtime) {
        //получаем элементы со страницы, куда будем передавать информацию
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            //определяем время запуска функции updateClock
            timeInterval = setInterval(updateClock, 1000);
        //убираем мигание в браузере. Мигание появилось в результате того, что setInterval занимает 1 секунду
        updateClock();

        //создаем функцию, которая будет обновлять наш таймер на странице
        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);
}

module.exports = timer;