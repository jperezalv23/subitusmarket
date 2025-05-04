import { getContract } from "thirdweb";
import { client } from "./client"; // el archivo que ya tienes
import { avalancheFuji } from "thirdweb/chains";
import abi from "./abi.json";

// Dirección del contrato desplegado (reemplaza con tu propia dirección)
export const CONTRACT_ADDRESS = "0x4f1971001A1Afed3975C7967D80A1D5A0C71985D";


export const contract = getContract({
  client,
  chain: avalancheFuji,
  address: CONTRACT_ADDRESS,  
  abi: abi, // ABI del contrato
});

