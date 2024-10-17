import * as mongoose from 'mongoose';

export const BlacklistTokenSchema = new mongoose.Schema({
  token: { type: String, nullable: true, required: true },
  expiresAt: { type: Date, required: true },
});

export interface BlacklistToken {
  id?: string;  
  token: string;
  expiresAt: Date;
}
