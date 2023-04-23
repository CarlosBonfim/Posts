const url = "http://localhost:3000/posts";

function submitClick(){
    const forms = document.getElementsByClassName('formContent')
    for(let i=0; i < forms.length; i++){
        forms[i].addEventListener('submit', function(e) {
            let formData = new FormData(forms[i]);
            let data = {};
            for(let [key, value] of formData.entries()){
                data[key] = value;
            }
            e.preventDefault()
            
            fetch(url,{
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                if(res.ok){
                    console.log(`tudo certo por aqui`);
                }
            }).then(backPosts)
            .catch(err => console.log(`Houve um erro: ${err}`))
        })
    }
}

fetch(url)
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