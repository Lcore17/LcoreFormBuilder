import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FormsService {
  constructor(private prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.form.findMany({ where: { ownerId: userId }, orderBy: { createdAt: 'desc' } });
  }

  get(id: string, userId: string) {
    return this.prisma.form.findFirst({ where: { id, ownerId: userId }, include: { fields: true } });
  }

  async create(userId: string, data: any) {
    try {
      const { fields = [], password, ...rest } = data;
      console.log('Creating form with data:', { ...rest, fieldsCount: fields.length, hasPassword: !!password });
      const form = await this.prisma.form.create({
        data: {
          ...rest,
          ownerId: userId,
          passwordHash: password ? await (await import('bcrypt')).hash(password, 10) : null,
          fields: {
            create: fields.map((f: any, idx: number) => ({
              label: f.label,
              type: f.type,
              required: !!f.required,
              order: f.order ?? idx,
              minLength: f.minLength ?? null,
              maxLength: f.maxLength ?? null,
              pattern: f.pattern ?? null,
              minValue: f.minValue ?? null,
              maxValue: f.maxValue ?? null,
              options: f.options ?? [],
            })),
          },
        },
        include: { fields: true },
      });
      // Use any cast in case generated Prisma types are stale
      await (this.prisma as any).formVersion.create({ data: { formId: form.id, data: form } });
      return form;
    } catch (error) {
      console.error('Error creating form:', error);
      throw error;
    }
  }

  async update(id: string, userId: string, data: any) {
    const form = await this.prisma.form.findFirst({ where: { id, ownerId: userId }, include: { fields: true } });
    if (!form) throw new NotFoundException('Form not found');
    const { fields = [], password, ...rest } = data;
    // Replace fields for simplicity
    await this.prisma.field.deleteMany({ where: { formId: form.id } });
  const updated = await this.prisma.form.update({
      where: { id },
      data: {
        ...rest,
  // Cast to any to access passwordHash safely across Prisma type generations
  passwordHash: password === undefined ? (form as any).passwordHash : (password ? await (await import('bcrypt')).hash(password, 10) : null),
        fields: {
          create: fields.map((f: any, idx: number) => ({
            label: f.label,
            type: f.type,
            required: !!f.required,
            order: f.order ?? idx,
            minLength: f.minLength ?? null,
            maxLength: f.maxLength ?? null,
            pattern: f.pattern ?? null,
            minValue: f.minValue ?? null,
            maxValue: f.maxValue ?? null,
            options: f.options ?? [],
          })),
        },
      },
      include: { fields: true },
    });
  await (this.prisma as any).formVersion.create({ data: { formId: updated.id, data: updated } });
    return updated;
  }

  async remove(id: string, userId: string) {
    const form = await this.prisma.form.findFirst({ where: { id, ownerId: userId } });
    if (!form) throw new NotFoundException('Form not found or you do not have permission to delete it');
    return this.prisma.form.delete({ where: { id } });
  }

  async getPublic(publicId: string) {
    const form = await this.prisma.form.findUnique({ where: { publicId }, include: { fields: true } });
    if (!form) return null;
    const { passwordHash, ...rest } = form as any;
    return { ...rest, passwordProtected: !!passwordHash };
  }

  async metrics(userId: string) {
    const [totalForms, totalResponses, recentForms] = await Promise.all([
      this.prisma.form.count({ where: { ownerId: userId } }),
      this.prisma.submission.count({ where: { form: { ownerId: userId } } }),
      this.prisma.form.count({
        where: { ownerId: userId, createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      }),
    ]);
    const avgResponses = totalForms ? Number((totalResponses / totalForms).toFixed(1)) : 0;
    return { totalForms, totalResponses, avgResponses, recentForms };
  }

  async versions(id: string, userId: string) {
    const form = await this.prisma.form.findFirst({ where: { id, ownerId: userId } });
    if (!form) throw new NotFoundException('Form not found');
  return (this.prisma as any).formVersion.findMany({ where: { formId: id }, orderBy: { createdAt: 'desc' } });
  }

  async restore(id: string, versionId: string, userId: string) {
    const form = await this.prisma.form.findFirst({ where: { id, ownerId: userId } });
    if (!form) throw new NotFoundException('Form not found');
  const version = await (this.prisma as any).formVersion.findFirst({ where: { id: versionId, formId: id } });
    if (!version) throw new NotFoundException('Version not found');
    const data: any = version.data as any;
    // Replace current with snapshot
    await this.prisma.field.deleteMany({ where: { formId: id } });
    const updated = await this.prisma.form.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        isPublic: data.isPublic,
        brandColor: data.brandColor,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        maxSubmissions: data.maxSubmissions ?? null,
        thankYouMessage: data.thankYouMessage ?? null,
        redirectUrl: data.redirectUrl ?? null,
        language: data.language ?? 'en',
        webhookUrl: data.webhookUrl ?? null,
        enableCaptcha: !!data.enableCaptcha,
        fields: {
          create: (data.fields || []).map((f: any, idx: number) => ({
            label: f.label,
            type: f.type,
            required: !!f.required,
            order: f.order ?? idx,
            minLength: f.minLength ?? null,
            maxLength: f.maxLength ?? null,
            pattern: f.pattern ?? null,
            minValue: f.minValue ?? null,
            maxValue: f.maxValue ?? null,
            options: f.options ?? [],
          })),
        },
      },
      include: { fields: true },
    });
  await (this.prisma as any).formVersion.create({ data: { formId: id, data: updated } });
    return updated;
  }
}
