const fs = require('fs');

var originalNote = {
    title: "Secrets",
    body: "My Secrets Are Under My Dick"
};

var orginalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', orginalNoteString);

var noteString = fs.readFileSync('notes.json');

console.log(typeof noteString);

var note = JSON.parse(noteString);

console.log(note.title);