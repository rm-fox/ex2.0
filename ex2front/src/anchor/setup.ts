import { Program } from "@coral-xyz/anchor";
import { IDL, EverythingFun } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

const programId = new PublicKey("BC9evWNMpJnY7sneZBbrNRMkXrdZHNDHUyLxhYiHE4RT");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
 
// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<EverythingFun>(IDL, programId, {
  connection,
});

// export const [tokenMintPDA] = PublicKey.findProgramAddressSync(
//     [Buffer.from("everything")],
//     program.programId
// );

export const [tokenMintPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("hacka16zlong")],
    program.programId
);

// export const [tokenMintPDA] = PublicKey.findProgramAddressSync(
//     [Buffer.from("everything")],
//     program.programId
//   );
 
// export const [counterPDA] = PublicKey.findProgramAddressSync(
//   [Buffer.from("counter")],
//   program.programId,
// );
 
// This is just a TypeScript type for the Counter data structure based on the IDL
// We need this so TypeScript doesn't yell at us
// export type CounterData = IdlAccounts<EverythingFun>["counter"];