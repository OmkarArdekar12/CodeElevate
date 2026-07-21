import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-300 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-400 mb-10">
          Last updated: July 21, 2026
        </p>

        <section className="space-y-8 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using CodeElevate ("the Platform"), you agree to
              be bound by these Terms of Service. If you do not agree with any
              part of these terms, please do not use the Platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              2. Eligibility
            </h2>
            <p>
              You must be at least 13 years old to create an account and use
              CodeElevate. By registering, you confirm that the information you
              provide is accurate and that you meet this age requirement.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              3. Account Responsibilities
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                You are responsible for maintaining the confidentiality of your
                login credentials and two-factor authentication (TOTP) setup.
              </li>
              <li>
                You are responsible for all activity that occurs under your
                account.
              </li>
              <li>
                You must notify us promptly of any unauthorized use of your
                account.
              </li>
              <li>
                You may not impersonate another person or misrepresent your
                affiliation with any organization.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              4. Acceptable Use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                Post content that is unlawful, abusive, harassing, defamatory,
                or infringes on the rights of others.
              </li>
              <li>
                Use the messaging, posting, or connection features to spam,
                harass, or send unsolicited content to other users.
              </li>
              <li>
                Attempt to gain unauthorized access to other accounts, the
                Platform's infrastructure, or data of other users.
              </li>
              <li>
                Misuse the ranking, stats, or profile systems to misrepresent
                your competitive programming or development achievements.
              </li>
              <li>
                Use automated tools (bots, scrapers) to interact with the
                Platform without prior written permission.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              5. Content Ownership
            </h2>
            <p>
              You retain ownership of the content you post (profile information,
              posts, comments, images). By posting content on CodeElevate, you
              grant us a non-exclusive, worldwide, royalty-free license to host,
              display, and distribute that content solely for the purpose of
              operating and promoting the Platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              6. Third-Party Statistics
            </h2>
            <p>
              CodeElevate displays publicly available statistics from
              third-party platforms (LeetCode, Codeforces, GitHub) based on
              handles you provide. We are not affiliated with these platforms
              and are not responsible for the accuracy, availability, or rate
              limits of their APIs. Displayed stats may be cached and refreshed
              periodically rather than shown in real time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              7. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your account, at our
              discretion, if you violate these Terms, engage in abusive
              behavior, or misuse the Platform in a way that harms other users
              or the service itself. You may also delete your account at any
              time by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              8. Disclaimer of Warranties
            </h2>
            <p>
              CodeElevate is provided "as is" and "as available" without
              warranties of any kind, express or implied. We do not guarantee
              that the Platform will be uninterrupted, error-free, or completely
              secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              9. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, CodeElevate and its
              creator shall not be liable for any indirect, incidental, or
              consequential damages arising out of your use of, or inability to
              use, the Platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              10. Changes to These Terms
            </h2>
            <p>
              We may revise these Terms from time to time. Continued use of
              CodeElevate after changes are posted constitutes your acceptance
              of the updated Terms. We recommend reviewing this page
              periodically.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              11. Contact Us
            </h2>
            <p>
              For any questions regarding these Terms of Service, please reach
              out through our{" "}
              <a
                href="https://github.com/OmkarArdekar12/CodeElevate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                GitHub repository
              </a>{" "}
              or contact the author directly via{" "}
              <a
                href="https://www.linkedin.com/in/omkarardekar09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </section>

        <div className="mt-12">
          <Link
            to="/"
            className="text-orange-500 hover:underline text-sm font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
