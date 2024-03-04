import axios from 'axios';

export async function GET(request: Request) {
  console.log('[API] collectionStats called!');

  const userParams = new URLSearchParams(request.url.split('?')[1]);
  const { collectionSlug } = Object.fromEntries(
    userParams.entries()
  );

  try {
    const url = `https://api.mainnet.tensordev.io/api/v1/collections?slugs=${collectionSlug}&sortBy=statsV2.volume24h:desc&limit=1`;

    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        'x-tensor-api-key': process.env.TENSOR_API_KEY!,
      },
    });
    console.log('[API] collectionStats 200 OK');
    return new Response(JSON.stringify(response.data));
  } catch (error) {
    console.log('[API] collectionStats 500 ERROR');
    return new Response(JSON.stringify(error));
  }
}
