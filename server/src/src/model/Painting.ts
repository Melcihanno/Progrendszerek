import mongoose, { Document, Model, Schema } from 'mongoose';


interface IPainting extends Document {
    name: string;
    description?: string;
    artist_name: string;
    year: number;
    sold: boolean;
    price: number;
    source: string;
    email: string;
    col_group: string;
}

const PaintingSchema: Schema<IPainting> = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    artist_name: { type: String, required: true },
    year: {type: Number, required: true },
    sold: {type: Boolean, required: true},
    price: {type: Number,required: true},
    source: {type: String,required:true},
    email: {type: String, required: true},
    col_group: {type: String, required: true}
});

export const Painting: Model<IPainting> = mongoose.model<IPainting>('Painting', PaintingSchema);
