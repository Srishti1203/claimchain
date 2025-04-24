import { useEffect } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import Layout from "../components/Layout";

// Image Imports
import myimage from "../assets/myimage.png";
import myimage1 from "../assets/download (1).png";
import myimage2 from "../assets/images.png";
import myimage3 from "../assets/images (2).png";

// Social Icons
import twitterIcon from "../assets/96ccefc3-eafe-4df5-9b7d-63ef56f2baf5.png";
import linkedinIcon from "../assets/2e6c132f-c656-4d08-a02f-b204835adc8f.png";
import instagramIcon from "../assets/b12d2e2c-3c0f-4ba5-94f4-6a431a86b005.png";

export default function Home() {
  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);

  return (
    <div className="bg-[#FFF8F0] text-[#2E2A27] min-h-screen">
      <Layout>
        <div className="max-w-7xl mx-auto px-6 py-12 font-sans">
          {/* Header */}
          <header className="text-center mb-20" data-aos="fade-down">
            <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FB8C00] via-[#FF6F61] to-[#FFD54F]">
              ClaimChain
            </h1>
            <p className="text-2xl mt-4 font-semibold text-[#6D4C41]">
              Empower Voices. Onchain. In Real Time.
            </p>
            <p className="text-lg mt-2 text-[#8D6E63] italic">
              🌟 Civic Action. Transparent. Immutable. Beautiful.
            </p>
            <p className="text-lg mt-2 text-[#8D6E63] italic">
            Welcome to Civic Action Live – your real-time dashboard for community impact.
            </p>
            {/* Hero Section */}
        
        <section className="bg-purple-100 py-12 px-6 rounded-xl shadow-md mb-16" data-aos="fade-up">

          <h1 data-aos="fade-up" className="text-5xl font-bold mb-6">Empower Voices. Onchain. In Real Time.</h1>
          <p data-aos="fade-up" className="text-lg mb-6">
            ClaimChain allows citizens to report civic issues with voice, all tracked on the blockchain for transparency.
          </p>
          
          <div data-aos="fade-up" className="flex justify-center gap-6 mb-8">
            <Link to="/report">
              <button className="bg-indigo-800 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-300">
                Start a Report
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-500 transition-all duration-300">
                View Dashboard
              </button>
            </Link>
          </div>
        </section>
          </header>

          {/* Hero Image */}
          <section className="relative mb-20">
            <img
              src={myimage}
              alt="Hero Civic"
              className="w-full rounded-3xl shadow-xl object-cover max-h-[500px]"
              data-aos="fade-up"
            />
          </section>

          {/* CTA Buttons */}
          <div data-aos="fade-up" className="flex flex-wrap gap-6 justify-center mb-20">
            <Link to="/report">
              <button className="text-xl font-bold bg-[#FB8C00] text-white px-8 py-4 rounded-2xl shadow-md hover:shadow-lg hover:bg-[#F57C00] transition-all duration-300">
                🚀 Start a Report
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="text-xl font-bold bg-[#43A047] text-white px-8 py-4 rounded-2xl shadow-md hover:shadow-lg hover:bg-[#388E3C] transition-all duration-300">
                📊 View Dashboard
              </button>
            </Link>
          </div>

          {/* Saarthi Assistant */}
          <section className="bg-[#FFF3E0] py-12 px-6 rounded-2xl shadow-lg mb-20" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-[#6A1B9A] mb-6">💬 Talk to Saarthi AI Assistant</h2>
            <p className="text-lg font-medium mb-4 text-[#4E342E]">
              Ask Saarthi anything about civic issues, government schemes, how to file complaints, and more.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-md max-w-4xl mx-auto text-left mb-6">
              <h3 className="text-2xl font-bold text-[#FB8C00] mb-4">Example Prompts:</h3>
              <ul className="list-disc pl-6 text-base font-medium text-[#5D4037] space-y-2">
                <li>“How do I report a pothole in my area?”</li>
                <li>“What schemes are available for senior citizens in Delhi?”</li>
                <li>“How does blockchain ensure transparency?”</li>
                <li>“Show recent complaints from my locality.”</li>
              </ul>
            </div>
            <Link to="/saarthi">
              <button className="text-lg font-semibold bg-[#6A1B9A] text-white px-8 py-4 rounded-xl hover:bg-[#4A148C] transition">
                🧠 Chat with Saarthi
              </button>
            </Link>
          </section>

          {/* Features */}
          <section className="mb-20" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-[#3E2723] mb-8">🔍 Why ClaimChain?</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <FeatureCard
                title="Transparent Governance"
                color="[#FB8C00]"
                text="Blockchain technology makes all civic reports tamper-proof and publicly verifiable."
              />
              <FeatureCard
                title="Real-Time Tracking"
                color="[#43A047]"
                text="Every complaint is visible with live updates. Citizens and officials stay on the same page."
              />
              <FeatureCard
                title="Citizen Empowerment"
                color="[#3949AB]"
                text="Let your voice be heard. Raise issues with voice or text. Quick action guaranteed."
              />
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20" data-aos="fade-up">
            <StatBox number="50K+" label="Reports Submitted" color="[#FB8C00]" />
            <StatBox number="3M+" label="People Impacted" color="[#43A047]" />
            <StatBox number="500+" label="Verified Resolutions" color="[#3949AB]" />
            <StatBox number="80%" label="Response Rate" color="[#FDD835]" />
          </section>

          {/* Partners */}
          <section className="mb-20" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-[#3E2723] mb-6">🤝 Our Trusted Partners</h2>
            <div className="flex justify-center gap-12 items-center">
              <img src={myimage1} alt="Partner 1" className="w-32" />
              <img src={myimage2} alt="Partner 2" className="w-32" />
              <img src={myimage3} alt="Partner 3" className="w-32" />
            </div>
          </section>
          {/* Testimonials Section */}
        <section data-aos="fade-up" className="bg-gray-50 py-12">
          <h2 className="text-4xl font-semibold text-indigo-600 text-center mb-6">What People Are Saying</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="p-6 bg-white rounded-lg shadow-md w-full sm:w-96 hover:scale-105 transition-transform duration-300">
              <p className="text-lg text-gray-600 mb-4">
                “ClaimChain has allowed us to track complaints in real-time. It’s made our operations faster and more transparent.”
              </p>
              <div className="font-semibold text-indigo-600">Suresh Kumar</div>
              <div className="text-sm text-gray-500">NGO Leader, Delhi</div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md w-full sm:w-96 hover:scale-105 transition-transform duration-300">
              <p className="text-lg text-gray-600 mb-4">
                “We finally have a platform where citizens can voice their concerns, and it actually makes a difference!”
              </p>
              <div className="font-semibold text-indigo-600">Priya Sharma</div>
              <div className="text-sm text-gray-500">Community Volunteer</div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md w-full sm:w-96 hover:scale-105 transition-transform duration-300">
              <p className="text-lg text-gray-600 mb-4">
                “As a citizen, I feel more connected to my community with ClaimChain, knowing my reports are being acted upon.”
              </p>
              <div className="font-semibold text-indigo-600">Ravi Gupta</div>
              <div className="text-sm text-gray-500">Citizen, Mumbai</div>
            </div>
          </div>
        </section>
        {/* Call to Action Section */}
        <section data-aos="fade-up" className="bg-purple-100 py-12 px-6 rounded-xl shadow-md mb-16 aos-init aos-animate text-center mb-12">
          <h2 className="text-3xl font-semibold mb-6">Join the Movement. Make a Difference.</h2>
          <p className="text-lg mb-6">
            ClaimChain is the future of reporting and solving civic issues — using **blockchain technology** and **real-time action**.
          </p>
          <Link to="/report">
            <button className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-500 transition-all duration-300">
              Start Reporting Now
            </button>
          </Link>
        </section>

          {/* Footer */}
          <footer className="bg-purple-100 py-12 px-6 rounded-xl shadow-md mb-16" data-aos="fade-up">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2 tracking-wide">ClaimChain ✨</h3>
                <p className="text-md">
                  Built with purpose. Powered by community. Secured onchain.
                </p>
              </div>
              <div className="flex space-x-6">
                <a href="#"><img src={twitterIcon} alt="Twitter" className="w-8 h-8 hover:scale-110 transition" /></a>
                <a href="#"><img src={linkedinIcon} alt="LinkedIn" className="w-8 h-8 hover:scale-110 transition" /></a>
                <a href="#"><img src={instagramIcon} alt="Instagram" className="w-8 h-8 hover:scale-110 transition" /></a>
              </div>
              <div className="text-sm mt-4 md:mt-0">
                <p>&copy; 2025 ClaimChain. Built for a brighter democracy.</p>
              </div>
            </div>
          </footer>
        </div>
      </Layout>
    </div>
  );
}

function FeatureCard({ title, text, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105">
      <h3 className={`text-xl font-bold text-[${color}] mb-2`}>{title}</h3>
      <p className="text-base text-[#5D4037]">{text}</p>
    </div>
  );
}

function StatBox({ number, label, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl hover:scale-105 transition">
      <h3 className={`text-3xl font-extrabold text-[${color}]`}>{number}</h3>
      <p className="text-base text-[#4E342E] mt-2">{label}</p>
    </div>
  );
}