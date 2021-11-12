const util = require('util');
const fs = require('fs');

// This package will be used to generate our unique ids. https://www.npmjs.com/package/uuid
const {v1: uuidv1} = require('uuid');

const readFileAsync =  util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
 
    read() {
        return readFileAsync('db/db.json', 'utf-8');
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    getNote(){
        return this.read().then((note) => {
            let noteData = JSON.parse(note);
            return noteData;
        });    
    }

    addNote(note){
        
        const {title, text} = note
        const newNote = {title, text, id: uuidv1() };
        
        return this.getNote()
        .then((notes)=> [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
        // return  this.write().then((newNote) => {
            

        // });
    };
}

module.exports = new Store();