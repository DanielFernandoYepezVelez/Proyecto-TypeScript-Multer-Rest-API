import { model, Schema, Document } from "mongoose";

const schemaPhoto = new Schema({
  title: String,
  description: String,
  imagePath: String,
});

/* Photo Deben Ser De Este Tipo De Interface Y TypeScript Me Ayuda Gracias A La Interface Creada Que Esta Heredando Del Documento Tipico Que Existe En MongoDB Para Almacenar Datos En Dicha Base De Datos */
interface IPhoto extends Document {
  title: string;
  description: string;
  imagePath: string;
}

/* Todos los modelos deben ser del tipo de interfaz para que puedan ser aceptados por typeScript */
export default model<IPhoto>("Photo", schemaPhoto);
