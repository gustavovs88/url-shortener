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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../config/Constants");
const express_1 = require("express");
const shortid_1 = __importDefault(require("shortid"));
class UrlController {
    shorten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { originUrl } = req.body;
            const hash = shortid_1.default.generate();
            const shortUrl = `${Constants_1.config.API_URL}/${hash}`;
            express_1.response.json({ originUrl, hash, shortUrl });
        });
    }
    redirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hash } = req.params;
            const url = {
                originUrl: "mongodb+srv://root:<password>@cluster0.jydxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
                hash: "",
                shortUrl: "localhost:/hash",
            };
            express_1.response.redirect(url.originUrl);
        });
    }
}
exports.default = UrlController;
//# sourceMappingURL=urlController.js.map