import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Lcore Forms',
  description: 'Terms of service for Lcore Forms',
};

export default function TermsPage() {
  return (
    <main className="container py-12 max-w-4xl">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="card p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-[color:var(--brand-100)] dark:bg-[color:var(--brand-900)]">
            <FileText className="h-6 w-6 text-[color:var(--brand-600)]" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-700 dark:text-slate-300">
              By accessing or using Lcore Forms ("the Service"), you agree to be bound by these Terms of Service 
              ("Terms"). If you do not agree to these Terms, you may not use the Service. We reserve the right 
              to modify these Terms at any time, and your continued use constitutes acceptance of any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Lcore Forms is a web-based form builder platform that allows users to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li>Create and customize online forms with various field types</li>
              <li>Share forms via public links</li>
              <li>Collect and manage form submissions</li>
              <li>View analytics and export response data</li>
              <li>Access forms in both light and dark modes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              To use certain features of the Service, you must create an account:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>Account Creation:</strong> You must provide accurate and complete information</li>
              <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your password</li>
              <li><strong>Account Responsibility:</strong> You are responsible for all activities under your account</li>
              <li><strong>Age Requirement:</strong> You must be at least 13 years old to use the Service</li>
              <li><strong>One Account:</strong> You may only create one account per email address</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use Policy</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li>Violate any applicable laws or regulations</li>
              <li>Collect personal information without consent</li>
              <li>Create forms for fraudulent, malicious, or illegal purposes</li>
              <li>Distribute spam, malware, or harmful content</li>
              <li>Impersonate others or misrepresent your affiliation</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Use automated systems to access the Service without permission</li>
              <li>Create forms containing hate speech, harassment, or discriminatory content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              You retain ownership of all content you create using the Service:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>Ownership:</strong> You own all forms, responses, and data you create</li>
              <li><strong>License:</strong> You grant us a license to host, store, and display your content as needed to provide the Service</li>
              <li><strong>Responsibility:</strong> You are solely responsible for your content and any consequences of sharing it</li>
              <li><strong>Backup:</strong> You are responsible for maintaining backups of your important data</li>
              <li><strong>Public Content:</strong> Forms marked as "public" may be accessible to anyone with the link</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Service Availability</h2>
            <p className="text-slate-700 dark:text-slate-300">
              We strive to provide reliable service but cannot guarantee uninterrupted access. The Service is 
              provided "as is" and we reserve the right to modify, suspend, or discontinue any part of the Service 
              at any time. We are not liable for any interruption, modification, or discontinuation of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The Service and its original content, features, and functionality are owned by Lcore Forms and are 
              protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li>You may not copy, modify, distribute, or create derivative works without permission</li>
              <li>Our trademarks and logos may not be used without written consent</li>
              <li>The Service's source code and underlying technology are proprietary</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Data Export and Portability</h2>
            <p className="text-slate-700 dark:text-slate-300">
              You can export your form responses in CSV or JSON format at any time. Upon account deletion, 
              you have 30 days to export your data before it is permanently deleted from our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              We may terminate or suspend your account at any time for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li>Violation of these Terms</li>
              <li>Illegal or fraudulent activity</li>
              <li>Extended periods of inactivity</li>
              <li>Any other reason at our sole discretion</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mt-4">
              You may also terminate your account at any time through your account settings. Upon termination, 
              your right to use the Service will immediately cease.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Disclaimer of Warranties</h2>
            <p className="text-slate-700 dark:text-slate-300">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS 
              OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
              PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, 
              SECURE, OR ERROR-FREE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Limitation of Liability</h2>
            <p className="text-slate-700 dark:text-slate-300">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, LCORE FORMS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED 
              DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM 
              YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
            <p className="text-slate-700 dark:text-slate-300">
              You agree to indemnify and hold harmless Lcore Forms, its affiliates, and their respective officers, 
              directors, employees, and agents from any claims, damages, losses, liabilities, and expenses 
              (including attorney's fees) arising out of your use of the Service or violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
            <p className="text-slate-700 dark:text-slate-300">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard 
              to conflict of law provisions. Any disputes arising from these Terms or your use of the Service 
              shall be resolved in the appropriate courts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Changes to Terms</h2>
            <p className="text-slate-700 dark:text-slate-300">
              We reserve the right to modify these Terms at any time. We will notify users of significant changes 
              via email or a prominent notice on the Service. Your continued use after such modifications constitutes 
              acceptance of the updated Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
            <p className="text-slate-700 dark:text-slate-300">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Email:</strong>{' '}
                <a 
                  href="mailto:nikhiltandel2802@gmail.com" 
                  className="text-[color:var(--brand-600)] hover:underline"
                >
                  nikhiltandel2802@gmail.com
                </a>
              </p>
              <p className="text-slate-700 dark:text-slate-300 mt-2">
                <strong>GitHub:</strong>{' '}
                <a 
                  href="https://github.com/Lcore17" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[color:var(--brand-600)] hover:underline"
                >
                  https://github.com/Lcore17
                </a>
              </p>
              <p className="text-slate-700 dark:text-slate-300 mt-2">
                <strong>Twitter:</strong>{' '}
                <a 
                  href="https://twitter.com/deltalcore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[color:var(--brand-600)] hover:underline"
                >
                  @deltalcore
                </a>
              </p>
            </div>
          </section>

          <section>
            <div className="mt-8 p-4 border-l-4 border-[color:var(--brand-600)] bg-[color:var(--brand-50)] dark:bg-slate-800 rounded">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <strong>Effective Date:</strong> These Terms are effective as of the date shown above. 
                By using Lcore Forms, you acknowledge that you have read, understood, and agree to be bound 
                by these Terms of Service.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
