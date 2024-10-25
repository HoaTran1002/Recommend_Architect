import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BlacklistToken } from './entities/blacklist-token.entity';
import { BLACKLIST_TOKEN_REPOSITORY } from 'src/utils/constants/services.constants';

@Injectable()
export class BlacklistTokenService {
  constructor(
    @Inject(BLACKLIST_TOKEN_REPOSITORY)
    private readonly blacklistTokenRepository: Model<BlacklistToken>
  ) {}

  async addTokenToBlacklist(token: string) {
    const blacklistToken = new this.blacklistTokenRepository({ token });
    const response = await blacklistToken.save();
    return response;
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const tokenInBlacklist = await this.blacklistTokenRepository.findOne({ token });
    return !!tokenInBlacklist; 
  }
}
