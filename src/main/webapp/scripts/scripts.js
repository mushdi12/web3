const canvas = document.getElementById('coordinatePlane');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const scale = 34;

window.onload = function() {
    drawAxes()  // Рисуем с полученными параметрами
}

function drawAxes() {
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.moveTo(canvas.width - 10, centerY - 5);
    ctx.lineTo(canvas.width, centerY);
    ctx.lineTo(canvas.width - 10, centerY + 5);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.moveTo(centerX - 5, 10);
    ctx.lineTo(centerX, 0);
    ctx.lineTo(centerX + 5, 10);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("X", canvas.width - 14, centerY + 19);
    ctx.fillText("Y", centerX + 10, 14);
}

function drawCircle(R) {
    ctx.fillStyle = "rgba(66,170,255,0.34)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, R/2 * scale, -3*Math.PI /2 , -1 * Math.PI);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    ctx.closePath();
}

function drawTriangle(R) {
    ctx.fillStyle = "rgba(66,170,255,0.34)";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY - R / 2 * scale);
    ctx.lineTo(centerX + R  * scale, centerY);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    ctx.closePath();
}

function drawSquare(R) {
    ctx.fillStyle = "rgba(66,170,255,0.34)";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY - R/2 * scale);
    ctx.lineTo(centerX - R * scale, centerY - R/2 * scale);
    ctx.lineTo(centerX - R  * scale, centerY);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    ctx.closePath();
}

function drawPoint(x, y) {
    ctx.fillStyle = "#000dff";
    ctx.beginPath();
    ctx.arc(centerX + x * scale, centerY - y * scale, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function paint(r, x, y) {
    //console.log(canvas); // Проверьте, что canvas существует
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистить канвас
    drawSquare(r);
    drawCircle(r);
    drawTriangle(r);
    drawAxes();
    drawPoint(x, y);  // Рисуем точку по переданным данным
}

function paintWithoutPoint(r) {
    //console.log(canvas); // Проверьте, что canvas существует
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистить канвас
    drawSquare(r);
    drawCircle(r);
    drawTriangle(r);
    drawAxes();

}

function updateGraph(event) {
    if (event.status === 'begin') {
        console.log("AJAX запрос начат");
    } else if (event.status === 'complete') {
        console.log("AJAX запрос завершён");

        try {
            // Получаем элементы через JSF с учётом правильных ID
            var xElement = document.getElementById("main-form:x");
            var yElement = document.getElementById("main-form:y");
            var rElement = document.getElementById("main-form:selected-radius");

            // Проверяем, что элементы найдены
            if (!xElement || !yElement || !rElement) {
                console.error("Ошибка: не все элементы найдены.");
                return;
            }

            var x = xElement.value;
            var y = yElement.value;
            var r = rElement.value;

            // Проверяем, что все данные получены
            if (x === "" || y === "" || r === "") {
                console.error("Ошибка: не все значения были получены.");
                return;
            }

            // Печатаем их для отладки
            console.log('X:', x, 'Y:', y, 'R:', r);  // Отладка

            // Конвертируем X, Y, R в числовые значения
            x = parseFloat(x);
            y = parseFloat(y);
            r = parseFloat(r);

            if (isNaN(x) || isNaN(y) || isNaN(r)) {
                console.error("Ошибка: одно из значений не является числом.");
                return;
            }

            paint(r, x, y);

        } catch (error) {
            console.error("Ошибка при обработке данных:", error);
        }
    } else {
        console.error("Ошибка в обработке AJAX запроса: Статус -", event.status);
    }
}

function updateGraphWithoutPoint(event) {
    if (event.status === 'begin') {
        console.log("AJAX запрос начат");
    } else if (event.status === 'complete') {
        console.log("AJAX запрос завершён");

        try {

            var rElement = document.getElementById("main-form:selected-radius");

            // Проверяем, что элементы найдены
            if (!rElement) {
                console.error("Ошибка: r найдены.");
                return
            }

            var r = rElement.value;

            // Проверяем, что все данные получены
            if (r === "") {
                console.error("Ошибка: r были получены.");
                return
            }

            // Печатаем их для отладки
            console.log('R:', r);  // Отладка


            r = parseFloat(r);

            if ( isNaN(r)) {
                console.error("Ошибка: r не является числом.");
                return
            }

            // Отрисовываем график
            paintWithoutPoint(r);

        } catch (error) {
            console.error("Ошибка при обработке данных:", error);
        }
    } else {
        console.error("Ошибка в обработке AJAX запроса: Статус -", event.status);
    }
}

// Функция для обработки изменения состояния кнопок
function toggleButtonSelection(event) {
    const buttons = document.querySelectorAll('.radius-link');

    buttons.forEach(function(button) {
        button.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

document.querySelectorAll('.radius-link').forEach(function(button) {
    button.addEventListener('click', toggleButtonSelection);
});

function handleCanvasClick(event) {
    var canvas = document.getElementById('coordinatePlane');
    var rect = canvas.getBoundingClientRect();
    var x = (event.clientX - rect.left - centerX) / scale;
    var y = (centerY - (event.clientY - rect.top)) / scale;

    // Ограничиваем точность до 2 знаков после запятой (для передачи как double)
    x = parseFloat(x.toFixed(2));
    y = parseFloat(y.toFixed(2));
    drawPoint(x, y);

    // Устанавливаем значения в скрытые поля формы для отправки
    document.getElementById('main-form:x').value = x;
    document.getElementById('main-form:y').value = y;

    // Параметры запроса через JSF
    var form = document.getElementById('main-form');
    jsf.ajax.request(form, {
        execute: '@form',  // Отправляем всю форму
        render: 'coordinatePlane resultsTable', // Перерисовываем элементы
        onevent: function(event) {
            if (event.status === 'complete') {
                console.log('Координаты X: ' + x + ', Y: ' + y + ' отправлены в Bean.');
            }
        },
        params: [
            {name: 'main-form:x', value: x},
            {name: 'main-form:y', value: y},
            {name: 'main-form:selected-radius', value: 1}, // Передаем радиус
            {name: 'main-form:checkPointAction', value: 'checkPoint'} // Специальный параметр для вызова метода checkPoint
        ]
    });
}




