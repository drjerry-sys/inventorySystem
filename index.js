let product_prop = {};
let from_local = localStorage.products_available;
let v = 0; // this assigns a unique value for each product if none is present in the localstorage
let exists = false;
// the ff block checks for whether their are product stored in the localstorage already

if (from_local == undefined) {
    localStorage.products_available = JSON.stringify({});
} else if (Object.keys(JSON.parse(from_local)).length > 0) {
    v = Object.keys(JSON.parse(from_local)).length;
    // this tells the unique value of the last product
} else {
    localStorage.products_available = JSON.stringify({});
}

const register = ()=> {
    product_form.style.display = 'inline';
    reg_div.style.display = 'none';
}

const add_product = ()=> {
    from_local = JSON.parse(localStorage.products_available);
    let pro_name = pname.value;
    let slash_ind = pimage.value.lastIndexOf('\\')+1;
    for (let i in from_local) {
        if (from_local[i].name == pro_name) { // this part checks whether a particular product already exists i the localstorage or not
            exists = true;
        }
    }

    if ((exists == false) && (pro_name != '') && (pprice.value != '') && (pquan.value != '') && (pimage.value != '')) {
        v ++;
        from_local[v] = {name:pro_name, price : pprice.value, quantity : pquan.value, image_path : pimage.value.slice(slash_ind,), to_pay : 0};
        localStorage.products_available = JSON.stringify(from_local);
        pprice.value = '', pquan.value = '', pname.value = '', pimage.value = '';
        alert('Added Successfully!');
    } else if ((pro_name == '') || (pprice.value == '') || (pquan.value == '') || (pimage.value == '')) {
        alert('All field must be filled!')
    } else if (exists == true) {
        alert('this product already exists');
    }
}