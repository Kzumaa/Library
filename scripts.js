const myLibrary = [];

const bookContainer = document.querySelector("#book-container>div");


function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = myLibrary.length;
}

function toHTML (book) {
    return `
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">${book.author}</p>
                <p class="card-text">Pages: ${book.pages}</p>
                <p class="card-text status">Status: ${book.read? "Read" : "Not read"}</p>
                <div class="row row-cols-2">
                    <div class="col-5">
                        <button class="btn btn-danger remove">Remove</button>
                    </div>
                    <div class="col-7">
                        <button class="btn btn-success text-nowrap change">Change status</button>
                    </div>
                </div>
            </div>
    `;
}

function addToLibrary (book) {
    myLibrary.push(book);
}


function generateCard (book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");
    bookCard.classList.add("col");
    bookCard.setAttribute("id",book.id);
    bookCard.innerHTML = toHTML(book);
    return bookCard;    
}

function resetContainer() {
    bookContainer.innerHTML = ``;
    myLibrary.forEach(book => {
        bookContainer.appendChild(generateCard(book));
    });
    addRmListenner();
}




//          Get input from form

const addBtn = document.querySelector("#addBookBtn");
const cancelBtn = document.querySelector("#cancelAddBookBtn");
const addBookForm = document.querySelector(".modal-body>form");

const titleInput = document.querySelector("#bookTitleInput");
const authorInput = document.querySelector("#authorInput");
const pagesInput = document.querySelector("#pagesInput");
const statusInput = document.querySelector("#haveRead");


const inputValidate = ()=>{
    if (!titleInput.value || !authorInput.value || !pagesInput.value) {
        addBtn.setAttribute('disabled', 'disabled');
    } else {
        addBtn.removeAttribute('disabled');   
    }
};

titleInput.addEventListener('input', inputValidate);
authorInput.addEventListener('input', inputValidate);
pagesInput.addEventListener('input', inputValidate);



addBtn.addEventListener("click", ()=> {
    const book = new Book(titleInput.value, authorInput.value, pagesInput.value, statusInput.value);
    bookContainer.appendChild(generateCard(book));
    addBookForm.reset();
    addRmListenner();
});

cancelBtn.addEventListener("click", ()=>{addBookForm.reset();})


//  Make the button on each Card work 



function getCardId(element) {
    return element.parentNode.parentNode.parentNode.parentNode.id;
}

function addRmListenner() {
    const rmBtn = document.querySelectorAll(".remove");
    const changeStautusBtn = document.querySelectorAll(".change");

    rmBtn.forEach(btn => {
        btn.addEventListener("click", (e)=>{
            const parentId = getCardId(btn);
            myLibrary.slice(parentId,1);
            document.getElementById(`${parentId}`).parentNode.removeChild(document.getElementById(`${parentId}`));
        }
        )
    });

    changeStautusBtn.forEach(btn => {
        btn.addEventListener("click", (e)=>{
            const parentId = getCardId(btn);
            myLibrary[parentId].read = !myLibrary[parentId].read;
            document.getElementById(`${parentId}`).querySelector(".status").textContent = `Status: ${myLibrary[parentId].read? "Read" : "Not read"}`;
        }
        )
    });
}


//  Initialize some books

const book1 = new Book('All That’s Left in the World', 'Erik J. Brown', 345, true);
const book2 = new Book('The Only Light Left Burning', 'Erik J. Brown', 415, false);
addToLibrary(book1);
addToLibrary(book2);


resetContainer();