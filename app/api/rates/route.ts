import axios from 'axios';
import { NextResponse } from 'next/server';

const PLATFORM_FEE = 0.009;

function generateMemo() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const crypto = searchParams.get('crypto') || 'USDT';
  const amount = parseFloat(searchParams.get('amount') || '0');
  
  const token = btoa(`${process.env.TRANSFI_API_USERNAME}:${process.env.TRANSFI_API_PASS}`);
  const mid = process.env.TRANSFI_API_MID;

  const getTransfiRes = await axios.get(
    `https://sandbox-api.transfi.com/v2/exchange-rates/crypto-to-fiat?cryptoTicker=${crypto}&amount=${amount}&fiatTicker=NGN&direction=forward`,
    { headers: {
      accept: 'application/json',
      "MID": mid,
      "Authorization": `Basic ${token}`,
    }}
  )


  const transfiRate = getTransfiRes.data;
  const rateData = transfiRate.message.data;
  const rate = rateData.cryptoPrice;
  const networkFee = rateData.networkFee;
  const processingFee = rateData.processingFee;


  const grossNgn = amount * rate;
  const feeAmount = (grossNgn + networkFee + processingFee ) * PLATFORM_FEE;
  const netNgn = grossNgn - feeAmount;

  return NextResponse.json({
    provider: "TransFI",
    rate: Number(rate.toFixed(2)),
    gross_ngn: Number(grossNgn.toFixed(2)),
    fee: Number(feeAmount.toFixed(2)),
    net_ngn: Number(netNgn.toFixed(2)),
    memo: generateMemo()
  });
}
