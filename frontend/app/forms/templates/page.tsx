'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../lib/useAuth';
import { 
  FileText, 
  MessageCircle, 
  Users, 
  Calendar, 
  ShoppingBag, 
  Briefcase, 
  Heart,
  Star,
  Mail,
  Loader2,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  fields: Array<{
    label: string;
    type: string;
    required?: boolean;
    options?: string[];
  }>;
}

const templates: Template[] = [
  {
    id: 'contact',
    name: 'Contact Form',
    description: 'Simple contact form with name, email, and message fields',
    icon: Mail,
    color: 'blue',
    fields: [
      { label: 'Full Name', type: 'text', required: true },
      { label: 'Email Address', type: 'text', required: true },
      { label: 'Subject', type: 'text', required: false },
      { label: 'Message', type: 'textarea', required: true },
    ],
  },
  {
    id: 'feedback',
    name: 'Feedback Form',
    description: 'Collect user feedback with ratings and comments',
    icon: MessageCircle,
    color: 'green',
    fields: [
      { label: 'Your Name', type: 'text', required: true },
      { label: 'Email', type: 'text', required: true },
      { label: 'How would you rate your experience?', type: 'radio', required: true, options: ['Excellent', 'Good', 'Average', 'Poor'] },
      { label: 'What did you like most?', type: 'textarea', required: false },
      { label: 'What can we improve?', type: 'textarea', required: false },
    ],
  },
  {
    id: 'registration',
    name: 'Event Registration',
    description: 'Register attendees for events, workshops, or webinars',
    icon: Calendar,
    color: 'purple',
    fields: [
      { label: 'Full Name', type: 'text', required: true },
      { label: 'Email Address', type: 'text', required: true },
      { label: 'Phone Number', type: 'text', required: false },
      { label: 'Number of Attendees', type: 'number', required: true },
      { label: 'Dietary Restrictions', type: 'checkbox', options: ['Vegetarian', 'Vegan', 'Gluten-Free', 'None'] },
      { label: 'Additional Comments', type: 'textarea', required: false },
    ],
  },
  {
    id: 'survey',
    name: 'Customer Survey',
    description: 'Comprehensive customer satisfaction survey',
    icon: Star,
    color: 'yellow',
    fields: [
      { label: 'Email (Optional)', type: 'text', required: false },
      { label: 'How satisfied are you with our service?', type: 'radio', required: true, options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] },
      { label: 'Would you recommend us to others?', type: 'radio', required: true, options: ['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not'] },
      { label: 'What features do you use most?', type: 'checkbox', options: ['Feature A', 'Feature B', 'Feature C', 'Feature D'] },
      { label: 'Additional Feedback', type: 'textarea', required: false },
    ],
  },
  {
    id: 'job-application',
    name: 'Job Application',
    description: 'Collect job applications with resume and cover letter',
    icon: Briefcase,
    color: 'indigo',
    fields: [
      { label: 'Full Name', type: 'text', required: true },
      { label: 'Email Address', type: 'text', required: true },
      { label: 'Phone Number', type: 'text', required: true },
      { label: 'Position Applying For', type: 'text', required: true },
      { label: 'Years of Experience', type: 'number', required: true },
      { label: 'Why do you want to work with us?', type: 'textarea', required: true },
      { label: 'Available Start Date', type: 'text', required: false },
    ],
  },
  {
    id: 'rsvp',
    name: 'RSVP Form',
    description: 'Simple RSVP form for parties and gatherings',
    icon: Heart,
    color: 'pink',
    fields: [
      { label: 'Your Name', type: 'text', required: true },
      { label: 'Email', type: 'text', required: true },
      { label: 'Will you attend?', type: 'radio', required: true, options: ['Yes, I\'ll be there!', 'No, sorry I can\'t make it'] },
      { label: 'Number of Guests', type: 'number', required: false },
      { label: 'Message to Host', type: 'textarea', required: false },
    ],
  },
  {
    id: 'order',
    name: 'Order Form',
    description: 'Product or service order form',
    icon: ShoppingBag,
    color: 'orange',
    fields: [
      { label: 'Customer Name', type: 'text', required: true },
      { label: 'Email Address', type: 'text', required: true },
      { label: 'Phone Number', type: 'text', required: true },
      { label: 'Product/Service', type: 'text', required: true },
      { label: 'Quantity', type: 'number', required: true },
      { label: 'Delivery Address', type: 'textarea', required: true },
      { label: 'Special Instructions', type: 'textarea', required: false },
    ],
  },
  {
    id: 'blank',
    name: 'Start from Scratch',
    description: 'Create a custom form with your own fields',
    icon: FileText,
    color: 'slate',
    fields: [
      { label: 'Your Name', type: 'text' },
    ],
  },
];

export default function TemplatesPage() {
  const { isChecking } = useAuth();
  const router = useRouter();

  if (isChecking) {
    return (
      <main className="container py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-[color:var(--brand-600)] mb-4" />
          <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">Loading Templates</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Verifying your session...</p>
        </div>
      </main>
    );
  }

  const selectTemplate = (template: Template) => {
    // Store template in sessionStorage and navigate to create page
    sessionStorage.setItem('selectedTemplate', JSON.stringify(template));
    router.push('/forms/new');
  };

  return (
    <main className="container py-12">
      <Link 
        href="/forms" 
        className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="mb-12 text-center animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[color:var(--brand-100)] to-[color:var(--brand-200)] dark:from-[color:var(--brand-900)] dark:to-[color:var(--brand-800)] mb-4">
          <Sparkles className="h-8 w-8 text-[color:var(--brand-600)]" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose a Template</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Start with a pre-built template or create your own from scratch
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => {
          const Icon = template.icon;
          const iconColors: Record<string, string> = {
            blue: 'text-blue-600 dark:text-blue-400',
            green: 'text-green-600 dark:text-green-400',
            purple: 'text-purple-600 dark:text-purple-400',
            yellow: 'text-yellow-600 dark:text-yellow-400',
            indigo: 'text-indigo-600 dark:text-indigo-400',
            pink: 'text-pink-600 dark:text-pink-400',
            orange: 'text-orange-600 dark:text-orange-400',
            slate: 'text-slate-600 dark:text-slate-400',
          };
          const bgColors: Record<string, string> = {
            blue: 'bg-blue-100 dark:bg-blue-900/20',
            green: 'bg-green-100 dark:bg-green-900/20',
            purple: 'bg-purple-100 dark:bg-purple-900/20',
            yellow: 'bg-yellow-100 dark:bg-yellow-900/20',
            indigo: 'bg-indigo-100 dark:bg-indigo-900/20',
            pink: 'bg-pink-100 dark:bg-pink-900/20',
            orange: 'bg-orange-100 dark:bg-orange-900/20',
            slate: 'bg-slate-100 dark:bg-slate-900/20',
          };
          
          return (
            <button
              key={template.id}
              onClick={() => selectTemplate(template)}
              className="card p-6 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`p-4 rounded-xl ${bgColors[template.color]} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`h-8 w-8 ${iconColors[template.color]}`} />
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                {template.name}
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {template.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {template.fields.length} field{template.fields.length !== 1 ? 's' : ''}
                </span>
                <span className="text-sm font-medium text-[color:var(--brand-600)] group-hover:translate-x-1 transition-transform duration-200">
                  Use Template →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </main>
  );
}
