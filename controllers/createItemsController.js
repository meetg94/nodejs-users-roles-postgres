const createItemsController = (client) => {
    const createItem = (req, res) => {

        //Extract item details from the request body
        const { item_name, item_quantity } = req.body;

        client.query(
            'INSERT INTO electronics_items (item_name, item_quantity) VALUES ($1, $2)',
            [item_name, item_quantity],
            (err) => {
                if (err) {
                    console.error('Error creating item:', err)
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                res.status(201).json({ message: 'Item created!' });
            });
        };
        return { createItem };
};

module.exports = createItemsController;