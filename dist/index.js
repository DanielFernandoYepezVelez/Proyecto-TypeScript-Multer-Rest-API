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
require("./config/database");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const routes_index_1 = __importDefault(require("./routes/routes.index"));
class App {
    constructor(app) {
        this.app = app;
        this.init();
    }
    init() {
        this.middlewares();
        this.routes();
        this.staticFiles();
        this.start();
    }
    settings() {
        this.app.set("port", process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use(morgan_1.default("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use("/api", routes_index_1.default);
    }
    staticFiles() {
        this.app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "./uploads")));
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings();
            yield this.app.listen(this.app.get("port"));
            console.log(`Server On Port ${this.app.get("port")}`);
        });
    }
}
/* Ejecutando La Aplicación */
new App(express_1.default());
