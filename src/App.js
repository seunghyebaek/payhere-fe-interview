import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SiteItem from './components/SiteItem';
import SiteDetailPage from './components/SiteDetailPage';

const MAX_SITES = 4;

const App = () => {
  const [urlInput, setUrlInput] = useState('');
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);

  useEffect(() => {
    const storedSites = JSON.parse(localStorage.getItem('sites')) || [];
    setSites(storedSites);
  }, []);

  const handleAddSite = () => {
    if (urlInput.trim() === '') {
      return;
    }

    if (sites.length >= MAX_SITES) {
      alert('Maximum number of sites reached');
      return;
    }

    const newSite = {
      id: uuidv4(),
      url: urlInput,
    };

    const updatedSites = [...sites, newSite];
    setSites(updatedSites);
    localStorage.setItem('sites', JSON.stringify(updatedSites));

    setUrlInput('');
  };

  const handleDeleteSite = (id) => {
    const updatedSites = sites.filter((site) => site.id !== id);
    setSites(updatedSites);
    localStorage.setItem('sites', JSON.stringify(updatedSites));
  };

  const handleSiteClick = (site) => {
    setSelectedSite(site);
  };

  const handleBack = () => {
    setSelectedSite(null);
  };

  if (selectedSite) {
    return (
      <SiteDetailPage site={selectedSite} onBack={handleBack} />
    );
  }

  return (
    <div className='container item-center justify-center max-w-xl mx-auto my-10 bg-white rounded-lg shadow-lg p-5'>
    <h1 className='text-xl font-semibold text-gray-500'>Wayback Machine</h1>
    <div className='mt-4 flex'>
      <input
        className='border-2 border-lime-200 hover:border-lime-400 px-3 py-2 rounded-md'
        type="text"
        value={urlInput}
        onChange={(e) => setUrlInput(e.target.value)}
        placeholder="Enter URL"
      />
      <button className='border ml-2 border-lime-200 hover:border-lime-600 text-lime-600 font-semibold py-2 px-4 rounded' onClick={handleAddSite}>Add Site</button>

    </div>
    <div className='mt-4'>
      {sites.map((site) => (
        <SiteItem
          key={site.id}
          site={site}
          onDelete={handleDeleteSite}
          onClick={handleSiteClick}
        />
        ))}
      </div>
    </div>
  );
};

export default App;
