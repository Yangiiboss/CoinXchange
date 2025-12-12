"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function History() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch('/api/transactions?userId=mock-user-id');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setTransactions(data);
                }
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
        };
        fetchHistory();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <h1 className="text-2xl font-bold mb-8">Transaction History</h1>

            <div className="glass-card border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="p-4 text-sm font-medium text-gray-400">Date</th>
                                <th className="p-4 text-sm font-medium text-gray-400">Type</th>
                                <th className="p-4 text-sm font-medium text-gray-400">Amount</th>
                                <th className="p-4 text-sm font-medium text-gray-400">Value</th>
                                <th className="p-4 text-sm font-medium text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading...</td></tr>
                            ) : transactions.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No transactions yet</td></tr>
                            ) : (
                                transactions.map((tx) => (
                                    <motion.tr
                                        key={tx.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                    >
                                        <td className="p-4 text-sm text-gray-300">
                                            {new Date(tx.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-sm">
                                            <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm font-mono">
                                            {tx.amount_crypto} {tx.currency}
                                        </td>
                                        <td className="p-4 text-sm font-mono text-green-400">
                                            ₦{tx.amount_fiat.toLocaleString()}
                                        </td>
                                        <td className="p-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${tx.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                                                    tx.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-red-500/20 text-red-400'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
