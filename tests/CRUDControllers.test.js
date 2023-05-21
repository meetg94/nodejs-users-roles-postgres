const CRUDControllers = require('../controllers/CRUDControllers');

const client = {
    query: jest.fn(),
};

describe('CRUDControllers', () => {
    describe('allItemsController', () => {
        it('should fetch all items from the electronics_items table from db', () => {
            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            client.query.mockImplementation((query, callback) => {
                //Simulate
                const results = { rows: [{ item_id: 1, item_name: 'Television', item_quantity: 5 }] };
                callback(null, results);
            });

            CRUDControllers.allItemsController(client).getAllItems(req, res);

            expect(client.query).toHaveBeenCalledWith('SELECT * FROM electronics_items', expect.any(Function));
            expect(res.json).toHaveBeenCalledWith({ items: [{ item_id: 1, item_name: 'Television', item_quantity: 5 }] });
            expect(res.status).not.toHaveBeenCalledWith();
            // expect(res.status().json).toHaveBeenCalledWith({ message: 'Internal Server Error'});
        });
        it('should handle error while fetching items', () => {
            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            client.query.mockImplementation((query, callback) => {
                // Simulate error during query execution
                const error = new Error('Database error');
                callback(error);
            });

            CRUDControllers.allItemsController(client).getAllItems(req, res);

            expect(client.query).toHaveBeenCalledWith('SELECT * FROM electronics_items', expect.any(Function));
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.status().json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    })
})