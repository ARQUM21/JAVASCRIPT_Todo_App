var home_container = document.getElementById("home_container");
var note = document.getElementById("note");

function submitNote() {
  var timeupdate = new Date().toLocaleString();

  var obj = {
    note: note.value,
    time: timeupdate
  };

  saveValueToLocalStorage(obj);
  note.value = "";
}

function saveValueToLocalStorage(obj) {
  var notes = localStorage.getItem("notes");
  console.log("notes from local storage=>", notes);

  if (notes) {
    notes = JSON.parse(notes);
    notes.push(obj);
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  } else {
    notes = [obj];
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  displayUserNotes();
}

function displayUserNotes() {
  var notes = localStorage.getItem("notes");
  var list = document.getElementById("list");

  if (notes) {
    list.innerHTML = "";
    notes = JSON.parse(notes);
    console.log(notes);

    notes.forEach(function (data, ind) {
      console.log("data=>", data);

      var liElement =
        ` <li class="note-box">
            <div class="note-content">
              <p class="note-text">${data.note}</p>
            </div>
            <div class="button-group">
                <p class="note-time">${data.time}</p>
                <div class="btn-group">
                <button onclick="editNote(${ind})" class="btn-edit">Edit</button>
                <button onclick="deleteNote(${ind})" class="btn-delete">Delete</button>
                </div> 
                </div>
        </li>`;

      list.innerHTML += liElement;
    });
  }
}

function editNote(index) {
  var notes = JSON.parse(localStorage.getItem("notes"));
  var currentNote = notes[index];
  var newNoteText = prompt("Edit note:", currentNote.note);

  if (newNoteText !== null) {
    notes[index].note = newNoteText;
    currentNote.time = new Date().toLocaleString();
    localStorage.setItem("notes", JSON.stringify(notes));
    displayUserNotes();
  }
}

function deleteNote(index) {
  var notes = JSON.parse(localStorage.getItem("notes"));
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayUserNotes();
}

// Initial call to display notes
displayUserNotes();