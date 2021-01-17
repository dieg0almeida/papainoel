const db = require('../../config/db');

module.exports = {
    all(){
        return db.promise().query('SELECT * FROM letters');
    },
    create(letter){
        const query = `INSERT INTO letters 
        (
            name,
            age,
            good_actions,
            gift,
            full_text
        ) VALUES (?, ?, ?, ?, ?)`;
        const values = [
            letter.name,
            letter.age,
            letter.good_actions,
            letter.gift,
            letter.full_text
        ];

        return db.promise().query(query, values);
    },
    findLastInsert() {
        return db.promise().query('SELECT * FROM letters ORDER BY letter_id DESC LIMIT 1');
    },
    findById(letter_id){
        return db.promise().query(`SELECT * FROM letters WHERE letter_id = ${letter_id}`);
    },
    update(letter, letter_id){
        const query = `UPDATE letters SET
        name = ?,
        age = ?,
        good_actions = ?,
        gift = ?,
        full_text = ?
        WHERE
        letter_id = ?`;

        const values = [
            letter.name,
            letter.age,
            letter.good_actions,
            letter.gift,
            letter.full_text,
            letter_id
        ];

        return db.promise().query(query, values);
    },
    destroy(letter_id){
        return db.promise().query(`DELETE FROM letters WHERE letter_id = ${letter_id}`);
    }
}