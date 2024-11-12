# RAG Tests in Deno and Python

Install Ollama and pull Llama 3.2 (I also test 3.2:1B, it may be workable for RAG purposes, but it's generally not as good as 3.2)

I tested by pulling the Bitcoin Whitepaper as a resource and asking questions. 

The RAG library has a query and search function. Search basically pulls related snippets, Query is more of what we're use to seeing when prompting AI.

# v2 synopsis
In v2, the azureCode files were generated from Azure to interact with various AI resources I created.

The objective was to be able to get info from the AI, but those experiments didn't really work. azureCode02.py kinda worked, in that the api call went through and the api sent a response, but it was responding (auto-completing?) to the code and not actually forming a response to what was intended.

azureSwagger.json is the schema for the Azure service I said up.

# The Big takeaway
start.ts is a working RAG app that can pull online, file, and many other kinds of resources and respond based on what resources you give it.
again, 1B can do this, a little, but the full 3.2 is more accurate and usable.

## deno run -A start.ts