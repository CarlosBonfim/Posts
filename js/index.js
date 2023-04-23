const newPostButton = document.getElementsByClassName("newPostButton");
const main = document.getElementsByClassName("main")[0];
const content = document.getElementsByClassName("content")[0];
const arrowBack = document.getElementById("backToMain");
// let formIstrue = false;
function showForm() {
    content.style.display = "none";
    renderPostForm();
    arrowBack.style.display = "block";
}

function renderPostForm() {
    const postForm = document.createElement("div");
    postForm.classList.add("formPost");
    // postForm.innerHTML = `<iframe src="pages/form.html"></iframe>`
    postForm.innerHTML = `<form class="formContent">
    <label for="author" class="authorPost">Autor</label><br>
    <input type="text" class="authorPost" name="autor"><br>
    <label for="text " class="textPost">Sua mensagem</label><br>
    <textarea class="textPost"  name="texto"></textarea><br><br>
    <input type="submit" id="submitButton" value="Enviar" onclick="submitClick()">
    </form>`;
    main.appendChild(postForm);
}

function backPosts() {
    const postForm = document.getElementsByClassName("formPost")[0];
    postForm.parentNode.removeChild(postForm)
    content.style.display = "block";
    arrowBack.style.display = "none";
}