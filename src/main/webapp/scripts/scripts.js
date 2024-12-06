const canvas = document.getElementById('coordinatePlane');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const scale = 28;

window.onload = function() {
    paint(5, 0, 0);  // Рисуем с полученными параметрами
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
    ctx.lineTo(centerX + R / 2 * scale, centerY);
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

function updateGraph(event) {
    // Проверяем статус события
    if (event.status === 'begin') {
        console.log("AJAX запрос начат");
        // Здесь можно, например, отобразить индикатор загрузки
    } else if (event.status === 'complete') {
        console.log("AJAX запрос завершён");
        // Ответ доступен в event.responseText, его нужно обработать

        // Для отладки выведем весь ответ
        console.log("Ответ от сервера:", event.responseText);

        // Теперь можно извлечь данные из ответа
        try {
            var x = document.getElementById("xValue") ? parseFloat(document.getElementById("xValue").innerText) : 0;
            var y = document.getElementById("yValue") ? parseFloat(document.getElementById("yValue").innerText) : 0;
            var r = document.getElementById("radiusValue") ? parseFloat(document.getElementById("radiusValue").innerText) : 0;
            console.log('X:', x, 'Y:', y, 'R:', r);  // Отладка
            paint(r, x, y);  // Вызов функции paint для отрисовки графика
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
