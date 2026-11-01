import { useStore } from '../store';
import Footer from './Footer';

/**
 * Data Telemetry Notice — a formal, technical addendum to the Privacy Policy
 * governing the client-side visitor telemetry subsystem (src/utils/telemetry.ts)
 * and the local persistence layer (zustand/persist → localStorage).
 *
 * Reachable via the footer link "Data Telemetry Notice" and by direct view
 * key 'telemetry-notice'. This document is incorporated by reference into
 * Sections 2.2 (Usage Data) and 4.1 (Current Storage) of the Privacy Policy.
 */
export default function DataTelemetryNotice() {
  const { setCurrentView } = useStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentView('privacy')}
            className="min-h-[48px] min-w-[48px] inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Privacy Policy
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Data Telemetry Notice</h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Effective date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-8 italic">
            Document classification: Public · Incorporated by reference into the Cadet Music Platform Privacy
            Policy (Sections 2.2 and 4.1) · Governing instruments: Personal Information Protection and
            Electronic Documents Act, S.C. 2000, c. 17 ("PIPEDA"), Schedule 1 Principles; Quebec Law 25
            (Loi sur la protection des renseignements personnels); applicable Canadian Armed Forces /
            Department of National Defence administrative privacy directives.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Purpose and Scope of This Notice</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This Data Telemetry Notice (the &ldquo;Notice&rdquo;) sets out, in full technical detail, the
              nature, scope, mechanism, retention, and limitations of the non-invasive, client-side session
              telemetry facility operated by the Cadet Music Platform (the &ldquo;Platform&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;). It applies exclusively to the visitor-analytics subsystem described herein and
              supplements &mdash; but does not supersede &mdash; the Platform Privacy Policy. Where any
              inconsistency arises between this Notice and the Privacy Policy, the provision more protective
              of the user&rsquo;s personal information shall control.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              The operative design principle of the telemetry subsystem is <strong>locality of processing</strong>:
              every datum enumerated in Section 3 is gathered, transformed, serialized, persisted, rendered,
              and destroyed entirely within the user&rsquo;s own browser runtime environment (the user agent
              and its sandboxed storage partition). No telemetry record is transmitted from the user&rsquo;s
              device to any server operated by, licensed to, or acting on behalf of the Platform, its
              administrators, or any third party, except as strictly described in Section 4 regarding the
              ephemeral geolocation resolution handshake.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Definitions</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-3">
              <li><strong>&ldquo;IP Routing Telemetry&rdquo;</strong> means the observation that any request
                issued from a user&rsquo;s device across public Internet infrastructure necessarily carries
                the device&rsquo;s routable network address (IPv4 and/or IPv6) as a mandatory transport-layer
                header field, pursuant to IETF RFC 791 and RFC 8200. An IP address is, at law, capable of
                constituting a &ldquo;personal information&rdquo; or &ldquo;personal data&rdquo; identifier
                insofar as it may permit coarse geographic inference; it is nonetheless a <em>network
                routing identifier</em>, not an authentication credential.</li>
              <li><strong>&ldquo;Client-Side Local Logging&rdquo;</strong> means the serialization of session
                metadata into structured records written solely to the user&rsquo;s own browser Web Storage
                (window.localStorage, per WHATWG HTML Living Standard &sect; 12.2.4), confined to keys bearing
                the namespace prefix <code className="px-1 rounded bg-gray-100 dark:bg-gray-700">cadet-music*</code>,
                and readable only by scripts executing under the same origin (same-origin policy, W3C/CORS
                security model).</li>
              <li><strong>&ldquo;Geolocation Resolution Handshake&rdquo;</strong> means the single,
                rate-limited, best-effort HTTPS GET transaction described in Section 4 by which the
                user&rsquo;s browser asks a public IP-intelligence endpoint to map the already-visible
                routable address to coarse city/region/country metadata.</li>
              <li><strong>&ldquo;Administrative Visitor Log&rdquo;</strong> means the tabular rendering,
                inside the authenticated Admin Panel view of the <em>same browser instance</em>, of locally
                persisted telemetry records, for squadron-level oversight of aggregate traffic patterns.</li>
              <li><strong>&ldquo;Credential Material&rdquo;</strong> means passwords, passphrase hashes,
                API tokens, session cookies, cryptographic private keys, multi-factor secrets, OAuth
                authorization grants, biometric templates, or any other authenticator capable of conferring
                access to an account or system.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Exhaustive Inventory of Collected Data Elements</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Each session record assembled by the telemetry subsystem contains precisely, and only, the
              following fields. No additional fields are collected, inferred, derived, appended, or
              correlated beyond this closed schema:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Field</th>
                    <th className="px-3 py-2 text-left font-semibold">Source API</th>
                    <th className="px-3 py-2 text-left font-semibold">Character &amp; Granularity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr><td className="px-3 py-2">Session timestamp (ISO-8601)</td><td className="px-3 py-2">Date.now()</td><td className="px-3 py-2">Time of visit; no wall-clock tracking after write</td></tr>
                  <tr><td className="px-3 py-2">Routable IP address</td><td className="px-3 py-2">Echo returned by the geolocation endpoint</td><td className="px-3 py-2">Network identifier; stored locally only</td></tr>
                  <tr><td className="px-3 py-2">City / region / country (name + ISO 3166-1 alpha-2 code)</td><td className="px-3 py-2">MaxMind-style GeoIP mapping at the endpoint</td><td className="px-3 py-2">Coarse geographic band; never street-level or GPS precision</td></tr>
                  <tr><td className="px-3 py-2">User-Agent string</td><td className="px-3 py-2">navigator.userAgent</td><td className="px-3 py-2">Browser/OS family labels parsed locally (parseUserAgent); no fingerprinting entropy stacking</td></tr>
                  <tr><td className="px-3 py-2">Screen &amp; viewport pixel dimensions</td><td className="px-3 py-2">window.screen / window.innerWidth/Height</td><td className="px-3 py-2">Layout metrics for responsive-design audit</td></tr>
                  <tr><td className="px-3 py-2">Touch-capability boolean</td><td className="px-3 py-2">&lsquo;ontouchstart&rsquo; in window, navigator.maxTouchPoints</td><td className="px-3 py-2">Binary input-modality flag</td></tr>
                  <tr><td className="px-3 py-2">Logical CPU core count; approximate device memory (GB)</td><td className="px-3 py-2">navigator.hardwareConcurrency; navigator.deviceMemory</td><td className="px-3 py-2">Performance-budget inputs; both are coarse, bucketed values</td></tr>
                  <tr><td className="px-3 py-2">Accept-Language locale tag</td><td className="px-3 py-2">navigator.language</td><td className="px-3 py-2">BCP-47 locale hint (e.g. en-CA)</td></tr>
                  <tr><td className="px-3 py-2">Document referrer</td><td className="px-3 py-2">document.referrer</td><td className="px-3 py-2">Originating page URL if any; recorded as &ldquo;(direct)&rdquo; otherwise</td></tr>
                  <tr><td className="px-3 py-2">Tab-session start marker</td><td className="px-3 py-2">sessionStorage (volatile)</td><td className="px-3 py-2">Ephemeral UUID-free ISO stamp; erased when the tab closes</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Each record is assigned a random v4-format identifier via the WebCrypto-backed
              <code className="px-1 rounded bg-gray-100 dark:bg-gray-700"> crypto.randomUUID()</code> generator
              solely for array-key stability in the local table renderer. That identifier is not a persistent
              cross-session tracking token: it is regenerated per record and is never synchronized, uploaded,
              hashed against external datasets, or joined with advertising or analytics identifiers of any kind.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. IP Routing Telemetry and the Geolocation Resolution Handshake</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Upon initial application mount, the Platform issues one (1) asynchronous, non-blocking HTTP GET
              request to a public IP-intelligence service (primary: ipapi.co; conditional fallback:
              ip-api.com), wrapped in a try/catch boundary with a four-second AbortController timeout. The
              request is fire-and-forget: failures, rate-limit responses (HTTP 429), network unreachability,
              ad-blocker interception, or endpoint outage resolve silently to &ldquo;unknown&rdquo; sentinel
              values and can never interrupt, delay, or degrade the main render loop or any learning feature.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Users should understand the following unavoidable architectural facts, stated plainly: (a) any
              outbound request from a browser inherently discloses the device&rsquo;s routable IP address to
              the destination host, because IP addresses are the addressing scheme of the Internet Protocol
              itself; (b) the receiving endpoint therefore observes the same IP address that every ordinary
              website visit, DNS lookup, or HTTPS connection already discloses; and (c) the response is
              limited to coarse city/region/country metadata derived from commercial GeoIP databases, whose
              accuracy at postal-code or street level is neither claimed nor relied upon.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              The resolved payload is delivered back to, and consumed exclusively by, the requesting
              browser. The Platform maintains no server, database, log pipeline, message queue, or
              analytics warehouse into which these records could be aggregated. Administrators view the
              visitor log only within their own browser&rsquo;s local storage; there exists no remote
              transmission path in the current architecture.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Express Representations Regarding Credentials and Account Non-Extractability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Platform hereby represents, warrants, and makes the following irrevocable clarifications,
              which reflect both policy and the underlying computer-science reality of the systems described:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-3 mb-4">
              <li><strong>No Credential Material is collected by the telemetry subsystem.</strong> None of the
                APIs enumerated in Section 3 exposes, reads, mirrors, or can be coerced into disclosing
                passwords, password hashes, security questions, two-factor secrets, recovery codes, banking
                or government identifiers, or the credentials of any external account (e-mail, social,
                financial, military, or otherwise).</li>
              <li><strong>An IP address lookup cannot extract credentials, as a matter of protocol design.</strong>
                The Domain Name System, Border Gateway Protocol, and GeoIP registration databases contain
                routing and administrative-contact metadata only. There is no defined query, reverse-DNS
                form, WHOIS/RIR record, or MaxMind class of lookup by which a network address resolves to
                a username, password, session token, mailbox contents, installed application list, or
                account state of any person or service. Any assertion that an IP lookup &ldquo;reveals
                your password&rdquo; or &ldquo;grants access to your accounts&rdquo; is technically false,
                and the Platform neither attempts nor possesses the capability to attempt such extraction.
                Authentication secrets reside in identity providers&rsquo; protected stores and in the
                TLS-secured headers of specific login transactions; they are categorically absent from the
                network-layer information the telemetry handshake touches.</li>
              <li><strong>The Platform currently operates without server-side accounts.</strong> Progress,
                streaks, quests, practice logs, banner configuration, and preferences persist solely in the
                user&rsquo;s own browser under the <code className="px-1 rounded bg-gray-100 dark:bg-gray-700">cadet-music*</code>
                namespace. The Platform does not operate a password store today, and future cloud migration
                (Privacy Policy &sect; 4.2) will employ salted adaptive hashing (bcrypt or equivalent) such
                that plaintext Credential Material exists nowhere in any system we administer.</li>
              <li><strong>No content-based surveillance.</strong> The telemetry subsystem performs zero DOM
                scraping, keystroke logging, clipboard reading, screen capture, camera/microphone activation,
                or file-system enumeration. Microphone audio used for pitch coaching is analysed in real time
                inside the Web Audio graph and never persisted or transmitted (Privacy Policy &sect; 2.3).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Legal Basis, Consent, and Minimization</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Processing described in this Notice is undertaken for the purposes of operational oversight,
              capacity planning, and mobile-device support analysis &mdash; legitimate objectives analogous
              to the &ldquo;organizational knowledge&rdquo; and &ldquo;statistical/compliance&rdquo; grounds
              recognized under PIPEDA Principles 4 (Limiting Collection), 5 (Use, Disclosure, and Retention),
              7 (Openness), and 9 (Accountability), and consistent with the necessity/proportionality test
              under Law 25 &sect; 10. The legal basis is informed consent through conspicuous notice: this
              Notice is linked from every page footer, referenced in the Privacy Policy, and surfaced in
              Settings, satisfying meaningful-consent standards prior to first collection.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Data minimization is enforced structurally rather than merely promised: the collection schema
              is closed (Section 3), geographic granularity is capped at city/region/country, device metrics
              are taken from bucketed browser APIs, and the persisted visitor-log array is hard-capped at
              one hundred (100) most-recent sessions in a ring-buffer eviction policy, bounding worst-case
              storage consumption well within the browser&rsquo;s ~5&nbsp;MB localStorage quota. Records older
              than the cap are overwritten automatically; closing all tabs erases session-start markers; and
              clearing site data or invoking the Settings &ldquo;Reset all progress&rdquo; control (scoped to
              <code className="px-1 rounded bg-gray-100 dark:bg-gray-700">cadet-music*</code> keys) destroys all
              telemetry permanently, with no server copy existing against which restoration could occur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Third-Party Endpoint Disclosures</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Exactly two external services may observe the user&rsquo;s IP address during the geolocation
              handshake, each only transiently and only as required to answer the lookup:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li><strong>ipapi.co</strong> (primary) &mdash; free tier, no API key, documented rate limits;
                processes the request to return GeoIP metadata.</li>
              <li><strong>ip-api.com</strong> (fallback, invoked only on primary failure) &mdash; free
                non-commercial tier with published rate limits.</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              These endpoints receive no name, no e-mail address, no learning data, no cookies belonging to
              the Platform, and no referrer beyond the standard Origin header inherent to the fetch. They are
              treated as conduits, not custodians: the Platform does not contract with them, transmit
              batches to them, or rely on them for storage. Should either endpoint become unavailable or
              commercially hostile, the graceful-degradation path in Section 4 renders the effect identical
              to the user having declined the lookup.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. User Control, Access, and Opt-Out Mechanics</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-3">
              <li><strong>Inspect:</strong> any cadet or administrator may open the Admin Panel visitor-log
                tab and read every locally stored record in plaintext, tabular form.</li>
              <li><strong>Purge:</strong> the Admin Panel provides a destructive &ldquo;clear visitor logs&rdquo;
                action; Settings &rarr; Reset removes all Platform keys; browser developer tools (Application
                &rarr; Local Storage) allow manual inspection and deletion of every byte described herein.</li>
              <li><strong>Prevent:</strong> users may block ipapi.co/ip-api.com via browser extension,
                firewall rule, or DNS sinkhole; the handshake fails silently and the app functions normally
                with unknown-location sentinels. Refusing the handshake constitutes a valid opt-out and will
                never disable, penalize, or visibly degrade any learning feature, streak, quest, or score.</li>
              <li><strong>Incognito/Private mode:</strong> running the Platform in a private browsing context
                confines all persistence to the ephemeral profile, which self-destructs on window close.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Retention, Transfer, and Security Posture</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Retention is bounded by the 100-record ring buffer and by the user&rsquo;s own browser-storage
              lifecycle. There is no cross-border transfer conducted by the Platform: the sole outbound
              transaction is the user-initiated geolocation handshake, over TLS where the endpoint supports
              HTTPS, with the fallback endpoint operating over cleartext HTTP strictly because the payload
              exchanged (an already-public routable address and coarse geography) contains no confidential
              material; users on networks requiring end-to-end encryption may block the fallback and accept
              unknown-location records instead.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Because records never leave the device, the applicable security perimeter is the browser
              sandbox and the physical/logical security of the user&rsquo;s own machine. Shared or public
              workstations should employ OS-level account separation; administrators are advised to review
              local logs on unit-owned devices in accordance with applicable DND/CAF acceptable-use policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Interpretation and Severability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This Notice shall be read harmoniously with the Privacy Policy and Terms of Service. Headings
              are for convenience only. If any provision is held invalid or unenforceable by a court or
              tribunal of competent jurisdiction, the remaining provisions continue in full force. Words of
              inclusion (&ldquo;including&rdquo;, &ldquo;e.g.&rdquo;) are illustrative, not exhaustive;
              provided that, notwithstanding any rule of construction, the data inventory in Section 3 is
              closed and exhaustive, and no field outside it may be added without republication of this
              Notice with a new effective date and conspicuous re-notice to users.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Amendments driven by genuine architectural change (e.g., future backend migration) will be
              versioned, dated, and archived. Continued use of the Platform following such republication
              constitutes acknowledgement of the updated processing description.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Accountability Contact</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Privacy inquiries, access requests, complaint intake, and questions about this Notice may be
              directed to the Platform&rsquo;s accountable officer via squadron leadership:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>841 Squadron &mdash; Cadet Music Platform Administration</strong><br />
                Canadian Cadet Organization<br />
                Attn: Privacy-Accountable Officer (via Commanding Officer)<br />
                Email: [Contact email to be provided]<br />
                Address: [Squadron address to be provided]
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 italic">
              Plain-language summary, for reassurance: the app notes roughly where you visited from and what
              kind of device you used, keeps that note only on your own device, shows it to no central
              server, caps it at the last 100 visits, deletes it whenever you ask, and &mdash; contrary to a
              common fear &mdash; an IP-address lookup is physically incapable of revealing your passwords,
              unlocking any of your accounts, or exposing anything else about you beyond coarse geography.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
