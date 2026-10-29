import { useStore } from '../store';
import Footer from './Footer';

export default function PrivacyPolicy() {
  const { setCurrentView } = useStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Welcome to the Cadet Music Platform ("we," "our," or "us"). We are committed to protecting your privacy and handling your personal information with care. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our music learning platform.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              By using our platform, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this Privacy Policy, please do not access the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.1 Personal Information</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">We may collect the following personal information:</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Full name and rank (for account identification)</li>
              <li>Email address (for account recovery and communication)</li>
              <li>Password (stored securely using industry-standard encryption)</li>
              <li>Instrument selection and learning preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.2 Usage Data</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">We automatically collect certain information about your device and usage:</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Lesson progress and completion data</li>
              <li>Practice session duration and frequency</li>
              <li>Performance metrics (accuracy, tempo, etc.)</li>
              <li>Device type and browser information</li>
              <li>IP address and general location (country/region level)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.3 Audio Data</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you use our microphone features for pitch detection and practice feedback:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Audio is processed in real-time in your browser</li>
              <li>No audio recordings are stored on our servers</li>
              <li>Only pitch detection data (note accuracy) is saved to your profile</li>
              <li>You must explicitly grant microphone permission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">We use the collected information for the following purposes:</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Provide the Service:</strong> To create and maintain your account, track your progress, and deliver personalized learning experiences</li>
              <li><strong>Improve the Platform:</strong> To analyze usage patterns and enhance features, content, and user experience</li>
              <li><strong>Adaptive Learning:</strong> To adjust lesson difficulty and content based on your performance and learning patterns</li>
              <li><strong>Communication:</strong> To send important updates about the platform (with your consent)</li>
              <li><strong>Security:</strong> To protect against unauthorized access and ensure platform integrity</li>
              <li><strong>Compliance:</strong> To meet legal obligations and Canadian Cadet Organization standards</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Storage and Security</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.1 Current Storage</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Currently, your data is stored locally in your browser using localStorage. This means:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Data remains on your device</li>
              <li>Data is not transmitted to external servers</li>
              <li>Clearing browser data will remove your progress</li>
              <li>Data is not accessible from other devices</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.2 Future Cloud Storage</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When we migrate to cloud-based storage (planned for future updates):
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Data will be encrypted in transit (HTTPS/TLS) and at rest</li>
              <li>Passwords will be hashed using bcrypt or similar industry standards</li>
              <li>Regular security audits will be conducted</li>
              <li>Access controls will limit data access to authorized personnel only</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.3 Security Measures</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We implement appropriate technical and organizational measures to protect your data, including secure coding practices, regular updates, and access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>With Your Consent:</strong> When you explicitly authorize sharing</li>
              <li><strong>Instructors/Commanding Officers:</strong> Progress reports may be shared with your unit leadership for training purposes (with your knowledge)</li>
              <li><strong>Service Providers:</strong> Third-party services that help us operate the platform (e.g., hosting, analytics) under strict confidentiality agreements</li>
              <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
              <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Your Rights</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Restriction:</strong> Request limitation of data processing</li>
              <li><strong>Objection:</strong> Object to certain types of data processing</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              To exercise these rights, please contact us using the information provided in Section 9.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Children's Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our platform is designed for use by Canadian Cadets, who are typically between 12-18 years old. We do not knowingly collect personal information from children under 13 without parental consent. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can take appropriate action.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Third-Party Links</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>841 Squadron</strong><br />
                Canadian Cadet Organization<br />
                Email: [Contact email to be provided]<br />
                Address: [Squadron address to be provided]
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal compliance. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Posting the new policy on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending an email notification (if you have provided an email address)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Your continued use of the platform after any changes constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
