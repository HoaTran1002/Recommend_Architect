import { Module } from '@nestjs/common';
import { BlacklistTokenService } from './blacklist-token.service';
import { BlacklistTokenProviders } from './blacklist-token.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [BlacklistTokenService,
  ...BlacklistTokenProviders],
  exports:[BlacklistTokenService]
})
export class BlacklistTokenModule {}
