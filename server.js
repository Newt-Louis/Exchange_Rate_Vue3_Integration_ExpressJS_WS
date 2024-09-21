import "dotenv/config";
import fs from "node:fs/promises";
import express from "express";
import { startBrowser } from "./browser.js";
// Constants
/* const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/"; */

// Load values from .env file
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT;
const base = process.env.BASE;

// Cached production assets, templateHtml & ssrManifest will storage all HTML,CSS,JSON in memory
// these variables called cache because our app don't have to read these file every request come
// that's means function fs.readFile() only call once when our app run in first time
// These files will be generated from the Vite build process
// information about the build structure is defined in the package.json
const templateHtml = isProduction ? await fs.readFile("./dist/client/index.html", "utf-8") : "";
const ssrManifest = isProduction ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8") : undefined;

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  // import function createServer for create instance Vite dev server
  const { createServer } = await import("vite");
  // define vite as middleware in expressjs, appType for not default as Vite we're using Vue, base = '/'
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });

  // declare for expressjs use vite middleware
  app.use(vite.middlewares);
} else {
  // if in production use compression and sirv package for expressjs
  // compression is used to compress data from requests and responses to increase performance
  const compression = (await import("compression")).default;
  // sirv will find available static resources in the dist/client folder
  // such as .css, .js, images and send it to the browser first if found
  const sirv = (await import("sirv")).default;
  // then use it in express app
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*", async (req, res) => {
  try {
    // req.originalUrl contain only after domain name like localhost:300/about => req.originalUrl = "/about"
    const url = req.originalUrl.replace(base, "");
    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      // get new data form index.html and define component of route and transform html then store
      // in template variable
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      // load module for vue application like nomal vuejs used to have like router, axios, pinia, v.v....
      render = (await vite.ssrLoadModule("/src/entry-server.js")).render;
    } else {
      // the same things on development but this is in the production
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, async () => {
  console.log(`Server started at http://localhost:${port}`);
  try {
    const browser = await startBrowser();
    if (!browser) {
      console.log("không khởi động được trình duyệt");
    } else {
      global.browser = browser;
    }
  } catch (error) {
    console.log(error);
  }
});
