const { ethers, upgrades } = require('hardhat');

async function main() {
	const mPURSEFactory = await ethers.getContractFactory('mPURSE');
	console.log("Deploying ... ");
	mPURSE = await upgrades.deployProxy(mPURSEFactory, { kind: 'uups' });
	await mPURSE.deployed();
	console.log("mPURSE deployed to:", mPURSE.address);
	implementationContractAddress_liquid = await upgrades.erc1967.getImplementationAddress(mPURSE.address);
  	console.log('mPURSE Implementation Address:', implementationContractAddress_liquid);

	const mPUNDIXFactory = await ethers.getContractFactory('mPUNDIX');
	console.log("Deploying ... ");
	mPUNDIX = await upgrades.deployProxy(mPUNDIXFactory, { kind: 'uups' });
	await mPUNDIX.deployed();
	console.log("mPUNDIX deployed to:", mPUNDIX.address);
	implementationContractAddress_mPUNDIX = await upgrades.erc1967.getImplementationAddress(mPUNDIX.address);
  	console.log('mPUNDIX Implementation Address:', implementationContractAddress_mPUNDIX);

	const LiquidityFactory = await ethers.getContractFactory('Liquidity');
	Liquidity = await upgrades.deployProxy(LiquidityFactory, { kind: 'uups' });
	await Liquidity.deployed();
	console.log("Liquidity deployed to:", Liquidity.address);
	implementationContractAddress_Liquidity = await upgrades.erc1967.getImplementationAddress(Liquidity.address);
  	console.log('Liquidity Implementation Address:', implementationContractAddress_Liquidity);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
