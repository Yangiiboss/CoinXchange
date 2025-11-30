# NairaAI 2.0 💸

The ultimate Crypto-to-Naira off-ramp. Automated, secure, and rate-optimized.

## Features
- **Smart Rate Engine**: Scans Binance, Transak, Breet, and YellowCard to find the best rate.
- **Shared Wallet Architecture**: Single contract for all deposits (`contract.sol`).
- **Instant Payouts**: Integrated with Paystack for bank transfers.
- **User Accounts**: Save your bank details for one-click withdrawals.
- **Secure**: SQLite database + Password hashing.

## 🚀 Quick Start (Local)

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the App**
   ```bash
   streamlit run app.py
   ```

3. **Login**
   - Create a new account on the Signup page.

## 🌐 Deploy to Render.com (Free Tier)

1. **Push to GitHub**.
2. **New Web Service** on Render.
3. **Settings**:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `streamlit run app.py`
   - **Environment Variables**:
     - `PAYSTACK_SECRET_KEY`: Your Paystack Key (or use mock)
     - `BSC_RPC_URL`: `https://bsc-dataseed.binance.org/`

## 📂 Project Structure
- `app.py`: Main application logic (Auth, Rates, UI).
- `contract.sol`: Solidity contract for receiving payments.
- `requirements.txt`: Python dependencies.
