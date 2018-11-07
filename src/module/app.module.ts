import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forRoot()] })
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
