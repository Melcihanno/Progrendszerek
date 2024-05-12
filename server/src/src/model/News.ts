import mongoose, { Document, Model, Schema } from 'mongoose';


interface INews extends Document {
    title: string;
    article: string;
    date: Date;
}

const NewsSchema: Schema<INews> = new mongoose.Schema({
    title: { type: String, required: true },
    article: { type: String, required: true },
    date: { type: Date, required: true },
});

export const News: Model<INews> = mongoose.model<INews>('News', NewsSchema);
