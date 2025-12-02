import mongoose, { Schema, model, models } from 'mongoose';

const WalletSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    currency: {
        type: String,
        default: 'NGN',
    },
    depositAddress: {
        type: String,
        // This could be unique per user or shared
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Wallet = models.Wallet || model('Wallet', WalletSchema);

export default Wallet;
