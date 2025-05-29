"use client";

import { useState } from "react";

interface Plan {
  name: string;
  subheading?: string;
  isPopular: boolean;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  buttonText: string;
}

interface PricingFeatureProps {
  section: {
    title: string;
    description?: string;
    toggleOptions: string[];
    plans: Plan[];
  };
}

export default function PricingFeature({ section }: PricingFeatureProps) {
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const [toggled, setToogled] = useState(false);
  const handleToggle = () => {
    setToogled((prev) => !prev);
    toggled ? setBillingCycle("Yearly") : setBillingCycle("Monthly");
  };
  if (!section) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-1 text-black">
          {section.title}
        </h2>
        {section.description && (
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            {section.description}
          </p>
        )}

        {/* Toggle */}
        <div className="flex justify-center items-center gap-4 mb-12">
          {section.toggleOptions.map((option) => (
            <label
              key={option}
              className={`cursor-pointer font-semibold ${
                billingCycle === option
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
            >
              <input
                type="radio"
                name="billingCycle"
                className="sr-only"
                value={option}
                checked={billingCycle === option}
                onChange={() => setBillingCycle(option)}
              />
              {option}
            </label>
          ))}
          <div
            className="relative w-12 h-6 bg-gray-200 rounded-full cursor-pointer"
            onClick={handleToggle}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-indigo-600 rounded-full transition-transform ${
                billingCycle === "Yearly" ? "translate-x-6" : ""
              }`}
            />
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {section.plans.map((plan, index) => {
            const price =
              billingCycle === "Monthly" ? plan.monthlyPrice : plan.yearlyPrice;

            return (
              <div
                key={index}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.isPopular
                    ? "border-2 border-indigo-600 shadow-xl"
                    : "border border-gray-200"
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute top-4 right-4 text-xs font-bold text-indigo-600">
                    Most popular
                  </span>
                )}

                <h3 className="text-xl font-bold mb-1 text-black">{plan.name}</h3>
                {plan.subheading && (
                  <p className="text-sm text-gray-500 mb-4">
                    {plan.subheading}
                  </p>
                )}

                <div className="text-4xl font-bold mb-6 text-zinc-900">
                  ${price}
                  <span className="text-sm font-normal text-gray-500">
                    /{billingCycle?.toLowerCase()}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 text-left text-sm">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                    plan.isPopular
                      ? "bg-indigo-500 text-white hover:bg-indigo-600"
                      : "bg-zinc-900 text-white hover:bg-zinc-800"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
