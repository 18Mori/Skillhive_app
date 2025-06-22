import React from 'react';
import SearchBar from './components/SearchBar.jsx'; // Re-using search bar for consistency
import SkillCard from './components/SkillCard.jsx';
import MentorCard from './components/MentorCard.jsx'; // Assuming this component exists or will be created

function ExplorePage() {
  const categories = [
    { name: "Data Science", icon: "📊" },
    { name: "UX/UI Design", icon: "🎨" },
    { name: "Software Engineering", icon: "💻" },
    { name: "Digital Marketing", icon: "📈" },
    { name: "Product Management", icon: "🚀" },
    { name: "Cybersecurity", icon: "🔒" },
    { name: "Cloud Computing", icon: "☁️" },
    { name: "Project Management", icon: "🗓️" },
  ];

  const featuredMentors = [
    {
      id: 1,
      name: "Jane Doe",
      title: "Senior Data Scientist",
      rating: 4.8,
      reviews: 120,
      imageUrl: "https://placehold.co/100x100/ADD8E6/000000?text=JD", // Placeholder image
      skills: ["Machine Learning", "Python", "SQL"]
    },
    {
      id: 2,
      name: "John Smith",
      title: "Lead UX Designer",
      rating: 4.9,
      reviews: 95,
      imageUrl: "https://placehold.co/100x100/FFB6C1/000000?text=JS", // Placeholder image
      skills: ["Figma", "User Research", "Prototyping"]
    },
    {
      id: 3,
      name: "Alice Johnson",
      title: "Staff Software Engineer",
      rating: 4.7,
      reviews: 150,
      imageUrl: "https://placehold.co/100x100/90EE90/000000?text=AJ", // Placeholder image
      skills: ["React", "Node.js", "AWS"]
    },
  ];

  return (
    <div className="layout-content-container flex flex-col w-full md:w-[960px] max-w-[960px] flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#121516] tracking-light text-[32px] font-bold leading-tight min-w-72">Explore Skills & Mentors</p>
      </div>
      <p className="text-[#121516] text-base font-normal leading-normal pb-3 pt-1 px-4">
        Discover new skills, find expert mentors, and kickstart your learning journey.
      </p>

      {/* Search Bar Section */}
      <div className="p-4">
        <SearchBar />
      </div>

      {/* Popular Categories */}
      <h3 className="text-[#121516] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Popular Categories</h3>
      <div className="flex flex-wrap gap-4 p-4">
        {categories.map(category => (
          <div key={category.name} className="flex items-center gap-2 rounded-full bg-[#f1f2f4] px-4 py-2 text-[#121516] text-sm font-medium leading-normal cursor-pointer">
            <span>{category.icon}</span>
            {category.name}
          </div>
        ))}
      </div>

      {/* Featured Mentors */}
      <h3 className="text-[#121516] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Featured Mentors</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {featuredMentors.map(mentor => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>

      {/* Call to Action */}
      <div className="p-4 text-center">
        <p className="text-[#121516] text-base font-normal leading-normal mb-4">
          Can't find what you're looking for? Explore all our available mentors or become one yourself!
        </p>
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 mx-auto bg-[#b2d0e5] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em]"
          onClick={() => console.log("Explore All Mentors clicked")}
        >
          <span className="truncate">Explore All Mentors</span>
        </button>
      </div>
    </div>
  );
}

export default ExplorePage;
