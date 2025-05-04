import { getContract } from "thirdweb";
import { client } from "./client"; // el archivo que ya tienes
import { avalancheFuji } from "thirdweb/chains";
import abi from "./abi.json";

// Dirección del contrato desplegado (reemplaza con tu propia dirección)
const CONTRACT_ADDRESS = "0x0D2F07B71B6222902ef9a8157ADeCa6EbBEE04b6";


export const contract = getContract({
  client,
  chain: avalancheFuji,
  address: CONTRACT_ADDRESS,  
  abi: abi, // ABI del contrato
});


