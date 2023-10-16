### Initialize project

To initialize the project, pull this repo, run those commands

```bash
bun i # or use npm if you don't have bun
cp .env.example .env.local
```

Then, go on https://console.cloud.google.com/apis/credentials?project=YOUR_PROJECT and create a OAuth2 flow, create ID for each app (ios, web, android) and paste it into the .env.local

Enjoy

If it breaks, your fault
