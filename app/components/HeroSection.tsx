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
      buttonIcon: string;
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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="max-w-xl text-center md:text-left space-y-6">
          <p className="text-base font-medium text-gray-500">{subtitle}</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 leading-tight">
            {title} <span className="text-indigo-500">{highlightedText}</span>
          </h1>
          <p className="text-lg text-gray-600">{description}</p>

          {/* Buttons */}
          <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start">
            <Link
              href={downloadButton.buttonUrl}
              className="inline-flex items-center px-6 py-3 text-white bg-gray-900 hover:bg-black rounded-xl shadow-lg transition duration-300"
            >
              {getButtonIcon(downloadButton.buttonIcon)}
              {downloadButton.buttonText}
            </Link>

            <Link href="#" className="flex flex-col text-left">
              <span className="text-sm text-zinc-900 font-semibold">
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
              className="w-[300px] sm:w-[350px] mx-auto drop-shadow-2xl rounded-3xl"
            />
          </div>
        )}
      </div>

      {/* Optional background glow elements */}
      <div className="absolute -top-32 -left-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-40 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
    </section>
  );
}
