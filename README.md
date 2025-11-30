# NairaAI v2.0 💸

The fastest Crypto-to-Naira off-ramp app. Built with Streamlit, Web3, and AI.

## Features
- **Instant Off-Ramp**: Convert USDT, BTC, ETH, etc., to Naira instantly.
- **Dark Premium UI**: Sleek, modern interface.
- **Live Rates**: Fetches real-time rates from Transak Staging (with robust fallbacks).
- **Web3 Integration**: Monitors BSC deposits.
- **Simulation Mode**: Fully functional demo mode for testing without real funds.

## 🚀 Quick Start (Local)

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the App**
   ```bash
   streamlit run app.py
   ```

## 🌐 Deploy to Render.com (Free Tier)

1. **Push this code to GitHub**.
2. Go to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository.
5. Use the following settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `streamlit run app.py`
6. Click **Deploy Web Service**.

Your app will be live in minutes!

## 🛠 Tech Stack
- **Frontend**: Streamlit
- **Blockchain**: Web3.py (BSC)
- **APIs**: Transak Staging, Paystack (Mock)
