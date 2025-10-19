import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Lcore Forms',
  description: 'Privacy policy for Lcore Forms',
};

export default function PrivacyPage() {
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
            <Shield className="h-6 w-6 text-[color:var(--brand-600)]" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              We collect information you provide directly to us when you create an account, build forms, 
              or interact with our services. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>Account Information:</strong> Name, email address, and password</li>
              <li><strong>Form Data:</strong> Forms you create, including titles, descriptions, and field configurations</li>
              <li><strong>Response Data:</strong> Submissions made to your forms</li>
              <li><strong>Usage Data:</strong> How you interact with our service, including analytics and metrics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues and security threats</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              We take data security seriously and implement appropriate measures to protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>Encryption:</strong> All data is transmitted over secure HTTPS connections</li>
              <li><strong>Authentication:</strong> We use JWT tokens stored in secure httpOnly cookies</li>
              <li><strong>Password Security:</strong> Passwords are hashed using bcrypt before storage</li>
              <li><strong>Database Security:</strong> Access to our database is restricted and monitored</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
              <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights and Choices</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>Access:</strong> You can access your account information at any time</li>
              <li><strong>Update:</strong> You can update or correct your information through your account settings</li>
              <li><strong>Delete:</strong> You can request deletion of your account and associated data</li>
              <li><strong>Export:</strong> You can export your form data in CSV or JSON format</li>
              <li><strong>Opt-Out:</strong> You can opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li>Maintain your login session securely</li>
              <li>Remember your preferences (e.g., dark mode setting)</li>
              <li>Analyze usage patterns and improve our service</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mt-4">
              You can control cookies through your browser settings, but disabling certain cookies may limit 
              your ability to use some features.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p className="text-slate-700 dark:text-slate-300">
              We retain your information for as long as your account is active or as needed to provide services. 
              When you delete your account, we will delete your personal information within 30 days, except where 
              we are required to retain it for legal or regulatory purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p className="text-slate-700 dark:text-slate-300">
              Our service is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you are a parent or guardian and believe your 
              child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
            <p className="text-slate-700 dark:text-slate-300">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your data in accordance with this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
            <p className="text-slate-700 dark:text-slate-300">
              We may update this privacy policy from time to time. We will notify you of any changes by 
              posting the new policy on this page and updating the "Last updated" date. You are advised to 
              review this policy periodically for any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="text-slate-700 dark:text-slate-300">
              If you have any questions about this privacy policy or our practices, please contact us at:
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
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
