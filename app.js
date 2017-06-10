console.log('Starting App');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs')

const notes = require('./note.js');

const argv = yargs
            .command('add', 'Add a new note',{
                title: {
                    describe: 'Title of a note',
                    demand: true,
                    alias: 't'
                },
                body:{
                    describe: 'Body of the note',
                    demand: true,
                    alias: 'b'
                }
            })
            .command('list', 'List all notes')
            .command('read','Read a particular note',{
                title: {
                    describe: 'Title of a note',
                    demand: true,
                    alias: 't'
                } 
            })
            .command('remove','Remove a note',{
                title: {
                    describe: 'Title of a note',
                    demand: true,
                    alias: 't'
                }
            })
            .help()
            .argv;
var command = argv._[0];

if(command === 'add')
{
    var note = notes.addNote(argv.title, argv.body);
    if(note)
    {
        notes.logNote(note);
    }
    else{
        console.log('Note Not Created As Note Title Already Used.');
    }
}
else if(command === 'list')
{
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => notes.logNote(note));
}
else if(command === 'read')
{
    var readNote = notes.getNote(argv.title);
    if(readNote)
    {
        notes.logNote(readNote)
    }
    else{
        console.log('Note Not Found');
    }
}
else if(command === 'remove')
{
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? `Note with Title ${argv.title} Removed.` : 'Note not removed.'
    console.log(message);
}
else
{
    console.log('Command not recognised');
}