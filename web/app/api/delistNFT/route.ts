import { Connection } from '@solana/web3.js';
import axios from 'axios';

export async function GET(request: Request) {
 
  console.log('[API] delistNFT called!');
  const connection = new Connection(process.env.SOLANA_RPC_URL!);

  const userParams = new URLSearchParams(request.url.split('?')[1]);
  const { mint, owner } = Object.fromEntries(userParams.entries());
  const blockhash = (await connection.getLatestBlockhash()).blockhash;

  // Debugging
  // console.log('mint', mint);
  // console.log('owner', owner);

  try {
    const response = await axios.get(
      'https://api.mainnet.tensordev.io/api/v1/tx/delist',
      {
        params: {
          mint,
          owner,
          blockhash,
        },
        headers: {
          accept: 'application/json',
          'x-tensor-api-key': process.env.TENSOR_API_KEY,
        },
      }
    );

    console.log('[API] delistNFT 200 OK');
    return new Response(JSON.stringify(response.data));
  } catch (error) {

    console.log('[API] delistNFT 200 OK');
    return new Response(JSON.stringify(error));
  }
}
