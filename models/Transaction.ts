import mongoose, { Schema, model, models } from 'mongoose';

const TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['DEPOSIT', 'WITHDRAWAL', 'EXCHANGE'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED'],
        default: 'PENDING',
    },
    txHash: {
        type: String,
    },
    recipientBank: {
        type: String,
    },
    recipientAccount: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Transaction = models.Transaction || model('Transaction', TransactionSchema);

export default Transaction;
