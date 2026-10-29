import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient } from "mongodb";

const app = express();
const PORT = process.env.PORT || 8000;

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

app.use(cors());
app.use(express.json());

const connectedClient = await connectToMongoDB();
const db = connectedClient.db("tripnestDatabase");
const tripnestCollection = db.collection("destination");

app.get("/destinations", async (req, res) => {
  const result = await tripnestCollection.find().toArray();
  res.send(result);
});

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
