import React from 'react';

const SiteItem = ({ site, onDelete, onClick }) => {
  const handleClick = () => {
    onClick(site);
  };

  const handleDelete = () => {
    onDelete(site.id);
  };

  return (
    <div className='flex items-center justify-between border border-gray-300 rounded p-4 mb-4'>
      <div className='px-4 py-2 text-lg text-gray-600'>{site.url}</div>
        <div className="flex justify-end">
          <button className='border border-cyan-400 hover:border-cyan-500 text-cyan-500 px-4 py-2 rounded-md mr-3'
                  onClick={handleClick}>View Details</button>
          <button className='border border-pink-400 hover:border-pink-500 text-pink-500 px-4 py-2 rounded-md'
                  onClick={handleDelete}>Delete</button>
        </div>
      </div>
  );
};

export default SiteItem;
