import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Res,
  Param,
  Patch,
  Logger,
} from '@nestjs/common'
import { TimerService } from './timer.service'
import { CreateTimerDto } from './dto/create-timer.dto'
import { Response } from 'express'
import { UpdateTimerDto } from './dto/update-timer.dto'

@Controller('timer')
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  @Post()
  async create(
    @Body() createTimerDto: CreateTimerDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const result = await this.timerService.create(createTimerDto)

      res.status(HttpStatus.CREATED).json({
        timerID: result.id,
      })
    } catch (error) {
      Logger.error('Error creating timer document:', error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong!',
        verbose: error.message,
      })
    }
  }
}
