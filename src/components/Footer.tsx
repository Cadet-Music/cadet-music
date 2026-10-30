import { useStore } from '../store';

export default function Footer() {
  const { setCurrentView } = useStore();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-semibold mb-3">About Cadet Music</h3>
            <p className="text-sm text-gray-400">
              A comprehensive music learning platform for Canadian Cadets, 
              aligned with official CCO standards and designed to help you 
              master your instrument.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('settings')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Settings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('analytics')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentView('privacy')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('terms')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('cookies')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} 841 Squadron. All rights reserved.
            </div>
            <div className="text-sm text-gray-400">
              Canadian Cadet Organization Music Program
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
