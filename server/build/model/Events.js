"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EventsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    artist_name: { type: String, required: true },
    date: { type: Date, required: true },
    max_attendees: { type: Number, required: true },
    img_source: { type: String, required: true },
    price: { type: Number, required: true },
    attendees: { type: String, required: false }
});
exports.Event = mongoose_1.default.model('Events', EventsSchema);
