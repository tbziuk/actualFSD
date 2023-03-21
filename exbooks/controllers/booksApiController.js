const Book = require('../models/BookModel');

module.exports = {
    index: async (req, res) => {
        const books = await Book.find().lean()
            .catch(() => res.json({ error: `Get books error` }))
        res.json(books);
    },
    oneBook: async (req, res) => {
        const book = await Book.findById(req.params.id).lean();
        if (!book) {
            return res.status(404).json({ error: `Book's not found` });
        } res.json(book);
    },
    add: async (req, res) => {
        const newBook = new Book({
            author: req.body.author,
            title: req.body.title,
            read: req.body.read
        });
        await newBook.save();
        try {
            res.json(newBook);
        } catch (error) {
            res.json({ error: "Add book error" });
        }
    },
    update: async (req, res) => {
        const book = await Book.findByIdAndUpdate(req.params.id, {
            author: req.body.author,
            title: req.body.title,
            read: req.body.read
        }, { new: true }).lean();
        if (!book) {
            return res.status(404).json({ error: `Book's not found` });
        } res.json(book);
    },
    delete: async (req, res) => {
        const book = await Book.findByIdAndDelete(req.params.id).lean();
        if (!book) {
            return res.status(404).json({ error: `Book's not found` });
        } res.json(book);
    },
    read: async (req, res) => {
        const books = await Book.find({ read: true }).lean()
            .catch(() => res.json({ error: `Get books error` }))
        res.json(books);
    },
    unread: async (req, res) => {
        const books = await Book.find({ read: false }).lean()
            .catch(() => res.json({ error: `Get books error` }));
        res.json(books);
    },
}