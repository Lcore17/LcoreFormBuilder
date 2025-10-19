import { Controller, Post, Body, Param, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { SubmissionsService } from './submissions.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissions: SubmissionsService, private prisma: PrismaService) {}

  @Post('public/:publicId')
  createPublic(@Param('publicId') publicId: string, @Body() body: any) {
    return this.submissions.create(publicId, body);
  }

  @Get('form/:formId')
  @UseGuards(AuthGuard('jwt'))
  list(@Param('formId') formId: string) {
    return this.submissions.list(formId);
  }

  @Get('export/:formId/csv')
  @UseGuards(AuthGuard('jwt'))
  async exportCsv(@Param('formId') formId: string, @Res() res: Response) {
    const submissions = await this.prisma.submission.findMany({ where: { formId }, include: { responses: { include: { field: true } } } });
    const rows: string[] = [];
    const headers = ['submissionId', 'createdAt', 'fieldLabel', 'value'];
    rows.push(headers.join(','));
    for (const s of submissions) {
      for (const r of s.responses) {
        rows.push([s.id, s.createdAt.toISOString(), r.field.label, JSON.stringify(r.value)].join(','));
      }
    }
    const csv = rows.join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="export.csv"');
    return res.send(csv);
  }

  @Get('export/:formId/json')
  @UseGuards(AuthGuard('jwt'))
  async exportJson(@Param('formId') formId: string, @Res() res: Response) {
    const submissions = await this.prisma.submission.findMany({ where: { formId }, include: { responses: { include: { field: true } } } });
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="export.json"');
    return res.send(JSON.stringify(submissions));
  }
}
