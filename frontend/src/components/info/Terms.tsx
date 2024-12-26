import { ScrollText, Shield, Eye, Scale, Link2, HelpCircle } from "lucide-react";
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

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-400 mb-8">Terms and Conditions</h1>
        <p className="text-center text-gray-400 mb-8">Last updated: October 13, 2024</p>
        <div className="bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <div className="p-6 space-y-8">
            <Section
              icon={<ScrollText className="h-6 w-6 text-blue-500" />}
              title="1. Description of Service"
              content="AnimeVault is a free platform that provides information about anime, including details such as titles, production studios, release years, and other related metadata. We do not offer subscriptions, paid services, or premium content. All information is freely accessible."
            />
            <Section
              icon={<Eye className="h-6 w-6 text-green-500" />}
              title="2. Use of Website"
              content="The content on AnimeVault is intended for informational and entertainment purposes only. The website is free to use and open to anyone over the age of 13. We reserve the right to modify, suspend, or discontinue any part of the content or features of the site at any time, without prior notice."
            />
            <Section
              icon={<Shield className="h-6 w-6 text-purple-500" />}
              title="3. Intellectual Property"
              content="The content available on AnimeVault, including text, graphics, logos, and other visual elements, is the property of AnimeVault or used with permission. We do not own rights to the anime titles or associated images or videos, as these belong to their respective owners. You may not copy, distribute, or reproduce the content without prior written consent, except for personal and non-commercial use."
            />
            <Section
              icon={<Scale className="h-6 w-6 text-yellow-500" />}
              title="4. Limitation of Liability"
              content="While AnimeVault strives to provide accurate and up-to-date information, we do not guarantee the accuracy, completeness, or timeliness of the content. We assume no responsibility for errors or omissions in the information provided. Additionally, we are not liable for damages or losses resulting from the use of our website or the inability to access it."
            />
            <Section
              icon={<Link2 className="h-6 w-6 text-red-500" />}
              title="5. Third-Party Links"
              content="AnimeVault may contain links to third-party websites. These links are provided for your convenience and do not imply any endorsement or responsibility for the content of those sites. We do not control or are responsible for third-party privacy policies or practices."
            />
            <Section
              icon={<Shield className="h-6 w-6 text-indigo-500" />}
              title="6. Privacy"
              content="AnimeVault respects the privacy of its users. We do not collect personal information beyond what is strictly necessary for the functionality of the site. Any data you provide, such as email or non-identifiable information, will be handled in accordance with our Privacy Policy."
            />
            <Section
              icon={<HelpCircle className="h-6 w-6 text-pink-500" />}
              title="7. Changes to Terms"
              content="We reserve the right to modify these Terms and Conditions at any time. Updates or changes will be posted on this page, and continued use of the site after such changes will constitute your acceptance of them."
            />
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-500">
          If you have any questions about these Terms and Conditions, please{" "}
          <Link to="/contact" className="font-medium text-blue-600 hover:text-blue-500">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
