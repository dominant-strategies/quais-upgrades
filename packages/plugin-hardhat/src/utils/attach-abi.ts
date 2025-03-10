import { Contract, Signer } from 'quais';

import ITransparentUpgradeableProxyV5 from '../artifacts/ITransparentUpgradeableProxy.json';
import ITransparentUpgradeableProxyV4 from '@quai/quais-upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol/ITransparentUpgradeableProxy.json';

import ProxyAdminV5 from '../artifacts/ProxyAdmin.json';
import ProxyAdminV4 from '@quai/quais-upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol/ProxyAdmin.json';

import { HardhatRuntimeEnvironment } from 'hardhat/types';

export async function attachITransparentUpgradeableProxyV5(
  hre: HardhatRuntimeEnvironment,
  address: string,
  signer?: Signer,
): Promise<Contract> {
  return hre.ethers.getContractAt(ITransparentUpgradeableProxyV5.abi, address, signer);
}

export async function attachITransparentUpgradeableProxyV4(
  hre: HardhatRuntimeEnvironment,
  address: string,
  signer?: Signer,
): Promise<Contract> {
  return hre.ethers.getContractAt(ITransparentUpgradeableProxyV4.abi, address, signer);
}

export async function attachProxyAdminV5(
  hre: HardhatRuntimeEnvironment,
  address: string,
  signer?: Signer,
): Promise<Contract> {
  return hre.ethers.getContractAt(ProxyAdminV5.abi, address, signer);
}

export async function attachProxyAdminV4(
  hre: HardhatRuntimeEnvironment,
  address: string,
  signer?: Signer,
): Promise<Contract> {
  return hre.ethers.getContractAt(ProxyAdminV4.abi, address, signer);
}
