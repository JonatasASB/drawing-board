//Inital data
let currentColor = 'black';
let canvaDraw = false
mouseX = 0;
mouseY = 0;

let screen = document.querySelector('#tela')
let context = screen.getContext('2d')

let lineWidth = document.querySelector('#line-width')

resizeCanvas();
//Events
document.querySelectorAll('.color').forEach(item => {
    item.addEventListener('click', colorClickEvent)
})

window.addEventListener('resize', resizeCanvas);
/*
- Quando for click down, ativa o modo desenho
- Quando for click move, se o click down estiver ativado, DESENHE!
- Quando for click up, desativa o modo desenho
*/ 
screen.addEventListener('mousedown', mouseDownEvent)
screen.addEventListener('mousemove', mouseMoveEvent)
screen.addEventListener('mouseup', mouseUpEvent)
document.querySelector('.clear').addEventListener('click', clearScream)

lineWidth.addEventListener('input', function () {
    if (this.value > 10) {
        this.value = 10;
    }
});

document.querySelector('.download').addEventListener('click', function () {
    let image = screen.toDataURL("image/png"); // Converte o canvas para uma imagem
    let link = document.createElement('a'); // Cria um elemento <a>
    link.href = image;
    link.download = 'desenho.png'; // Nome do arquivo
    document.body.appendChild(link);
    link.click(); // Simula um clique para baixar
    document.body.removeChild(link);
});

//Functions
function colorClickEvent(event) { 

    let color = event.target.getAttribute('data-color')

    currentColor = color

    document.querySelector('.color.active').classList.remove('active')

    event.target.classList.add('active')

}

function resizeCanvas() {
    screen.width = screen.clientWidth;
    screen.height = screen.clientHeight;
}
function mouseDownEvent(event) {
    canvaDraw = true

    let rect = screen.getBoundingClientRect()

    mouseX = event.pageX - rect.left
    mouseY = event.pageY - rect.top
}
function mouseMoveEvent(event) {
    let rect = screen.getBoundingClientRect()
    if (canvaDraw) {
        draw(event.pageX, event.pageY)
    }
}
function mouseUpEvent() {
    canvaDraw = false
}

function draw(x, y) {
    let rect = screen.getBoundingClientRect()
    let pointX = x - rect.left
    let pointY = y - rect.top

    context.beginPath();
    context.lineWidth = Number(lineWidth.value)
    context.lineJoin = 'round';
    context.lineCap = 'round'
    context.moveTo(mouseX, mouseY);
    context.lineTo(pointX, pointY);
    context.closePath();
    context.strokeStyle = currentColor;
    context.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearScream() {
    context.setTransform(1, 0, 0, 1, 0, 0);

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}