import React, { useState, useEffect } from 'react';
import { INITIAL_CATEGORIES, INITIAL_ANNOUNCEMENTS } from './constants';
import { Category, SalonStyle, ViewLevel, Announcement, StylePoint } from './types';
import { Button } from './components/Button';
import { AddModal } from './components/AddModal';
import { generateStyleSuggestion } from './services/geminiService';
import { ChevronRight, ExternalLink, ArrowLeft, Plus, Scissors, BookOpen, AlertCircle, PlayCircle, Menu, X, Star, Video, Zap, Search, History, Clock, Calendar, Heart } from 'lucide-react';

// --- VISUAL HELPERS ---
const getGradientClass = (id: string, intensity: 'light' | 'medium' | 'dark' = 'light') => {
  // Deterministic selection based on ID char code sum
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  if (intensity === 'light') {
    const gradients = [
      "bg-gradient-to-br from-[#f3efe9] to-[#e6dfd3]", // Warm Beige
      "bg-gradient-to-br from-[#ffffff] to-[#f3efe9]", // White to Beige
      "bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]", // Cool Gray
      "bg-gradient-to-br from-[#fffefc] to-[#f0e6dd]", // Cream
    ];
    return gradients[seed % gradients.length];
  } else if (intensity === 'medium') {
     const gradients = [
      "bg-gradient-to-br from-[#d6d3d1] to-[#a8a29e]", // Stone
      "bg-gradient-to-br from-[#e5e7eb] to-[#d1d5db]", // Gray
      "bg-gradient-to-br from-[#e7e5e4] to-[#c7c2be]", // Warm Gray
    ];
    return gradients[seed % gradients.length];
  } else {
    // Darker for headers
    const gradients = [
      "bg-gradient-to-br from-[#5e5855] to-[#4a4542]", // Salon Dark
      "bg-gradient-to-br from-[#78716c] to-[#57534e]", // Stone Dark
    ];
    return gradients[seed % gradients.length];
  }
};

// --- LOGIC HELPERS ---
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

// --- SUB-COMPONENTS (Defined outside App to prevent re-renders losing focus) ---

const NewsSection: React.FC<{ announcements: Announcement[] }> = ({ announcements }) => (
  <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700 bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
        <h3 className="text-sm font-bold tracking-widest text-salon-black uppercase font-serif flex items-center gap-2">
          <span className="w-1 h-4 bg-salon-accent rounded-full"></span>
          News & Topics
        </h3>
        <span className="text-[10px] text-gray-400 cursor-pointer hover:text-salon-black transition-colors">一覧を見る</span>
      </div>
      
      <ul className="divide-y divide-gray-100">
        {announcements.map((ann) => (
            <li 
              key={ann.id} 
              onClick={() => ann.link && window.open(ann.link, '_blank', 'noopener,noreferrer')}
              className={`py-3 group flex items-center gap-3 ${ann.link ? 'cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded transition-colors' : ''}`}
            >
              <ChevronRight size={12} className="text-salon-accent flex-shrink-0" />
              <p className="text-sm text-salon-black group-hover:text-salon-dark transition-colors line-clamp-1 leading-relaxed flex-1 font-medium">
                  {ann.title.replace(/\n/g, ' ')}
              </p>
            </li>
        ))}
      </ul>
  </div>
);

const MobileMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (c: Category) => void;
  onSelectStyle: (s: SalonStyle) => void;
  onGoToMyPage: () => void;
}> = ({ isOpen, onClose, categories, selectedCategory, onSelectCategory, onSelectStyle, onGoToMyPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Flatten styles for search
  const allStyles = categories.flatMap(c => 
    c.styles.map(s => ({...s, categoryTitle: c.title}))
  );
  
  // Filter out duplicates
  const uniqueStylesMap = new Map();
  allStyles.forEach(item => {
    if (!uniqueStylesMap.has(item.id)) {
      uniqueStylesMap.set(item.id, item);
    }
  });
  const uniqueStyles = Array.from(uniqueStylesMap.values());

  const filteredStyles = searchTerm 
    ? uniqueStyles.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}
      
      <div className={`fixed top-0 left-0 w-80 h-full bg-salon-light z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
        <div className="p-5 flex items-center justify-between border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <span className="font-serif font-bold text-lg text-salon-black tracking-widest">MENU</span>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          {/* MY PAGE at the top */}
          <button 
            onClick={() => { onGoToMyPage(); onClose(); }}
            className="w-full text-left px-4 py-3 bg-salon-black text-white rounded-lg shadow-md hover:bg-salon-dark transition-all flex items-center justify-between group mb-6"
          >
            <span className="font-bold tracking-widest text-sm">MY PAGE</span>
            <ChevronRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="キーワードから探す..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-salon-accent shadow-sm transition-all placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {searchTerm ? (
            <div className="space-y-2 mt-4 animate-in fade-in slide-in-from-top-2">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 pl-2">Search Results</div>
              {filteredStyles.length > 0 ? (
                filteredStyles.map(style => (
                  <button 
                    key={style.id} 
                    onClick={() => onSelectStyle(style)}
                    className="w-full text-left px-3 py-3 rounded-lg bg-white/50 hover:bg-white transition-colors flex items-center justify-between border border-transparent hover:border-gray-100"
                  >
                    <div className="flex flex-col items-start overflow-hidden">
                      <span className="font-medium text-salon-black truncate w-full">{style.name}</span>
                      <span className="text-[10px] text-gray-400 truncate w-full">{(style as any).categoryTitle}</span>
                    </div>
                    <ChevronRight size={14} className="opacity-30 flex-shrink-0 ml-2" />
                  </button>
                ))
              ) : (
                <div className="text-center py-4 text-gray-400 text-sm">
                  該当するコンテンツがありません
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2 mb-2 pl-2">Categories</div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onSelectCategory(category)}
                    className={`w-full text-left px-3 py-3 rounded-lg transition-colors flex items-center justify-between ${selectedCategory?.id === category.id ? 'bg-white text-salon-black shadow-sm font-medium' : 'text-gray-600 hover:bg-white/50'}`}
                  >
                    <span>{category.id === 'latest-updates' ? '最新の授業動画' : category.title}</span>
                    <ChevronRight size={14} className="opacity-50" />
                  </button>
                ))}
              </div>
              
              <div className="border-t border-gray-200 my-4"></div>
              
              <a 
                href="https://lin.ee/ePKpXeq"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-black hover:bg-white/50 rounded-lg transition-colors"
              >
                OFFICIAL LINE
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const CategoryListView: React.FC<{
  categories: Category[];
  announcements: Announcement[];
  onSelectCategory: (c: Category) => void;
  onOpenAddModal: () => void;
}> = ({ categories, announcements, onSelectCategory, onOpenAddModal }) => (
  <>
    <NewsSection announcements={announcements} />
    
    <div className="flex items-center gap-2 mb-6 px-1">
        <h3 className="text-xs font-bold tracking-widest text-salon-gray uppercase">Contents</h3>
        <div className="h-px bg-gray-200 flex-1"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category) => (
        <div 
          key={category.id}
          onClick={() => onSelectCategory(category)}
          className="group cursor-pointer flex flex-col gap-4"
        >
          {/* Card Visual */}
          <div className={`relative aspect-[4/3] overflow-hidden rounded-sm shadow-sm transition-all duration-500 group-hover:shadow-md ${!category.imageUrl ? getGradientClass(category.id, 'light') : ''} flex flex-col items-center justify-center text-center border border-gray-100 group-hover:border-salon-accent/30`}>
            
            {/* Image Background Support */}
            {category.imageUrl && (
              <>
                <img 
                  src={category.imageUrl} 
                  alt={category.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
              </>
            )}

            <div className="z-10 transform transition-transform duration-500 group-hover:scale-105 p-8 w-full h-full flex flex-col items-center justify-center">
              <h2 className={`text-2xl md:text-3xl font-serif font-medium ${category.imageUrl ? 'text-white' : 'text-salon-black'} tracking-widest mb-3`}>
                {category.id === 'latest-updates' ? (
                  <>
                    <span className="md:hidden">最新の授業動画</span>
                    <span className="hidden md:inline">LATEST UPDATES</span>
                  </>
                ) : category.title}
              </h2>
              <div className={`w-8 h-px ${category.imageUrl ? 'bg-white/70' : 'bg-salon-accent/50'} mx-auto mb-4`}></div>
              <span className={`text-xs ${category.imageUrl ? 'text-white/80' : 'text-salon-gray'} font-bold tracking-[0.2em] uppercase`}>
                {category.styles.length} {category.id === 'core-phase' ? 'Lessons' : 'Videos'}
              </span>
            </div>
            
            {/* Subtle decorative circle (only if no image) */}
            {!category.imageUrl && (
              <>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-salon-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </>
            )}
          </div>
          
          <div className="px-2 text-center">
            <p className="text-sm font-medium text-salon-dark tracking-widest mb-2">
              {category.subtitle}
            </p>
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-light">
              {category.description}
            </p>
          </div>
        </div>
      ))}
      
      {/* Add Button as a card */}
      <button 
        onClick={onOpenAddModal}
        className="flex flex-col items-center justify-center aspect-[4/3] border border-dashed border-gray-300 rounded-sm text-gray-400 hover:border-salon-black hover:text-salon-black transition-all group bg-white hover:bg-gray-50"
      >
        <div className="w-12 h-12 rounded-full bg-salon-light flex items-center justify-center group-hover:bg-white border border-transparent group-hover:border-gray-200 transition-all shadow-sm">
          <Plus size={24} strokeWidth={1.5} />
        </div>
        <span className="mt-3 text-sm font-medium tracking-widest">ADD NEW PHASE</span>
      </button>
    </div>
  </>
);

const StyleListView: React.FC<{
  category: Category;
  onSelectStyle: (s: SalonStyle) => void;
  onOpenAddModal: () => void;
}> = ({ category, onSelectStyle, onOpenAddModal }) => (
  <div>
    <div className={`mb-10 text-center py-16 px-4 rounded-xl ${getGradientClass(category.id, 'light')} border border-gray-100`}>
      <h1 className="text-4xl md:text-5xl font-serif text-salon-black mb-5 tracking-wide leading-tight">{category.title}</h1>
      <p className="text-salon-gray text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-6">{category.subtitle}</p>
      <p className="text-gray-600 max-w-2xl mx-auto leading-loose font-light">{category.description}</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {category.styles.map((style) => {
        const hasContent = !!style.externalUrl || (!!style.lessons && style.lessons.length > 0);
        
        return (
          <div 
            key={style.id}
            className="group relative flex items-center justify-between p-5 bg-white border border-gray-100 rounded-lg hover:border-salon-accent/50 hover:shadow-lg transition-all duration-500 cursor-pointer overflow-hidden"
            onClick={() => onSelectStyle(style)}
          >
            <div className="flex items-center gap-5">
              {/* Visual Icon Box or Image Thumbnail */}
              <div className={`w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center overflow-hidden ${!style.imageUrl ? getGradientClass(style.id, 'light') : ''} transition-transform group-hover:scale-105 duration-500`}>
                {style.imageUrl ? (
                  <img src={style.imageUrl} alt={style.name} className="w-full h-full object-cover" />
                ) : (
                  <Scissors size={20} strokeWidth={1} className="text-salon-black/70 group-hover:text-salon-black transition-colors" />
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-salon-black group-hover:text-salon-accent transition-colors tracking-wide font-serif flex items-center gap-2">
                  {style.name}
                  {!hasContent && (
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200 font-sans font-normal tracking-normal">
                      順次追加予定
                    </span>
                  )}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                    {style.date && (
                      <span className="text-[10px] text-salon-accent font-medium flex items-center gap-1">
                          <Calendar size={10} />
                          {style.date}
                      </span>
                    )}
                    <p className="text-xs text-gray-400 line-clamp-1 tracking-wide">{style.description}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-300 group-hover:text-salon-accent transition-colors">
              {category.id === 'core-phase' ? (
                <ExternalLink size={18} strokeWidth={1.5} />
              ) : (
                <ChevronRight size={18} strokeWidth={1.5} />
              )}
            </div>
          </div>
        );
      })}

      {/* Hide Add button if in Latest Updates view to avoid confusion */}
      {category.id !== 'latest-updates' && (
        <button 
          onClick={onOpenAddModal}
          className="w-full py-5 border border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-salon-black hover:text-salon-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group"
        >
          <Plus size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium tracking-widest">新しいスタイルを追加</span>
        </button>
      )}
    </div>
  </div>
);

const StyleDetailView: React.FC<{
  style: SalonStyle | null;
  note: string;
  isFavorite: boolean;
  onNoteChange: (val: string) => void;
  onSaveNote: () => void;
  onToggleFavorite: () => void;
}> = ({ style, note, isFavorite, onNoteChange, onSaveNote, onToggleFavorite }) => {
  if (!style) return null;

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-[80vh] shadow-xl shadow-gray-100/50 border border-gray-100 rounded-2xl overflow-hidden">
      {/* Header Visual Area */}
      <div className={`relative p-12 md:p-20 flex flex-col items-center justify-center text-center ${!style.imageUrl ? getGradientClass(style.id, 'dark') : 'bg-gray-900'} overflow-hidden`}>
        
        {/* Background Image Support */}
        {style.imageUrl && (
          <>
            <img src={style.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          </>
        )}

        <div className="max-w-2xl relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-[10px] font-medium tracking-[0.2em] backdrop-blur-sm border border-white/10 uppercase">
               <Video size={10} />
               <span>Video Lesson</span>
             </div>
             {style.date && (
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-salon-accent/80 text-white text-[10px] font-medium tracking-[0.1em] backdrop-blur-sm">
                  <Calendar size={10} />
                  <span>{style.date} Update</span>
               </div>
             )}
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-normal tracking-wide">{style.name}</h1>
          <p className="text-gray-200 text-lg font-light leading-relaxed opacity-90 tracking-wide">{style.description}</p>
          
          {/* Favorite Button */}
          <button 
            onClick={onToggleFavorite}
            className={`mt-6 inline-flex items-center gap-2 px-6 py-2 rounded-full border transition-all duration-300 backdrop-blur-md ${isFavorite ? 'bg-salon-accent border-salon-accent text-white' : 'bg-white/10 border-white/30 text-white hover:bg-white/20'}`}
          >
            <Heart size={16} className={isFavorite ? "fill-current" : ""} />
            <span className="text-xs font-bold tracking-widest uppercase">{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
          </button>
        </div>
        
        {/* Background Accents (only if no image) */}
        {!style.imageUrl && (
          <>
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
          </>
        )}
      </div>

      {/* Action Bar */}
      <div className="sticky top-0 bg-white/95 backdrop-blur z-20 border-b border-gray-100 px-8 py-5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-salon-black font-serif italic tracking-wide">
          <Star size={14} className="text-salon-accent fill-salon-accent" />
          <span className="text-sm">Key Points</span>
        </div>
        {style.externalUrl && (
          <a 
            href={style.externalUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-salon-black text-white px-6 py-2.5 rounded-full text-xs hover:bg-salon-accent transition-colors shadow-lg shadow-salon-black/10 tracking-widest"
          >
            <span>動画を見る</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>

      <div className="p-8 md:p-16">
        
        {/* LESSON LIST SECTION */}
        {style.lessons && style.lessons.length > 0 ? (
          <div className="mb-16">
            <h3 className="text-xl font-serif font-medium text-salon-black mb-6 tracking-wide flex items-center gap-2">
              <PlayCircle size={20} className="text-salon-accent" />
              Lesson List
            </h3>
            <div className="grid gap-3">
              {style.lessons.map((lesson, idx) => (
                <a 
                  key={lesson.id}
                  href={lesson.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-salon-accent/30 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-6 h-6 rounded-full bg-white text-salon-gray text-xs flex items-center justify-center border border-gray-200 group-hover:border-salon-accent group-hover:text-salon-accent transition-colors font-serif">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-salon-dark group-hover:text-salon-black tracking-wide">
                      {lesson.title}
                    </span>
                  </div>
                  <ExternalLink size={16} className="text-gray-300 group-hover:text-salon-accent transition-colors" />
                </a>
              ))}
            </div>
          </div>
        ) : !style.externalUrl && (
             <div className="mb-16 p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50/50 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <Video size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-bold text-salon-gray uppercase tracking-widest mb-2">Coming Soon</h3>
                <p className="text-salon-black text-sm font-medium">動画コンテンツは順次追加予定です</p>
            </div>
        )}

        <div className="grid gap-16">
          {style.points.map((point, idx) => (
            <div key={point.id} className="relative group">
               <div className="flex gap-8">
                 <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-1">
                   <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-salon-accent font-serif font-medium text-xl border border-salon-accent/30 group-hover:bg-salon-accent group-hover:text-white transition-all duration-300">
                      {idx + 1}
                   </div>
                 </div>

                 <div className="flex-1 pb-8 border-b border-gray-50 last:border-0 last:pb-0">
                   <h3 className="text-xl font-medium text-salon-black mb-4 font-serif tracking-wide">
                     {point.title}
                   </h3>
                   <p className="text-gray-600 leading-9 text-justify font-light tracking-wide">
                     {point.description}
                   </p>
                 </div>
               </div>
            </div>
          ))}

          {(!style.points || style.points.length === 0) && (
             <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-salon-light/30 rounded-lg border border-dashed border-gray-200">
                <AlertCircle size={32} strokeWidth={1} className="mb-3 opacity-40" />
                <p className="text-sm tracking-widest font-light">登録されたポイントはありません</p>
             </div>
          )}
        </div>

        {/* Community/Notes Section */}
        <div className="mt-24 pt-12 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-8">
             <div className="p-2 bg-salon-light rounded-full text-salon-black">
               <BookOpen size={16} strokeWidth={1.5} />
             </div>
             <h3 className="text-lg font-medium text-salon-black font-serif tracking-wide">My Notes</h3>
          </div>
          <div className="relative group">
            <textarea 
              className="w-full p-6 pb-20 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-salon-gray/30 focus:ring-0 resize-none text-base md:text-sm leading-relaxed text-gray-700 placeholder-gray-400 transition-all shadow-sm group-hover:shadow-md font-light tracking-wide appearance-none"
              rows={5}
              placeholder="このスタイルに関する気づきや、練習での反省点を記録しましょう..."
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
            ></textarea>
            <div className="absolute bottom-4 right-4 z-10">
              <Button size="sm" variant="secondary" className="tracking-widest text-xs" onClick={onSaveNote}>保存する</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyPageView: React.FC<{
  accessHistory: {style: SalonStyle, timestamp: Date}[];
  favorites: string[];
  categories: Category[];
  onSelectStyle: (s: SalonStyle) => void;
}> = ({ accessHistory, favorites, categories, onSelectStyle }) => {
  
  // Resolve favorites styles from IDs
  const allStyles = categories.flatMap(c => c.styles);
  const favoriteStyles = favorites.map(id => allStyles.find(s => s.id === id)).filter((s): s is SalonStyle => !!s);

  return (
    <div className="max-w-4xl mx-auto min-h-[60vh]">
        <div className="mb-10 text-center py-12 bg-salon-light/30 rounded-xl border border-gray-100">
            <h1 className="text-3xl font-serif text-salon-black mb-2 tracking-widest">MY PAGE</h1>
            <p className="text-gray-500 text-xs tracking-[0.3em] uppercase">History & Records</p>
        </div>

        {/* Favorites Section */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Heart size={20} className="text-salon-accent fill-salon-accent" />
                <h2 className="text-lg font-medium text-salon-black tracking-wide">お気に入り</h2>
            </div>
            
            {favoriteStyles.length === 0 ? (
                <div className="text-center py-8 text-gray-400 flex flex-col items-center">
                    <Heart size={32} strokeWidth={1} className="mb-4 opacity-30" />
                    <p className="text-sm tracking-wide">お気に入りのスタイルはまだありません。</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteStyles.map(style => (
                    <div 
                      key={style.id} 
                      onClick={() => onSelectStyle(style)}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-gray-100 group"
                    >
                       <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xs font-serif ${getGradientClass(style.id, 'medium')} flex-shrink-0 overflow-hidden`}>
                          {style.imageUrl ? (
                             <img src={style.imageUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                             style.name.charAt(0)
                          )}
                       </div>
                       <div className="overflow-hidden">
                          <h3 className="text-salon-black font-medium text-sm truncate group-hover:text-salon-accent transition-colors">{style.name}</h3>
                          <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{style.description}</p>
                       </div>
                    </div>
                  ))}
                </div>
            )}
        </div>

        {/* History Section */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <History size={20} className="text-salon-accent" />
                <h2 className="text-lg font-medium text-salon-black tracking-wide">アクセス履歴 (直近3件)</h2>
            </div>
            
            {accessHistory.length === 0 ? (
                <div className="text-center py-16 text-gray-400 flex flex-col items-center">
                    <Clock size={48} strokeWidth={1} className="mb-4 opacity-30" />
                    <p className="text-sm tracking-wide">まだ閲覧履歴がありません。</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {accessHistory.map((log, index) => (
                        <div key={index} onClick={() => onSelectStyle(log.style)} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group border border-transparent hover:border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-serif ${getGradientClass(log.style.id, 'dark')} flex-shrink-0`}>
                                    {log.style.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-salon-black font-medium group-hover:text-salon-accent transition-colors text-sm md:text-base tracking-wide">{log.style.name}</h3>
                                    <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                                        <Clock size={10} />
                                        {log.timestamp.toLocaleDateString()} {log.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </p>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-300" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  // State
  const [categories, setCategories] = useState<Category[]>(() => {
    // Initialize with LATEST UPDATES category
    // Logic: Flatten all styles excluding 'izakaya', sort by date descending, take top 8
    
    const allStyles = INITIAL_CATEGORIES
      .filter(category => category.id !== 'izakaya')
      .flatMap(category => category.styles);
    
    const sortedStyles = allStyles.sort((a, b) => {
      // Assuming date format 'YYYY.MM.DD'
      const dateA = a.date ? new Date(a.date.replace(/\./g, '-')).getTime() : 0;
      const dateB = b.date ? new Date(b.date.replace(/\./g, '-')).getTime() : 0;
      return dateB - dateA; // Descending order
    });

    const latestStyles = sortedStyles.slice(0, 8);
    
    const latestCategory: Category = {
      id: 'latest-updates',
      title: 'LATEST UPDATES',
      subtitle: '最新の動画',
      description: '全カテゴリー（居酒屋セキグチを除く）の中から更新日順に最新のコンテンツを表示しています。',
      styles: latestStyles
    };
    
    return [latestCategory, ...INITIAL_CATEGORIES];
  });

  const [announcements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  
  // Persistent Access History
  const [accessHistory, setAccessHistory] = useState<{style: SalonStyle, timestamp: Date}[]>(() => {
    try {
      const saved = localStorage.getItem('salon_access_history');
      if (saved) {
        return JSON.parse(saved).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
    return [];
  });

  // Persistent Notes
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('salon_user_notes');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load notes", e);
      return {};
    }
  });

  // Persistent Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('salon_user_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load favorites", e);
      return [];
    }
  });

  // Local state for editing note in the detail view
  const [editingNote, setEditingNote] = useState('');

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('salon_access_history', JSON.stringify(accessHistory));
  }, [accessHistory]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('salon_user_notes', JSON.stringify(notes));
  }, [notes]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('salon_user_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const [currentLevel, setCurrentLevel] = useState<ViewLevel>('CATEGORY_LIST');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<SalonStyle | null>(null);
  
  // UI State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation Handlers
  const goBack = () => {
    if (currentLevel === 'STYLE_DETAIL') {
      setCurrentLevel('STYLE_LIST');
      setSelectedStyle(null);
    } else if (currentLevel === 'STYLE_LIST') {
      setCurrentLevel('CATEGORY_LIST');
      setSelectedCategory(null);
    } else if (currentLevel === 'MY_PAGE') {
      setCurrentLevel('CATEGORY_LIST');
    }
  };

  const handleSelectCategory = (category: Category) => {
    // Logic: Shuffle if category is 'charisma' (【セミナー動画】)
    if (category.id === 'charisma') {
      // Create a shallow copy with shuffled styles
      const shuffledCategory = { ...category, styles: shuffleArray(category.styles) };
      setSelectedCategory(shuffledCategory);
    } else {
      setSelectedCategory(category);
    }
    setCurrentLevel('STYLE_LIST');
    setIsMobileMenuOpen(false); // Close menu on selection
  };

  const handleSelectStyle = (style: SalonStyle) => {
    // Add to history (Limit to 3)
    setAccessHistory(prev => {
      // Remove previous entry of the same style to bring it to top
      const filtered = prev.filter(h => h.style.id !== style.id);
      const newHistory = [{style, timestamp: new Date()}, ...filtered];
      return newHistory.slice(0, 3); // Keep only last 3
    });

    // Special handling for CORE PHASE: Treat as direct links (2-level structure)
    // We need to check if the current selectedCategory is core-phase OR if the style belongs to core-phase (when accessed from history/search/latest)
    const isCorePhase = selectedCategory?.id === 'core-phase' || categories.find(c => c.id === 'core-phase')?.styles.some(s => s.id === style.id);

    if (isCorePhase) {
      if (style.externalUrl) {
        window.open(style.externalUrl, '_blank', 'noopener,noreferrer');
      } else {
        alert('動画は順次追加予定です。');
      }
      return;
    }

    // If coming from My Page or Search or Latest, we might need to set the category context
    if (!selectedCategory || selectedCategory.id === 'latest-updates') {
      const parentCategory = INITIAL_CATEGORIES.find(c => c.styles.some(s => s.id === style.id));
      if (parentCategory) {
        setSelectedCategory(parentCategory);
      }
    }

    setSelectedStyle(style);
    // Load existing note for this style
    setEditingNote(notes[style.id] || '');
    setCurrentLevel('STYLE_DETAIL');
    setIsMobileMenuOpen(false);
  };

  const handleSaveNote = () => {
    if (selectedStyle) {
      setNotes(prev => ({
        ...prev,
        [selectedStyle.id]: editingNote
      }));
      alert('メモを保存しました');
    }
  };

  const handleToggleFavorite = () => {
    if (selectedStyle) {
      setFavorites(prev => {
        if (prev.includes(selectedStyle.id)) {
          return prev.filter(id => id !== selectedStyle.id);
        } else {
          return [...prev, selectedStyle.id];
        }
      });
    }
  };

  // Add Content Handlers
  const handleAdd = async (name: string, imageUrl: string, isAutoGenerate: boolean) => {
    setIsGenerating(true);
    
    try {
      if (currentLevel === 'CATEGORY_LIST') {
        // Add Category
        const newCategory: Category = {
          id: `cat-${Date.now()}`,
          title: name,
          subtitle: 'New Phase',
          description: '新たに追加された学習フェーズです。',
          styles: [],
          imageUrl: imageUrl || undefined,
        };
        setCategories([...categories, newCategory]);
      } else if (currentLevel === 'STYLE_LIST' && selectedCategory) {
        // Add Style
        let description = '詳細情報はまだありません。';
        let points: StylePoint[] = [];

        if (isAutoGenerate) {
          const generated = await generateStyleSuggestion(name, selectedCategory.title);
          description = generated.description;
          // Map to ensure data integrity and avoid runtime crashes if AI hallucinates format
          points = (generated.points ?? []).map((p: any, i: number) => ({
            id: `pt-${Date.now()}-${i}`,
            title: typeof p === "string" ? p : (p.title ?? `Point ${i + 1}`),
            description: typeof p === "string" ? "" : (p.description ?? ""),
          }));
        }

        const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '.');

        const newStyle: SalonStyle = {
          id: `style-${Date.now()}`,
          name: name,
          description: description,
          externalUrl: 'https://example.com',
          points: points,
          imageUrl: imageUrl || undefined,
          date: currentDate,
        };

        const updatedCategories = categories.map(cat => {
          // Update the specific category
          if (cat.id === selectedCategory.id) {
            return { ...cat, styles: [...cat.styles, newStyle] };
          }
          // Update Latest (Prepend new style to LATEST UPDATES)
          if (cat.id === 'latest-updates') {
             // Re-sort latest updates including the new one, excluding 'izakaya'
             const allStyles = [...categories
                .filter(c => c.id !== 'latest-updates' && c.id !== 'izakaya')
                .flatMap(c => c.styles), 
                newStyle
             ];
             const sorted = allStyles.sort((a, b) => {
               const dateA = a.date ? new Date(a.date.replace(/\./g, '-')).getTime() : 0;
               const dateB = b.date ? new Date(b.date.replace(/\./g, '-')).getTime() : 0;
               return dateB - dateA;
             });
             return { ...cat, styles: sorted.slice(0, 8) };
          }
          return cat;
        });

        setCategories(updatedCategories);
        
        // Update currently selected category reference as well
        if (selectedCategory.id !== 'latest-updates') {
           setSelectedCategory({ ...selectedCategory, styles: [...selectedCategory.styles, newStyle] });
        }
      }
    } catch (e) {
      console.error(e);
      alert('エラーが発生しました。');
    } finally {
      setIsGenerating(false);
      setIsAddModalOpen(false);
    }
  };

  // Breadcrumbs Component (Internal helper, no state)
  const Breadcrumbs = () => (
    <nav className="flex items-center text-xs md:text-sm text-gray-500 mb-6 font-medium tracking-wide overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
      <button onClick={() => { setCurrentLevel('CATEGORY_LIST'); setSelectedCategory(null); setSelectedStyle(null); }} className="hover:text-black transition-colors">
        HOME
      </button>
      {currentLevel === 'MY_PAGE' && (
        <>
           <ChevronRight size={14} className="mx-2 flex-shrink-0" />
           <span className="text-black font-bold">MY PAGE</span>
        </>
      )}
      {selectedCategory && currentLevel !== 'MY_PAGE' && (
        <>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <button onClick={() => { setCurrentLevel('STYLE_LIST'); setSelectedStyle(null); }} className={`hover:text-black transition-colors ${!selectedStyle ? 'text-black font-bold' : ''}`}>
            {selectedCategory.title}
          </button>
        </>
      )}
      {selectedStyle && currentLevel !== 'MY_PAGE' && (
        <>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <span className="text-black font-bold">{selectedStyle.name}</span>
        </>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen font-sans text-salon-dark selection:bg-salon-accent selection:text-white pb-20">
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onSelectStyle={handleSelectStyle}
        onGoToMyPage={() => setCurrentLevel('MY_PAGE')}
      />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             {currentLevel !== 'CATEGORY_LIST' && (
                <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-salon-black">
                  <ArrowLeft size={20} strokeWidth={1.5} />
                </button>
             )}
             <div className="flex flex-col cursor-pointer group" onClick={() => { setCurrentLevel('CATEGORY_LIST'); setSelectedCategory(null); }}>
               <div className="flex items-center gap-2">
                 <Zap size={16} className="text-salon-accent fill-salon-accent hidden md:block" />
                 <span className="text-xl font-serif font-bold tracking-widest text-salon-black group-hover:text-salon-dark transition-colors">美容師サプリ</span>
               </div>
               <span className="text-[10px] tracking-[0.3em] text-salon-gray uppercase pl-0 md:pl-6 font-light">Professional Online</span>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="md:hidden p-2 text-gray-500" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={24} strokeWidth={1.5} />
             </button>
             <div className="hidden md:flex items-center gap-10 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
               <button onClick={() => setCurrentLevel('MY_PAGE')} className={`hover:text-salon-black transition-colors ${currentLevel === 'MY_PAGE' ? 'text-salon-black' : ''}`}>My Page</button>
               <span className="w-px h-3 bg-gray-200"></span>
               <button className="text-salon-black hover:text-salon-accent transition-colors">Log Out</button>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10 pl-1">
           <Breadcrumbs />
        </div>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
          {currentLevel === 'CATEGORY_LIST' && (
            <CategoryListView 
              categories={categories}
              announcements={announcements}
              onSelectCategory={handleSelectCategory}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          )}
          
          {currentLevel === 'STYLE_LIST' && selectedCategory && (
            <StyleListView 
              category={selectedCategory}
              onSelectStyle={handleSelectStyle}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          )}
          
          {currentLevel === 'STYLE_DETAIL' && (
            <StyleDetailView 
              style={selectedStyle}
              note={editingNote}
              isFavorite={selectedStyle ? favorites.includes(selectedStyle.id) : false}
              onNoteChange={setEditingNote}
              onSaveNote={handleSaveNote}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {currentLevel === 'MY_PAGE' && (
            <MyPageView 
              accessHistory={accessHistory}
              favorites={favorites}
              categories={categories}
              onSelectStyle={handleSelectStyle}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-16 text-center text-gray-400 text-xs border-t border-gray-200 bg-white">
        <p className="font-serif italic text-xl mb-3 text-gray-300 tracking-wider">Beauty & Innovation</p>
        <p className="tracking-widest font-light">&copy; 2024 美容師サプリ / Izakaya Sekiguchi. All Rights Reserved.</p>
      </footer>

      {/* Modals */}
      <AddModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
        type={currentLevel === 'CATEGORY_LIST' ? 'Category' : 'Style'}
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default App;