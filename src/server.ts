import { readFileSync } from "fs";
// import path from "path";
import express, { NextFunction, Request, Response } from "express";
import https from "https";
// import { createServer as createViteServer } from "vite";
// import compression from "compression";
import router from "./routes";

// const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    res;
    console.log(req.path);
    next();
}

const createServer = (isProd = process.env.NODE_ENV === "production") => {
    // const resolve = (p: string) => path.resolve(__dirname, p);

    const app = express();
    app.use(loggerMiddleware);
    const server = //isProd
        // ?
        app;
    // : https.createServer(
    //       { key: readFileSync(process.env.DEV_SSL_KEY as string), cert: readFileSync(process.env.DEV_SSL_CERT as string) },
    //       app,
    //   );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api", router);

    // if (!isProd) {
    //     createViteServer({
    //         logLevel: isTest ? "error" : "info",
    //         server: {
    //             middlewareMode: "html",
    //             watch: {
    //                 // During tests we edit the files too ft and sometimes chokidar
    //                 // misses change events, so enforce polling for consistency
    //                 usePolling: true,
    //                 interval: 100,
    //             },
    //         },
    //     }).then((vite) => {
    //         app.use("/", vite.middlewares);
    //     });
    //     // use vite's connect instance as middleware
    // } else {
    //     app.use(compression());
    //     app.use(express.static(resolve("web")));
    // }
    return server;
};

// for test use
export { createServer };
