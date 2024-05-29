"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 8080;
app.use(body_parser_1.default.json());
const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com' },
    { id: 3, name: 'Carol White', email: 'carol.white@example.com' },
    { id: 4, name: 'David Brown', email: 'david.brown@example.com' },
    { id: 5, name: 'Eve Davis', email: 'eve.davis@example.com' },
    { id: 6, name: 'Frank Wilson', email: 'frank.wilson@example.com' },
    { id: 7, name: 'Grace Lee', email: 'grace.lee@example.com' },
    { id: 8, name: 'Henry Kim', email: 'henry.kim@example.com' },
    { id: 9, name: 'Isabella Moore', email: 'isabella.moore@example.com' },
    { id: 10, name: 'Jack Taylor', email: 'jack.taylor@example.com' },
];
let nextUserId = 11;
app.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        message: 'Success',
    });
});
app.get('/users', (req, res) => {
    res.send({
        statusCode: 200,
        data: users,
    });
});
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find((user) => user.id === +userId);
    const statusCode = user ? 200 : 404;
    res.send({
        statusCode,
        data: user,
    });
});
app.post('/users', (req, res) => {
    const newUser = Object.assign({ id: nextUserId++ }, req.body);
    users.push(newUser);
    res.send({
        statusCode: 201,
        data: newUser,
    });
});
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex((u) => u.id === +userId);
    if (userIndex > -1) {
        users[userIndex] = Object.assign(Object.assign({}, users[userIndex]), req.body);
        res.send({
            statusCode: 204,
            data: users[userIndex],
        });
    }
    else {
        res.send({
            statusCode: 404,
            data: null,
        });
    }
});
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex((u) => u.id === +userId);
    if (userIndex > -1) {
        const deletedUser = users.splice(userIndex, 1);
        res.json(deletedUser[0]);
        res.send({
            statusCode: 204,
            data: deletedUser[0],
        });
    }
    else {
        res.send({
            statusCode: 404,
            data: null,
        });
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});