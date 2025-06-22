import React from 'react';

function HomePage({ setCurrentView }) { // Receive setCurrentView as a prop for navigation
  // Mock data for popular skills/categories
  const popularSkills = [
    { name: "Career Coaching", image: "https://placehold.co/100x100/ADD8E6/000000?text=Career" },
    { name: "Web Development", image: "https://placehold.co/100x100/90EE90/000000?text=WebDev" },
    { name: "Data Science", image: "https://placehold.co/100x100/FFB6C1/000000?text=DataSci" },
    { name: "Leadership", image: "https://placehold.co/100x100/DDA0DD/000000?text=Leader" },
    { name: "Design", image: "https://placehold.co/100x100/F0E68C/000000?text=Design" },
    { name: "Marketing", image: "https://placehold.co/100x100/B0E0E6/000000?text=Marketing" },
  ];

  // Mock testimonials
  const testimonials = [
    {
      id: 1,
      quote: "SkillHive connected me with an amazing mentor who helped me land my dream job. Highly recommend!",
      author: "Sarah J.",
      role: "Software Engineer",
      avatar: "https://placehold.co/60x60/87CEEB/FFFFFF?text=SJ"
    },
    {
      id: 2,
      quote: "As a mentor, SkillHive makes it easy to share my knowledge and give back to the community. The platform is fantastic.",
      author: "David L.",
      role: "Senior Product Manager",
      avatar: "https://placehold.co/60x60/FFA07A/FFFFFF?text=DL"
    },
    {
      id: 3,
      quote: "I've gained so much clarity on my career path thanks to the personalized guidance I received here.",
      author: "Emily R.",
      role: "Aspiring Entrepreneur",
      avatar: "https://placehold.co/60x60/FFD700/FFFFFF?text=ER"
    },
  ];

  return (
    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 w-full px-4 py-5">

      {/* Hero Section */}
      <section className="relative bg-[#b2d0e5] rounded-xl p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] mb-10 overflow-hidden">
        <h1 className="text-[#121516] text-3xl md:text-5xl font-bold leading-tight tracking-[-0.03em] mb-4">
          Unlock Your Potential with Expert Mentorship
        </h1>
        <p className="text-[#121516] text-base md:text-lg font-normal leading-normal mb-8 max-w-2xl">
          Connect with industry leaders, gain personalized guidance, and accelerate your career growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-[#121516] text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg hover:bg-gray-800 transition-colors"
            onClick={() => setCurrentView('explore')}
          >
            <span className="truncate">Find a Mentor</span>
          </button>
          <button
            className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-white text-[#121516] text-base font-bold leading-normal tracking-[0.015em] shadow-lg hover:bg-gray-100 transition-colors"
            onClick={() => setCurrentView('signup')} // Assuming signup also handles mentor registration
          >
            <span className="truncate">Become a Mentor</span>
          </button>
        </div>
      </section>

      {/* Browse by Skill Categories */}
      <section className="mb-10">
        <h2 className="text-[#121516] text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em] mb-6 text-center">
          Browse Mentors by Skill
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4">
          {popularSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-[#f1f2f4] rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => setCurrentView('explore')} // Navigate to explore, could add filter later
            >
              <img src={skill.image} alt={skill.name} className="size-20 mb-3 rounded-full object-cover" />
              <p className="text-[#121516] text-base font-medium leading-normal text-center">{skill.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-10 bg-[#f1f2f4] rounded-xl p-8 md:p-10">
        <h2 className="text-[#121516] text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em] mb-8 text-center">
          How SkillHive Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-[#121516] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,64a44,44,0,1,0,44,44A44,44,0,0,0,128,64Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,136ZM228.92,208a12,12,0,0,1-12.08,16H39.16A12,12,0,0,1,27.08,208C38.45,176.12,83.93,152,128,152s89.55,24.12,101.08,56Z"></path>
              </svg>
            </div>
            <h3 className="text-[#121516] text-lg font-bold leading-tight mb-2">1. Find Your Mentor</h3>
            <p className="text-[#6a7781] text-base font-normal leading-normal">
              Browse through a diverse pool of experienced mentors across various domains.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-[#121516] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path>
              </svg>
            </div>
            <h3 className="text-[#121516] text-lg font-bold leading-tight mb-2">2. Book a Session</h3>
            <p className="text-[#6a7781] text-base font-normal leading-normal">
              Schedule one-on-one sessions at your convenience, directly through the platform.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-[#121516] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M228.63,89.37a8,8,0,0,0-11.26,0L136,170.74,88.63,123.37a8,8,0,0,0-11.26,11.26l56,56a8,8,0,0,0,11.26,0l96-96A8,8,0,0,0,228.63,89.37ZM240,128a8,8,0,0,0-8,8v72a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V40A16,16,0,0,1,40,24H128a8,8,0,0,0,0-16H40A32,32,0,0,0,8,40V208a32,32,0,0,0,32,32H216a32,32,0,0,0,32-32V136A8,8,0,0,0,240,128Z"></path>
              </svg>
            </div>
            <h3 className="text-[#121516] text-lg font-bold leading-tight mb-2">3. Accelerate Your Growth</h3>
            <p className="text-[#6a7781] text-base font-normal leading-normal">
              Receive tailored advice, feedback, and support to achieve your personal and professional goals.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-10">
        <h2 className="text-[#121516] text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em] mb-6 text-center">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-md border border-[#dce1e3]">
              <p className="text-[#121516] text-base font-italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={testimonial.avatar} alt={testimonial.author} className="size-12 rounded-full object-cover" />
                <div>
                  <p className="text-[#121516] text-base font-semibold leading-normal">{testimonial.author}</p>
                  <p className="text-[#6a7781] text-sm font-normal leading-normal">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action - Join Today */}
      <section className="bg-[#e0f2f7] rounded-xl p-8 md:p-12 text-center flex flex-col items-center justify-center">
        <h2 className="text-[#121516] text-2xl md:text-4xl font-bold leading-tight tracking-[-0.03em] mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-[#121516] text-base md:text-lg font-normal leading-normal mb-8 max-w-2xl">
          Join SkillHive today and take the next step in your professional journey.
        </p>
        <button
          className="flex min-w-[150px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-[#b2d0e5] text-[#121516] text-base font-bold leading-normal tracking-[0.015em] shadow-lg hover:bg-[#a0c0d5] transition-colors"
          onClick={() => setCurrentView('signup')}
        >
          <span className="truncate">Sign Up Now</span>
        </button>
      </section>
    </div>
  );
}

export default HomePage;
