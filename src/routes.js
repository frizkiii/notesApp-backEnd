// routes.js : Memuat kode konfigurasi routing server seperti menentukan path, method, handler yang digunakan.

const {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
} = require('./handler');

const routes = [
    {
    // Path 'POST' mengirim data, route menyimpan catatan dan akan menjalankan event-Handler 'addNoteHandler'
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    // Path 'GET' mendapatkan data, route menampilkan catatan dengan menjalankan event-Handler 'getAllNotesHandler'
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    // Path 'GET' mendapatkan data berdasarkan 'id' yang berada di akhir 'path'
    // Route akan menampilkan data yang di dapatkan dengan menjalankan event-Handler 'getNoteByIdHandler'
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    // Path 'PUT' mengirim permintaan ke route dan membawa objek catatan terbaru pada body request.
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/note/{id}',
        handler: deleteNoteByIdHandler,
    },
];

module.exports = routes;