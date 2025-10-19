import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async create(publicId: string, data: any, ip?: string) {
    // Basic honeypot check for simple anti-spam
    if (data && typeof data._hp === 'string' && data._hp.trim()) {
      throw new BadRequestException('Spam detected');
    }

  const form = await this.prisma.form.findUnique({ where: { publicId }, include: { fields: true } });
    if (!form) throw new BadRequestException('Form not found');

    // Enforce scheduling if set
    const now = new Date();
    if (form.startDate && now < form.startDate) {
      throw new BadRequestException('This form is not accepting responses yet');
    }
    if (form.endDate && now > form.endDate) {
      throw new BadRequestException('This form is no longer accepting responses');
    }

    // Password protection
    if (form.passwordHash) {
      const provided = (data && typeof data.password === 'string') ? data.password : '';
      const ok = await (await import('bcrypt')).compare(provided, form.passwordHash);
      if (!ok) throw new BadRequestException('Invalid form password');
    }

    // Enforce submission limits if set (count non-draft submissions)
    if (typeof form.maxSubmissions === 'number' && form.maxSubmissions >= 0) {
      const currentCount = await this.prisma.submission.count({ where: { formId: form.id, isDraft: false } });
      if (!data.isDraft && currentCount >= form.maxSubmissions) {
        throw new BadRequestException('Submission limit reached');
      }
    }

    // Validate required fields and constraints
  const responses: Array<{ fieldId: string; value: unknown }> = Array.isArray(data.responses) ? data.responses : [];
    const fieldMap = new Map(form.fields.map((f: any) => [f.id, f]));
    for (const f of form.fields) {
  const resp = responses.find((r: { fieldId: string; value: unknown }) => r.fieldId === f.id);
      const val = resp?.value;
      if (f.required && !data.isDraft) {
        if (val === undefined || val === null || String(val).trim() === '') {
          throw new BadRequestException(`Field "${f.label}" is required`);
        }
      }
      // Type-specific and constraint checks (skip for drafts)
      if (!data.isDraft && val !== undefined && val !== null) {
        const s = String(val);
        if ((f.type === 'text' || f.type === 'textarea' || f.type === 'email') && s) {
          if (typeof f.minLength === 'number' && s.length < f.minLength) {
            throw new BadRequestException(`Field "${f.label}" must be at least ${f.minLength} characters`);
          }
          if (typeof f.maxLength === 'number' && s.length > f.maxLength) {
            throw new BadRequestException(`Field "${f.label}" must be at most ${f.maxLength} characters`);
          }
          if (f.pattern) {
            const re = new RegExp(f.pattern);
            if (!re.test(s)) {
              throw new BadRequestException(`Field "${f.label}" is not in the correct format`);
            }
          }
          if (f.type === 'email') {
            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRe.test(s)) {
              throw new BadRequestException(`Field "${f.label}" must be a valid email address`);
            }
          }
        }
        if (f.type === 'number' && s) {
          const num = Number(s);
          if (Number.isNaN(num)) {
            throw new BadRequestException(`Field "${f.label}" must be a number`);
          }
          if (typeof f.minValue === 'number' && num < f.minValue) {
            throw new BadRequestException(`Field "${f.label}" must be ≥ ${f.minValue}`);
          }
          if (typeof f.maxValue === 'number' && num > f.maxValue) {
            throw new BadRequestException(`Field "${f.label}" must be ≤ ${f.maxValue}`);
          }
        }
      }
    }

    const created = await this.prisma.submission.create({
      data: {
        formId: form.id,
        isDraft: !!data.isDraft,
        ip: ip ?? null,
        responses: {
          create: responses.map((r: any) => ({
            fieldId: r.fieldId,
            value: String(r.value ?? ''),
          })),
        },
      },
      include: { responses: true },
    });

    // Fire-and-forget webhook notification if configured
    if (form.webhookUrl) {
      try {
        // Node 18+ global fetch
        await fetch(form.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formId: form.id,
            title: form.title,
            submissionId: created.id,
            createdAt: created.createdAt,
            isDraft: created.isDraft,
            ip: created.ip,
            responses: created.responses,
          }),
        });
      } catch (e) {
        // Ignore webhook errors to not block user
      }
    }

    return created;
  }

  list(formId: string) {
    return this.prisma.submission.findMany({ where: { formId }, include: { responses: true } });
  }
}
