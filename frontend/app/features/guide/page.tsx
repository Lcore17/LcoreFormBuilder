import Link from 'next/link';

export default function AdvancedFeaturesGuidePage() {
  return (
    <main className="container py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Advanced Features Guide</h1>
          <Link href="/features" className="text-sm text-[color:var(--brand-600)] hover:underline">Back to Features</Link>
        </div>

        <section className="prose prose-slate dark:prose-invert max-w-none">
          <h2>All Implemented Features</h2>

          <h3>1. ✅ Form Templates</h3>
          <p><strong>Location:</strong> Form Builder → Templates Button</p>
          <p>Pre-built form templates for common use cases:</p>
          <ul>
            <li><strong>Customer Feedback</strong> - Satisfaction ratings and feedback collection</li>
            <li><strong>Event Registration</strong> - Event sign-ups with dietary preferences and T-shirt sizes</li>
            <li><strong>Survey</strong> - Customer research with multiple question types</li>
            <li><strong>Contact Form</strong> - Simple contact with file attachments</li>
            <li><strong>Job Application</strong> - Complete application form with resume upload</li>
            <li><strong>RSVP</strong> - Event RSVP with guest count</li>
          </ul>
          <p><strong>How to use:</strong></p>
          <ol>
            <li>Click "Templates" button in form builder header</li>
            <li>Select a template or start blank</li>
            <li>Customize fields as needed</li>
          </ol>

          <hr />

          <h3>2. ✅ Advanced Settings</h3>
          <p><strong>Location:</strong> Form Builder → Advanced Settings (expandable panel)</p>
          <h4>Custom Branding</h4>
          <ul>
            <li><strong>Brand Color Picker</strong> - Set custom accent color for your form</li>
            <li><strong>Logo Upload</strong> (Ready to implement) - Add your company logo</li>
          </ul>
          <h4>Form Scheduling</h4>
          <ul>
            <li><strong>Start Date</strong> - Set when the form becomes available</li>
            <li><strong>End Date</strong> - Set when the form closes automatically</li>
            <li>Forms automatically check dates before allowing submissions</li>
          </ul>
          <h4>Submission Limits</h4>
          <ul>
            <li>Set maximum number of responses</li>
            <li>Form automatically closes when limit is reached</li>
            <li>Counter tracks current submissions</li>
          </ul>
          <h4>Thank You Message</h4>
          <ul>
            <li>Custom message shown after successful submission</li>
            <li>Supports multi-line text</li>
            <li>Alternative to redirect URL</li>
          </ul>
          <h4>Redirect URL</h4>
          <ul>
            <li>Redirect users to a specific page after submission</li>
            <li>Useful for confirmation pages or next steps</li>
          </ul>
          <h4>Multi-language Support</h4>
          <ul>
            <li>Choose from 9 languages: English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Hindi</li>
            <li>UI labels adapt to selected language</li>
          </ul>
          <h4>Webhook Integration</h4>
          <ul>
            <li><strong>Slack Integration</strong> - Send notifications to Slack channels</li>
            <li><strong>Discord Integration</strong> - Post to Discord webhooks</li>
            <li><strong>Zapier Integration</strong> - Connect to 3000+ apps</li>
            <li>Receives full form submission data</li>
          </ul>
          <h4>Spam Protection</h4>
          <ul>
            <li>Toggle CAPTCHA on/off</li>
            <li>Honeypot field implementation (Ready)</li>
            <li>Rate limiting on submissions</li>
          </ul>

          <hr />

          <h3>3. ✅ Response Visualization & Analytics</h3>
          <p><strong>Location:</strong> Responses Page → Analytics Button</p>
          <h4>Summary Statistics</h4>
          <ul>
            <li><strong>Total Responses</strong> - Count of all submissions</li>
            <li><strong>Completion Rate</strong> - Percentage of completed vs drafts</li>
            <li><strong>Average Time</strong> - Time users spend filling the form</li>
            <li><strong>Field Count</strong> - Number of form fields</li>
          </ul>
          <h4>Field-by-Field Analysis</h4>
          <p><em>For Multiple Choice / Checkboxes:</em></p>
          <ul>
            <li>Bar charts showing distribution</li>
            <li>Percentage breakdown</li>
            <li>Visual comparison of options</li>
            <li>Response counts for each option</li>
          </ul>
          <p><em>For Number Fields:</em></p>
          <ul>
            <li><strong>Average</strong> - Mean value of all responses</li>
            <li><strong>Minimum</strong> - Lowest value submitted</li>
            <li><strong>Maximum</strong> - Highest value submitted</li>
            <li>Count of total numeric responses</li>
          </ul>
          <p><strong>Real-time Updates:</strong></p>
          <ul>
            <li>Charts update automatically with new submissions</li>
            <li>Color-coded visualizations</li>
            <li>Responsive design for mobile</li>
          </ul>

          <hr />

          <h3>4. ✅ Field Validation Rules</h3>
          <p><strong>Location:</strong> Field Editor (when editing a field)</p>
          <p>Implemented validation types:</p>
          <ul>
            <li><strong>Required</strong> - Make field mandatory</li>
            <li><strong>Min/Max Length</strong> - For text fields</li>
            <li><strong>Min/Max Value</strong> - For number fields</li>
            <li><strong>Pattern (Regex)</strong> - Custom validation patterns</li>
            <li><strong>Email Validation</strong> - Built-in email format check</li>
          </ul>
          <p><strong>Coming soon:</strong></p>
          <ul>
            <li>Phone number formatting</li>
            <li>URL validation</li>
            <li>Custom error messages</li>
          </ul>

          <hr />

          <h3>5. ✅ Export Capabilities</h3>
          <h4>CSV Export</h4>
          <ul>
            <li>Download all responses as CSV</li>
            <li>Compatible with Excel, Google Sheets</li>
            <li>Includes all field columns</li>
            <li>Timestamp for each submission</li>
          </ul>
          <h4>JSON Export</h4>
          <ul>
            <li>Raw JSON data export</li>
            <li>Perfect for developers</li>
            <li>Complete submission metadata</li>
            <li>Easy to parse and process</li>
          </ul>
          <h4>PDF Export (Ready to implement)</h4>
          <ul>
            <li>Individual response PDFs</li>
            <li>Professional formatting</li>
            <li>Company branding included</li>
          </ul>

          <hr />

          <h3>6. ✅ Save as Draft (Database Ready)</h3>
          <p><strong>Status:</strong> Backend schema implemented, frontend in progress</p>
          <ul>
            <li>Users can save partially filled forms</li>
            <li>Resume form filling later</li>
            <li>Draft indicator on submissions</li>
            <li>Automatic draft cleanup after X days</li>
          </ul>

          <hr />

          <h3>7. ✅ Public/Private Toggle</h3>
          <p><strong>Location:</strong> Form Settings</p>
          <ul>
            <li><strong>Public Forms</strong> - Accessible via public link to anyone</li>
            <li><strong>Private Forms</strong> - Requires authentication to access</li>
            <li>Public ID for shareable links</li>
            <li>Copy link button in builder</li>
          </ul>

          <hr />

          <h3>8. ✅ Conditional Logic (Database Ready)</h3>
          <p><strong>Status:</strong> Backend schema implemented</p>
          <p>Planned features:</p>
          <ul>
            <li>Show/hide fields based on answers</li>
            <li>Skip logic for surveys</li>
            <li>Conditional required fields</li>
            <li>Multiple conditions per field</li>
            <li>Operators: equals, not equals, contains, greater than, less than</li>
          </ul>
          <pre className="whitespace-pre-wrap bg-slate-50 dark:bg-slate-900/40 p-4 rounded-lg border border-slate-200 dark:border-slate-800 text-sm">{`Q1: Do you have a website?
   → Yes (show Q2: What's your URL?)
   → No (skip to Q3)`}</pre>

          <hr />

          <h3>9. ✅ Form Analytics Dashboard</h3>
          <p><strong>Location:</strong> Dashboard → Form Cards</p>
          <ul>
            <li>View count (tracked)</li>
            <li>Response count</li>
            <li>Conversion rate calculation</li>
            <li>Creation date</li>
            <li>Last updated</li>
          </ul>

          <hr />

          <h3>10. ✅ Live Form Preview</h3>
          <p><strong>Location:</strong> Form Builder → Right Panel</p>
          <ul>
            <li>Real-time preview as you build</li>
            <li>Test form validation</li>
            <li>See how users will view the form</li>
            <li>Responsive preview for mobile/desktop</li>
          </ul>

          <h2>Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="p-3 text-left">Feature</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-3">Form Templates</td><td className="p-3">✅ Complete</td><td className="p-3">Builder Header</td></tr>
                <tr><td className="p-3">Custom Branding</td><td className="p-3">✅ Complete</td><td className="p-3">Advanced Settings</td></tr>
                <tr><td className="p-3">Form Scheduling</td><td className="p-3">✅ Complete</td><td className="p-3">Advanced Settings</td></tr>
                <tr><td className="p-3">Submission Limits</td><td className="p-3">✅ Complete</td><td className="p-3">Advanced Settings</td></tr>
                <tr><td className="p-3">Thank You Message</td><td className="p-3">✅ Complete</td><td className="p-3">Advanced Settings</td></tr>
                <tr><td className="p-3">Redirect URL</td><td className="p-3">✅ Complete</td><td className="p-3">Advanced Settings</td></tr>
                <tr><td className="p-3">Multi-language</td><td className="p-3">✅ Complete</td><td className="p-3">Advanced Settings</td></tr>
                <tr><td className="p-3">Webhook Integration</td><td className="p-3">✅ Complete</td><td className="p-3">Advanced Settings</td></tr>
                <tr><td className="p-3">CAPTCHA</td><td className="p-3">✅ Complete</td><td className="p-3">Advanced Settings</td></tr>
                <tr><td className="p-3">Response Charts</td><td className="p-3">✅ Complete</td><td className="p-3">Responses Page</td></tr>
                <tr><td className="p-3">Field Validation</td><td className="p-3">✅ Complete</td><td className="p-3">Field Editor</td></tr>
                <tr><td className="p-3">CSV/JSON Export</td><td className="p-3">✅ Complete</td><td className="p-3">Responses Page</td></tr>
                <tr><td className="p-3">PDF Export</td><td className="p-3">⏳ Ready</td><td className="p-3">To be implemented</td></tr>
                <tr><td className="p-3">Save as Draft</td><td className="p-3">⏳ Ready</td><td className="p-3">To be implemented</td></tr>
                <tr><td className="p-3">Conditional Logic</td><td className="p-3">⏳ Ready</td><td className="p-3">To be implemented</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Technical Implementation</h2>
          <h3>Database Schema</h3>
          <pre className="whitespace-pre-wrap bg-slate-50 dark:bg-slate-900/40 p-4 rounded-lg border border-slate-200 dark:border-slate-800 text-sm">{`model Form {
  // Basic fields
  title, description, isPublic
  
  // New advanced fields
  template        String?   // Template type
  brandColor      String?   // Custom color
  brandLogo       String?   // Logo path
  startDate       DateTime? // Scheduling
  endDate         DateTime?
  maxSubmissions  Int?      // Limits
  submissionCount Int       
  thankYouMessage String?   // Custom message
  redirectUrl     String?   // Redirect
  language        String    // i18n
  webhookUrl      String?   // Integrations
  enableCaptcha   Boolean   // Security
  viewCount       Int       // Analytics
  conversionRate  Float?
  avgCompletionTime Int?
}

model Field {
  // Validation
  minLength, maxLength
  minValue, maxValue
  pattern String?
  
  // Conditional logic
  conditionalFieldId String?
  conditionalValue   String?
  conditionalOperator String?
  showWhenMatch Boolean
}

model Submission {
  isDraft Boolean       // Draft support
  completionTime Int?   // Analytics
  ipAddress String?     // Tracking
}`}</pre>

          <h2>Usage Tips</h2>
          <h3>For Project Presentation</h3>
          <ol>
            <li><strong>Start with Templates</strong> - Show how quickly you can create a professional form; demonstrate 6 different template types</li>
            <li><strong>Customize with Advanced Settings</strong> - Change brand color to match your theme; set a submission limit; add a custom thank you message</li>
            <li><strong>Show Response Analytics</strong> - Create a form with radio buttons; submit multiple responses; view the beautiful bar charts</li>
            <li><strong>Demonstrate Validation</strong> - Add email field with pattern validation; show error messages when validation fails</li>
            <li><strong>Export Data</strong> - Download responses as CSV; show in Excel/Google Sheets</li>
          </ol>

          <h3>Unique Selling Points</h3>
          <ol>
            <li><strong>6 Pre-built Templates</strong> - Save time with professional templates</li>
            <li><strong>Visual Analytics</strong> - Beautiful charts, not just raw data</li>
            <li><strong>Webhook Integration</strong> - Connect to Slack/Discord/Zapier</li>
            <li><strong>Form Scheduling</strong> - Automatically open/close forms</li>
            <li><strong>Multi-language Support</strong> - 9 languages built-in</li>
            <li><strong>Custom Branding</strong> - Make forms match your brand</li>
            <li><strong>Live Preview</strong> - See changes in real-time</li>
            <li><strong>Spam Protection</strong> - Built-in CAPTCHA support</li>
          </ol>

          <h2>Future Enhancements</h2>
          <ul>
            <li>Drag-and-drop field reordering</li>
            <li>Conditional logic UI</li>
            <li>File size limits for uploads</li>
            <li>Email notifications to form owner</li>
            <li>Team collaboration features</li>
            <li>A/B testing for forms</li>
            <li>Integration marketplace</li>
            <li>Mobile app</li>
            <li>API documentation</li>
            <li>White-label solution</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
