import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import CreatePage from './pages/CreatePage';
import NoteDetailpage from './pages/NotreDetailpage'; // 💡 පොඩි ඉඟියක්: මේකේ Notre කියලා ස්පෙලින් වැරදීමක් තියෙනවා (NoteDetailpage විය යුතුයි), ෆයිල් එකේ නම මෙහෙමම නම් අවුලක් නැහැ.
import { Toaster } from 'react-hot-toast'; // 👈 Toaster එක මෙතනින් ඉම්පෝට් කරගත්තා

const App = () => {
  return (
    <div className='relative w-full min-h-screen'> {/* h-full වෙනුවට min-h-screen දැම්මා බැක්ග්‍රවුන්ඩ් එක හැමදාම ලස්සනට තියෙන්න */}
      
      {/* Background Glow Effect */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]">
      </div>
      
      {/* ⚠️ මෙන්න මෙතන පාර `/note/:id` විදිහට නිවැරදි කළා */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailpage />} /> 
      </Routes>

      {/* 💡 ටෝස්ට් මැසේජ් ලස්සනට වැඩ කරන්න ටෝස්ටර් එක ඇප් එකේ පල්ලෙහායින්ම තිබ්බම ඇති */}
      <Toaster position="top-center" reverseOrder={false} />

    </div>
  )
}

export default App