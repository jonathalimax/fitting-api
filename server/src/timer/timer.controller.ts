import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Res,
  Param,
  Logger,
  Patch,
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
    } catch(error) {
      res.status(500).json({
        message: 'Something went wrong!',
        verbose: error.message
      })
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTimerDto: UpdateTimerDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.timerService.update(id, updateTimerDto)

      res.status(HttpStatus.OK).json({
        message: 'Timer updated successfully!',
      })
    } catch(error) {
      res.status(500).json({
        message: 'Something went wrong!',
        verbose: error.message
      })
    }
  }
}
