import { getContract } from "thirdweb";
import { client } from "./client"; // el archivo que ya tienes
import { avalancheFuji } from "thirdweb/chains";
import abi from "./abi.json";

// Dirección del contrato desplegado (reemplaza con tu propia dirección)
export const CONTRACT_ADDRESS = "0x1053be1BFFa4B1e7450b96fF86047Df68C8dd150";


export const contract = getContract({
  client,
  chain: avalancheFuji,
  address: CONTRACT_ADDRESS,  
  abi: abi, // ABI del contrato
});

