const { ethers, upgrades } = require('hardhat');
const assert = require("assert");
describe('CheckContract', async () => {
  it('deploys mPUNDIX', async function () {
    const mPUNDIXFactory = await ethers.getContractFactory('mPUNDIX');
    mPUNDIX = await mPUNDIXFactory.deploy();
  });

  it('deploys mPURSE', async function () {
    const mPURSEFactory = await ethers.getContractFactory('mPURSE');
    mPURSE = await mPURSEFactory.deploy();
  });

  it('deploys Liquidity and test deposit function', async function () {
    [account] = await ethers.getSigners();
    mPUNDIX.mint(account.address, 1000000000);


    const LiquidityFactory = await ethers.getContractFactory('Liquidity');
    Liquidity = await LiquidityFactory.deploy();
    mPUNDIX.connect(account).approve(Liquidity.address, await mPUNDIX.balanceOf(account.address));

    balance_1 = await mPUNDIX.balanceOf(account.address);

    console.log(await mPUNDIX.balanceOf(account.address));

    await mPURSE.mint(Liquidity.address, 1000000000);
    await mPURSE.connect(account).approve(Liquidity.address, await mPURSE.balanceOf(account.address));

    await Liquidity.Deposit(account.address, mPUNDIX.address, mPURSE.address);

    console.log(await mPURSE.balanceOf(account.address));
    console.log(await mPUNDIX.balanceOf(account.address));
    balance_2 = await mPURSE.balanceOf(account.address);
    assert.equal(balance_1.value,balance_2.value);
    assert.equal("0",await mPUNDIX.balanceOf(account.address));
  });


  it('test withdraw function', async function () {
    // [account] = await ethers.getSigners();

    balance_1 = await mPURSE.balanceOf(account.address);

    console.log(await mPUNDIX.balanceOf(account.address));
    console.log(await mPURSE.balanceOf(account.address));

    await mPURSE.connect(account).approve(Liquidity.address, await mPURSE.balanceOf(account.address));
    await mPURSE.mint(Liquidity.address, 1000000000);

    await Liquidity.Withdraw(account.address, mPUNDIX.address, mPURSE.address);

    console.log(await mPUNDIX.balanceOf(account.address));
    console.log(await mPURSE.balanceOf(account.address));
    balance_2 = await mPUNDIX.balanceOf(account.address);
    assert.equal(balance_1.value,balance_2.value)
    assert.equal("0",await mPURSE.balanceOf(account.address));
  });

  // it('check can not pass', async () => {
  //   const CallWithFunctionFactory = await ethers.getContractFactory('CallWithFunction');
  //   CallWithFunction_ = await CallWithFunctionFactory.deploy();
  //   try {
  //   	await CallWithFunction_.callcontract(DangV1.address);
  //   	assert(false);
  //   }
  //   catch(err) {
  //   	assert(err);
  //   }
  // });

  // it('check pass because call to attack with constructor', async () => {
  //   const CallWithConstructorFactory = await ethers.getContractFactory('CallWithConstructor');
  //   assert.ok(await CallWithConstructorFactory.deploy(DangV1.address));

  // });


});