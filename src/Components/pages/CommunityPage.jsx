import React from 'react';

function CommunityPage() {
  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#121516] tracking-light text-[32px] font-bold leading-tight">Community Forum</p>
          <p className="text-[#6a7781] text-sm font-normal leading-normal">
            Connect with other mentees and mentors, share insights, and ask questions.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {/* Forum Post Example 1 */}
        <div className="flex flex-col gap-3 rounded-xl border border-[#dce1e3] p-4">
          <div className="flex items-center gap-3">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://via.placeholder.com/150/FF5733/FFFFFF?text=JS")' }}
            ></div>
            <div className="flex-1">
              <p className="text-[#121516] text-base font-medium leading-normal">JavaScript Best Practices</p>
              <p className="text-[#6a7781] text-sm font-normal leading-normal">Posted by Alex Doe 1 day ago</p>
            </div>
          </div>
          <p className="text-[#121516] text-base font-normal leading-normal">
            "What are your favorite JavaScript best practices for writing clean and maintainable code? Looking for tips on naming conventions, code structure, and error handling."
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-[#6a7781]">
              <div className="text-inherit" data-icon="ChatCircleDots" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H208l32,32V64A16,16,0,0,0,224,48ZM208,192.47V192h15.53L208,207.53ZM240,64V223.53L207.53,192H32V64ZM88,116a12,12,0,1,1-12-12A12,12,0,0,1,88,116Zm48,0a12,12,0,1,1-12-12A12,12,0,0,1,136,116Zm48,0a12,12,0,1,1-12-12A12,12,0,0,1,184,116Z"></path>
                </svg>
              </div>
              <span>5 Comments</span>
            </button>
            <button className="flex items-center gap-2 text-[#6a7781]">
              <div className="text-inherit" data-icon="ThumbsUp" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path>
                </svg>
              </div>
              <span>15 Likes</span>
            </button>
          </div>
        </div>

        {/* Forum Post Example 2 */}
        <div className="flex flex-col gap-3 rounded-xl border border-[#dce1e3] p-4">
          <div className="flex items-center gap-3">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://via.placeholder.com/150/33FF57/FFFFFF?text=AI")' }}
            ></div>
            <div className="flex-1">
              <p className="text-[#121516] text-base font-medium leading-normal">AI in Product Management</p>
              <p className="text-[#6a7781] text-sm font-normal leading-normal">Posted by Jane Smith 3 days ago</p>
            </div>
          </div>
          <p className="text-[#121516] text-base font-normal leading-normal">
            "How is AI transforming the role of product managers? Any insights on tools, strategies, or challenges you've encountered?"
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-[#6a7781]">
              <div className="text-inherit" data-icon="ChatCircleDots" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H208l32,32V64A16,16,0,0,0,224,48ZM208,192.47V192h15.53L208,207.53ZM240,64V223.53L207.53,192H32V64ZM88,116a12,12,0,1,1-12-12A12,12,0,0,1,88,116Zm48,0a12,12,0,1,1-12-12A12,12,0,0,1,136,116Zm48,0a12,12,0,1,1-12-12A12,12,0,0,1,184,116Z"></path>
                </svg>
              </div>
              <span>8 Comments</span>
            </button>
            <button className="flex items-center gap-2 text-[#6a7781]">
              <div className="text-inherit" data-icon="ThumbsUp" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path>
                </svg>
              </div>
              <span>22 Likes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
