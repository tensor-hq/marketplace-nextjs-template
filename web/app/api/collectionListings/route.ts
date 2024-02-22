import axios from 'axios';

export async function GET(request: Request) {
  console.log('[API] collectionListings called!');

  const userParams = new URLSearchParams(request.url.split('?')[1]);
  const { collectionSlug, limit, cursor } = Object.fromEntries(
    userParams.entries()
  );

  // Debugging
  // console.log('collectionSlug: ', collectionSlug);
  // console.log('limit: ', limit);
  // console.log('cursor: ', cursor);

  try {
    const url = `https://api.mainnet.tensordev.io/api/v1/mint/collection?slug=${collectionSlug}&sortBy=ListingPriceAsc&limit=${limit}&onlyListings=true${
      cursor ? `&cursor=${cursor}` : ''
    }`;

    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        'x-tensor-api-key': process.env.TENSOR_API_KEY!,
      },
    });
    console.log('[API] collectionListings 200 OK');
    return new Response(JSON.stringify(response.data));
  } catch (error) {
    console.log('[API] collectionListings 500 ERROR', error);
    return new Response(JSON.stringify(error));
  }
}
