import { useStore } from '../store';
import Footer from './Footer';

export default function TermsOfService() {
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
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Welcome to the Cadet Music Platform. These Terms of Service ("Terms") govern your access to and use of our music learning platform, including all associated services, features, and content (collectively, the "Service").
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Eligibility:</strong> This Service is intended for use by members of the Canadian Cadet Organization and their authorized instructors. By using this Service, you represent and warrant that you meet these eligibility requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Cadet Music Platform provides:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Structured music theory and performance lessons aligned with Canadian Cadet Organization standards</li>
              <li>Interactive learning exercises and assessments</li>
              <li>Progress tracking and performance analytics</li>
              <li>Adaptive learning paths based on individual performance</li>
              <li>Prepared music repertoire for various skill levels</li>
              <li>Multi-instrument support (saxophone, clarinet, bass clarinet, and more)</li>
              <li>Audio practice tools with pitch detection (where available)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. User Accounts</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.1 Account Creation</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To access certain features of the Service, you may be required to create an account. When creating an account, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized access to your account</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.2 Account Responsibility</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You are solely responsible for all activities that occur under your account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Not share your account credentials with others</li>
              <li>Not allow unauthorized use of your account</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Use the Service only for its intended educational purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.3 Account Termination</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to suspend or terminate your account at any time, with or without cause, and with or without notice. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Acceptable Use</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Transmit harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use the Service for any commercial purposes without our written consent</li>
              <li>Copy, modify, or distribute our content without permission</li>
              <li>Impersonate any person or entity, or misrepresent your affiliation</li>
              <li>Engage in any activity that could harm other users or the Service</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to investigate and take appropriate legal action against anyone who violates these provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5.1 Our Content</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Service contains content owned or licensed by us, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Lesson content and curriculum</li>
              <li>Musical arrangements and compositions</li>
              <li>Graphics, logos, and design elements</li>
              <li>Software code and algorithms</li>
              <li>Documentation and instructional materials</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This content is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works based on our content without our express written permission.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5.2 Your Content</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You retain ownership of any content you create or upload to the Service, such as practice recordings or progress data. By using the Service, you grant us a limited license to use, store, and process your content solely for the purpose of providing the Service to you.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5.3 Third-Party Content</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The Service may include third-party content, such as musical compositions in the public domain or licensed from third parties. Such content is subject to its own terms and conditions, which you agree to follow.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Privacy and Data Protection</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Service, you agree to our collection and use of data as described in the Privacy Policy.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We implement appropriate security measures to protect your data, but no method of transmission over the Internet is 100% secure. You acknowledge and accept this inherent risk when using the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Disclaimers</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT</li>
              <li>WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE</li>
              <li>WARRANTIES REGARDING THE ACCURACY OR RELIABILITY OF ANY INFORMATION OBTAINED THROUGH THE SERVICE</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              WE DO NOT WARRANT THAT THE SERVICE WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS, ACHIEVE ANY INTENDED RESULTS, OR BE COMPATIBLE WITH ANY PARTICULAR DEVICE OR SYSTEM.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL WE, OUR DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
              <li>ANY LOSS OF PROFITS, REVENUE, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES</li>
              <li>ANY DAMAGES RESULTING FROM YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE SERVICE</li>
              <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE</li>
              <li>ANY CONTENT COMPROMISED OR TRANSMITTED THROUGH THE SERVICE</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US (IF ANY) DURING THE TWELVE MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Indemnification</h2>
            <p className="text-gray-700 dark:text-gray-300">
              You agree to indemnify, defend, and hold harmless 841 Squadron, the Canadian Cadet Organization, and our respective officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising from:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mt-4">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Any content you submit or transmit through the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Canada and the province in which 841 Squadron is located, without regard to its conflict of law provisions.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Any disputes arising from or related to these Terms or the Service shall be resolved through good faith negotiations between the parties. If negotiations fail, disputes shall be submitted to the exclusive jurisdiction of the courts located in the applicable province.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Posting the updated Terms on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending an email notification to registered users (if applicable)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your continued use of the Service after any changes constitutes your acceptance of the new Terms. If you do not agree to the updated Terms, you must stop using the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Severability</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving its original intent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Entire Agreement</h2>
            <p className="text-gray-700 dark:text-gray-300">
              These Terms, together with the Privacy Policy and any other legal notices we provide, constitute the entire agreement between you and us regarding the Service. These Terms supersede any prior agreements, representations, or understandings between the parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">14. Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have questions about these Terms, please contact us:
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
