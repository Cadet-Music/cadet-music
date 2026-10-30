import { useStore } from '../store';
import Footer from './Footer';

export default function CookiePolicy() {
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
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Cookie Policy</h1>
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. What Are Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide useful information to website owners.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Similar technologies include:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li><strong>Local Storage:</strong> Stores data in your browser that persists until you clear it</li>
              <li><strong>Session Storage:</strong> Stores data for the duration of your browsing session</li>
              <li><strong>Web Beacons:</strong> Small graphic files used to track usage patterns</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              In this policy, we use the term "cookies" to refer to all these technologies collectively.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Cadet Music Platform uses cookies and similar technologies for the following purposes:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">2.1 Essential Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  These cookies are necessary for the platform to function properly. They enable core features such as:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>User authentication and session management</li>
                  <li>Security features</li>
                  <li>Basic platform functionality</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  <strong>Without these cookies, the platform cannot function properly.</strong>
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">2.2 Functional Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  These cookies enhance your experience by remembering your preferences:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Theme preferences (light/dark mode)</li>
                  <li>Language settings</li>
                  <li>Learning progress and achievements</li>
                  <li>Selected instrument and skill level</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  <strong>These cookies improve usability but are not essential.</strong>
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">2.3 Analytics Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  These cookies help us understand how you use the platform:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Which lessons are most popular</li>
                  <li>How long users spend on each lesson</li>
                  <li>Where users encounter difficulties</li>
                  <li>Overall usage patterns</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  <strong>This information helps us improve the platform.</strong>
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Current Implementation</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Current Status:</strong> The Cadet Music Platform currently uses <strong>local storage</strong> (browser storage) to save your progress and preferences. This data:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Remains on your device only</li>
              <li>Is not transmitted to external servers</li>
              <li>Can be cleared by clearing your browser data</li>
              <li>Does not track you across other websites</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>What we store locally:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Account information (username, rank, email)</li>
              <li>Learning progress (completed lessons, XP, streaks)</li>
              <li>Preferences (selected instrument, theme settings)</li>
              <li>Performance data (accuracy, mastery levels)</li>
              <li>Selected songs and practice history</li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> When we migrate to cloud-based storage (planned for future updates), this policy will be updated to reflect server-side cookie usage.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Third-Party Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Currently, the Cadet Music Platform <strong>does not use third-party cookies</strong>. We do not integrate with:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Social media platforms (Facebook, Twitter, etc.)</li>
              <li>Advertising networks</li>
              <li>Third-party analytics services</li>
              <li>External content providers</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              If we add third-party services in the future, we will update this policy and obtain your consent where required.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Managing Cookies</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5.1 Browser Settings</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You can control and manage cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>View what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block all cookies</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 dark:text-yellow-200">
                <strong>Warning:</strong> If you block or delete cookies, some features of the platform may not work properly, and you may lose your progress data.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5.2 Browser-Specific Instructions</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Chrome</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Settings → Privacy and security → Cookies and other site data
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Firefox</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Options → Privacy & Security → Cookies and Site Data
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Safari</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Preferences → Privacy → Cookies and website data
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Edge</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Settings → Cookies and site permissions → Manage and delete cookies
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Do Not Track</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to be tracked. Currently, the Cadet Music Platform does not respond to "Do Not Track" signals because:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>We use local storage, not tracking cookies</li>
              <li>Your data stays on your device</li>
              <li>We do not share data with third parties</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              When we implement server-side tracking in the future, we will respect "Do Not Track" preferences and update this policy accordingly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Consent</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Essential cookies</strong> (local storage for platform functionality) do not require your consent as they are necessary for the platform to work.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Functional and analytics cookies</strong> require your consent. By continuing to use the platform, you consent to our use of these cookies as described in this policy.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              You can withdraw your consent at any time by clearing your browser data or adjusting your browser settings. However, this may affect the platform's functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Data Retention</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Local Storage Data:</strong> Data stored in your browser's local storage persists until:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>You clear your browser data</li>
              <li>You use "Clear Site Data" in your browser settings</li>
              <li>You uninstall your browser</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Future Cloud Storage:</strong> When we migrate to cloud-based storage, we will retain your data for as long as your account is active. You can request deletion of your account and data at any time (see our Privacy Policy for details).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Updates to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. When we make changes:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>We will update the "Last updated" date at the top of this page</li>
              <li>For significant changes, we will provide more prominent notice</li>
              <li>We encourage you to review this policy periodically</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have questions about our use of cookies or this policy, please contact us:
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
