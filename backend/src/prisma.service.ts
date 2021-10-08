import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /** Connect to the database
   */
  async onModuleInit() {
    await this.$connect();
  }

  /** on server shutdown, disconnect from the database
   * @param  {INestApplication} app
   */
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
