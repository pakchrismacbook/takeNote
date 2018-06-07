'use strict'
// check for existing notes in local storage
const getSavedNotes = function(){
  const notesJSON = localStorage.getItem('notes');
  try{
    return notesJSON !== null ? JSON.parse(notesJSON) : [];
  } catch(e){
    return [];
  }

};

const generateNoteDOM = function(note){
  const noteEl = document.createElement('div');
  const textEl = document.createElement('a');
  const button = document.createElement('button');

  button.textContent = 'x';
  noteEl.appendChild(button);
  button.addEventListener('click', function(){
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes,filters);
  });

  if(note.title.length > 0) textEl.textContent = note.title;
  else textEl.textContent = 'Untitled note';

  textEl.setAttribute('href', `/edit.html#${note.id}`);
  noteEl.appendChild(textEl);

  return noteEl;
};

const renderNotes = function(notes, filter){
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(function(note){
    return note.title.toLowerCase().includes(filters.searchText.toLocaleLowerCase());
  });
  document.querySelector('#notes').innerHTML = '';

  filteredNotes.forEach(function(note){
    const noteEl = generateNoteDOM(note);
    document.querySelector('#notes').appendChild(noteEl);
  });
};

const sortNotes = function(notes, sortBy){
  if(sortBy === 'byEdited') return notes.sort(function(a,b){
    if(a.updatedAt > b.updatedAt) return -1;
    else if(a.updatedAt < b.updatedAt) return 1;
    else return 0;
  });
  else if(sortBy === 'byCreated') return notes.sort(function(a,b){
    if(a.createdAt > b.createdAt) return -1;
    else if(a.createdAt < b.createdAt) return 1;
    else return 0;
  });
  else if(sortBy === 'alphabetical') return notes.sort(function(a,b){
    if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
    else if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
    else return 0;
  });
  else return notes;
};

const saveNotes = function(notes){
  localStorage.setItem('notes', JSON.stringify(notes));
};

const removeNote = function(id){
  const noteIndex = notes.findIndex(function(note){
    return note.id === id;
  });
  if(noteIndex > -1) notes.splice(noteIndex,1);
};

const generateLastEdited = function(timestamp){
  return `Last edited: ${moment(timestamp.updatedAt).fromNow()}`;
};
