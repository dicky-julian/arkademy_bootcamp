var firebaseConfig = {
    apiKey: "AIzaSyAGy9bHxzm-2Lq3LlLInvogcfN4TIvOLkQ",
    authDomain: "arkademy-bootcamp.firebaseapp.com",
    databaseURL: "https://arkademy-bootcamp.firebaseio.com",
    projectId: "arkademy-bootcamp",
    storageBucket: "arkademy-bootcamp.appspot.com",
    messagingSenderId: "976894601386",
    appId: "1:976894601386:web:b1e4b5845155e8f01008d3"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

// DATA

getData = () => {
    const container = document.getElementById("container");
    const loading = document.getElementById("loading");
    
    const category = [];
    const cashier = [];

    db.ref("category").on("value",
        (snapshot) => {
            category.push(snapshot.val());

            db.ref("cashier").on("value",
                (snapshot) => {
                    cashier.push(snapshot.val());
                    container.style.display = "block";
                    loading.style.display = "none";

                    showData(category, cashier);
                })
        })

    return [category, cashier];
}

getData2 = () => {
    let category = [];
    let cashier = [];
    let index = '';

    db.ref("category").on("value",
        (snapshot) => {
            category.push(snapshot.val());

            db.ref("cashier").on("value",
                (snapshot) => {
                    cashier.push(snapshot.val());

                    db.ref("product").on("value",
                    (snapshot) => {
                        if (snapshot.val() == null) {
                            index = 0;
                        } else {
                            index = snapshot.val().length;
                        }
                    })
                })
                
        })

    return [category, cashier, index];
}

showData = (category, cashier) => {
    const container = document.getElementById("table-content");
    const empty = document.getElementsByClassName("show-empty")[0];

    db.ref("product").on("value",
        (snapshot) => {
            if (snapshot.val() == null) {
                empty.style.display = "block";
            } else {
                for (let i = 0; i < snapshot.val().length; i++) {
                    let data = snapshot.val()[i];

                    container.innerHTML += `
                    <tr>
                        <td>${data.id}</td>
                        <td>${cashier[0][data.id_cashier]}</td>
                        <td>${data.name}</td>
                        <td>${category[0][data.id_category]}</td>
                        <td>Rp. ${data.price}</td>
                        <td class="tool">
                            <img src="./assets/images/i_edit.png" alt="" onclick="showModalEdit(${i}, '${data.name}', '${data.price}')">
                            <img src="./assets/images/i_delete.png" alt=""onclick="removeData(${i}, '${data.name}')">
                        </td>
                    </tr>
                    `
                }
            }
        }, (err) => {
            console.log(err);
        }
    );
}

addData = (index) => {
    const category = document.getElementById("input-category").value;
    const cashier = document.getElementById("input-cashier").value;
    const name = document.getElementById("input-name").value;
    const price = document.getElementById("input-price").value;

    if (category == '' || cashier == '' || name == '' || price == '') {
        alert("data tidak boleh kosong");
    } else {
        db.ref("product/" + index).set({
            id: index + 1,
            id_cashier: cashier,
            id_category: category,
            name: name,
            price: price
        })
        location.reload();
    }
}

updateData = (index) => {
    const category = document.getElementById("input-category").value;
    const cashier = document.getElementById("input-cashier").value;
    const name = document.getElementById("input-name").value;
    const price = document.getElementById("input-price").value;

    if (category == '' || cashier == '' || name == '' || price == '') {
        alert("data tidak boleh kosong");
    } else {
        db.ref("product/" + index).update({
            id_cashier: cashier,
            id_category: category,
            name: name,
            price: price
        })
        location.reload();
    }
}

removeData = (index, name) => {
    db.ref("product/" + index).remove();

    showModalDelete(name);
}

// MODAL

showModal = (status) => {

    const modal = document.getElementsByClassName("modal")[0];
    const formStatus = document.getElementById("form-status");

    modal.style.display = "flex";
    formStatus.innerHTML = status;

    if (status == "delete") {
        document.getElementById("bt-close-modal").style.display = "none";
        formStatus.innerHTML = "";
    }
}

closeModal = () => {
    const modal = document.getElementsByClassName("modal")[0];
    const inlineForm = document.getElementById("form-input");

    modal.style.display = "none";
    inlineForm.innerHTML = "";
}

showModalAdd = () => {
    const inlineForm = document.getElementById("form-input");

    const data = getData2();
    const category = data[0][0];
    const cashier = data[1][0];

    showModal("ADD");
    inlineForm.innerHTML = `
        <select id="input-cashier">
        </select>
        <select id="input-category">
        </select>
        <input type="text" placeholder="Name" id="input-name">
        <input type="text" placeholder="Price" id="input-price">
        <button type="button" class="bt-primary" onclick="addData(${data[2]})">ADD</button>
    `

    const inputCategory = document.getElementById("input-category");
    const inputCashier = document.getElementById("input-cashier");

    for (i = 0; i < category.length; i++) {
        inputCategory.innerHTML += `
            <option value="${i}">${category[i]}</option>
        `
    }

    for (i = 0; i < cashier.length; i++) {
        inputCashier.innerHTML += `
            <option value="${i}">${cashier[i]}</option>
        `
    }
}

showModalEdit = (index, name, price) => {
    const inlineForm = document.getElementById("form-input");

    const data = getData2();
    const category = data[0][0];
    const cashier = data[1][0];

    showModal("EDIT");
    inlineForm.innerHTML = `
        <select id="input-cashier">
        </select>
        <select id="input-category">
        </select>
        <input type="text" placeholder="Name" id="input-name" value=${name}>
        <input type="text" placeholder="Price" id="input-price" value=${price}>
        <button type="button" class="bt-primary" onclick="updateData(${index})">EDIT</button>
    `

    const inputCategory = document.getElementById("input-category");
    const inputCashier = document.getElementById("input-cashier");

    for (i = 0; i < category.length; i++) {
        inputCategory.innerHTML += `
            <option value="${i}">${category[i]}</option>
        `
    }

    for (i = 0; i < cashier.length; i++) {
        inputCashier.innerHTML += `
            <option value="${i}">${cashier[i]}</option>
        `
    }
}

showModalDelete = (name) => {
    const inlineForm = document.getElementById("form-input");

    showModal("delete");
    inlineForm.innerHTML = `
    <div style="text-align: center">
        <h3>Data ${name} Berhasil Dihapus</h3>
        <img class="img-success" src="./assets/images/success.png" alt="" style="width: 10em; margin: 3em 0">
        <br>
        <button class="bt-primary" style="float: none" onclick="location.reload()">Kembali</button>
    </div>
    `
}

getData();