'use client';
import { Nft } from '@/app/page';
import React from 'react';
import axios from 'axios';
import { LAMPORTS_PER_SOL, Transaction, VersionedTransaction } from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';


interface NFTCardProps {
  nft: Nft;
  buyer: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signTransaction: any;
  signAllTransactions: any;
  selected: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({
  nft,
  buyer,
  signTransaction,
  signAllTransactions,
  selected,
}) => {
  const { name, imageUri, mint } = nft;
  const { connection } = useConnection();
  
  return (
    <div className='nft-card  text-sm'>
      {/* Rarity Rank Badge - To Do */}
      {/* <span className="nft-card__badge" style={{  }}>
        🟢
      </span> */}
      <h2 className="nft-card__title">{name}</h2>
      <img src={imageUri} alt={name} className="nft-card__image" />
      
      <p>{Number(Number(nft.listing.price) / LAMPORTS_PER_SOL).toPrecision(2)} ◎</p>
      
      {/* Add to cart - To Do  */}
      {/* <button
        className="nft-card__add-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
        onClick={() => {}}
      >
        +
      </button> */}

      <button
        onClick={async () => {
          try {
            const response = await axios.get(
              `api/buyNFT`,
              {
                params:{
                  buyer,
                  mint,
                  owner: nft.listing.seller,
                  maxPrice: nft.listing.price,
                },
              }
            );

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
  );
};

export default NFTCard;
