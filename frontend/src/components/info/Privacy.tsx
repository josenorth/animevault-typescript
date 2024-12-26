import { Lock, Eye, Database, Bell, RefreshCw, UserPlus, Shield, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionProps {
  icon: React.ReactNode; // El icono puede ser un nodo React
  title: string; // Título de la sección
  content: string; // Contenido de la sección
}

const Section: React.FC<SectionProps> = ({ icon, title, content }) => {
  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h2 className="text-lg font-medium text-gray-200 mb-2">{title}</h2>
        <p className="text-gray-400">{content}</p>
      </div>
    </div>
  );
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-400 mb-8">Privacy Policy</h1>
        <p className="text-center text-gray-400 mb-8">Last updated: October 13, 2024</p>
        <div className="bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <div className="p-6 space-y-8">
            <Section
              icon={<Lock className="h-6 w-6 text-blue-500" />}
              title="1. Information We Collect"
              content="At AnimeVault, we are committed to protecting the privacy of our users. We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us. Additionally, we may collect non-personally identifiable information, like IP address, browser type, and browsing patterns to improve our services."
            />
            <Section
              icon={<Eye className="h-6 w-6 text-green-500" />}
              title="2. How We Use Your Information"
              content="We use the information we collect to provide, maintain, and improve our services, as well as to develop new features and protect our users. We do not sell or share personal information for advertising purposes."
            />
            <Section
              icon={<Database className="h-6 w-6 text-purple-500" />}
              title="3. Information Storage"
              content="We use industry-standard security measures to protect your information. Data is stored securely and accessed only by authorized personnel. We retain your data for as long as necessary to provide the services or as required by law."
            />
            <Section
              icon={<Bell className="h-6 w-6 text-yellow-500" />}
              title="4. Communications"
              content="We may use your email address to send you service-related notices and promotional communications. You can opt out of promotional communications at any time by following the unsubscribe instructions included in the emails."
            />
            <Section
              icon={<RefreshCw className="h-6 w-6 text-red-500" />}
              title="5. Information Sharing and Disclosure"
              content="We do not share personal information with companies, organizations, or individuals outside of AnimeVault except in specific circumstances, such as to comply with legal obligations, enforce our terms, or protect the rights of AnimeVault or others."
            />
            <Section
              icon={<UserPlus className="h-6 w-6 text-indigo-500" />}
              title="6. Children's Privacy"
              content="Our services are not directed to children under 13. If we learn we have collected personal information from a child under 13, we will delete that information promptly in compliance with applicable laws."
            />
            <Section
              icon={<Shield className="h-6 w-6 text-teal-500" />}
              title="7. Your Rights and Choices"
              content="You have the right to access, correct, or delete your personal information. You can also request a copy of your account data or delete your account at any time through your user profile on our site. No direct contact is necessary for these actions, as we have implemented tools on the platform that allow you to manage your information quickly and easily."
            />
            <Section
              icon={<HelpCircle className="h-6 w-6 text-pink-500" />}
              title="8. Changes to This Policy"
              content="We may update this privacy policy from time to time. Any updates or changes will be posted on this page, and we will notify you of significant changes."
            />
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-500">
          If you have any questions about this Privacy Policy, please{" "}
          <Link to="/contact" className="font-medium text-blue-600 hover:text-blue-500">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
