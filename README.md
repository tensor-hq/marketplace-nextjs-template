# Tensor Market Boilerplate

**Welcome to the Tensor Marketplace Boilerplate!**

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
npm run install
```

#### Set environment variables in .env
```
NEXT_PUBLIC_SOLANA_RPC_URL=               # Frontend Solana RPC
SOLANA_RPC_URL=                           # Backend  Solana RPC
TENSOR_API_KEY=                           
NEXT_PUBLIC_COLLECTION_SLUG=              
```

#### Start the web app

```
npm run dev
```

### Important Folder / Files
 - `web/app/api` - Proxied requests to Tensor’s API
 - `web/app/page.tsx` - Index page, where data is fetched + rendered

