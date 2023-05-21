const allItemsController = (client) => {
    const getAllItems = (req, res) => {
        //Fetch all items from the database
        client.query('SELECT * FROM electronics_items', (err, results) => {
            if (err) {
                console.error('Error fetching items:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            const items = results.rows;
            res.json({ items });
        });
    };
    return { getAllItems };
};

module.exports = allItemsController;