const Letter = require('../models/Letter');

module.exports = {
    async index(req, res) {
        const results = await Letter.all();

        return res.json({ letters: results[0] });
    },
    async show(req, res) {
        const results = await Letter.findById(req.params.id);
        if (results[0].length === 0) {
            return res.json({
                "success": false,
                "errors": [
                    "Letter not found!"
                ]
            });
        }

        const letter = results[0][0];
        return res.json({ letter });
    },
    async post(req, res) {
        const keys = Object.keys(req.body);
        if(!keys.includes('name') || !keys.includes('age') || !keys.includes('good_actions') || !keys.includes('gift')){
            return res.json({
                "success": false,
                "errors": [
                    "Please check the params names!"
                ]
            });
        }

        for (key of keys) {
            if (req.body[key] == "") {
                return res.json({
                    "success": false,
                    "errors": [
                        "Fill in all fields!"
                    ]
                });
            }
        }

        const full_text = `Meu nome é ${req.body.name} e tenho ${req.body.age}. Este ano eu fui uma criança super boazinha e muito comportada (bom, quase sempre...). Olha só uma coisa muito legal que eu já fiz: ${req.body.good_actions}. Por isso eu gostaria de ganhar neste natal: ${req.body.gift}. Muito Obrigado! Prometo que vou continuar me esforçando para ser uma boa criança! Com carinho: ${req.body.name}.`;
        req.body = {
            ...req.body,
            full_text
        }
        await Letter.create(req.body);

        const results = await Letter.findLastInsert();

        const { letter_id } = results[0][0];
        return res.redirect(`/letters/${letter_id}`);
    },
    async put(req, res) {
        const results = await Letter.findById(req.params.id);
        if (results[0].length === 0) {
            return res.json({
                "success": false,
                "errors": [
                    "Letter not found!"
                ]
            });
        }

        const keys = Object.keys(req.body);
        if(!keys.includes('name') || !keys.includes('age') || !keys.includes('good_actions') || !keys.includes('gift')){
            return res.json({
                "success": false,
                "errors": [
                    "Please check the params names!"
                ]
            });
        }

        for (key of keys) {
            if (req.body[key] == "") {
                return res.json({
                    "success": false,
                    "errors": [
                        "Fill in all fields!"
                    ]
                });
            }
        }

        const full_text = `Meu nome é ${req.body.name} e tenho ${req.body.age}. Este ano eu fui uma criança super boazinha e muito comportada (bom, quase sempre...). Olha só uma coisa muito legal que eu já fiz: ${req.body.good_actions}. Por isso eu gostaria de ganhar neste natal: ${req.body.gift}. Muito Obrigado! Prometo que vou continuar me esforçando para ser uma boa criança! Com carinho: ${req.body.name}.`;
        req.body = {
            ...req.body,
            full_text
        }

        const letter_id = req.params.id;
        await Letter.update(req.body, letter_id);

        return res.json({ response: `Letter ${letter_id} updated!` });
    },
    async delete(req, res) {
        const results = await Letter.findById(req.params.id);
        if (results[0].length === 0) {
            return res.json({
                "success": false,
                "errors": [
                    "Letter not found!"
                ]
            });
        }
        await Letter.destroy(req.params.id);

        return res.json({ response: "Letter deleted!" });
    }
}