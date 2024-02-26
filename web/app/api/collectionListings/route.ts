import axios from 'axios';

export async function GET(request: Request) {
  console.log('[API] collectionListings called!');

  const userParams = new URLSearchParams(request.url.split('?')[1]);
  const { collectionSlug, limit, cursor, mint } = Object.fromEntries(
    userParams.entries()
  );

  // Debugging
  // console.log('collectionSlug: ', collectionSlug);
  // console.log('limit: ', limit);
  // console.log('cursor: ', cursor);
  // console.log('mint: ', mint);

  const url = `https://api.mainnet.tensordev.io/api/v1/mint/collection`;
  const queryParams = new URLSearchParams();
  queryParams.append('slug', collectionSlug);
  queryParams.append('sortBy', 'ListingPriceAsc');
  queryParams.append('limit', limit);
  if (cursor) {
    queryParams.append('cursor', cursor);
  }
  if (mint) {
    queryParams.append('mints', mint);
  }
  const fullUrl = `${url}?${queryParams.toString()}`;
  try {
    const response = await axios.get(fullUrl, {
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
