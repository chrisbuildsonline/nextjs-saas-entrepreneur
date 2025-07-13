import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What's included in the boilerplate?",
    answer:
      "The boilerplate includes authentication, Stripe payments, database setup, user dashboard, admin panel, email templates, and complete deployment configuration. Everything you need to launch a SaaS.",
  },
  {
    question: "Do I need coding experience?",
    answer:
      "Basic knowledge of React and Next.js is recommended. The code is well-documented with clear instructions, making it accessible for developers of all levels.",
  },
  {
    question: "Can I customize the design?",
    answer:
      "The entire UI is built with Tailwind CSS and shadcn/ui components, making it easy to customize colors, layouts, and components to match your brand.",
  },
  {
    question: "Is this a one-time purchase?",
    answer:
      "Yes, it's a one-time purchase with lifetime access to the code and updates. No recurring fees or subscriptions required.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We provide comprehensive documentation, video tutorials, and community support through Discord. Premium support is available for enterprise customers.",
  },
  {
    question: "Can I use this for multiple projects?",
    answer:
      "Yes, you can use the boilerplate for unlimited personal and commercial projects. Perfect for agencies and entrepreneurs building multiple SaaS products.",
  },
]

export function FAQ() {
  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about the SaaS Entrepreneur Starter
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
