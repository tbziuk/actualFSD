const Form = require('../models/FormModel');

module.exports = {
    index: async (req, res) => {
        const signups = await Form.find().lean()
            .catch(() => res.json({ error: `Get sign ups error` }))
        res.json(signups);
    },
    signup: async (req, res) => {
        const signup = new Form({
            name: req.body.name,
            course: req.body.course,
            city: req.body.city
        });
        await signup.save();
        try {
            res.json(signup);
        } catch (error) {
            res.json({ error: "Sign up error" });
        }
    },
    delete: async (req, res) => {
        const signup = await Form.findByIdAndDelete(req.params.id).lean();
        if (!signup) {
            return res.status(404).json({ error: `Signup's not found` });
        } res.json(signup);
    }
}