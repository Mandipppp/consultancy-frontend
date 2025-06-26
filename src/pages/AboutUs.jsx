import React from 'react'

// Example images (replace with your actual images)
import founderImg from '../assets/images/founder.jpg'
import team1 from '../assets/images/team1.jpg'
import team2 from '../assets/images/team2.jpg'
import team3 from '../assets/images/team3.jpg'
import team4 from '../assets/images/team4.jpg'

const TEAM = [
  {
    name: "Aarav Sharma",
    role: "Lead Developer",
    img: team1,
    bio: "Passionate about building scalable web apps and leading the dev team with a smile.",
    linkedin: "https://linkedin.com/in/aaravsharma"
  },
  {
    name: "Priya Karki",
    role: "UI/UX Designer",
    img: team2,
    bio: "Designs with empathy and creativity to make every user journey delightful.",
    linkedin: "https://linkedin.com/in/priyakarki"
  },
  {
    name: "Suman Joshi",
    role: "Backend Engineer",
    img: team3,
    bio: "Loves APIs, databases, and making things run fast and reliably.",
    linkedin: "https://linkedin.com/in/sumanjoshi"
  },
  {
    name: "Sneha Lama",
    role: "Community Manager",
    img: team4,
    bio: "Connecting learners and tutors, and making our community thrive.",
    linkedin: "https://linkedin.com/in/snehalama"
  }
]

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pb-20">
      {/* Founder Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">
        <img
          src={founderImg}
          alt="Founder"
          className="w-48 h-48 rounded-full object-cover border-4 border-blue-300 shadow-lg"
        />
        <div>
          <h2 className="text-4xl font-bold text-blue-900 mb-2">A Message from Our Founder</h2>
          <p className="text-lg text-gray-700 mb-4">
            "At Langzy, we believe that language is the bridge to new opportunities and friendships. Our mission is to empower you to grow your words and expand your world. Thank you for being part of our journey!"
          </p>
          <p className="text-xl font-semibold text-blue-700">— Ashok Dhungana, Founder & CEO</p>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-10">Meet Our Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {TEAM.map(member => (
            <div
              key={member.name}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover border-2 border-blue-200 mb-4"
              />
              <h4 className="text-xl font-bold text-blue-800">{member.name}</h4>
              <p className="text-blue-600 font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-center text-sm mb-3">{member.bio}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Company Mission/Values */}
      <section className="max-w-4xl mx-auto px-4 mt-20 text-center">
        <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
        <p className="text-lg text-gray-700 mb-6">
          To make language learning accessible, engaging, and effective for everyone, everywhere.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div className="bg-blue-100 rounded-lg px-6 py-4 text-blue-800 font-semibold shadow">
            🌏 Diversity & Inclusion
          </div>
          <div className="bg-blue-100 rounded-lg px-6 py-4 text-blue-800 font-semibold shadow">
            💡 Innovation in Learning
          </div>
          <div className="bg-blue-100 rounded-lg px-6 py-4 text-blue-800 font-semibold shadow">
            🤝 Community First
          </div>
          <div className="bg-blue-100 rounded-lg px-6 py-4 text-blue-800 font-semibold shadow">
            🚀 Growth Mindset
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
