import { RAGApplicationBuilder } from '@llm-tools/embedjs';
import { Ollama, OllamaEmbeddings } from '@llm-tools/embedjs-ollama';
import { WebLoader } from '@llm-tools/embedjs-loader-web';
import { PdfLoader } from '@llm-tools/embedjs-loader-pdf';
import { HNSWDb } from '@llm-tools/embedjs-hnswlib';

const ragApplication = await new RAGApplicationBuilder()
.setModel(new Ollama({ modelName: "llama3.2", baseUrl: 'http://localhost:11434' }))
.setEmbeddingModel(new OllamaEmbeddings({ model: 'nomic-embed-text', baseUrl: 'http://localhost:11434' }))
.setVectorDatabase(new HNSWDb())
.build();

let pdf = await ragApplication.addLoader(new PdfLoader({ filePathOrUrl: 'https://bitcoin.org/bitcoin.pdf' }))
let web = await ragApplication.addLoader(new WebLoader({ urlOrContent: 'https://bitcoin.org/bitcoin.pdf' }))
//ragApplication.addLoader(new WebLoader({ urlOrContent: 'https://www.forbes.com/profile/elon-musk' }))
// ragApplication.addLoader(new WebLoader({ urlOrContent: 'https://en.wikipedia.org/wiki/Elon_Musk' }))
console.log(pdf);
console.log(web);
console.log("Query: testing Search and Query results on 'What is a timestamp server?'")
console.log("...")

// let searchResult = await ragApplication.search("Bitcoin Whitepaper Server")

// console.log('searchresult')
// console.log(searchResult);

let result;
result = await ragApplication.search('What is a TimeStamp Server?')
//Answer: The net worth of Elon Musk today is $258.7 billion.
console.log('search result: ')
console.log(result)
result = await ragApplication.query('What is a TimeStamp Server?')
//Answer: The net worth of Elon Musk today is $258.7 billion.
console.log('query result: ')
console.log(result)

// console.log("Between the 1. Introduction and 12. Conclusion, what are headers 2 - 10?")
// result = await ragApplication.query('Between the 1. Introduction and 12. Conclusion, what are headers 2 - 10?')
// console.log(result)
// console.log("Query: Elon Musk Net worth?")
// let searchResult2 = await ragApplication.search("Elon Musk net worth")
// console.log(searchResult2)
// let r2 = await ragApplication.query("Elon Musk net worth")
// console.log(r2)