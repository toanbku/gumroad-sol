import {
  Keypair,
  Transaction,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
} from "@solana/web3.js";
import {
  createTransferInstruction,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import * as bs58 from "bs58";
import { TOKEN_INFO } from "@/utils/constants";

const connection = new Connection(process.env.RPC_URL!);
const owner = Keypair.fromSecretKey(
  bs58.decode(process.env.WALLET_PRIVATE_KEY!)
);

export const transferCustomToken = async ({
  token,
  toAddress,
  amount,
}: {
  token: string;
  toAddress: string;
  amount: number;
}) => {
  try {
    const selectedToken = TOKEN_INFO.find((tok) => tok.name === token)!;

    const tokenPubkey = new PublicKey(selectedToken.address);
    const toPubKey = new PublicKey(toAddress);

    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      owner,
      tokenPubkey,
      owner.publicKey
    );

    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      owner,
      tokenPubkey,
      toPubKey
    );

    let tx = new Transaction();
    tx.add(
      createTransferInstruction(
        fromTokenAccount.address, // from
        toTokenAccount.address, // to
        owner.publicKey, // pk
        Math.floor(amount * Math.pow(10, selectedToken.decimal)) // amount
      )
    );

    const txHash = await connection.sendTransaction(tx, [owner]);

    return txHash;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const transferSolToken = async ({
  toAddress,
  amount,
}: {
  toAddress: string;
  amount: number;
}) => {
  let tx = new Transaction();

  const toPubkey = new PublicKey(toAddress);

  tx.add(
    SystemProgram.transfer({
      toPubkey,
      fromPubkey: owner.publicKey,
      lamports: Math.floor(amount * LAMPORTS_PER_SOL),
    })
  );

  // sendAndConfirmTransaction(connection, transaction, [keypair]);
  const txHash = await connection.sendTransaction(tx, [owner]);

  return txHash;
};
