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
    });

    describe('createItemsController', () => {
        it('should create a new item', () => {
            const req = {
                body: {
                    item_name: 'Television',
                    item_quantity: 5,
                },
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            client.query.mockImplementation((query, values, callback) => {
                //Simulating successful item creation
                callback(null);
            });

            CRUDControllers.createItemsController(client).createItem(req, res);

            expect(client.query).toHaveBeenCalledWith(
                'INSERT INTO electronics_items (item_name, item_quantity) VALUES ($1, $2)',
                ['Television', 5],
                expect.any(Function)
            );
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.status().json).toHaveBeenCalledWith({ message: 'Item created!' });
        });

        it('should handle error while creating item', () => {
            const req = {
                body: {
                    item_name: 'Television',
                    item_quantity: 5,
                },
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            client.query.mockImplementation((query, values, callback) => {
                //Simulate error during item creation
                const error = new Error('Database error');
                callback(error);
            });

            CRUDControllers.createItemsController(client).createItem(req, res);

            expect(client.query).toHaveBeenCalledWith(
                'INSERT INTO electronics_items (item_name, item_quantity) VALUES ($1, $2)',
                ['Television', 5],
                expect.any(Function)
            );
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error'})
        });
    });
});