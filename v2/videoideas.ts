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


let web = await ragApplication.addLoader(new WebLoader({ urlOrContent: 'https://sidequests.onrender.com' }))
let web2 = await ragApplication.addLoader(new WebLoader({ urlOrContent: 'https://sidequests.onrender.com/Side_Quests/' }))
//ragApplication.addLoader(new WebLoader({ urlOrContent: 'https://www.forbes.com/profile/elon-musk' }))
// ragApplication.addLoader(new WebLoader({ urlOrContent: 'https://en.wikipedia.org/wiki/Elon_Musk' }))
console.log(web);
console.log(web2);
console.log("Query: script for Intro to SideQuests'")
console.log("...")

const prompt = `I'm going to dress in a Mage Costume and have a staff in a dark Room.
    
Using the SideQuests links and the key points below, generate a video script

Intro to SideQuests Key Points:

        - Purpose
        Education is lifelong. 
        Don't just rely on information to be fed to you. Use this resource to help guide you on the way to your immersion into Tech Work

        - Site Nav
            Blog
                Follow and read the thoughts of other Technologists, including Local Tech Workers, and CodeSchool Alumni and Staff
            Help Desk
                A glossary of resources, terms, and how to navigate class and the tech field. 
            Side Quests
                Broken Down by Module
                Explore Additional Tech Roles and Specializations
                Earn Free Tech Certs to Bolster What You Learn in Class and Prove Your Skills in the Marketplace`

// let searchResult = await ragApplication.search("Bitcoin Whitepaper Server")

// console.log('searchresult')
// console.log(searchResult);

let result;
result = await ragApplication.query(prompt)
//Answer: The net worth of Elon Musk today is $258.7 billion.
console.log('response: ')
console.log(result)