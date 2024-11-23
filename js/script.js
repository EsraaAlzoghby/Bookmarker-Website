var inputNameBookmarker = document.getElementById("InputName")
var inputLinkBookmarker = document.getElementById("InputLink")
var addButton = document.getElementById("addButtonOne")
var updateButton = document.getElementById("updateButton")
var mainIndex = 0 
BookmarkerList = []
if(localStorage.getItem("bookmarkerSave") != null){
   BookmarkerList = JSON.parse(localStorage.getItem("bookmarkerSave"))
   displayBookmarker()
}
function addBookmarker(){
    var book = {
        name : inputNameBookmarker.value,
        link : inputLinkBookmarker.value 
    };
    if (!isValidName(book.name)) {
        alert("Please enter a valid name (at least 3 characters and no special symbols).");
        return; 
    }
    if (!isValidURL(book.link)) {
        alert("Please enter a valid URL.");
        return;
    }
    BookmarkerList.push(book)
    localStorage.setItem("bookmarkerSave" , JSON.stringify(BookmarkerList))
    clearBookmarker()
    displayBookmarker()
}
function isValidName(name) {
    var pattern = /^[a-zA-Z0-9\s]{3,}$/; 
    return pattern.test(name);
}
function isValidURL(url) {
    var pattern = /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,}(:\d+)?(\/.*)?$/i;
    return pattern.test(url);
}

function clearBookmarker(){
    inputNameBookmarker.value = null
    inputLinkBookmarker.value = null
}

function displayBookmarker(){
   var Content = ""
for ( var i = 0 ; i < BookmarkerList.length ; i++){
    Content +=
    `<tr>
    <th>${i+1}</th>
    <td>${BookmarkerList[i].name}</td>
    <td><button type="button" class="btn w-50 button-table text-center" onclick = "visitBookmarker(${i})"><i class="fa-regular fa-eye pe-2"></i>Visit</button></td>
    <td><button type="button" class="btn w-50 button-table" onclick = "setUpdateBookmarker(${i})"><i class="fa-solid fa-square-pen pe-2"></i>Update</button></td>
    <td><button type="button" class="btn w-50 button-table" onclick = "deleteBookmarker(${i})"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
  </tr>`
}
document.getElementById("partTable").innerHTML = Content
}
function deleteBookmarker(index){
BookmarkerList.splice( index ,1 ) 
localStorage.setItem("bookmarkerSave" , JSON.stringify(BookmarkerList))
displayBookmarker()  
}
function visitBookmarker(visitIndex) {
    var httpRegEx = /^https?:\/\//;
    if (httpRegEx.test(BookmarkerList[visitIndex].link)) {
      window.open(BookmarkerList[visitIndex].link);
    } else {
      window.open(`https://${BookmarkerList[visitIndex].link}`);
    }
  }
function setUpdateBookmarker(UpdateIndex){
    mainIndex = UpdateIndex
    addButton.classList.add("d-none")
    updateButton.classList.remove("d-none")
    inputNameBookmarker.value = BookmarkerList[UpdateIndex].name
    inputLinkBookmarker.value = BookmarkerList[UpdateIndex].link
}
function updateBookmarker(){
    var book = {
        name : inputNameBookmarker.value,
        link : inputLinkBookmarker.value 
    };
    if (!isValidName(book.name)) {
        alert("Please enter a valid name (at least 3 characters and no special symbols).");
        return; 
    }
    if (!isValidURL(book.link)) {
        alert("Please enter a valid URL.");
        return;
    }
    BookmarkerList.splice( mainIndex, 1 , book)
    localStorage.setItem("bookmarkerSave" , JSON.stringify(BookmarkerList))
    clearBookmarker()
    displayBookmarker()
    addButton.classList.remove("d-none")
    updateButton.classList.add("d-none")
}