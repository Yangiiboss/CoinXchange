from flask import Flask, request, jsonify
from web3 import Web3
import requests
import random
import os

app = Flask(__name__)

# --- CONFIG ---
BSC_RPC = "https://bsc-dataseed.binance.org/"
CONTRACT_ADDRESS = "0x72fb93c58ab7afadbf75e982a5b6d2cb6134247b"
PLATFORM_FEE = 0.009

@app.route('/api/py/rates', methods=['GET'])
def get_rates():
    crypto = request.args.get('crypto', 'USDT')
    amount = float(request.args.get('amount', 0))
    
    # Mock Rate Aggregation (Simulating Binance, Transak, etc.)
    base_rates = {
        "USDT": 1680.00, "BTC": 115000000.00, "ETH": 6200000.00,
        "BNB": 1050000.00, "TRX": 195.00, "DOGE": 280.00
    }
    
    market_price = base_rates.get(crypto, 1000.0)
    
    # Simulate providers
    providers = {
        "Binance P2P": market_price * random.uniform(0.99, 1.01),
        "Transak": market_price * random.uniform(0.98, 1.00),
        "Breet": market_price * random.uniform(0.97, 0.99),
        "YellowCard": market_price * random.uniform(0.98, 1.005)
    }
    
    best_provider = max(providers, key=providers.get)
    best_rate = providers[best_provider]
    
    gross_ngn = amount * best_rate
    fee_amount = gross_ngn * PLATFORM_FEE
    net_ngn = gross_ngn - fee_amount
    
    return jsonify({
        "provider": best_provider,
        "rate": round(best_rate, 2),
        "gross_ngn": round(gross_ngn, 2),
        "fee": round(fee_amount, 2),
        "net_ngn": round(net_ngn, 2)
    })

@app.route('/api/py/resolve', methods=['POST'])
def resolve_account():
    data = request.json
    account_number = data.get('account_number')
    bank_code = data.get('bank_code')
    
    # Mock Paystack Resolution
    if len(str(account_number)) == 10:
        return jsonify({
            "status": True,
            "account_name": "MOCK USER NAME"
        })
    return jsonify({"status": False, "message": "Invalid account"}), 400

@app.route('/api/py/deposit', methods=['GET'])
def check_deposit():
    # Real Web3 Check
    try:
        w3 = Web3(Web3.HTTPProvider(BSC_RPC))
        balance = w3.eth.get_balance(CONTRACT_ADDRESS)
        eth_balance = w3.from_wei(balance, 'ether')
        return jsonify({
            "address": CONTRACT_ADDRESS,
            "balance": float(eth_balance),
            "status": "active"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
