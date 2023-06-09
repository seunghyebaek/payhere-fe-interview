import React, { useState, useEffect } from 'react';

const SiteDetailPage = ({ site, onBack }) => {
  const [pastURLs, setPastURLs] = useState([]);

  useEffect(() => {
    const fetchPastURLs = async () => {
      try {
        const response = await fetch(
          `http://archive.org/wayback/available?url=${site.url}`
        );
        const data = await response.json();

        if (data.archived_snapshots && data.archived_snapshots.closest) {
          const closestSnapshot = data.archived_snapshots.closest;
          const urls = [];

          for (let i = 0; i < 10; i++) {
            const year = Number(closestSnapshot.timestamp.slice(0, 4)) - i;
            const pastURL = `http://web.archive.org/web/${year}0101/${site.url}`;
            urls.push({
              url: pastURL,
              date: `January 1, ${year}`,
            });
          }

          setPastURLs(urls);
        }
      } catch (error) {
        console.error('Error occurred while fetching past URLs:', error);
      }
    };

    fetchPastURLs();
  }, [site.url]);

  const handleURLClick = (url) => {
    window.location.href = url;
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className='max-w-3xl mx-auto my-10 bg-white rounded-lg shadow-md p-5'>
      <div>
        <button className='border border-lime-200 hover:border-lime-600 text-lime-600 font-semibold py-2 px-4 rounded' onClick={handleBack}>Back</button>
      </div>
      <h2 className='text-xl mt-2 font-semibold text-gray-500'>Site Details</h2>
      <div className='mt-5'>
        {pastURLs.map((pastURL) => (
          <div className='flex mt-2 items-center justify-between border border-gray-300 rounded p-4 mb-4' key={pastURL.url}>
            <div className='text-gray-600'>{pastURL.url}</div>
            <div className='text-gray-600'>{pastURL.date}</div>
            <button className='border border-violet-400 hover:border-violet-500 text-violet-500 px-4 py-2 rounded-md' onClick={() => handleURLClick(pastURL.url)}>
              Go to Snapshot
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteDetailPage;
