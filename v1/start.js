const { WebBaseLoader } = require("langchain/document_loaders/web");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { SklearnVectorStore } = require("langchain/vectorstores/sklearn");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { ChatOllama } = require("@langchain/community/chat_models/ollama");
const { PromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { RunnableSequence } = require("@langchain/core/runnables");

// List of URLs
const urls = [
  "https://lilianweng.github.io/posts/2023-06-23-agent/",
  "https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/",
  "https://lilianweng.github.io/posts/2023-10-25-adv-attack-llm/",
];

async function createRAGApplication() {
  // Load documents
  const loaders = urls.map(url => new WebBaseLoader(url));
  const docs = await Promise.all(loaders.map(loader => loader.load()));
  const docsList = docs.flat();

  // Initialize text splitter
  const textSplitter = RecursiveCharacterTextSplitter.fromDefaults({
    chunkSize: 250,
    chunkOverlap: 0,
  });

  // Split documents
  const docSplits = await textSplitter.splitDocuments(docsList);

  // Create vector store
  const vectorstore = await SklearnVectorStore.fromDocuments(
    docSplits,
    new OpenAIEmbeddings({ openAIApiKey: "api_key" })
  );
  const retriever = vectorstore.asRetriever(4);

  // Define prompt template
  const prompt = PromptTemplate.fromTemplate(`You are an assistant for question-answering tasks.
    Use the following documents to answer the question.
    If you don't know the answer, just say that you don't know.
    Use three sentences maximum and keep the answer concise:
    Question: {question}
    Documents: {documents}
    Answer:`);

  // Initialize LLM
  const llm = new ChatOllama({
    model: "llama3.2:1B",
    temperature: 0,
  });

  // Create chain
  const ragChain = RunnableSequence.from([
    {
      question: input => input.question,
      documents: async input => {
        const docs = await retriever.getRelevantDocuments(input.question);
        return docs.map(doc => doc.pageContent).join("\n");
      }
    },
    prompt,
    llm,
    new StringOutputParser()
  ]);

  return ragChain;
}

// Example usage
async function main() {
  const ragChain = await createRAGApplication();
  const question = "What kind of Server is Described in Section 3?";
  
  try {
    const answer = await ragChain.invoke({ question });
    console.log("Question:", question);
    console.log("Answer:", answer);
  } catch (error) {
    console.error("Error:", error);
  }
}

main(); 