"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    category: "Orders & Shipping",
    question: "How long does delivery take?",
    answer:
      "Delivery typically takes 3-7 business days depending on your location. Metro cities receive orders faster (3-4 days) while remote areas may take up to 7 days. You'll receive tracking information once your order is shipped.",
  },
  {
    id: 2,
    category: "Orders & Shipping",
    question: "Do you offer international shipping?",
    answer:
      "Currently, we only ship within India. We're working on expanding our services internationally. Please check back later for updates on international shipping.",
  },
  {
    id: 3,
    category: "Orders & Shipping",
    question: "How can I track my order?",
    answer:
      "You can track your order using the Track Order page. Enter your order ID and registered email address to get real-time updates on your shipment status.",
  },
  {
    id: 4,
    category: "Payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods including Credit/Debit Cards, UPI, Net Banking, and Wallets through Razorpay. All transactions are secure and encrypted.",
  },
  {
    id: 5,
    category: "Payments",
    question: "Is it safe to use my credit card on your website?",
    answer:
      "Yes, absolutely! We use Razorpay, a PCI DSS compliant payment gateway. All transactions are encrypted with SSL technology, and we never store your complete card details.",
  },
  {
    id: 6,
    category: "Payments",
    question: "Can I pay cash on delivery?",
    answer:
      "Cash on Delivery (COD) is available for select pin codes. You can check COD availability during checkout. A small COD handling charge may apply.",
  },
  {
    id: 7,
    category: "Returns & Refunds",
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy for most products. Items must be unused, in original packaging, and with all tags intact. Electronics and certain categories may have different return windows.",
  },
  {
    id: 8,
    category: "Returns & Refunds",
    question: "How do I return a product?",
    answer:
      "To return a product, go to your Orders page, select the order, and click 'Return Item'. Fill out the return form and our team will arrange a pickup. Refunds are processed within 5-7 business days after we receive the item.",
  },
  {
    id: 9,
    category: "Returns & Refunds",
    question: "When will I receive my refund?",
    answer:
      "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The amount will be credited to your original payment method or wallet.",
  },
  {
    id: 10,
    category: "Account & Wallet",
    question: "How does the wallet work?",
    answer:
      "Your wallet stores refunds and cashback. You can use wallet balance for future purchases. Wallet funds don't expire and can be used partially or fully during checkout.",
  },
  {
    id: 11,
    category: "Account & Wallet",
    question: "How do I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login page. Enter your registered email, and we'll send you a password reset link. Follow the instructions in the email to set a new password.",
  },
  {
    id: 12,
    category: "Products",
    question: "Are the products genuine?",
    answer:
      "Yes, we source all products directly from authorized manufacturers and distributors. Every product comes with a manufacturer warranty and authenticity guarantee.",
  },
  {
    id: 13,
    category: "Products",
    question: "How do I know if a product is in stock?",
    answer:
      "Stock availability is shown on each product page. If a product is out of stock, you can click 'Notify Me' to receive an email when it's back in stock.",
  },
  {
    id: 14,
    category: "Customer Support",
    question: "How can I contact customer support?",
    answer:
      "You can reach us via email at sales@bytewiseconsulting.in or call us at 8332936831. Our support team is available Monday to Saturday, 10 AM to 6 PM IST.",
  },
  {
    id: 15,
    category: "Customer Support",
    question: "What if I receive a damaged product?",
    answer:
      "If you receive a damaged product, please contact us immediately with photos of the damage. We'll arrange a replacement or full refund at no extra cost. Don't accept damaged packages from the delivery person.",
  },
];

export default function FAQsPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(faqs.map((faq) => faq.category)))];

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about orders, payments, and more
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">
                    {faq.question}
                  </h3>
                </div>
                {openId === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                )}
              </button>
              {openId === faq.id && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our customer support team
            is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:sales@bytewiseconsulting.in"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Email Support
            </a>
            <a
              href="tel:8332936831"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Call: 8332936831
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
