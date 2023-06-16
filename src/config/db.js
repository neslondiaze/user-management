import mongoose from 'mongoose';

const connectDB = (url=process.env.MONGODB_URL) =>
    mongoose.connect(url)
        .then(() => console.log('Database connected'))
        .catch((err) => console.log(err.message));

export default connectDB;
