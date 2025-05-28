import { Rule } from '@sanity/types'

const pricingSection = {
  title: "Pricing Section",
  name: "pricingSection",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      description: "Main heading for the pricing section",
      validation: (rule: Rule) => rule.required(),
    },
    {
      title: "Description",
      name: "description",
      type: "text",
      description: "Optional description or subtitle for the section",
    },
    {
      title: "Toggle Options",
      name: "toggleOptions",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g., Monthly, Yearly",
      validation: (rule: Rule) => rule.min(2).max(2),
    },
    {
      title: "Plans",
      name: "plans",
      type: "array",
      of: [
        {
          type: "object",
          name: "plan",
          title: "Plan",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Plan Name",
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: "subheading",
              type: "string",
              title: "Sub Heading",
            },
            {
              name: "monthlyPrice",
              type: "number",
              title: "Monthly Price",
              validation: (rule: Rule) => rule.required().min(0),
            },
            {
              name: "yearlyPrice",
              type: "number",
              title: "Yearly Price",
              validation: (rule: Rule) => rule.required().min(0),
            },
            {
              name: "isPopular",
              type: "boolean",
              title: "Is Most Popular?",
              description: "Highlight this plan as the most popular option",
            },
            {
              name: "features",
              type: "array",
              title: "Features",
              of: [{ type: "string" }],
              validation: (rule: Rule) => rule.required().min(1),
            },
            {
              name: "buttonText",
              type: "string",
              title: "Button Text",
              initialValue: "Choose Plan",
            }
          ]
        }
      ],
      description: "List of pricing plans with their details"
    }
  ]
}

export default pricingSection
