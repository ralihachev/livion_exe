// When window loaded, the function connects to the endpoint to get the emojies from the database

window.onload = function() {
    const url = 'http://localhost:3000/getEmoji';
    const params = {
        method: "GET"
    };

    fetch(url, params).then(function(data){
        return data.json();
    }).then(function(res){
        for (let j = 0; j<res.length; j++){
            let obj_id = 'canvas-' + j;
            let canvas_element2 = document.getElementById(obj_id);
            let context2 = canvas_element2.getContext('2d');
            let circle_array2 = [];
            create_circles(8, 8, 5, circle_array2, canvas_element2, 8, 8, 8, 12);
            res[j].circles.forEach(function(circle_emoji){
                circle_array2.forEach(function(circle){
                    if (circle_emoji.id == circle.id){
                        circle.fillColor = circle_emoji.color;
                    }
                })
            });
            draw_circles(circle_array2, context2)
        }
    });
};
