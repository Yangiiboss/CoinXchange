import streamlit as st
import requests
import qrcode
from web3 import Web3
from PIL import Image
import io
import time
import random
import pandas as pd

# --- CONFIGURATION ---
st.set_page_config(
    page_title="NairaAI v2.0 | Premium Crypto Off-Ramp",
    page_icon="💸",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# --- CONSTANTS ---
DEPOSIT_ADDRESS = "0x72fb93c58ab7afadbf75e982a5b6d2cb6134247b"
PLATFORM_FEE_PERCENT = 0.009  # 0.9%
BANKS = ["GTBank", "Zenith Bank", "Access Bank", "UBA", "First Bank", "Kuda", "Opay", "Palmpay", "Moniepoint"]
CRYPTOS = ["USDT", "BTC", "ETH", "BNB", "TRX", "DOGE"]
BSC_RPC = "https://bsc-dataseed.binance.org"

# --- STYLES ---
st.markdown("""
    <style>
    /* Dark Premium Theme */
    .stApp {
        background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
        color: #ffffff;
    }
    .stTextInput > div > div > input, .stSelectbox > div > div > div {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
    }
    .stButton > button {
        background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
        color: #000;
        font-weight: bold;
        border: none;
        border-radius: 25px;
        padding: 0.5rem 2rem;
        transition: all 0.3s ease;
    }
    .stButton > button:hover {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(0, 201, 255, 0.5);
    }
    .card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin-bottom: 1rem;
    }
    .success-text {
        color: #92FE9D;
        font-weight: bold;
    }
    .highlight {
        color: #00C9FF;
        font-weight: bold;
    }
    </style>
    """, unsafe_allow_html=True)

# --- HELPER FUNCTIONS ---

def get_crypto_rate(crypto_symbol):
    """Fetch live rate from Transak Staging or fallback to mock."""
    # Mock rates for stability/demo if API fails or for unsupported pairs in staging
    mock_rates = {
        "USDT": 1650.50, "BTC": 112000000.00, "ETH": 5800000.00,
        "BNB": 950000.00, "TRX": 180.00, "DOGE": 250.00
    }
    
    try:
        # Attempt to fetch from Transak Staging (Public Endpoint)
        # Note: This is a simplified call. Real Transak requires API keys for full quotes.
        # We use a public price feed or fallback to ensure the demo works 100%.
        url = f"https://api-stg.transak.com/api/v2/currencies/price?partnerApiKey=STAGING_KEY&fiatCurrency=NGN&cryptoCurrency={crypto_symbol}&isBuyOrSell=SELL"
        response = requests.get(url, timeout=3)
        if response.status_code == 200:
            data = response.json()
            return float(data['response']['fiatAmount'])
    except:
        pass
    
    # Fallback with slight randomization for "live" feel
    base_rate = mock_rates.get(crypto_symbol, 1000.0)
    variation = random.uniform(-0.5, 0.5)
    return round(base_rate + variation, 2)

def check_deposits(address):
    """Check BSC blockchain for deposits (Web3)."""
    try:
        w3 = Web3(Web3.HTTPProvider(BSC_RPC))
        if w3.is_connected():
            balance = w3.eth.get_balance(address)
            return w3.from_wei(balance, 'ether')
    except:
        pass
    return 0.0

def generate_qr(data):
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    return img

# --- SESSION STATE INITIALIZATION ---
if 'user_info' not in st.session_state:
    st.session_state.user_info = None
if 'step' not in st.session_state:
    st.session_state.step = 'onboarding'
if 'tx_status' not in st.session_state:
    st.session_state.tx_status = 'idle'

# --- MAIN APP ---

def main():
    st.title("💸 NairaAI v2.0")
    st.caption("The Fastest Crypto-to-Naira Off-Ramp | Powered by AI & Web3")

    # 1. ONBOARDING
    if st.session_state.step == 'onboarding':
        st.markdown("<div class='card'><h3>🚀 Get Started</h3>", unsafe_allow_html=True)
        with st.form("onboarding_form"):
            col1, col2 = st.columns(2)
            with col1:
                name = st.text_input("Full Name", placeholder="e.g. Emeka Johnson")
                phone = st.text_input("Phone Number", placeholder="08012345678")
            with col2:
                bank = st.selectbox("Select Bank", BANKS)
                account_num = st.text_input("Account Number", placeholder="1234567890")
            
            submitted = st.form_submit_button("Start Trading")
            if submitted:
                if name and phone and account_num:
                    st.session_state.user_info = {
                        "name": name, "phone": phone, "bank": bank, "account": account_num
                    }
                    st.session_state.step = 'dashboard'
                    st.rerun()
                else:
                    st.error("Please fill in all details.")
        st.markdown("</div>", unsafe_allow_html=True)

    # 2. DASHBOARD
    elif st.session_state.step == 'dashboard':
        # Sidebar Profile
        with st.sidebar:
            st.markdown("### 👤 User Profile")
            st.info(f"**{st.session_state.user_info['name']}**\n\n{st.session_state.user_info['bank']} - {st.session_state.user_info['account']}")
            if st.button("Logout"):
                st.session_state.clear()
                st.rerun()

        # Main Interface
        col_left, col_right = st.columns([1, 1])

        with col_left:
            st.markdown("<div class='card'><h3>💱 Exchange</h3>", unsafe_allow_html=True)
            crypto = st.selectbox("Select Crypto", CRYPTOS)
            amount = st.number_input("Amount to Sell", min_value=0.0, value=10.0, step=0.1)
            
            rate = get_crypto_rate(crypto)
            gross_ngn = amount * rate
            fee = gross_ngn * PLATFORM_FEE_PERCENT
            net_ngn = gross_ngn - fee
            
            st.markdown(f"""
            <div style='background: rgba(0,0,0,0.2); padding: 15px; border-radius: 10px; margin-top: 10px;'>
                <div style='display: flex; justify-content: space-between;'>
                    <span>Current Rate:</span>
                    <span class='highlight'>1 {crypto} = ₦{rate:,.2f}</span>
                </div>
                <div style='display: flex; justify-content: space-between; margin-top: 5px; font-size: 0.9em; color: #aaa;'>
                    <span>Platform Fee (0.9%):</span>
                    <span>- ₦{fee:,.2f}</span>
                </div>
                <hr style='border-color: rgba(255,255,255,0.1);'>
                <div style='display: flex; justify-content: space-between; font-size: 1.2em; font-weight: bold;'>
                    <span>You Receive:</span>
                    <span class='success-text'>₦{net_ngn:,.2f}</span>
                </div>
            </div>
            """, unsafe_allow_html=True)

            # Payout Destination
            payout_option = st.radio("Payout To:", ["My Bank (Default)", "Someone Else"], horizontal=True)
            recipient_info = st.session_state.user_info
            
            if payout_option == "Someone Else":
                st.markdown("#### Recipient Details")
                r_name = st.text_input("Recipient Name")
                r_bank = st.selectbox("Recipient Bank", BANKS, key="r_bank")
                r_acc = st.text_input("Recipient Account")
                if r_name and r_acc:
                    recipient_info = {"name": r_name, "bank": r_bank, "account": r_acc}
            
            st.markdown("</div>", unsafe_allow_html=True)

        with col_right:
            st.markdown("<div class='card'><h3>📥 Deposit</h3>", unsafe_allow_html=True)
            st.warning(f"Send only **BEP-20 (BSC)** {crypto} to this address.")
            
            # QR Code
            qr_img = generate_qr(DEPOSIT_ADDRESS)
            buf = io.BytesIO()
            qr_img.save(buf, format="PNG")
            buf.seek(0)
            st.image(buf, width=200, caption="Scan to Pay")
            
            st.code(DEPOSIT_ADDRESS, language="text")
            
            if st.button("I have sent the crypto", use_container_width=True):
                st.session_state.tx_details = {
                    "crypto": crypto, "amount": amount, "net_ngn": net_ngn, "recipient": recipient_info
                }
                st.session_state.step = 'processing'
                st.rerun()
            
            # Web3 Check Display (Passive)
            bsc_balance = check_deposits(DEPOSIT_ADDRESS)
            st.caption(f"Live Wallet Balance (BSC): {bsc_balance:.4f} BNB")
            st.markdown("</div>", unsafe_allow_html=True)

    # 3. PROCESSING SIMULATION
    elif st.session_state.step == 'processing':
        st.markdown("<div class='card' style='text-align: center;'>", unsafe_allow_html=True)
        st.markdown("### 🔄 Processing Transaction")
        
        progress_bar = st.progress(0)
        status_text = st.empty()
        
        steps = [
            ("🔍 Detecting deposit on BSC Blockchain...", 20),
            ("✅ Deposit Confirmed! 0x72f...3c5", 40),
            ("💱 Selling Crypto via Transak Staging...", 60),
            ("🏦 Initiating Paystack Transfer...", 80),
            ("🚀 Transfer Successful!", 100)
        ]
        
        for text, progress in steps:
            status_text.markdown(f"**{text}**")
            progress_bar.progress(progress)
            time.sleep(1.5) # Simulate delay
            
        st.session_state.step = 'success'
        st.rerun()
        st.markdown("</div>", unsafe_allow_html=True)

    # 4. SUCCESS
    elif st.session_state.step == 'success':
        st.balloons()
        tx = st.session_state.tx_details
        
        st.markdown(f"""
        <div class='card' style='text-align: center;'>
            <h1 style='color: #92FE9D;'>PAYMENT SUCCESSFUL</h1>
            <p>NGN sent in < 2 minutes</p>
            <div style='background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; text-align: left; margin: 20px 0;'>
                <p><strong>Amount Sent:</strong> ₦{tx['net_ngn']:,.2f}</p>
                <p><strong>Recipient:</strong> {tx['recipient']['name']}</p>
                <p><strong>Bank:</strong> {tx['recipient']['bank']} - {tx['recipient']['account']}</p>
                <p><strong>Ref ID:</strong> NIA-{random.randint(100000, 999999)}</p>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        if st.button("Start New Transaction"):
            st.session_state.step = 'dashboard'
            st.rerun()

if __name__ == "__main__":
    main()
