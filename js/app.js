console.log('hey guys! Welcome to notes app');
shownotes();
//if ab user adds a note, then add it to a local storage.

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e){
    let addtitle = document.getElementById('addtitle');
    let addtext = document.getElementById('addtext');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {

        notesobj = JSON.parse(notes);
    } 
    let myobj = {
        title: addtitle.value,
        text: addtext.value,
    }
    notesobj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtext.value = "";
    addtitle.value = "";
    // console.log(notesobj);
    shownotes();
})
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="notecard my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id = "${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
        </div>
      </div> `;
    });
    let noteElm = document.getElementById('notes');
    if (notesobj.length != 0) {
        noteElm.innerHTML = html;
    }
    else {
        noteElm.innerHTML = `Nothing to show! use "Add a note" section above to add note.`;
    }
}
//function to delete a note.
function deleteNote(index) {
    // console.log("it is deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);     //splice fun. is used to insert or remove values.
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();
}
let search = document.getElementById('searchtext');
search.addEventListener("input", function () {
    let inputval = search.value.toLowerCase();
    // console.log("input event fired", inputval);
    let notecards = document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})


