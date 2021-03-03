import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getBuildVersion(): string {
    return `${Math.round(Math.random() * 100)}.${Math.round(Math.random() * 100)}.${Math.round(Math.random() * 100)}`;
  }
}
