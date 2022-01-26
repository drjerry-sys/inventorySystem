let v = 1;
let username;
let to_alert = {};
if (localStorage.products_available) { // this checks if any product is in the localstorage or not
    let collect_from_local = JSON.parse(localStorage.products_available);
    console.log(collect_from_local)
    for (let i in collect_from_local) {
        // console.log(i);
        cus_show.innerHTML += `<tr>
            <td> ${i} </td>
            <td> ${collect_from_local[i].name} </td>
            <td>${collect_from_local[i].price}</td>
            <td id="${'id'+i}">${collect_from_local[i].quantity}</td>
            <td><input type="number" max="${collect_from_local[i].quantity}" onkeyup="typing(${i})" placeholder="qq" id="${'add'+ i}"></td>
            <td><img style="height: 50px;" src="images/${collect_from_local[i].image_path}"></td>
            <td id="${'amt'+i}">0</td>
            </tr>`;
    }    
}
if (localStorage.bought_history == undefined) {
    localStorage.bought_history = JSON.stringify({});
} else if (Object.keys(JSON.parse(localStorage.bought_history)).length > 0) {
    local_history = JSON.parse(localStorage.bought_history);
    v = Object.keys(local_history).length;   
} else {
    localStorage.bought_history = JSON.stringify({});
}

const next = ()=> {
    if (iin.value != '') {
        username = iin.value;
        close1.style.display = 'none';
        nex.style.display = 'block';
        lin.innerHTML = '<b>cart</b>';
    } else {
        alert('Set Shopping Username: this is not used for any operation.')
    }
}

const typing = val=> {
    let save = 0;
    let collect_from_local = JSON.parse(localStorage.products_available);
    let inpt = document.getElementById('add'+val).value;
    let quan = collect_from_local[val].quantity;
    let solved = inpt*collect_from_local[val].price;
    if (parseInt(quan) >= inpt) {
        document.getElementById('amt'+val).innerHTML = solved;
        document.getElementById('id'+val).innerHTML = quan - inpt;
        collect_from_local[val].to_pay = solved;
        collect_from_local[val].no_bought = inpt;
        localStorage.products_available = JSON.stringify(collect_from_local)
        collect_from_local = JSON.parse(localStorage.products_available);
        for (let i in collect_from_local) {
            save += collect_from_local[i].to_pay;
        }
        total_amnt.innerHTML = 'Total: $'+save
    } else if (parseInt(inpt) > parseInt(quan)) {
        document.getElementById('add'+val).value = inpt.slice(0,-1)
        // alert(solved)
        // save -= solved;
        typing(val)
        alert('this is much than we have');
    }
}
const register = ()=> {
    let the_local = JSON.parse(localStorage.products_available);
    for (let i in the_local) {
        if (the_local[i].to_pay < 1) {continue};
        to_alert[v] = the_local[i];
        console.log(to_alert);
        to_alert[v].username = iin.value;
        let prev_quan = the_local[i].quantity - the_local[i].no_bought;
        the_local[i].quantity = prev_quan;
        the_local[i].to_pay = 0;
        v++;
    }
    alert(Object.keys(to_alert).length)
    if (Object.keys(to_alert).length > 0) {
        localStorage.bought_history = JSON.stringify(to_alert);
        localStorage.products_available = JSON.stringify(the_local);
        // console.log(history);
        alert(`Succesfully Purchased!`);
        location.href = 'cart.html';
    } else {
        alert('No product bought. Buy from the list of available option, thank you!');
    }
    save = 0;
}