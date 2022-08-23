let postsArray = []
const form = document.getElementById("form")

function renderPosts(){
    document.getElementById("blog-list").innerHTML = postsArray.map(element =>
        `
            <div class="post">
                <h3>${element.title}</h3>
                <p>${element.body}</p>
            </div>
        `
    ).reverse().join("")
    
    form.reset()
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
    })
   
    
form.addEventListener("submit", event => {
    event.preventDefault() 
    
    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify({
            title: document.getElementById("form-title").value,
            body: document.getElementById("form-post").value
        })
    })
        .then(res => res.json())
        .then(data => {
            postsArray.push({
                userId: 1,
                id: postsArray.length + 1,
                title: data.title,
                body: data.body
            })
            
            renderPosts()
        })
})