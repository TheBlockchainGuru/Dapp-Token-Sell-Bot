
export const  recipient   = "0x26349164ffB68FA23a25EE9FcC9F30E40fA13880"
export const  privateKey  = "80b567dd2babeb4fb917bb7bb4a3cef0e85113b59d50ef693b3d0a18fbd8baf6"
export const  WBNB        = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
export const  router      = "0x10ED43C718714eb63d5aA57B78B54704E256024E"
export const  factory     = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"
export const  usdtAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
export const  mainnetURL  =  "https://bsc-dataseed.binance.org/"
export const  gasPrice    =  "5"
export const  gasLimit    =  "345684"
export const  logo        =  "\n\n████████╗░█████╗░██╗░░██╗███████╗███╗░░██╗  ░██████╗███████╗██╗░░░░░██╗░░░░░  ██████╗░░█████╗░████████╗\n╚══██╔══╝██╔══██╗██║░██╔╝██╔════╝████╗░██║  ██╔════╝██╔════╝██║░░░░░██║░░░░░  ██╔══██╗██╔══██╗╚══██╔══╝\n░░░██║░░░██║░░██║█████═╝░█████╗░░██╔██╗██║  ╚█████╗░█████╗░░██║░░░░░██║░░░░░  ██████╦╝██║░░██║░░░██║░░░\n░░░██║░░░██║░░██║██╔═██╗░██╔══╝░░██║╚████║  ░╚═══██╗██╔══╝░░██║░░░░░██║░░░░░  ██╔══██╗██║░░██║░░░██║░░░\n░░░██║░░░╚█████╔╝██║░╚██╗███████╗██║░╚███║  ██████╔╝███████╗███████╗███████╗  ██████╦╝╚█████╔╝░░░██║░░░\n░░░╚═╝░░░░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚══╝  ╚═════╝░╚══════╝╚══════╝╚══════╝  ╚═════╝░░╚════╝░░░░╚═╝░░░\n"
export const routerABI  = ['function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)','function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)','function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)','function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'];
export const tokenABI   = [{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
export const factoryABI = [{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]
export const pairABI    = [{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]
export const tokenList = [
    {
      contract: "0xE9C803F48dFFE50180Bd5B01dC04DA939E3445Fc",
      slippage: 12,
      price_impact: 0.15,
    }
];