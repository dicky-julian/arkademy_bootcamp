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

    showModal("ADD");
    inlineForm.innerHTML = `
        <select id="input-cashier">
            <option>Pevita Pearce</option>
            <option>Raisa Andriana</option>
            <option>Dicky Julian</option>
        </select>
        <select id="input-category">
            <option>Food</option>
            <option>Drink</option>
        </select>
        <input type="text" placeholder="Name" id="input-name">
        <input type="text" placeholder="Price" id="input-price">
        <button type="button" class="bt-primary">ADD</button>
    `
}

showModalEdit = () => {
    const inlineForm = document.getElementById("form-input");

    showModal("EDIT");
    inlineForm.innerHTML = `
        <select id="input-cashier">
            <option>Pevita Pearce</option>
            <option>Raisa Andriana</option>
            <option>Dicky Julian</option>
        </select>
        <select id="input-category">
            <option>Food</option>
            <option>Drink</option>
        </select>
        <input type="text" placeholder="Name" id="input-name" value="Soda Gembira">
        <input type="text" placeholder="Price" id="input-price" value="20000">
        <button type="button" class="bt-primary">EDIT</button>
    `
}

showModalDelete = () => {
    const inlineForm = document.getElementById("form-input");

    showModal("delete");
    inlineForm.innerHTML = `
    <div style="text-align: center">
        <h3>Data Soda Gembira Berhasil Dihapus</h3>
        <img class="img-success" src="./assets/images/success.png" alt="" style="width: 10em; margin: 3em 0">
        <br>
        <button class="bt-primary" style="float: none" onclick="location.reload()">Kembali</button>
    </div>
    `
}