const url = "http://localhost:3000/posts";

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const dataElement = document.getElementsByClassName("posts");
        data.forEach((element) => {
            
            const authorElement = document.createElement("div");
            authorElement.classList.add("author_post");
            authorElement.textContent = `${element.autor}`;

            const textoElement = document.createElement("div");
            textoElement.classList.add("post_text");
            textoElement.textContent = `${element.texto}`;

            for (let dataElements of dataElement) {

                dataElements.appendChild(authorElement.cloneNode(true));
                dataElements.appendChild(textoElement.cloneNode(true));
            }
        });
    })
    .catch((err) => console.log(`Caiu no catch: ${err}`));
