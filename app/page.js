import { Button } from "@/components/ui/button";

import Header from "./dashboard/_components/Header";
import Link from 'next/link';


const Feature = ({ title, text }) => (
  <div className="flex flex-col items-center space-y-3">
    <p className="font-bold text-lg text-black">{title}</p>
    <p className="text-center text-gray-600">{text}</p>
  </div>
);

const PriceWrapper = ({ children, isRecommended = false }) => (
  <div className={`relative p-8 shadow-${isRecommended ? "2xl" : "lg"} border border-${isRecommended ? "black" : "gray-200"} rounded-xl bg-white flex flex-col justify-between h-[450px] transform-${isRecommended ? "scale-105" : "none"} z-${isRecommended ? 1 : 0}`}>
    {isRecommended && (
      <div className="absolute top-[-16px] left-1/2 transform-translate-x-[-50%] px-3 py-1 bg-black text-white font-bold text-sm rounded-full">
        Recommended
      </div>
    )}
    {children}
  </div>
);

export default function Home() {
  return (
    <div className="relative flex flex-col justify-between min-h-screen overflow-hidden">
      <Header />

      {/* Add spacing above the Hero Section */}
      <div className="mt-32"></div>

      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-center z-50 py-16">
        <div className="text-center max-w-screen-lg px-4">
          <h1 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
            Upload a Text Document and Generate Flashcards Instantly
          </h1>
          
          <p className="mb-8 text-lg md:text-xl text-gray-500 dark:text-gray-400">
            Transform your study materials into an interactive learning experience with AI-powered flashcards.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a href="/dashboard" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-black hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Get Started for Free
            </a>
          </div>
          <div className="mt-8"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto text-center">
          <div className="space-y-10">
            <h2 className="text-3xl font-bold text-black">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <Feature title="Upload Documents" text="Easily upload documents and extract key information." />
              <Feature title="Generate Flashcards" text="Turn your content into interactive flashcards with AI-driven insights." />
              <Feature title="Customize and Study" text="Edit, customize, and study flashcards tailored to your learning." />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-black">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <PriceWrapper>
                <div className="space-y-2">
                  <p className="text-2xl font-semibold text-black">Basic</p>
                  <h3 className="text-3xl font-bold text-black">$0</h3>
                  <p className="text-lg text-gray-500">per month</p>
                  <div className="space-y-4 mt-4 text-left">
                    <p className="text-gray-600">1 document upload</p>
                    <p className="text-gray-600">Basic flashcards</p>
                    <p className="text-gray-600">Only text file formats are supported</p>
                  </div>
                </div>
              </PriceWrapper>
              <PriceWrapper isRecommended={true}>
                <div className="space-y-2">
                  <p className="text-2xl font-semibold text-black">Pro</p>
                  <h3 className="text-3xl font-bold text-black">$9.99</h3>
                  <p className="text-lg text-gray-500">per month</p>
                  <div className="space-y-4 mt-4 text-left">
                    <p className="text-gray-600">5 document uploads</p>
                    <p className="text-gray-600">Advanced flashcard generation</p>
                    <p className="text-gray-600">Upload pdf and doc file formats</p>
                  </div>
                </div>
              </PriceWrapper>
              <PriceWrapper>
                <div className="space-y-2">
                  <p className="text-2xl font-semibold text-black">Enterprise</p>
                  <h3 className="text-3xl font-bold text-black">Custom</h3>
                  <p className="text-lg text-gray-500">per month</p>
                  <div className="space-y-4 mt-4 text-left">
                    <p className="text-gray-600">Unlimited document uploads</p>
                    <p className="text-gray-600">Full custom flashcard solutions</p>
                    <p className="text-gray-600">Unlimited upload file formats supported</p>
                  </div>
                </div>
              </PriceWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-20 text-black">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl mb-6 font-bold">Start Generating Flashcards Today!</h2>
          <p className="text-xl mb-8 text-gray-600">Upload your documents and transform your study experience with AI-generated flashcards.</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a href="/dashboard" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-black hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Get Started Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
