import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BlacklistToken } from './entities/blacklist-token.entity';
import { BLACKLIST_TOKEN_REPOSITORY } from 'src/common/services';

@Injectable()
export class BlacklistTokenService {
  constructor(
    @Inject(BLACKLIST_TOKEN_REPOSITORY)
    private blacklistTokenRepository: Repository<BlacklistToken>
) {}
  async addTokenToBlacklist(token: string) {
    const blacklistToken = this.blacklistTokenRepository.create({ token });
    const response = await this.blacklistTokenRepository.save(blacklistToken);
    return response
  }
  async isTokenBlacklisted(token: string): Promise<boolean> {
    const tokenInBlacklist = await this.blacklistTokenRepository.findOne({ where: { token } });
    return !!tokenInBlacklist; 
  }
}
