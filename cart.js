let collect_from_local = JSON.parse(localStorage.bought_history);
let sn = Object.keys(collect_from_local).length;
console.log(collect_from_local)
let used;
const print_receipt = (val)=> {
    alert(val)
    used = val;
    to_hide.style.display = 'none';
    formDiv.style.display = 'block';
}
const print_it = ()=> {
    collect_from_local = JSON.parse(localStorage.bought_history);
    formDiv.style.display = 'none';
        receiptTable.style.display = 'table';
        nname.innerHTML += '\t' + fulname.value;
        ptel.innerHTML += '\t' + phone.value;
        ress.innerHTML += '\t' + addr.value;
        dbut.innerHTML += Date();
        pbut.innerHTML += collect_from_local[used].name;
        qbut.innerHTML += collect_from_local[used].no_bought;
        paid.innerHTML += collect_from_local[used].no_bought * collect_from_local[used].price;
        print()
}
for (let i in collect_from_local) {
    cart_show.innerHTML += `<tr>
        <td>${sn}</td>
        <td>${collect_from_local[i].username}</td>
        <td>${collect_from_local[i].name}</td>
        <td id="${'id'+i}">${collect_from_local[i].no_bought}</td>
        <td id="${'ad'+i}">${collect_from_local[i].no_bought * collect_from_local[i].price}</td>
        <td><button class="btn btn-success" onclick="print_receipt(${i})">Print Receipt</button></td>
    </tr>`;
    sn++;
}