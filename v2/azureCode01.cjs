// Request data goes here
// The example below assumes JSON formatting which may be updated
// depending on the format your endpoint expects.
// More information can be found here:
// https://docs.microsoft.com/azure/machine-learning/how-to-deploy-advanced-entry-script
const requestBody = `{
  "input_data": {
    "input_string": [
      {
        "role": "user",
        "content": "I am going to Paris, what should I see?"
      },
      {
        "role": "assistant",
        "content": "Paris, the capital of France, is known for its stunning architecture, art museums, historical landmarks, and romantic atmosphere. Here are some of the top attractions to see in Paris:\n\n1. The Eiffel Tower: The iconic Eiffel Tower is one of the most recognizable landmarks in the world and offers breathtaking views of the city.\n2. The Louvre Museum: The Louvre is one of the world's largest and most famous museums, housing an impressive collection of art and artifacts, including the Mona Lisa.\n3. Notre-Dame Cathedral: This beautiful cathedral is one of the most famous landmarks in Paris and is known for its Gothic architecture and stunning stained glass windows.\n\nThese are just a few of the many attractions that Paris has to offer. With so much to see and do, it's no wonder that Paris is one of the most popular tourist destinations in the world."
      },
      {
        "role": "user",
        "content": "What is so great about #1?"
      }
    ],
    "parameters": {
      "temperature": 0.8,
      "top_p": 0.8,
      "max_new_tokens": 4096
    }
  }
}`;

const requestHeaders = new Headers({"Content-Type" : "application/json"});

// Replace this with the primary/secondary key, AMLToken, or Microsoft Entra ID token for the endpoint
const apiKey = "gyDx6JpBng743i8IhAamxQos3lW1RdbK";
if (!apiKey)
{
	throw new Error("A key should be provided to invoke the endpoint");
}
requestHeaders.append("Authorization", "Bearer " + apiKey)

// This header will force the request to go to a specific deployment.
// Remove this line to have the request observe the endpoint traffic rules
// requestHeaders.append("azureml-model-deployment", "llama-3-2-3b-2");

const url = "https://testworkspace-iixgt.eastus2.inference.ml.azure.com/swagger.json";

fetch(url, {
  method: "GET",
  headers: requestHeaders
})
	.then((response) => {
	if (response.ok) {
		return response.json();
	} else {
		// Print the headers - they include the request ID and the timestamp, which are useful for debugging the failure
		console.debug(...response.headers);
		console.debug(response.body)
		throw new Error("Request failed with status code" + response.status);
	}
	})
	.then((json) => console.log(json))
	.catch((error) => {
		console.error(error)
	});