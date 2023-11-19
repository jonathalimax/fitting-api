import { Controller, Get, HttpStatus, Logger, Res } from '@nestjs/common'
import { Response } from 'express'
import { RestService } from './rest.service'

@Controller('rest')
export class RestController {
  constructor(private readonly restService: RestService) {}

  @Get('finish')
  async finish(@Res() res: Response) {
    try {
      await this.restService.finish()

      res.json({
        message: 'Rest finished successfully!',
      })
    } catch (error) {
      Logger.error('Error finishing the rest timer:', error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong!',
        verbose: error.message,
      })
    }
  }
}
