// import { MongoClient, ServerApiVersion } from "mongodb";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
// const uri = process.env.CONNECTION_STRING?.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD as s tring,
// );

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri as string, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// export default async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!",
//     );
//   } catch {
//     console.log("failed");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

import mongoose from "mongoose";
const DB =
  process.env.CONNECTION_STRING ||
  "mongodb+srv://kareemhappal_db_user:tcMjiZoiRsMKwpc0@cluster0.qapo0oj.mongodb.net/?appName=Cluster0";
const Connect_DB = async function () {
  mongoose
    .connect(DB, {
      maxPoolSize: 10,
      family: 4,
    })
    .then(() => console.log("DB connection successful!"))
    .catch((err) => {
      console.log("failed with error:\n");
    });
};

export default Connect_DB;
