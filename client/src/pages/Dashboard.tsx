






// import React, { useEffect, useState } from 'react';
// import api from '../api/apiClient';
// import { AxiosError } from 'axios';
// import { toast } from 'react-toastify';

// type Url = { _id: string; originalUrl: string; shortCode: string; visits: number; createdAt: string };

// export default function Dashboard() {
//   const [originalUrl, setOriginalUrl] = useState('');
//   const [list, setList] = useState<Url[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('newest');

//   async function fetchList() {
//     setIsLoading(true);
//     try {
//       const res = await api.get('/urls');
//       setList(res.data);
//     } catch (err) {
//       console.error('Failed to fetch URLs:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchList();
//   }, []);

//   async function create(e: React.FormEvent) {
//     e.preventDefault();
//     if (!originalUrl.trim()) return;
//     setIsLoading(true);
//     try {
//       const res = await api.post('/urls', { originalUrl });
//       toast.success('Short URL: ' + res.data.shortUrl);
//       setOriginalUrl('');
//       fetchList();
//     } catch (err) {
//       if(err instanceof AxiosError){
//          toast.error(err.response?.data?.message || err.message);
//       }else{
//          toast.error("Fail to short url");
//       }  
      
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const filteredUrls = list.filter(url =>
//     url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     url.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const sortedUrls = [...filteredUrls].sort((a, b) => {
//     switch (sortBy) {
//       case 'newest':
//         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//       case 'oldest':
//         return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//       case 'most-visited':
//         return b.visits - a.visits;
//       case 'least-visited':
//         return a.visits - b.visits;
//       default:
//         return 0;
//     }
//   });

//   const totalClicks = list.reduce((sum, url) => sum + url.visits, 0);
//   const averageClicks = list.length > 0 ? Math.round(totalClicks / list.length) : 0;

//   function copyToClipboard(text: string) {
//     navigator.clipboard.writeText(`http://localhost:5500/${text}`);
//   }

//   function formatDate(dateString: string) {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
//                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//                   </svg>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <h1 className="text-xl font-semibold text-gray-900">URL Shortener</h1>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="text-gray-500 hover:text-gray-700">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7H4l5-5v5z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12H3" />
//                 </svg>
//               </button>
//               <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//                   </svg>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-500">Total URLs</p>
//                 <p className="text-2xl font-semibold text-gray-900">{list.length}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-500">Total Clicks</p>
//                 <p className="text-2xl font-semibold text-gray-900">{totalClicks.toLocaleString()}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                   </svg>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-500">Avg. Clicks</p>
//                 <p className="text-2xl font-semibold text-gray-900">{averageClicks}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* URL Shortener Form */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Shorten a URL</h2>
//           <form onSubmit={create} className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1">
//               <input
//                 value={originalUrl}
//                 onChange={(e) => setOriginalUrl(e.target.value)}
//                 placeholder="https://example.com/your-long-url"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
//                 disabled={isLoading}
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={isLoading || !originalUrl.trim()}
//               className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 whitespace-nowrap"
//             >
//               {isLoading ? (
//                 <div className="flex items-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Shortening...
//                 </div>
//               ) : (
//                 'Shorten URL'
//               )}
//             </button>
//           </form>
//         </div>

//         {/* URL List Header */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//           <div className="p-6 border-b border-gray-100">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <h2 className="text-lg font-semibold text-gray-900">Your URLs</h2>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 {/* Search */}
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Search URLs..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                   />
//                 </div>

//                 {/* Sort */}
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="oldest">Oldest First</option>
//                   <option value="most-visited">Most Visited</option>
//                   <option value="least-visited">Least Visited</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* URL List */}
//           <div className="divide-y divide-gray-100">
//             {isLoading && list.length === 0 ? (
//               <div className="p-8 text-center">
//                 <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"></div>
//                 <p className="mt-2 text-gray-500">Loading your URLs...</p>
//               </div>
//             ) : sortedUrls.length === 0 ? (
//               <div className="p-8 text-center">
//                 <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//                 </svg>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No URLs found</h3>
//                 <p className="text-gray-500">
//                   {searchTerm ? 'Try adjusting your search terms' : 'Start by shortening your first URL above'}
//                 </p>
//               </div>
//             ) : (
//               sortedUrls.map((url, index) => (
//                 <div key={url._id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
//                   <div className="flex items-center justify-between">
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center mb-2">
//                         <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-3">
//                           <span className="text-xs font-medium text-blue-600">{index + 1}</span>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium text-gray-900 truncate">
//                             {url.originalUrl}
//                           </p>
//                           <div className="flex items-center mt-1 space-x-4">
//                             <div className="flex items-center">
//                               <span className="text-sm text-blue-600 font-medium">
//                                 short.ly/{url.shortCode}
//                               </span>
//                               <button
//                                 onClick={() => copyToClipboard(url.shortCode)}
//                                 className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                                 title="Copy to clipboard"
//                               >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                                 </svg>
//                               </button>
//                             </div>
//                             <span className="text-sm text-gray-500">
//                               Created {formatDate(url.createdAt)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                       <div className="text-right">
//                         <div className="flex items-center text-sm text-gray-500">
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                           </svg>
//                           {url.visits.toLocaleString()} clicks
//                         </div>
//                       </div>
//                       <a
//                         href={`http://localhost:5500/${url.shortCode}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
//                         title="Visit URL"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                         </svg>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





















import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../auth/useAuth';

type Url = { _id: string; originalUrl: string; shortCode: string; visits: number; createdAt: string };

export default function Dashboard() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [list, setList] = useState<Url[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function fetchList() {
    setIsLoading(true);
    try {
      const res = await api.get('/urls');
      console.log("data : ", res.data);
      setList(res.data);
    } catch (err) {
      console.error('Failed to fetch URLs:', err);
      toast.error('Failed to fetch URLs');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!originalUrl.trim()) return;
    setIsLoading(true);
    try {
      const res = await api.post('/urls', { originalUrl });
      toast.success('Short URL: ' + res.data.shortUrl);
      setOriginalUrl('');
      fetchList();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || err.message);
      } else {
        toast.error('Failed to shorten URL');
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await api.post('/auth/logout');
      localStorage.clear();
      logout(); 
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      toast.success('Logged out successfully');
      navigate('/',{replace: true});
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || 'Failed to log out');
      } else {
        toast.error('Failed to log out');
      }
    }
  }

  const filteredUrls = list.filter(url =>
    url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUrls = [...filteredUrls].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'most-visited':
        return b.visits - a.visits;
      case 'least-visited':
        return a.visits - b.visits;
      default:
        return 0;
    }
  });

  const totalClicks = list.reduce((sum, url) => sum + url.visits, 0);
  const averageClicks = list.length > 0 ? Math.round(totalClicks / list.length) : 0;

  function copyToClipboard(text: string) {
    // navigator.clipboard.writeText(`http://localhost:5500/${text}`);
    navigator.clipboard.writeText(`${import.meta.env.VITE_BACKEND_URL}/${text}`);
    toast.success('URL copied to clipboard');
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function handleVisit(shortCode: string, id: string){
      // window.open(`http://localhost:5500/${shortCode}`, "_blank");
      window.open(`${import.meta.env.VITE_BACKEND_URL}/${shortCode}`, "_blank");

      setList(prev => 
        prev.map(url=>
           url._id === id ? {...url, visits: url.visits+1} : url
        )
      )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900">URL Shortener</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7H4l5-5v5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12H3" />
                </svg>
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total URLs</p>
                <p className="text-2xl font-semibold text-gray-900">{list.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Clicks</p>
                <p className="text-2xl font-semibold text-gray-900">{totalClicks.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg. Clicks</p>
                <p className="text-2xl font-semibold text-gray-900">{averageClicks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* URL Shortener Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Shorten a URL</h2>
          <form onSubmit={create} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://example.com/your-long-url"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !originalUrl.trim()}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 whitespace-nowrap"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Shortening...
                </div>
              ) : (
                'Shorten URL'
              )}
            </button>
          </form>
        </div>

        {/* URL List Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Your URLs</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search URLs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="most-visited">Most Visited</option>
                  <option value="least-visited">Least Visited</option>
                </select>
              </div>
            </div>
          </div>

          {/* URL List */}
          <div className="divide-y divide-gray-100">
            {isLoading && list.length === 0 ? (
              <div className="p-8 text-center">
                <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"></div>
                <p className="mt-2 text-gray-500">Loading your URLs...</p>
              </div>
            ) : sortedUrls.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No URLs found</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search terms' : 'Start by shortening your first URL above'}
                </p>
              </div>
            ) : (
              sortedUrls.map((url, index) => (
                <div key={url._id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-2">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {url.originalUrl}
                          </p>
                          <div className="flex items-center mt-1 space-x-4">
                            <div className="flex items-center">
                              <span className="text-sm text-blue-600 font-medium">
                                short.ly/{url.shortCode}
                              </span>
                              <button
                                onClick={() => copyToClipboard(url.shortCode)}
                                className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                title="Copy to clipboard"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                            </div>
                            <span className="text-sm text-gray-500">
                              Created {formatDate(url.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {url.visits.toLocaleString()} clicks
                        </div>
                      </div>
                      <button
                        // onClick={() => window.open(`http://localhost:5500/${url.shortCode}`, '_blank')}
                        onClick={() => handleVisit(url.shortCode, url._id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        title="Visit URL"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}