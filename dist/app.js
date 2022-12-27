"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
//routes
const user_routes_1 = __importDefault(require("./user/user.routes"));
const paths_1 = require("./paths");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.setupMiddlewares();
        this.setupRoutes();
    }
    listen(port) {
        this.app.listen(port);
        console.log(`App listening on the port ${port}`);
    }
    setupRoutes() {
        this.app.use(paths_1.Path.Users, user_routes_1.default);
    }
    setupMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, morgan_1.default)('dev'));
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map