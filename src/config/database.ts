import mongoose from "mongoose";

class StartConnection {
  public async connection(): Promise<void> {
    try {
      await mongoose.connect("mongodb://localhost/photo_gallery_db", {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log(">>> Database Is Connected");
    } catch {
      console.log("Conexión Falló");
    }
  }
}

const startConnection = new StartConnection();
export default startConnection.connection();
