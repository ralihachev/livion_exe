

function openForm() {
    document.getElementById("form").style.display = "block";
}

function closeForm() {
    document.getElementById("form").style.display = "none";
}


let i = get_last_key(); // Last key in the storage (aka id)

function submit_form(){
    let question = document.getElementById('question').value;
    if (question == ''){
        return false;   // prevent from submition if there is no question
    }
    let category = document.getElementById('category').value;
    let date = new Date();

    date = date.toLocaleString(); // Convert timestamp to local date and time

    let obj = {
        'question': question,
        'category': category,
        'timestamp': date
    };  // Create an object to save to storage, later convert it to string

    add_to_table(obj, i);
    set_to_storage(i, obj);
    i+=1;
}


// The function adds the new entry to the table on the top
function add_to_table(obj, i){
    let table = document.getElementById('table');
    let row = table.insertRow(1);       // Inserting row on top of the last row
    let id = row.insertCell(0);
    let question = row.insertCell(1);
    let category = row.insertCell(2);
    let timestamp = row.insertCell(3);
    id.innerHTML = i;
    question.innerHTML = obj.question;
    category.innerHTML = obj.category;
    timestamp.innerHTML = obj.timestamp;
}

// The function adds the item to the localStorage
function set_to_storage(key, obj){
    localStorage.setItem(key, JSON.stringify(obj));
}

// The function checks is the browser supports localStorage
function check_browser(){
    return ('localStorage' in window && window['localStorage'] !== null)
}


function local_storage(){
    if (check_browser()){
        list_items()
    } else {
        alert('Your browser does not support localStorage')
    }
}

// The function returns the last key in the localStorage
function get_last_key(){
    let length = localStorage.length;
    if (length == 0){
        return 0
    } else {
        return length
    }
}

// The function lists all items from the localStorage
function list_items(){
    let table = document.getElementById('table');
    let list = "<tr><th>Key</th><th>Question</th><th>Category</th><th>Timestamp</th></tr>\n";
    for (let j = localStorage.length-1; j>=0; j--){
        let object = JSON.parse(localStorage.getItem(j));
        list += "<tr><td>" + j + "</td>\n<td>" + object.question + "</td>\n<td>" + object.category + "</td>\n<td>" + object.timestamp + "</td></tr>\n";
    }
    table.innerHTML = list;
}


// The function filters by category
function search(){
    let input = document.getElementById("search");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("table");
    let tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
