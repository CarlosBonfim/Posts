const url = "http://localhost:3000/posts";
const requestMethod = {
    method: 'GET' // nao precisa nesse caso
}
fetch(url, requestMethod)
    .then((response) => response.json())
    .then((data) => {
        const dataElement = document.getElementsByClassName("posts");
        data.forEach((element) => {
            const postContent = document.createElement("div");
            postContent.classList.add("post_content");
            postContent.innerHTML = `<h3 class="author_post">${element.autor}</h3><p class="post_text">${element.texto}</p>`;
            for (let dataElements of dataElement) {
                dataElements.appendChild(postContent.cloneNode(true));
            }
        });
    })
    .catch((err) => console.log(`Caiu no catch: ${err}`));
