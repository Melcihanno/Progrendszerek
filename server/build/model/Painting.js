"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Painting = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PaintingSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    artist_name: { type: String, required: true },
    year: { type: Number, required: true },
    sold: { type: Boolean, required: true },
    price: { type: Number, required: true },
    source: { type: String, required: true },
    email: { type: String, required: true },
    col_group: { type: String, required: true }
});
exports.Painting = mongoose_1.default.model('Painting', PaintingSchema);
