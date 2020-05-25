"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schemaPhoto = new mongoose_1.Schema({
    title: String,
    description: String,
    imagePath: String,
});
/* Todos los modelos deben ser del tipo de interfaz para que puedan ser aceptados por typeScript */
exports.default = mongoose_1.model("Photo", schemaPhoto);
