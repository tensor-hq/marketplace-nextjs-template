import { Connection } from '@solana/web3.js';
import axios from 'axios';

export async function GET(request: Request) {
 
  console.log('[API] listNFT called!');
  const connection = new Connection(process.env.SOLANA_RPC_URL!);

  const userParams = new URLSearchParams(request.url.split('?')[1]);
  const { mint, owner, price } = Object.fromEntries(userParams.entries());
  const blockhash = (await connection.getLatestBlockhash()).blockhash;


  // Debugging
  // console.log('buyer', buyer);
  // console.log('mint', mint);
  // console.log('owner', owner);
  // console.log('feePayer', owner);
  // console.log('blockhash', blockhash);
  // console.log('price', price);

  try {
    const response = await axios.get(
      'https://api.mainnet.tensordev.io/api/v1/tx/list',
      {
        params: {
          mint,
          owner,
          price,
          blockhash,
          feePayer: owner,
        },
        headers: {
          accept: 'application/json',
          'x-tensor-api-key': process.env.TENSOR_API_KEY,
        },
      }
    );

    console.log('[API] listNFT 200 OK');
    return new Response(JSON.stringify(response.data));
  } catch (error) {

    console.log('[API] listNFT 200 OK');
    return new Response(JSON.stringify(error));
  }
}
