"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = void 0;
const PostUser_dto_1 = require("./dto/PostUser-dto");
const statusCodes_1 = require("../statusCodes");
const user_service_1 = require("./user.service");
const validate_schema_1 = require("../helpers/validate-schema");
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userService = new user_service_1.UserService();
    const user = new PostUser_dto_1.PostUserDto();
    const { first_name, last_name, email, id_role } = req.body;
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.id_role = id_role;
    const isValidationError = yield (0, validate_schema_1.validateSchema)(user);
    if (isValidationError) {
        return res.status(statusCodes_1.StatusCode.BAD_REQUEST).json({
            ok: false,
            message: 'Validation error',
        });
    }
    const newUser = yield userService.createUser(user);
    if (!newUser) {
        return res.status(statusCodes_1.StatusCode.INTERNAL_SERVER_ERROR).json({
            ok: false,
            message: 'User already exists or there is some error',
        });
    }
    return res.status(statusCodes_1.StatusCode.CREATED).json({
        ok: true,
        message: 'User created!',
        user: newUser,
    });
});
exports.postUser = postUser;
//# sourceMappingURL=user.controller.js.map