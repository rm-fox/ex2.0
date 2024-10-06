// import { useEffect, useState } from "react";
// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { program, tokenMintPDA } from "../anchor/setup";
// import { clusterApiUrl, Connection, PublicKey, Transaction } from "@solana/web3.js";
// import { getAssociatedTokenAddressSync } from "@solana/spl-token";
// import * as buffer from "buffer";
// window.Buffer = buffer.Buffer;
 
// export default function BuyLongButton() {
//   const { connection } = useConnection();
//   const { publicKey, sendTransaction }  = useWallet();
//   const [isLoading, setIsLoading] = useState(false);
//   // const [counterData, setCounterData] = useState<CounterData | null>(null);
 
//   const onClick = async () => {
//     if (!publicKey) return;
 
//     setIsLoading(true);
 
//     try {
//       const usersTokenAccount = getAssociatedTokenAddressSync(
//         tokenMintPDA,
//         publicKey
//       );

//       const transaction = new Transaction();

//       const createInstruction = await program.methods
//         .buyFut()
//         .accounts({
//           user: publicKey,
//           userTokenAccount: usersTokenAccount,
//           tokenMint: tokenMintPDA,
//         })
//         .instruction(); // Get the instruction instead of calling .rpc() directly

//         // Add instruction to the transaction
//       transaction.add(createInstruction);
//         // .rpc();

//       let txHash;
//       txHash = await sendTransaction(transaction, connection);
//       // await logTransaction(txHash);
//       console.log(txHash)
//       console.log("I buy");

    
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
 
//   return (
//     <button className="w-24" onClick={onClick} disabled={!publicKey}>
//       {isLoading ? "Loading" : "Buy GPUZ4"}
//     </button>
//   );
// }

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { program, tokenMintPDA } from "../anchor/setup";
import { Transaction } from "@solana/web3.js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

export default function BuyLongButton({ addAreaDataLong }: { addAreaDataLong: () => void }) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (!publicKey) return;

    setIsLoading(true);

    try {

      const usersTokenAccount = getAssociatedTokenAddressSync(
        tokenMintPDA,
        publicKey
      );

      const transaction = new Transaction();

      const createInstruction = await program.methods
        .buyFut()
        .accounts({
          user: publicKey,
          userTokenAccount: usersTokenAccount,
          tokenMint: tokenMintPDA,
        })
        .instruction(); 

      transaction.add(createInstruction);

      const txHash = await sendTransaction(transaction, connection);

      console.log(txHash);
      console.log("I buy");

      addAreaDataLong();

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className="w-24" onClick={onClick} disabled={!publicKey}>
      {isLoading ? "Loading" : "Buy / Long"}
    </button>
  );
}
