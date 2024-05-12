import mongoose, { Document, Model, Schema } from 'mongoose';


interface IEvents extends Document {
    name: string;
    description: string;
    artist_name: string;
    date: Date;
    max_attendees: number;
    img_source: string;
    price: number;
    attendees: string,
}

const EventsSchema: Schema<IEvents> = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    artist_name: { type: String, required: true },
    date: { type: Date, required: true },
    max_attendees: {type: Number,required: true},
    img_source: {type: String, required: true},
    price: {type: Number, required:true},
    attendees: {type: String, required:false}
});

export const Event: Model<IEvents> = mongoose.model<IEvents>('Events', EventsSchema);
