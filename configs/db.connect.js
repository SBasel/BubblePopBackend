import mongoose from "mongoose";

//Verbindung herstellen
export async function mongoConnect() {
  try {
    await mongoose.connect(
      "mongodb+srv://hannaoleinikova:12345@cluster0.bbmmpf3.mongodb.net/",
      {
        dbName: "bubblepop",
      }
    );
  } catch (error) {
    console.log(error.message);
  }
}

export function mongoErrorListener() {
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
}

export function mongoConenctLister() {
  mongoose.connection.on("connected", () => {
    console.log("Verbindung hergstellt");
  });
}

export function mongoDisconenctLister() {
  mongoose.connection.on("disconnected", () => {
    console.log("Verbindung disconnected");
  });
}
