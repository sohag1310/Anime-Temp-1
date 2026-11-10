import React, { useState } from 'react';
import { Send, MessageCircle, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [dmcaModal, setDmcaModal] = useState(false);

  return (
    <footer className="w-full bg-[#080911] border-t border-[#17192c] text-slate-400 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top: Logo & Community links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#141628]">
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <img
                src="/images/toonplay-logo.webp"
                alt="ToonPlay"
                className="h-7 w-auto object-contain"
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              ToonPlay is a fast, clean anime and cartoon streaming platform providing animated series, feature films, and multi-language dubs in Hindi, Tamil, Telugu, English, and Japanese.
            </p>
          </div>

          {/* Social / Community Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://t.me/toonplay_official"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-300 hover:text-white font-medium transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Join Telegram</span>
            </a>
            <a
              href="https://whatsapp.com/channel/0029VbDe6udFXUucYq41Uu1Q"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white font-medium transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Channel</span>
            </a>
          </div>
        </div>

        {/* Middle: Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Explore</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('anime')} className="hover:text-white transition-colors cursor-pointer">
                  Anime Series & Movies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cartoon')} className="hover:text-white transition-colors cursor-pointer">
                  Cartoon Classics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('leaderboard')} className="hover:text-white transition-colors cursor-pointer">
                  Global Leaderboard
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Popular Dubs</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('language', 'hindi')} className="hover:text-white transition-colors cursor-pointer">
                  Hindi Dubbed (हिन्दी)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('language', 'tamil')} className="hover:text-white transition-colors cursor-pointer">
                  Tamil Dubbed (தமிழ்)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('language', 'telugu')} className="hover:text-white transition-colors cursor-pointer">
                  Telugu Dubbed (తెలుగు)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('languages')} className="hover:text-white transition-colors cursor-pointer">
                  All Languages →
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Featured Shows</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('watch', 'series-shinchan')} className="hover:text-white transition-colors cursor-pointer text-indigo-400">
                  Shinchan (All Seasons)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('watch', 'series-pokemon-the-series-the-beginning')} className="hover:text-white transition-colors cursor-pointer">
                  Pokemon: Indigo League
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('watch', 'series-doraemon')} className="hover:text-white transition-colors cursor-pointer">
                  Doraemon Adventures
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('watch', 'series-naruto-shippuden')} className="hover:text-white transition-colors cursor-pointer">
                  Naruto Shippuden
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Legal & Info</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setDmcaModal(true)} className="hover:text-white transition-colors cursor-pointer">
                  DMCA & Copyright
                </button>
              </li>
              <li>
                <span className="text-slate-500">Contact: support@toonplay.in</span>
              </li>
              <li>
                <span className="text-slate-500">Terms of Service</span>
              </li>
              <li>
                <span className="text-slate-500">Privacy Policy</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-[#141628] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>
            © {new Date().getFullYear()} ToonPlay. This site does not store any files on its servers. All contents are provided by non-affiliated third parties.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted for anime & cartoon fans</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>

      {/* DMCA Modal */}
      {dmcaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#101222] border border-[#22263d] rounded-2xl p-6 max-w-lg w-full text-slate-300 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              DMCA Disclaimer
            </h3>
            <p className="text-xs leading-relaxed text-slate-400">
              ToonPlay is an index and tool for finding animation and cartoon media available across the internet. ToonPlay does not host, upload, or control any videos or streams directly.
            </p>
            <p className="text-xs leading-relaxed text-slate-400">
              If you believe content indexed on this platform infringes upon your copyright, please submit a notice to our copyright agent at <span className="text-indigo-400 font-mono">dmca@toonplay.in</span>.
            </p>
            <button
              onClick={() => setDmcaModal(false)}
              className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
