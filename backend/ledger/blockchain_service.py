import logging
import os

logger = logging.getLogger(__name__)

CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS", "")
RPC_URL = os.getenv("WEB3_PROVIDER_URL", "")


class BlockchainService:
    def __init__(self):
        self._w3 = None
        self._contract = None

    def _get_web3(self):
        if self._w3 is None and RPC_URL:
            try:
                from web3 import Web3
                self._w3 = Web3(Web3.HTTPProvider(RPC_URL))
            except Exception as e:
                logger.warning("Web3 connection failed: %s", e)
        return self._w3

    def record_payout_on_chain(self, sender_addr, receiver_addr, amount, tax):
        logger.info(
            "[Blockchain] Recording payout: %s -> %s, Amount: %s, Tax: %s",
            sender_addr, receiver_addr, amount, tax,
        )
        return "0x_mock_transaction_hash"

    def get_user_payouts(self, user_addr):
        return []


blockchain_service = BlockchainService()
