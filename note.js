console.log('Starting Notes.js');

const fs = require('fs');

var fetchNote = () => {
    try
    {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    }
    catch(e)
    {
        return [];
    }
}

var writeNote = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = [];
    var note = {
        title,
        body
    }
    /*Reading The File Contents into a variabe then parsing the object. Adding a new note and then re writing back
    to file. This will not erase the contents of the file everytime a new note is written*/
    notes = fetchNote();

    //DuplicateNote will have the array of all the notes whose title matches with the title of note we are adding.
    var duplicateNote = notes.filter((note) => note.title === title); /*ES6 allows to return value directly using arrow function
    we can use { return note.title === title } in place of above*/

    if(duplicateNote.length === 0)
    {
        notes.push(note);
        writeNote(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNote();
};

var getNote = (title) => {
    var notes = fetchNote();
    var noteSearched = notes.filter((notes) => notes.title === title);
    return noteSearched[0];
};

var removeNote = (title) => {
    var notes = fetchNote();
    //Logic Used. Filter All Notes Where Title Doesn't Match And Re Write to the file.
    var noteNotMatched = notes.filter((notes) => notes.title !== title);
    writeNote(noteNotMatched);
    //We have original Notes file and filtered notes object. If lenght not same then note is removed
    return notes.length !== noteNotMatched.length;
}

var logNote = (note) => {
    console.log('Note:');
    console.log('Title:',note.title);
    console.log('Body:',note.body);
}

module.exports = {
    addNote,        //ES6 allows to weave off the value and colon if both val and attribute same. addNote: addNote
    getAll,
    getNote,
    removeNote,
    logNote          
};