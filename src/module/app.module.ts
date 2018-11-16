import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usermodule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), Usermodule],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
