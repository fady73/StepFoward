import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI: string | undefined = "mongodb+srv://fadykhayrat:adminfadykhayrat@cluster0.avs1op7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }as ConnectOptions)
      .then((mongoose) => {
        return mongoose.connection;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
