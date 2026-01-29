import React, { useState } from 'react';
import { Button } from './Button';
import { X, Sparkles, Image as ImageIcon } from 'lucide-react';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, imageUrl: string, isAutoGenerate: boolean) => void;
  type: 'Category' | 'Style';
  isGenerating: boolean;
}

export const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onAdd, type, isGenerating }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [autoGenerate, setAutoGenerate] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name, imageUrl, autoGenerate);
      setName('');
      setImageUrl('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-serif font-semibold mb-6">
          {type === 'Category' ? '新しいフェーズを追加' : '新しいスタイルを追加'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              {type === 'Category' ? 'フェーズ名' : 'スタイル名'}
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b-2 border-gray-200 py-2 text-lg focus:outline-none focus:border-salon-black transition-colors placeholder-gray-300"
              placeholder={type === 'Category' ? "例: SPECIAL SEMINAR" : "例: マッシュウルフ"}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              画像URL (任意)
            </label>
            <div className="relative">
              <input 
                type="url" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border-b-2 border-gray-200 py-2 pl-8 text-sm focus:outline-none focus:border-salon-black transition-colors placeholder-gray-300"
                placeholder="https://..."
              />
              <ImageIcon size={16} className="absolute left-0 top-2.5 text-gray-400" />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              入力がない場合は自動的にデザインパターンが適用されます。
            </p>
          </div>

          {type === 'Style' && (
             <div className="flex items-center gap-3 p-3 bg-salon-light rounded-lg cursor-pointer hover:bg-gray-200 transition-colors" onClick={() => setAutoGenerate(!autoGenerate)}>
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${autoGenerate ? 'bg-salon-black border-salon-black' : 'bg-white border-gray-300'}`}>
                  {autoGenerate && <Sparkles size={12} className="text-white" />}
                </div>
                <div>
                  <p className="text-sm font-medium">AI自動生成を使用</p>
                  <p className="text-xs text-gray-500">Geminiが説明文とポイントを提案します</p>
                </div>
             </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>キャンセル</Button>
            <Button type="submit" isLoading={isGenerating} disabled={!name.trim()}>追加する</Button>
          </div>
        </form>
      </div>
    </div>
  );
};