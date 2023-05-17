const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signInController = (client) => {
    const signInUser = (req, res) => {
        const { username, password } = req.body;

        //Check if username exists in the database
        client.query(
            'SELECT * FROM users WHERE username = $1'
            [username],
            (err, result) => {
                if (err) {
                    console.error('Error signing in:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                if (result.rows.length === 0) {
                    return res.status(401).json({ message: 'Invalid username or password'});
                }

                const user = result.rows[0];

                //Verify the hashed password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.error('')
                    }
                })
            }
        )
    }
}