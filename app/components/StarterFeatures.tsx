interface StarterFeaturesProps {
  section: {
    title: string;
    description: string;
    features: Array<{
      icon: {
        asset: {
          url: string;
        };
      };
      heading: string;
      description: string;
    }>;
  };
}

export default function StarterFeatures({ section }: StarterFeaturesProps) {
  if (!section) return null;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-zinc-900 mb-4">{section.title}</h2>
        <p className="text-lg text-gray-500 mb-16 max-w-2xl mx-auto">{section.description}</p>

        <div className="bg-white shadow-xs rounded-3xl p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {section.features?.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {feature.icon?.asset?.url && (
                <div className="w-14 h-14 flex items-center justify-center bg-indigo-100 rounded-2xl mb-4">
                  <img
                    src={feature.icon.asset.url}
                    alt={feature.heading}
                    className="w-6 h-6 object-contain"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">{feature.heading}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Optional gradient background circle */}
      <div className="absolute -top-20 -left-40 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
    </section>
  );
}
