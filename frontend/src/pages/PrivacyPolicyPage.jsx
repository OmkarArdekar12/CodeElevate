import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-300 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400 mb-10">
          Last updated: July 21, 2026
        </p>

        <section className="space-y-8 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              1. Introduction
            </h2>
            <p>
              CodeElevate ("we", "our", "us") is a coder community platform that
              helps competitive programmers, developers, students, and
              professionals showcase their progress, connect with peers, and
              track their coding statistics. This Privacy Policy explains what
              information we collect, how we use it, and the choices you have
              regarding your data when you use CodeElevate.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              2. Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="text-white font-medium">
                  Account Information:
                </span>{" "}
                Name, email address, username, and password (securely hashed)
                when you register.
              </li>
              <li>
                <span className="text-white font-medium">
                  Profile Information:
                </span>{" "}
                Bio, skills, education, social links, profile picture, banner
                image, and any competitive programming or development handles
                you choose to add (e.g. LeetCode, Codeforces, AtCoder, CodeChef,
                GeeksforGeeks, HackerRank, GitHub, GitLab).
              </li>
              <li>
                <span className="text-white font-medium">
                  Two-Factor Authentication Data:
                </span>{" "}
                A TOTP secret is generated and stored securely if you enable
                2FA. We never store your authenticator app or device
                information.
              </li>
              <li>
                <span className="text-white font-medium">
                  Content You Create:
                </span>{" "}
                Posts, comments, likes, and images you upload.
              </li>
              <li>
                <span className="text-white font-medium">Messages:</span>{" "}
                One-on-one chat messages sent through our real-time messaging
                system.
              </li>
              <li>
                <span className="text-white font-medium">
                  Usage & Technical Data:
                </span>{" "}
                IP address, browser type, device information, and pages visited,
                collected automatically for security and analytics purposes.
              </li>
              <li>
                <span className="text-white font-medium">
                  Third-Party Stats:
                </span>{" "}
                If you enable the stats feature, we fetch public data from
                LeetCode, Codeforces, and GitHub APIs to display your coding
                statistics. We do not access any private data from these
                platforms.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To create and manage your account and profile.</li>
              <li>
                To provide core features such as rankings, messaging,
                connections, posts, and notifications.
              </li>
              <li>
                To display your competitive programming and development
                statistics if you opt in.
              </li>
              <li>
                To secure your account through authentication and two-factor
                verification.
              </li>
              <li>
                To improve platform performance, reliability, and user
                experience.
              </li>
              <li>
                To communicate important updates, security alerts, or platform
                changes.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              4. Data Storage & Security
            </h2>
            <p>
              Your data is stored securely in MongoDB Atlas. Passwords are
              hashed using industry-standard algorithms and are never stored in
              plain text. Media files such as profile pictures, banners, and
              post images are stored via Cloudinary. We use JWT-based and
              session-based authentication, along with optional TOTP-based
              two-factor authentication, to help protect your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              5. Cookies & Sessions
            </h2>
            <p>
              We use cookies and session identifiers to keep you logged in,
              remember your preferences, and maintain a secure session across
              requests. You can disable cookies in your browser, but doing so
              may limit certain features of the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              6. Sharing of Information
            </h2>
            <p>
              We do not sell your personal information. Your public profile
              information (such as your name, bio, and enabled stats) may be
              visible to other users as part of the platform's community
              features, such as search, rankings, and connections. Data may be
              shared with trusted third-party service providers (e.g. Cloudinary
              for storage, MongoDB Atlas for database hosting) strictly to
              operate the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              7. Your Rights & Choices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                You can edit or update your profile information at any time from
                your profile settings.
              </li>
              <li>
                You can control the visibility of your competitive programming
                and development statistics.
              </li>
              <li>You can disconnect linked coding profiles at any time.</li>
              <li>
                You may request account deletion by contacting us, after which
                your personal data will be removed in accordance with applicable
                law.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              8. Children's Privacy
            </h2>
            <p>
              CodeElevate is not intended for individuals under the age of 13.
              We do not knowingly collect personal information from children
              under 13.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated "Last updated" date.
              Continued use of CodeElevate after changes are posted constitutes
              acceptance of the revised policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              10. Contact Us
            </h2>
            <p>
              If you have questions or concerns about this Privacy Policy or how
              your data is handled, please reach out through our{" "}
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
