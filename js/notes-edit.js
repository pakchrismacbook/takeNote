'use strict'
const titleElement = document.getElementById('note-title');
const bodyElement = document.getElementById('note-body');
const removeNoteEl = document.getElementById('remove-note');
const lastEditedDate = document.getElementById('last-edited');

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(function(note){
  return note.id === noteId;
});
// if(note === undefined) location.assign('/index.html');
if(!note) location.assign('/index.html');

titleElement.value = note.title;
bodyElement.value = note.body;
lastEditedDate.textContent = generateLastEdited(note.updatedAt);

titleElement.addEventListener('input', function(e){
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  lastEditedDate.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});
bodyElement.addEventListener('input', function(e){
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  lastEditedDate.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});
removeNoteEl.addEventListener('click', function(e){
  removeNote(note.id);
  saveNotes(notes);
  location.assign('/index.html');
});

window.addEventListener('storage', function(e){
  if(e.key === 'notes'){
    notes = JSON.parse(e.newValue);
    let note = notes.find(function(note){
      return note.id === noteId;
    });
    if(note === undefined) location.assign('/index.html');
    titleElement.value = note.title;
    bodyElement.value = note.body;
    lastEditedDate.textContent = generateLastEdited(note.updatedAt);
  }
});
