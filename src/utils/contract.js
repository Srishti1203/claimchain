import { ethers } from "ethers";
import ReportChainABI from "../utils/ReportChainABI.json"; // Now the path is correct!

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, ReportChainABI, signer);
};
