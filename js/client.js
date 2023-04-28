const url = "http://localhost:3000/posts";

function submitClick() {
  const forms = document.getElementsByClassName("formContent");
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (e) {
      let formData = new FormData(forms[i]);
      let data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      e.preventDefault();

      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log(`tudo certo por aqui`);
          }
        })
        .then(backPosts)
        .then(() => {
          location.reload();
        })
        .catch((err) => console.log(`Houve um erro: ${err}`));
    });
  }
}

function submitEditClick() {
  const forms = document.getElementsByClassName("formContent");
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (e) {
      let formData = new FormData(forms[i]);
      let data = {};
      console.log(formData);
      for (let [key, value] of formData.entries()) {
        data[key] = value;
        console.log(data[key]);
      }
      e.preventDefault();

      fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log(res);
          }
        })
        .then(backPosts)
        .then(() => {
          location.reload();
        })
        .catch((err) => console.log(`Houve um erro: ${err}`));
    });
  }
}

function deleteClick(element) {
  let id = element.dataset.id;
  console.log(id);
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((res) => {
      if (res.ok) {
        console.log("apagou com sucesso");
      }
    })
    .then(() => {
      location.reload();
    })
    .catch((err) => console.log(`Houve um erro: ${err}`));
}

function editPost(element) {
  let id = element.dataset.id;
  console.log(id);
  fetch(url + `/${id}`)
    .then((response) => response.json())
    .then((data) => data[0])
    .then((values) => {
      const postForm = document.createElement("div");
      postForm.classList.add("formPost");
      postForm.innerHTML = `<form class="formContent">
      <input type="hidden" name="id" value="${values.id}" >
      <label for="author" class="authorPost">Autor</label><br>
      <input type="text" class="authorPost" placeholder="${values.autor}" maxlength="10" name="autor"><br>
      <label for="text " class="textPost">Sua mensagem</label><br>
      <textarea class="textPost" placeholder="${values.texto}" name="texto" maxlength="120"></textarea><br><br>
      <input type="submit" id="submitButton" value="Enviar" onclick="submitEditClick()">
      </form>`;
      main.appendChild(postForm);
    });
}

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const dataElement = document.getElementsByClassName("posts");
    data.forEach((element) => {
      const postContent = document.createElement("div");
      postContent.classList.add("post_content");
      postContent.innerHTML = `<h3 class="author_post">${element.autor}</h3><p class="post_text">${element.texto}</p><div class="post_buttons">
      <i class="fa-sharp fa-solid fa-trash trash" onclick="deleteClick(this)" data-id="${element.id}"></i>	
      <i class="fa-solid fa-pen-to-square" onclick="showForm('put', this)" data-id="${element.id}"></i>
    </div>`;
      for (let dataElements of dataElement) {
        dataElements.appendChild(postContent.cloneNode(true));
      }
    });
  })
  .catch((err) => console.log(`Caiu no catch: ${err}`));
