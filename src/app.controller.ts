import {Controller, Get, Req} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('/*')
  async getHello(@Req() req): Promise<any> {
    const host = req.get('Host');
    const originUrl = req.originalUrl;

    console.log('host: ', host)
    console.log('originUrl: ', originUrl)

    let hostname = host.substring(0, host.indexOf('.localhost'));
    console.log(`hostname: ${hostname}`)

    hostname = '127.0.01:3000' //mock
    console.log(`go to url: http:/${hostname}${originUrl}`)

    try {
      return  (await firstValueFrom(this.httpService.get(`http:/${hostname}${originUrl}`, {})))?.data;
    } catch (e) {
      console.log(`e: ${e}`)
      return 'error'
    }
  }
}
