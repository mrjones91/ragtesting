# wragyu

## RAG API app

mongoimport --uri=mongodb+srv://hack24:winners2024@cluster0.zep0qmk.mongodb.net/BlightBounties?retryWrites=true&w=majority&appName=Cluster0 --collection=blight --file=file_per_document/Service_Requests_since_2016_20241116.csv --type=csv

BlightBounties.blight.aggregate([{$sort: { CREATION_DATE: -1 }}]).limit(20);

JS app listening for endpoint connections
Will optomize for load later
Going to dockerize and have API listen for POST calls that will be input to the RAG app and output

POST

{
    id: 'username - will become an authenticated username',
    query: 'query text to be asked of bot',
    sources: [{ 'type': 'address'}] : sources will be sent in an array of key: value pairs. key can be 'pdf', 'web', 'etc'. value can be a web link to find the resource or the raw text of the resource.
}

### To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.34. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
