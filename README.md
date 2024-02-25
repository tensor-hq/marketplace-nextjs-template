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
npm install
```

#### Set environment variables in .env
```
cp .env.sample .env
vim .env
```

#### Start the web app

```
npm run dev
```

### Important Folder / Files
 - `web/app/api` - Proxied requests to Tensor’s API
 - `web/app/page.tsx` - Index page, where data is fetched + rendered

