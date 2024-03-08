# Tensor Market Template

**Welcome to the Tensor Marketplace Template!**

This demo provides a simple foundation for building on the Tensor API, use it to get started building NOW!

![Sample Screenshot](https://github.com/echohtp/tmarket/blob/main/image.jpg?raw=true)

### Prerequisites

- Node v18.18.0 or higher
- Tensor API Key

### Installation

#### Clone the repo

```shell
git clone tensor-hq/tmarket
cd tmarket
```

#### Install Dependencies

```shell
npm install
```

#### Set environment variables in .env
```
NEXT_PUBLIC_SOLANA_RPC_URL=               # Frontend Solana RPC
SOLANA_RPC_URL=                           # Backend  Solana RPC
TENSOR_API_KEY=                           
NEXT_PUBLIC_COLLECTION_SLUG_UUID=              
```

#### Start the web app

```
npm run dev
```

### Important Folder / Files
 - `web/app/api` - Proxied requests to Tensor’s API
 - `web/app/page.tsx` - Index page, where data is fetched + rendered

 ### How to get Collection Slug UUID
Using the (Get Collections)[https://tensor.readme.io/reference/getcollections-1] Tensor API Endpoint, we're able to query for all collections with a given `slugsDisplay` or Human Readable Slug eg: `tensorians`.

```JavaScript
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-tensor-api-key": TENSOR_API_KEY,
  },
};

const url = "https://api.mainnet.tensordev.io/api/v1/collections";

const queryParams = new URLSearchParams();
queryParams.append("slugsDisplay", "tensorians");
queryParams.append("sortBy", "statsV2.volume1h:desc");
queryParams.append("limit", 1);

const fullUrl = `${url}?${queryParams.toString()}`

fetch(fullUrl)
    .then(response => response.json())
    .then(response => console.log(response.collections[0].slug))
```

