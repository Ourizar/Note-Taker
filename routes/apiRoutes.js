const router = require('express').Router();
const store =  require('../db/store.js')

router.get('/notes', (req, res) => {
    store.getNote().then((myNote) => {
        return res.json(myNote);
    });
    
});

router.post('/notes', (req, res) => {
    store.addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

router.delete('/notes/:id', (req, res) => {

});

module.exports = router;