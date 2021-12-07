import http from "http";
import ethers from "ethers";
import express from "express";
import chalk from "chalk";
import Web3 from "web3";


import {
  recipient,
  privateKey,
  WBNB,
  router,
  mainnetURL,
  gasPrice,
  gasLimit,
  logo,
  tokenList,
  routerABI,
  tokenABI,
  factory,
  factoryABI,
  pairABI,
  usdtAddress,
} from "./config.js";



const app = express();
const httpServer = http.createServer(app);
let web3 = new Web3(mainnetURL);
const provider = new ethers.providers.JsonRpcProvider(mainnetURL);
var wallet = new ethers.Wallet(privateKey);
const account = wallet.connect(provider);
let routerContract = new ethers.Contract(router, routerABI, account);
let factoryContract = new ethers.Contract(factory, factoryABI, account);

const run = async (isProd) => {
  try {
    // check wallet balance
    let walletBalance = await web3.eth.getBalance(recipient);
    walletBalance = Math.round(walletBalance / 1000000000000) / 1000000;
    console.log(
      chalk.yellow(
        "Wallet Address : ",
        recipient,
        "       Balance of Wallet : ",
        walletBalance,
        "\n\n"
      )
    );
    // check Json data
    for (let i = 0; i < tokenList.length; i++) {
      console.log(
        chalk.green(
          "  ",
          i,
          "- token address : ",
          tokenList[i].contract,
          ",  slippage : ",
          tokenList[i].slippage,
          "%, impact : ",
          tokenList[i].price_impact
        )
      );
    }
    await checkBalance();
    console.log(chalk.yellow("\n\nBot is starting to sell!\n\n"));
    for (let i = 0; i < tokenList.length; i++) {
      await sellToken(
        tokenList[i].contract,
        tokenList[i].slippage,
        tokenList[i].price_impact,
        isProd
      );
    }
  } catch (err) {}
};


const checkBalance = async () => {
  console.log(
    chalk.yellow(
      "\n====================================================== \n Token Balance Check... \n"
    )
  );
  for (let i = 0; i < tokenList.length; i++) {
    try {
      let tokenContract = new ethers.Contract(
        tokenList[i].contract,
        tokenABI,
        account
      );
      let tokenDecimals = await tokenContract.decimals();
      let balance = await tokenContract.balanceOf(recipient);
      console.log(chalk.green(" ", i, "th token Balance : ",  Math.round(balance / Math.pow(10, tokenDecimals - 6)) / 1000000));
    } catch (err) {}
  }
};



const sellToken = async (tokenAddress, slippage, impact, isProd) => {
 
  try {
    let tokenContract = new ethers.Contract(tokenAddress, tokenABI, account);
    let balance       = await tokenContract.balanceOf(recipient);
    
    if (parseInt(balance / 1) === 0) {
      console.log(chalk.red("token balance is 0"));
      
    }


    let pairAddress  = await factoryContract.getPair(WBNB, tokenAddress);
    let pairContract = new ethers.Contract(pairAddress, pairABI, account);
    let reserves     = await pairContract.getReserves();

    

    let token0Address =  await pairContract.token0();
    let tokenAmount
    let sellAmount;

    if  (web3.utils.toChecksumAddress(token0Address) === WBNB){
      tokenAmount = Math.round(reserves._reserve1 * impact * 0.01);

    } else {
      tokenAmount = Math.round(reserves._reserve0 * impact * 0.01);
    }

    console.log(tokenAmount)

    if ((balance / 1) > (tokenAmount / 1)) {
      sellAmount = tokenAmount / 1;
    } else {
      sellAmount = balance / 1;
    }


    sellAmount = ethers.BigNumber.from("0x"+ sellAmount.toString(16) + '');

    let usdtAmount = await routerContract.getAmountsOut(sellAmount, [
      tokenAddress,
      usdtAddress,
    ]);

    usdtAmount = Math.round(usdtAmount[1] * slippage * 0.01);

    usdtAmount = ethers.BigNumber.from("0x"+ usdtAmount.toString(16) + "");

    console.log(sellAmount, usdtAmount)
    console.log(
      chalk.green(
        "sell...\n   token address:",
        tokenAddress,
        ", sellAmount : ",
        (parseInt(sellAmount)  / Math.pow(10, 18)).toFixed(2),
        ", slippage : ",
        slippage,
        ", impact : ",
        impact,
        "\n"
      )
    );

    if (isProd) {
      let usdtContract = new ethers.Contract(usdtAddress, tokenABI, account);
      let allowance = await tokenContract.allowance(recipient, router);
      if (allowance / 1 < sellAmount / 1) {
        try {
          const approve = await tokenContract.approve(router, ethers.BigNumber.from("0xffffffffffffffffffff"), {
              gasLimit: gasLimit + "",
              gasPrice: ethers.utils.parseUnits(gasPrice + "", "gwei"),
            })
            .catch((err) => {
              console.log(chalk.red("Token Approve failed..."));
              return;
            });
          await approve.wait();
          console.log(chalk.green("Approve success"));
        } catch (err) {
          console.log(err)
        }
      }

      let previousbalance = await usdtContract.balanceOf(recipient);
      const tokenSell = await routerContract
        .swapExactTokensForTokens(
          sellAmount,
          usdtAmount,
          [tokenAddress, WBNB, usdtAddress],
          recipient,
          Date.now() + 1000 * 60 * 10, //10 minutes
          {
            gasLimit: gasLimit,
            gasPrice: ethers.utils.parseUnits(gasPrice, "gwei"),
          }
        )
        .catch((err) => {
          console.log(chalk.red("\n Sell Token Failed"));
          return;
        });
      await tokenSell.wait();
      console.log("sell success");
      let laterbalance = await usdtContract.balanceOf(recipient);
      let addBalance = laterbalance / 1 - previousbalance / 1;
      console.log(
        chalk.green(
          "Sell token success! \n",
          sellAmount / 1,
          "token is saled for  ",
          Math.round(addBalance / 1000000000000) / 1000000,
          "USDT\n",
          "txHash : ",
          tokenSell.hash
        )
      );
    }
  } catch (err) {
    console.log(err);
  }
};

run(false);
