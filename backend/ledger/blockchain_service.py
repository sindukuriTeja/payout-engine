import os
from web3 import Web3
from django.conf import settings

# Mock ABI and Contract Address for demonstration
# In a real scenario, these would be loaded from environment variables or build artifacts
CONTRACT_ABI = [
    {
        "inputs": [
            {"internalType": "address", "name": "_sender", "type": "address"},
            {"internalType": "address", "name": "_receiver", "type": "address"},
            {"internalType": "uint256", "name": "_amount", "type": "uint256"},
            {"internalType": "uint256", "name": "_tax", "type": "uint256"}
        ],
        "name": "recordPayout",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
        "name": "getPayoutsByUser",
        "outputs": [
            {
                "components": [
                    {"internalType": "address", "name": "sender", "type": "address"},
                    {"internalType": "address", "name": "receiver", "type": "address"},
                    {"internalType": "uint256", "name": "amount", "type": "uint256"},
                    {"internalType": "uint256", "name": "tax", "type": "uint256"},
                    {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
                ],
                "internalType": "struct PayoutRegistry.Payout[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS", "0x0000000000000000000000000000000000000000")
RPC_URL = os.getenv("WEB3_PROVIDER_URL", "http://127.0.0.1:8545")

class BlockchainService:
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider(RPC_URL))
        self.contract = self.w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)

    def record_payout_on_chain(self, sender_addr, receiver_addr, amount, tax):
        """
        Records a payout on the blockchain. 
        Note: This would typically require a private key to sign the transaction.
        For this demo, we'll log the intention.
        """
        print(f"[Blockchain] Recording payout: {sender_addr} -> {receiver_addr}, Amount: {amount}, Tax: {tax}")
        
        # In a real implementation:
        # account = self.w3.eth.account.from_key(os.getenv("PRIVATE_KEY"))
        # nonce = self.w3.eth.get_transaction_count(account.address)
        # txn = self.contract.functions.recordPayout(sender_addr, receiver_addr, amount, tax).build_transaction({
        #     'chainId': 1337,
        #     'gas': 2000000,
        #     'gasPrice': self.w3.to_wei('50', 'gwei'),
        #     'nonce': nonce,
        # })
        # signed_txn = self.w3.eth.account.sign_transaction(txn, private_key=os.getenv("PRIVATE_KEY"))
        # tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        # return tx_hash.hex()
        
        return "0x_mock_transaction_hash"

    def get_user_payouts(self, user_addr):
        if not self.w3.is_address(user_addr):
            return []
        try:
            return self.contract.functions.getPayoutsByUser(user_addr).call()
        except Exception as e:
            print(f"Error fetching from blockchain: {e}")
            return []

blockchain_service = BlockchainService()
