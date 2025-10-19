import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FormsService } from './forms.service';

@Controller('forms')
export class FormsController {
  constructor(private readonly forms: FormsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  list(@Req() req: any) {
    const userId = req.user?.userId; // will be set by auth guard in a real app
    return this.forms.list(userId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Req() req: any, @Body() body: any) {
    const userId = req.user?.userId;
    return this.forms.create(userId, body);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  get(@Req() req: any, @Param('id') id: string) {
    const userId = req.user?.userId;
    return this.forms.get(id, userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    const userId = req.user?.userId;
    return this.forms.update(id, userId, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req: any, @Param('id') id: string) {
    const userId = req.user?.userId;
    return this.forms.remove(id, userId);
  }

  @Get('public/:publicId')
  getPublic(@Param('publicId') publicId: string) {
    return this.forms.getPublic(publicId);
  }

  @Get('metrics/summary')
  @UseGuards(AuthGuard('jwt'))
  metrics(@Req() req: any) {
    const userId = req.user?.userId;
    return this.forms.metrics(userId);
  }

  @Get(':id/versions')
  @UseGuards(AuthGuard('jwt'))
  versions(@Req() req: any, @Param('id') id: string) {
    const userId = req.user?.userId;
    return this.forms.versions(id, userId);
  }

  @Post(':id/restore/:versionId')
  @UseGuards(AuthGuard('jwt'))
  restore(@Req() req: any, @Param('id') id: string, @Param('versionId') versionId: string) {
    const userId = req.user?.userId;
    return this.forms.restore(id, versionId, userId);
  }
}
