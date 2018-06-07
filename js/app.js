'use strict'

let notes = getSavedNotes();

const filters = {
  searchText: '',
  sortBy: 'byEdited'
};

renderNotes(notes, filters);

const create = document.getElementById('create-note');
const search = document.getElementById('search-notes');

create.addEventListener('click', function(e){
  const id = uuidv4();
  const timeStamp = moment().valueOf();
  notes.push({
    id: id,
    title: '',
    body: '',
    createdAt: timeStamp,
    updatedAt: timeStamp
  });
  saveNotes(notes);
  // renderNotes(notes, filters);

  location.assign(`/edit.html#${id}`);
});

search.addEventListener('input', function(e){
  // console.log(e.target.value)
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.getElementById('filterby').addEventListener('change', function(e){
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener('storage', function(e){
  if(e.key === 'notes'){
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});