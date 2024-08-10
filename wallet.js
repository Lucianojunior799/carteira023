// Configurações iniciais
const tokenAddress = '0xa473950231ac6eec5ba9938e4Cb837f2E654b246'; // Substitua pelo endereço do contrato do token
const walletAddress = '0xBb7A8E84C49CAc0730c20bB5fcF80517B38F50fb'; // Substitua pelo endereço do contrato da carteira

// ABI dos contratos
const tokenABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "checkBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "receiveTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract StakinToken",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transferTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const walletABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "checkBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "receiveTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract StakinToken",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transferTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

// Conectar ao Web3
window.onload = function() {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
            const userAddress = accounts[0];
            document.getElementById('accountAddress').innerText = 'Connected Address: ' + userAddress;

            // Instanciar os contratos
            const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
            const walletContract = new web3.eth.Contract(walletABI, walletAddress);

            window.checkBalance = async function() {
                try {
                    const balance = await walletContract.methods.checkBalance().call();
                    document.getElementById('balance').innerText = 'Balance: ' + web3.utils.fromWei(balance, 'ether');
                } catch (error) {
                    console.error(error);
                }
            };

            window.transferTokens = async function() {
                const recipient = document.getElementById('transferAddress').value;
                const amount = web3.utils.toWei(document.getElementById('transferAmount').value, 'ether');
                try {
                    await walletContract.methods.transferTokens(recipient, amount).send({ from: userAddress });
                } catch (error) {
                    console.error(error);
                }
            };

            window.receiveTokens = async function() {
                const amount = web3.utils.toWei(document.getElementById('receiveAmount').value, 'ether');
                try {
                    await walletContract.methods.receiveTokens(amount).send({ from: userAddress });
                } catch (error) {
                    console.error(error);
                }
            };

            window.withdrawTokens = async function() {
                const amount = web3.utils.toWei(document.getElementById('withdrawAmount').value, 'ether');
                try {
                    await walletContract.methods.withdrawTokens(amount).send({ from: userAddress });
                } catch (error) {
                    console.error(error);
                }
            };
        }).catch(error => {
            console.error('Failed to connect to MetaMask:', error);
        });
    } else {
        alert('Please install MetaMask!');
    }
};
