let canvas_element = document.getElementById('canvas'); // Get canvas object by id
let context = canvas_element.getContext('2d');
let circle_array = [];  // Initialize the circles array

context.fillStyle = "#000000";
context.fillRect(0, 0, 500, 500);

function Circle (x, y, radius, id, fillColor){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.id = id;
    this.fillColor = fillColor;

    this.workWidth = {
        center: x,
        end1: x + radius,
        end2: x - radius
    };

    this.workHeight = {
        center: y,
        end1: y + radius,
        end2: y - radius
    }
}


// The function creates circles in the circle array

function create_circles(quantityX, quantityY, r, circle_array, canvas_element, x, y, dx, dy){
    let quantityAll = quantityX * quantityY;
    let drawPosition = {
        x: x,
        y: y
    };

    for (let i = 0; i<quantityAll; i++){
        let fillColor = 'gray';
        let circle = new Circle(drawPosition.x, drawPosition.y, r, i, fillColor);
        circle_array.push(circle);
        drawPosition.x = drawPosition.x + dy;
        if (drawPosition.x >= canvas_element.width) {
            drawPosition.x = dx;
            drawPosition.y = drawPosition.y + dy;
        }
    }
}

create_circles(8, 8, 25, circle_array, canvas_element, 37, 35, 37, 61);

// the function draws circles from the circle array to the canvas
function draw_circles(circle_array, context) {
    circle_array.forEach(function(circle) {
        context.beginPath();

        context.fillStyle = circle.fillColor;
        context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);

        context.strokeStyle = circle.strokeStyle;
        context.stroke();
        context.fill();
    });
}

draw_circles(circle_array, context);

// The function tracks the onclick event of the canvas and changes the color of the circle
canvas_element.onclick = function(e){
    event = e;
    let elementClickedId = checkClick(event);
    let curr_color = circle_array[elementClickedId].fillColor;
    let fillColor = document.getElementById('color').value;

    if (curr_color == fillColor){
        circle_array[elementClickedId].fillColor = 'gray';
    } else {
        circle_array[elementClickedId].fillColor = fillColor;
    }

    draw_circles(circle_array, context);
};


// The function checks if the click event inside the circle and returns the circle's id, if true
function checkClick(event) {
    let clickX = event.layerX;
    let clickY = event.layerY;
    let element;

    circle_array.forEach(function(circle) {
        if (
            clickX>circle.workWidth.end2&&
            clickX<circle.workWidth.end1&&
            clickY > circle.workHeight.end2 &&
            clickY < circle.workHeight.end1
        ) {
            element = circle.id;
        }
    });
    return element;
}

function submit_emoji(){
    let name = document.getElementById('name').value;
    if (name == ''){
        alert('Specify the name for your emoji');
        return false
    }

    let emoji = {
        name: '',
        circles: []
    };
    circle_array.forEach(function(circle){

        let color = circle.fillColor;
        if (color !== 'gray'){      //No need to save default color
            emoji.circles.push({
                id: circle.id,
                color: color
            })
        }

    });

    emoji.name = name;

    const url = 'http://localhost:3000/submitEmoji';
    const params = {
        headers: {
            "content-type" : "application/json; charset=UTF-8"
        },
        body: JSON.stringify(emoji),
        method: "POST"
    };

    fetch(url, params).then(function(data){
        return data.json();
    }).then(function(res){
        alert (res.message)
    });

    window.location.reload();

}






