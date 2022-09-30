# HTTP trigger based Azure Function - Javascript

- Before running make sure you have the latest Azure Functions core tools installed 
- As pushing node_modulesto GitHub is not a recommended practise, do a "npm install" to install
  all the necessary modules
- Also if you want to develop locally you can get Azure VSCode extension

# Function description

- As it's HTTP trigger you will need some backend/postman or anything that can raise HTTP request
- I also provided sample of how the body of the HTTP req should look like to be accepted by Func
- The idea of this Func is to save custom logs to Log Analytic workspace
- In the "sample_body.json", change the type(how you want to name your table in LA Workspace), workspaceId, sharedKey to the respective Log Analytic workspace, other values like temperature and humidity are hard coded but can be dynamic + important thing is to set the timestamp

# Details regarding Azure Monitor HTTP Data Collector API
https://learn.microsoft.com/en-us/azure/azure-monitor/logs/data-collector-api