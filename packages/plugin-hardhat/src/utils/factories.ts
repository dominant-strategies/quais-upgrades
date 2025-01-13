import { ContractFactory, Signer } from 'quais';
import * as ethers from 'quais';

import ERC1967Proxy from '../artifacts/ERC1967Proxy.json';
import BeaconProxy from '../artifacts/BeaconProxy.json';
import UpgradeableBeacon from '../artifacts/UpgradeableBeacon.json';
import TransparentUpgradeableProxy from '../artifacts/TransparentUpgradeableProxy.json';

import { HardhatRuntimeEnvironment } from 'hardhat/types';

export async function getProxyFactory(hre: HardhatRuntimeEnvironment, signer?: Signer): Promise<ContractFactory> {
  return new ethers.ContractFactory(ERC1967Proxy.abi, ERC1967Proxy.bytecode, signer);
}

export async function getTransparentUpgradeableProxyFactory(
  hre: HardhatRuntimeEnvironment,
  signer?: Signer,
): Promise<ContractFactory> {
  return new ethers.ContractFactory(TransparentUpgradeableProxy.abi, TransparentUpgradeableProxy.bytecode, signer);
}

export async function getBeaconProxyFactory(hre: HardhatRuntimeEnvironment, signer?: Signer): Promise<ContractFactory> {
  return new ethers.ContractFactory(BeaconProxy.abi, BeaconProxy.bytecode, signer);
}

export async function getUpgradeableBeaconFactory(
  hre: HardhatRuntimeEnvironment,
  signer?: Signer,
): Promise<ContractFactory> {
  return new ethers.ContractFactory(UpgradeableBeacon.abi, UpgradeableBeacon.bytecode, signer);
}
