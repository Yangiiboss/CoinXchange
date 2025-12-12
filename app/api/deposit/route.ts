import { NextResponse } from 'next/server';
import { createPublicClient, http, formatEther } from 'viem';
import { bsc } from 'viem/chains';

const BSC_RPC = "https://bsc-dataseed.binance.org/";
const CONTRACT_ADDRESS = "0x72fb93c58ab7afadbf75e982a5b6d2cb6134247b";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const memo = searchParams.get('memo');

    if (!memo) {
        return NextResponse.json({ status: "pending", message: "No memo provided" });
    }

    try {
        const client = createPublicClient({
            chain: bsc,
            transport: http(BSC_RPC)
        });

        // Check balance just to ensure RPC is working
        const balance = await client.getBalance({
            address: CONTRACT_ADDRESS as `0x${string}`
        });

        const ethBalance = formatEther(balance);

        return NextResponse.json({
            status: "active",
            address: CONTRACT_ADDRESS,
            checked_memo: memo,
            rpc_status: "connected",
            balance_check: ethBalance
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
