// handler.js : Memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes.
const { nanoid } = require('nanoid');
const notes = require('./notes');

// Fungsi untuk membuat/menambah catatan
const addNoteHandler = (request, h) => {
    // Menyimpan data catatan(title, tags, body)
    const { title, tags, body } = request.payload; // request.payloads : Untuk mendapatkan body-Request

    // nanoid() : library ke-3 untuk menghasilkan nilai properti 'id'
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    // Memasukan nilai properti(title, tags, body, dll) ke dalam Array notes
    const newNote = {
        title, tags, body, id, createdAt, updateAt,
    };
    notes.push(newNote);

    // Mengetahui keberhasilan input 'newNote' ke Array 'notes'
    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    if (isSuccess) {
        // nilai properti Array 'note' yang akan dimasukan jika benar.
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    // nilai properti Array 'note' yang akan dimasukan jika salah.
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

// Fungsi mendapatkan dan menampilkan catatan yang tersimpan pada Array notes
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

// Funsi mendapatkan data berdasarkan id yang tersimpan pada Array notes
const getNoteByIdHandler = (request, h) => {
    // Mendapatkan nilai id dari hasil 'request.params'
    const { id } = request.params;

    // Mencari data berdasarkan id yang sesuai pada Array notes
    const note = notes.filter((i) => i.id === id)[0];
    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

// Fungsi untuk mengubah nilai dan properti catatan yang terdapat pada Objek notes berdasarkan id yang ditetukan
const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updateAt = new Date().toISOString();

    // Mendapatkan index sesuai id yang ditentukan pada Array objek catatan dengan method Array findIndex()
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: `Gagal memperbarui catatan, ID: ${id} tidak ditemukan`,
    });
    response.code(404);
    return response;
};

// Fungsi untuk menghapus catatan yang terdapat pada Objek notes berdasarkan id yang ditetukan
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus, Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

// Menggunakan Object-Literals karena mengekspor lebih dari 1 nilai
module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
};