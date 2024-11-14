import { RAGApplicationBuilder } from '@llm-tools/embedjs';
import { Ollama, OllamaEmbeddings } from '@llm-tools/embedjs-ollama';
import { WebLoader } from '@llm-tools/embedjs-loader-web';
import { PdfLoader } from '@llm-tools/embedjs-loader-pdf';
import { HNSWDb } from '@llm-tools/embedjs-hnswlib';
import express, { Request, Response} from "express";

const app = express();
const port = 8080;

app.use(express.json());

const ragApplication = await new RAGApplicationBuilder()
.setModel(new Ollama({ modelName: "llama3.2", baseUrl: 'http://localhost:11434' }))
.setEmbeddingModel(new OllamaEmbeddings({ model: 'nomic-embed-text', baseUrl: 'http://localhost:11434' }))
.setVectorDatabase(new HNSWDb())
.build();

const Loaders = { 
    'pdf': [PdfLoader, 'filePathOrUrl'],
    'web': [WebLoader, 'urlOrContent']
}
const contentName = {

}
// let pdf = await ragApplication.addLoader(new PdfLoader({ filePathOrUrl: 'https://bitcoin.org/bitcoin.pdf' }))
// let web = await ragApplication.addLoader(new WebLoader({ urlOrContent: 'https://bitcoin.org/bitcoin.pdf' }))

const greetings = "Hello via Bun!";

console.log(greetings);

app.get("/", async (req: Request, res: Response) => {
    res.send(greetings);
  });

app.post('/ask', async (req: Request, res: Response) => {
    console.log(req.body);
    req.body.sources.forEach(async (source: { type: string, link: string; }) => {
        if (source.type == 'pdf') {
            await ragApplication.addLoader(new PdfLoader({ filePathOrUrl: source.link }))
            
        } else if (source.type == 'web') {
            await ragApplication.addLoader(new WebLoader({ urlOrContent: source.link }))

        }
    });
    const result = await ragApplication.query(req.body.query);

    res.send(result);
})
  
  app.listen(port, () => {
    console.log(`Listening @ http://localhost:8080 ...`);
  });

// const server = Bun.serve({
//     async fetch(req, server) {
//         const path = new URL(req.url).pathname;
//         // if (path == "/") {

//         // }
//          // receive POST data from a form
//     // if (req.method === "POST" && path === "/ask") {
//     //     const data = await req;
//     //     if (!data) {
//     //         return new Response("Send Data");
//     //     } else {
//     //         console.log(data.get('id'));
//     //         console.log(data.get('query'));
//     //         console.log(data.get('sources'));
//     //         return new Response("Success");
//     //     }
//     //   }
      
//       console.log(req);
//       return new Response(greetings + " api");
//     //   req.sources.forEach(source => {
//     //     await ragApplication.addLoader( new Loaders[source.key][0]({ }))
//     //   });
//     },
//     port: process.env.PORT || 3000
// });

/*
Bun.serve({
  static: {
    // health-check endpoint
    "/api/health-check": new Response("All good!"),

    // redirect from /old-link to /new-link
    "/old-link": Response.redirect("/new-link", 301),

    // serve static text
    "/": new Response("Hello World"),

    // serve a file by buffering it in memory
    "/index.html": new Response(await Bun.file("./index.html").bytes(), {
      headers: {
        "Content-Type": "text/html",
      },
    }),
    "/favicon.ico": new Response(await Bun.file("./favicon.ico").bytes(), {
      headers: {
        "Content-Type": "image/x-icon",
      },
    }),

    // serve JSON
    "/api/version.json": Response.json({ version: "1.0.0" }),
  },

  fetch(req) {
    return new Response("404!");
  },
});
*/