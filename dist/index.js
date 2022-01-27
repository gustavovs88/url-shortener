"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const urlController_1 = __importDefault(require("./controller/urlController"));
const api = (0, express_1.default)();
api.use(express_1.default.json);
api.use(express_1.default.urlencoded({ extended: true }));
const urlController = new urlController_1.default();
api.post("/shorten", urlController.shorten);
api.get("/hash", urlController.redirect);
api.get("/test", (req, res) => {
    res.status(200).send({ hiii: "hieii" });
});
api.use((req, res, next) => {
    const error = new Error("Not found");
    error.message = "Invalid route";
    next(error);
});
api.use(logErrors);
api.use(clientErrorHandler);
api.use((error, req, res, next) => {
    res.status(500);
    return res.json({
        status: 500,
        message: error.message,
        error: {
            error: error.message,
        },
    });
});
function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(400).send({
            status: 400,
            message: "Bad request from client",
            error: err.message,
        });
    }
    else {
        next(err);
    }
}
let port = process.env.PORT || 8081;
api.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map