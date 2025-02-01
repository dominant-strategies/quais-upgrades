import type { Deployment, RemoteDeploymentId } from '@quai/quais-upgrades-core';
import type { ContractFactory, ContractMethodArgs } from 'quais';
import * as ethers from 'quais';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { defenderDeploy } from '../defender/deploy';
import { EthersDeployOptions, DefenderDeployOptions, UpgradeOptions } from './options';
const { deployMetadata } = require("hardhat")

export interface DeployTransaction {
  deployTransaction?: ethers.TransactionResponse;
}

// Defender always includes RemoteDeploymentId, while ethers always includes DeployTransaction
export type EthersOrDefenderDeployment = Required<Deployment> & DeployTransaction & RemoteDeploymentId;
export type DefenderDeployment = Required<Deployment & RemoteDeploymentId> & DeployTransaction;
export type EthersDeployment = Required<Deployment & DeployTransaction> & RemoteDeploymentId;

export async function deploy(
  hre: HardhatRuntimeEnvironment,
  opts: UpgradeOptions & EthersDeployOptions & DefenderDeployOptions,
  factory: ContractFactory,
  ...args: unknown[]
): Promise<EthersOrDefenderDeployment> {
  if (opts?.useDefenderDeploy) {
    return await defenderDeploy(hre, factory, opts, ...args);
  } else {
    if (opts.txOverrides !== undefined) {
      args.push(opts.txOverrides);
    }
    // @ts-ignore
    const ipfsHash = hre.pushMetadataToIPFSWithBytecode(factory.bytecode)
    console.log("ipfsHash", ipfsHash)
    return await ethersDeploy(factory, ipfsHash, ...args);
  }
}

async function ethersDeploy(
  factory: ContractFactory,
  IPFSHash: string,
  ...args: ContractMethodArgs<unknown[]>
): Promise<EthersDeployment> {
  factory.setIPFSHash(IPFSHash);
  const contractInstance = await factory.deploy(...args);

  const deployTransaction = contractInstance.deploymentTransaction();
  if (deployTransaction === null) {
    throw new Error('Broken invariant: deploymentTransaction is null');
  }

  const address = await contractInstance.getAddress();
  const txHash = deployTransaction.hash;

  return { address, txHash, deployTransaction };
}
