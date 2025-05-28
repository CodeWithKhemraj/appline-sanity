import { FaApple, FaGooglePlay } from "react-icons/fa";
import Link from "next/link";

interface HeroSectionProps {
  section: {
    title: string;
    subtitle: string;
    highlightedText: string;
    description: string;
    downloadButton: {
      buttonText: string;
      buttonUrl: string;
      buttonIcon: string; // e.g., "apple" or "google"
    };
    demoButton: {
      buttonText: string;
      demoButtonSubtitle: string;
    };
    phoneMockupImage: {
      asset: {
        _id: string;
        url: string;
      };
    };
  };
}

const getButtonIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "apple":
      return <FaApple className="w-5 h-5 mr-2" />;
    case "google":
      return <FaGooglePlay className="w-5 h-5 mr-2" />;
    default:
      return null;
  }
};

export default function HeroSection({ section }: HeroSectionProps) {
  if (!section) return null;

  const {
    title,
    subtitle,
    highlightedText,
    description,
    downloadButton,
    demoButton,
    phoneMockupImage,
  } = section;

  return (
    <section className="bg-white py-12 px-6 md:px-0">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="max-w-xl text-center md:text-left space-y-6">
          <p className="text-sm font-medium text-gray-500">{subtitle}</p>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {title} <span className="text-indigo-400">{highlightedText}</span>
          </h1>
          <p className="text-gray-600 text-base">{description}</p>

          {/* Buttons */}
          <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start">
            <Link
              href={downloadButton.buttonUrl}
              className="inline-flex items-center px-6 py-3 text-white bg-gray-900 hover:bg-black rounded-lg shadow transition"
            >
              {getButtonIcon(downloadButton.buttonIcon)} |
              {downloadButton.buttonText}
            </Link>

            <Link href="#" className="flex flex-col text-left">
              <span className="text-sm text-gray-900 font-medium">
                {demoButton.buttonText}
              </span>
              <span className="text-xs text-gray-500">
                {demoButton.demoButtonSubtitle}
              </span>
            </Link>
          </div>
        </div>

        {/* Phone Mockup Image */}
        {phoneMockupImage?.asset?.url && (
          <div className="mb-10 md:mb-0">
            <img
              src={phoneMockupImage.asset.url}
              alt="Phone Mockup"
              width={350}
              className="mx-auto"
            />
          </div>
        )}
      </div>
    </section>
  );
}
