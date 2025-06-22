"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = require("cors");
const dotenv_1 = require("dotenv");
const auth_routes_1 = require("./routes/auth.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('ChatCraftAI API is running!');
});
app.use('/auth', auth_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map