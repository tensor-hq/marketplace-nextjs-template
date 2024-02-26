'use client';
import { Nft } from '@/app/page';
import React from 'react';
import axios from 'axios';
import {
  LAMPORTS_PER_SOL,
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';
import { useTransactionToast } from './ui-layout';


interface NFTCardProps {
  nft: Nft;
  connectedWallet: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signAllTransactions: any;
  selected: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({
  nft,
  connectedWallet,
  signAllTransactions,
  selected,
}) => {
  const { name, imageUri, mint } = nft;
  const { connection } = useConnection();
  const transactionToast = useTransactionToast();
  
  return (
    <div className="nft-card text-sm grid-flow-row grid grid-cols-1">
      {/* Rarity Rank Badge - To Do */}
      {/* <span className="nft-card__badge" style={{  }}>
        🟢
      </span> */}
      <h2 className="nft-card__title">{name}</h2>
      <img src={imageUri} alt={name} className="nft-card__image" />

      {/* Add to cart - To Do  */}
      {/* <button
        className="nft-card__add-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
        onClick={() => {}}
      >
        +
      </button> */}

      {/* Buy Now */}
      {nft.listing.price != null && connectedWallet != nft.listing.seller && (
        <div>
          <p>
            {Number(Number(nft.listing.price) / LAMPORTS_PER_SOL).toPrecision(
              2
            )}{' '}
            ◎
          </p>
          <button
            onClick={async () => {
              try {
                const response = await axios.get(`api/buyNFT`, {
                  params: {
                    buyer: connectedWallet,
                    mint,
                    owner: nft.listing.seller,
                    maxPrice: nft.listing.price,
                  },
                });

                // Deserialize the transactions
                const txsToSign = response.data.txs.map((tx) =>
                  tx.txV0
                    ? VersionedTransaction.deserialize(
                        response.data.txs[0].txV0.data
                      )
                    : Transaction.from(tx.tx.data)
                );
                // Sign the transactions
                const txsSigned = await signAllTransactions(txsToSign);

                // Must send txs serially for a given response!
                for (const tx of txsSigned) {
                  const sig = await connection.sendTransaction(tx);
                  await connection.confirmTransaction(sig);
                  transactionToast(sig);
                }
              } catch (error) {
                // Handle error here
                console.error(error);
              }
            }}
            className="nft-card__buy-button"
          >
            Buy
          </button>
        </div>
      )}

      {/* List item */}
      {nft.listing.price == null && connectedWallet == nft.owner && (
        <div className="">
          <input
            type="number"
            id="listing-price"
            className="text-tensor-black w-full"
            placeholder="Enter price"
          />
          <button
            onClick={async () => {
              const listingPrice = Number(
                document.getElementById('listing-price')?.value!
              );
              if (isNaN(listingPrice)) {
                console.error('Invalid price');
                return;
              }
              if (listingPrice <= 0) {
                console.error('Price must be greater than 0');
                return;
              }
              console.log('listingPrice: ', listingPrice);

              try {
                const response = await axios.get(`api/listNFT`, {
                  params: {
                    mint,
                    owner: connectedWallet,
                    price: listingPrice * LAMPORTS_PER_SOL,
                  },
                });

                // Deserialize the transactions
                const txsToSign = response.data.txs.map((tx) =>
                  tx.txV0
                    ? VersionedTransaction.deserialize(
                        response.data.txs[0].txV0.data
                      )
                    : Transaction.from(tx.tx.data)
                );
                // Sign the transactions
                const txsSigned = await signAllTransactions(txsToSign);

                // Must send txs serially for a given response!
                for (const tx of txsSigned) {
                  const sig = await connection.sendTransaction(tx);
                  await connection.confirmTransaction(sig);
                  transactionToast(sig);
                }

                

              } catch (error) {
                // Handle error here
                console.error(error);
              }
            }}
            className="nft-card__list-button"
          >
            List item
          </button>
        </div>
      )}

      {/* Create Listing */}
      {nft.listing.price != null && connectedWallet == nft.owner && (
        <div>
          <button
            onClick={async () => {
              try {
                const response = await axios.get(`api/delistNFT`, {
                  params: {
                    mint,
                    owner: connectedWallet,
                  },
                });

                // Deserialize the transactions
                const txsToSign = response.data.txs.map((tx) =>
                  tx.txV0
                    ? VersionedTransaction.deserialize(
                        response.data.txs[0].txV0.data
                      )
                    : Transaction.from(tx.tx.data)
                );
                // Sign the transactions
                const txsSigned = await signAllTransactions(txsToSign);

                // Must send txs serially for a given response!
                for (const tx of txsSigned) {
                  const sig = await connection.sendTransaction(tx);
                  await connection.confirmTransaction(sig);
                  transactionToast(sig);
                }

                // Refresh the nft to get the listing data
              } catch (error) {
                // Handle error here
                console.error(error);
              }
            }}
            className="nft-card__cancel-button"
          >
            Cancel listing
          </button>
        </div>
      )}

      {/* Cancel Listing */}
      {nft.listing.price != null && connectedWallet == nft.listing.seller && (
        <div>
          <p>
            {Number(Number(nft.listing.price) / LAMPORTS_PER_SOL).toPrecision(
              2
            )}{' '}
            ◎
          </p>
          <button
            onClick={async () => {
              try {
                const response = await axios.get(`api/delistNFT`, {
                  params: {
                    mint,
                    owner: connectedWallet,
                  },
                });

                // Deserialize the transactions
                const txsToSign = response.data.txs.map((tx) =>
                  tx.txV0
                    ? VersionedTransaction.deserialize(
                        response.data.txs[0].txV0.data
                      )
                    : Transaction.from(tx.tx.data)
                );
                // Sign the transactions
                const txsSigned = await signAllTransactions(txsToSign);

                // Must send txs serially for a given response!
                for (const tx of txsSigned) {
                  const sig = await connection.sendTransaction(tx);
                  await connection.confirmTransaction(sig);
                  transactionToast(sig);
                }

                // Refresh the nft to get the listing data
              } catch (error) {
                // Handle error here
                console.error(error);
              }
            }}
            className="nft-card__buy-button"
          >Cancel Listing</button>
        </div>
      )}

      {/* Unlisted */}
      {nft.listing.price == null && connectedWallet != nft.owner && (
        <p>Unlisted</p>
      )}
    </div>
  );
};

export default NFTCard;
