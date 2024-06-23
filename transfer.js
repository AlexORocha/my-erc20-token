const { Web3 } = require('web3');
require('dotenv').config();

// Variáveis de ambiente
const privateKey = process.env.MY_PRIVATE_KEY; // Chave privada da carteira de origem
const nodeHttpsUrl = process.env.MY_NODE_HTTPS_URL; // URL de acesso ao nó da rede blockchain
const tokenAddress = process.env.MY_TOKEN_ADDRESS; // Endereço do contrato do Token
const fromAddress = process.env.MY_WALLET_A; // Carteira A - que irá realizar o saque
const toAddress = process.env.MY_WALLET_B; // Carteira B - que irá receber o depósito

// Conexão com a Rede Blockchain
const web3 = new Web3(nodeHttpsUrl);

// ABI do Contrato
const tokenABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "type": "function"
  }
];

// Valor a ser transferido (em unidades do token, não wei)
const amount = web3.utils.toWei('10', 'ether'); // Substitua '10' pelo número de tokens que deseja transferir

const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

// Função para obter a taxa de gás da rede atualmente
const getGasPrice = async () => {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    console.log('Preço atual do gás em wei:', gasPrice.toString());

    // Convertendo o preço do gás para gwei
    const gasPriceInGwei = web3.utils.fromWei(gasPrice, 'gwei');
    console.log('Preço atual do gás em gwei:', gasPriceInGwei);
    return gasPrice;
  } catch (error) {
    console.error('Erro ao obter o preço do gás:', error);
  }
};

const transferTokens = async () => {
  try {
    // Obtenha o preço do gás
    const gasPrice = await getGasPrice();

    // Estimar o limite de gás
    const gasLimit = await tokenContract.methods.transfer(toAddress, amount).estimateGas({ from: fromAddress });

    // Obtenha o nonce para a transação
    const nonce = await web3.eth.getTransactionCount(fromAddress, 'latest');

    // Crie o objeto de transação
    const tx = {
      from: fromAddress,
      to: tokenAddress,
      nonce: nonce,
      gas: gasLimit,
      gasPrice: gasPrice,
      data: tokenContract.methods.transfer(toAddress, amount).encodeABI()
    };

    // Assine a transação
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    // Envie a transação assinada
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('Transação enviada com sucesso:', receipt);
  } catch (error) {
    console.error('Erro ao enviar a transação:', error);
  }
};

transferTokens();
