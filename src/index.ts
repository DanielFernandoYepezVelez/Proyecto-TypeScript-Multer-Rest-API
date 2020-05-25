import "./config/database";

import express, { Application } from "express";
import morgan from "morgan";
import path from "path";

import indexRouter from "./routes/routes.index";

class App {
  constructor(private app: Application) {
    this.init();
  }

  private init(): void {
    this.middlewares();
    this.routes();
    this.staticFiles();
    this.start();
  }

  private settings(): void {
    this.app.set("port", process.env.PORT || 3000);
  }

  private middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use("/api", indexRouter);
  }

  private staticFiles(): void {
    this.app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
  }

  private async start(): Promise<void> {
    this.settings();
    await this.app.listen(this.app.get("port"));
    console.log(`Server On Port ${this.app.get("port")}`);
  }
}

/* Ejecutando La Aplicación */
new App(express());
