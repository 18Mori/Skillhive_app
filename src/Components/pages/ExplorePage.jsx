import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';


// Placeholder for SearchBar as the component file is not provided
const SearchBar = () => (
  <div className="relative">
    <input
      type="search"
      placeholder="Search for skills or mentors..."
      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-[#121516] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-12 placeholder:text-[#6a7781] p-4 pl-10 text-base font-normal leading-normal"
    />
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6a7781]">
      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
      </svg>
    </div>
  </div>
);

// Placeholder for MentorCard as the component file is not provided
const MentorCard = ({ mentor }) => (
  <div className="flex flex-col gap-3 rounded-xl border border-[#dde1e3] bg-white p-4">
    <div className="flex items-center gap-4">
      <img src={mentor.imageUrl} alt={mentor.name} className="size-16 rounded-full object-cover" />
      <div className="flex flex-col">
        <p className="text-[#121516] text-base font-bold leading-normal">{mentor.name}</p>
        <p className="text-[#6a7781] text-sm font-normal leading-normal">{mentor.title}</p>
      </div>
    </div>
    <div className="flex items-center gap-1">
      <span className="text-yellow-500">★</span>
      <p className="text-[#121516] text-sm font-medium">{mentor.rating}</p>
      <p className="text-[#6a7781] text-sm font-normal">({mentor.reviews} reviews)</p>
    </div>
    <div className="flex flex-wrap gap-2">
      {mentor.skills.map(skill => (
        <span key={skill} className="rounded-full bg-[#f1f2f4] px-3 py-1 text-xs font-medium text-[#121516]">
          {skill}
        </span>
      ))}
    </div>
    <button className="mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 px-4 bg-[#f1f2f4] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200">
      View Profile
    </button>
  </div>
);

function ExplorePage({ firestoreDb }) {
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

  const [featuredMentors, setFeaturedMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      if (!firestoreDb) return;
      setLoading(true);
      try {
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const mentorsCollectionRef = collection(firestoreDb, `artifacts/${appId}/public/data/mentors`);
        const q = query(mentorsCollectionRef, limit(6)); // Fetch up to 6 mentors
        const querySnapshot = await getDocs(q);
        const mentorsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().fullName,
          title: doc.data().title || "Expert Mentor", // Add a default title
          rating: doc.data().averageRating || 0,
          reviews: doc.data().reviewCount || 0, // Add a default review count
          imageUrl: doc.data().profileImage || `https://placehold.co/100x100/ADD8E6/000000?text=${doc.data().fullName.charAt(0)}`,
          skills: doc.data().specializations || []
        }));
        setFeaturedMentors(mentorsList);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [firestoreDb]);

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
      {loading ? (
        <p className="p-4">Loading mentors...</p>
      ) : featuredMentors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {featuredMentors.map(mentor => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      ) : (
        <p className="p-4 text-center">No featured mentors found. Be the first to sign up as a mentor!</p>
      )}

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
