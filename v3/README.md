# RAG API app

JS app listening for endpoint connections
Will optomize for load later
Going to dockerize and have API listen for POST calls that will be input to the RAG app and output

POST

{
    id: 'username - will become an authenticated username',
    query: 'query text to be asked of bot',
    sources: [{ 'type': 'address'}] : sources will be sent in an array of key: value pairs. key can be 'pdf', 'web', 'etc'. value can be a web link to find the resource or the raw text of the resource.
}