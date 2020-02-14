let bird_names = ['Owl', 'Parrot', 'Goose', 'Woodpecker', 'Falcon', 'Chicken', 'Cockatoo', 'Thrush', 'Lovebird', 'Plover'];
let i = 0;

document.getElementById('bird_name').innerHTML = bird_names[i]; // Placing the first name at start

function removeLetter(event, letter, name){

    name = document.getElementById('bird_name').innerHTML;      // get current value
    letter = String.fromCharCode(event.which || event.keyCode); // get the input key (code) and convert to char
    let reg = new RegExp(letter, 'gi');                         // regular expression, g for all occurances, i for case sensitivity
    name = name.replace(reg, '');                               // replacement

    if (name.length>0){
        document.getElementById('bird_name').innerHTML = name; // Returning the new value to the html
        document.getElementById('input').value = '';            // Clean the input field
    }
    else{
        i++;
        document.getElementById('input').value = '';
        document.getElementById('bird_name').innerHTML = bird_names[i]; // Changing to the next name
    }

    if (i == bird_names.length){    // When the array reaches the last name
        document.getElementById('bird_name').innerHTML = "All names have been spelled. Input field is removed";
        var elem = document.getElementById('input_container');
        var child = document.getElementById('input');
        elem.removeChild(child);
    }
}

