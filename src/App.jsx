import React, { useState, useEffect, useRef } from 'react';
import { 
 Copy, 
 RefreshCw, 
 Settings, 
 Code, 
 FileJson, 
 FileText, 
 Sparkles, 
 ChevronDown, 
 ChevronRight,
 Zap,
 Trash2,
 Camera,
 Sun,
 Palette,
 Clock,
 Layers,
 Box,
 Aperture,
 Key,
 Wand2,
 Ban,
 Maximize,
 Sliders,
 Cpu
} from 'lucide-react';

// --- DATA DICTIONARIES ---

const PRESETS = {
 medium: [
   "Digital Painting", "Oil on Canvas", "3D Render", "Photography", "Watercolor", 
   "Cyberpunk Illustration", "Concept Art", "Anime", "Ukiyo-e", "Pencil Sketch", 
   "Polaroid", "Macro Photography", "Drone Shot", "Vector Art", "Claymation",
   "Line Art", "Isometric 3D", "Low Poly", "Origami", "Stained Glass"
 ],
 style: [
   "Realistic", "Surrealism", "Abstract", "Minimalist", "Steampunk", "Synthwave", 
   "Gothic", "Baroque", "Bauhaus", "Pixar Style", "Studio Ghibli", "Blade Runner", 
   "Wes Anderson", "H.R. Giger", "Dystopian", "Cybernetic", "Biopunk", "Vaporwave",
   "Noir", "Pop Art"
 ],
 lighting: [
   "Natural Light", "Golden Hour", "Blue Hour", "Cinematic Lighting", "Volumetric Fog", 
   "Neon Lights", "Bioluminescence", "Studio Softbox", "Rembrandt Lighting", "Rim Lighting", 
   "God Rays", "Candlelight", "Harsh Sunlight", "Cyberpunk Glow", "Noir Shadows",
   "Global Illumination", "Ray Traced Reflections", "Diffused Glow"
 ],
 camera: [
   "Canon EOS R5", "Sony A7R IV", "Leica M6", "GoPro Hero", "IMAX 70mm", 
   "Drone View", "Microscope", "Telescope", "Fisheye Lens", "35mm Lens", 
   "85mm Portrait Lens", "200mm Telephoto", "Wide Angle", "Tilt-Shift",
   "Thermal Camera", "Night Vision", "Disposable Camera"
 ],
 composition: [
   "Rule of Thirds", "Symmetrical", "Centered", "Golden Ratio", "Dutch Angle", 
   "Bird's Eye View", "Worm's Eye View", "Close-up", "Extreme Close-up", "Panorama", 
   "Negative Space", "Leading Lines", "Framing", "Chaotic", "Knolling"
 ],
 resolution: [
   "4K", "8K", "HD", "Full HD", "Ultra Photorealistic", "Unreal Engine 5", 
   "Octane Render", "Ray Tracing", "High Fidelity", "Detailed Textures",
   "Gigapixel", "Raw Photo"
 ],
 colorPalette: [
   "Vibrant", "Monochrome", "Pastel", "Muted", "Neon", "Black and White", 
   "Sepia", "Cool Tones", "Warm Tones", "Complementary Colors", "Triadic", "Vintage",
   "Acid Colors", "Earth Tones", "Metallic", "Iridescent"
 ],
 mood: [
   "Happy", "Melancholic", "Eerie", "Peaceful", "Chaotic", "Romantic", 
   "Mysterious", "Energetic", "Gloomy", "Hopeful", "Whimsical", "Dark",
   "Ethereal", "Dreamy", "Nightmarish", "Zen"
 ],
 time: [
   "Dawn", "Morning", "Noon", "Afternoon", "Sunset", "Dusk", "Midnight", 
   "Starry Night", "Eclipse", "Overcast", "Twilight"
 ],
 season: [
   "Spring", "Summer", "Autumn", "Winter", "Monsoon", "Dry Season", "Snowstorm", "Heatwave",
   "Post-Apocalyptic Winter", "Tropical Storm"
 ],
 artists: [
   "Greg Rutkowski", "Alphonse Mucha", "Zdzisław Beksiński", "Hokusai", "Van Gogh",
   "Da Vinci", "Rembrandt", "Salvador Dali", "Simon Stålenhag", "Beeple",
   "Artgerm", "Loish", "Wlop", "Rossdraws", "Krenz Cushart"
 ],
 aspectRatios: [
   "1:1", "16:9", "9:16", "4:3", "3:4", "2:1", "21:9"
 ]
};

// --- HELPER FUNCTIONS ---

const generateYaml = (data) => {
 return Object.entries(data)
   .filter(([_, value]) => value && String(value).trim() !== "")
   .map(([key, value]) => `${key}: "${value}"`) // Corrected: escaped quotes within template literal
   .join('\n');
};

const generateXml = (data) => {
 const content = Object.entries(data)
   .filter(([_, value]) => value && String(value).trim() !== "")
   .map(([key, value]) => `  <${key}>${value}</${key}>`)
   .join('\n');
 return `<prompt>\n${content}\n</prompt>`;
};

// --- COMPONENTS ---

const Section = ({ id, title, icon: Icon, children, activeSection, onToggle }) => {
 const isOpen = activeSection === id;
 return (
   <div className="border border-slate-700 rounded-lg mb-3 bg-slate-800/50 overflow-hidden transition-all duration-200">
     <button 
       onClick={() => onToggle(id)}
       className={`w-full flex items-center justify-between p-4 transition-colors ${isOpen ? 'bg-slate-700/60 text-white' : 'text-slate-200 hover:bg-slate-700/30'}`}
     >
       <div className="flex items-center gap-3">
         <Icon size={18} className={isOpen ? "text-blue-400" : "text-slate-400"} />
         <span className="font-medium tracking-wide">{title}</span>
       </div>
       {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
     </button>
     {isOpen && (
       <div className="p-4 border-t border-slate-700 bg-slate-900/30 animate-in slide-in-from-top-2 duration-200">
         {children}
       </div>
     )}
   </div>
 );
};

const InputGroup = ({ label, value, onChange, options, onRandomize }) => (
 <div className="mb-4 last:mb-0">
   <div className="flex justify-between items-center mb-2">
     <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
     <button 
       onClick={onRandomize}
       className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
       title="Randomize this field"
     >
       <RefreshCw size={10} /> Auto
     </button>
   </div>
   <div className="flex flex-col gap-2">
     <div className="relative">
       <select 
         value={options.includes(value) ? value : ""} 
         onChange={(e) => onChange(e.target.value)}
         className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
       >
         <option value="">Select Preset...</option>
         {options.map(opt => (
           <option key={opt} value={opt}>{opt}</option>
         ))}
       </select>
       <ChevronDown size={14} className="absolute right-3 top-3 pointer-events-none text-slate-500" />
     </div>
     <input 
       type="text" 
       value={value} 
       onChange={(e) => onChange(e.target.value)}
       placeholder={`Or type custom ${label.toLowerCase()}...`}
       className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder:text-slate-600"
     />
   </div>
 </div>
);

const RangeSlider = ({ label, value, min, max, step, onChange }) => (
 <div className="mb-4">
   <div className="flex justify-between mb-2">
     <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
     <span className="text-xs text-blue-400 font-mono">{value}</span>
   </div>
   <input 
     type="range"
     min={min}
     max={max}
     step={step}
     value={value}
     onChange={(e) => onChange(e.target.value)}
     className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
   />
 </div>
);

const CopyButton = ({ text }) => {
 const [copied, setCopied] = useState(false);
 
 const handleCopy = async () => {
   try {
     await navigator.clipboard.writeText(text);
     setCopied(true);
   } catch (err) {
     try {
       const textArea = document.createElement("textarea");
       textArea.value = text;
       textArea.style.position = "fixed";
       textArea.style.left = "-9999px";
       textArea.style.top = "0";
       document.body.appendChild(textArea);
       textArea.focus();
       textArea.select();
       const successful = document.execCommand('copy');
       document.body.removeChild(textArea);
       if (successful) setCopied(true);
     } catch (fallbackErr) {
        console.error("Unable to copy", fallbackErr);
     }
   }
   setTimeout(() => setCopied(false), 2000);
 };

 return (
   <button 
     onClick={handleCopy}
     className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
     title="Copy to clipboard"
   >
     {copied ? <span className="text-green-400 text-xs font-bold">Copied!</span> : <Copy size={16} />}
   </button>
 );
};

const ApiKeyModal = ({ isOpen, onClose, onSave, existingKey, existingModel }) => {
 const [key, setKey] = useState(existingKey || '');
 const [model, setModel] = useState(existingModel || 'gemini-2.5-flash');

 useEffect(() => {
   setKey(existingKey || '');
   if (existingModel) setModel(existingModel);
 }, [existingKey, existingModel]);

 if (!isOpen) return null;

 const models = [
   { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
   { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite' },
   { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Legacy)' },
 ];

 return (
   <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
     <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
       <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
         <Key size={20} className="text-yellow-400" /> API Settings
       </h2>
       <p className="text-slate-400 text-sm mb-4">
         Enter your Gemini API Key to enable AI Prompt Polishing. The key is stored locally in your browser.
       </p>
       <div className="space-y-4 mb-6">
         <div>
           <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">API Key</label>
           <input 
             type="password"
             value={key}
             onChange={(e) => setKey(e.target.value)}
             placeholder="AIzaSy..."
             className="w-full bg-slate-950 border border-slate-700 rounded px-4 py-3 text-slate-200 outline-none focus:border-blue-500 font-mono text-sm"
           />
         </div>
         <div>
           <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Model Version</label>
           <div className="relative">
             <select
               value={model}
               onChange={(e) => setModel(e.target.value)}
               className="w-full bg-slate-950 border border-slate-700 rounded px-4 py-3 text-slate-200 outline-none focus:border-blue-500 appearance-none text-sm"
             >
               {models.map(m => (
                 <option key={m.id} value={m.id}>{m.name}</option>
               ))}
             </select>
             <ChevronDown size={16} className="absolute right-4 top-3.5 text-slate-500 pointer-events-none" />
           </div>
         </div>
       </div>
       <div className="flex justify-end gap-3">
         <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
         <button 
           onClick={() => onSave(key, model)}
           className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium"
         >
           Save Settings
         </button>
       </div>
     </div>
   </div>
 );
};

export default function App() {
 const [activeTab, setActiveTab] = useState('json');
 const [activeSection, setActiveSection] = useState('core'); 
 const [showApiModal, setShowApiModal] = useState(false);
 const [apiKey, setApiKey] = useState('');
 const [apiModel, setApiModel] = useState('gemini-2.5-flash');
 const [isPolishing, setIsPolishing] = useState(false);
 const [aiError, setAiError] = useState(null);
 const [polishedPrompt, setPolishedPrompt] = useState("");
 
 const [formData, setFormData] = useState({
   subject: "", negativePrompt: "", medium: "", style: "", artist: "", lighting: "", camera: "", 
   composition: "", resolution: "", colorPalette: "", mood: "", 
   time: "", season: "", aspectRatio: "", stylize: 50, seed: ""
 });

 useEffect(() => {
   const storedKey = localStorage.getItem('gemini_api_key');
   const storedModel = localStorage.getItem('gemini_api_model');
   if (storedKey) setApiKey(storedKey);
   if (storedModel) setApiModel(storedModel);
 }, []);

 const handleAccordion = (id) => setActiveSection(prev => prev === id ? null : id);
 const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

 const saveSettings = (key, model) => {
   localStorage.setItem('gemini_api_key', key);
   localStorage.setItem('gemini_api_model', model);
   setApiKey(key);
   setApiModel(model);
   setShowApiModal(false);
 };

 const randomizeField = (field) => {
   const opts = PRESETS[field];
   if (opts) updateField(field, opts[Math.floor(Math.random() * opts.length)]);
 };

 const generateFullRandom = () => {
   const newForm = { ...formData };
   if (!newForm.subject) newForm.subject = "A futuristic city floating in the clouds";
   Object.keys(PRESETS).forEach(key => {
     const opts = PRESETS[key];
     if (['medium', 'style'].includes(key) || Math.random() > 0.3) {
        newForm[key] = opts[Math.floor(Math.random() * opts.length)];
     } else {
        newForm[key] = "";
     }
   });
   newForm.stylize = Math.floor(Math.random() * 1000);
   newForm.seed = Math.floor(Math.random() * 1000000000).toString();
   setFormData(newForm);
   setPolishedPrompt("");
 };

 const clearForm = () => {
   setFormData({
     subject: "", negativePrompt: "", medium: "", style: "", artist: "", lighting: "", camera: "", 
     composition: "", resolution: "", colorPalette: "", mood: "", 
     time: "", season: "", aspectRatio: "", stylize: 50, seed: ""
   });
   setPolishedPrompt("");
 };

 const constructPromptString = () => {
   return [
     formData.medium,
     formData.subject ? `of ${formData.subject}` : '',
     formData.style ? `, ${formData.style} style` : '',
     formData.artist ? `, by ${formData.artist}` : '',
     formData.lighting ? `, ${formData.lighting}` : '',
     formData.camera ? `, shot on ${formData.camera}` : '',
     formData.composition ? `, ${formData.composition}` : '',
     formData.colorPalette ? `, ${formData.colorPalette} colors` : '',
     formData.mood ? `, ${formData.mood} atmosphere` : '',
     formData.time ? `, ${formData.time}` : '',
     formData.season ? `, ${formData.season}` : '',
     formData.resolution ? `, ${formData.resolution}` : '',
     formData.aspectRatio ? `--ar ${formData.aspectRatio}` : '',
     formData.stylize ? `--s ${formData.stylize}` : '',
     formData.negativePrompt ? `--no ${formData.negativePrompt}` : ''
   ].filter(Boolean).join(" ");
 };

 const polishWithAI = async () => {
   if (!apiKey) { setShowApiModal(true); return; }
   setIsPolishing(true);
   setAiError(null);
   const currentPrompt = constructPromptString();

   try {
     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${apiModel}:generateContent?key=${apiKey}`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         contents: [{ parts: [{ text: `Rewrite the following image generation prompt to be more vivid, artistic, and descriptive. Keep the core subject but enhance adjectives and lighting. Keep it a single paragraph. \n\nOriginal: "${currentPrompt}"` }] }]
       })
     });
     const data = await response.json();
     if (data.error) throw new Error(data.error.message);
     const enhancedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
     if (enhancedText) setPolishedPrompt(enhancedText);
     else throw new Error("No suggestion received");
   } catch (err) {
     setAiError(err.message);
   } finally {
     setIsPolishing(false);
   }
 };

 const rawPrompt = constructPromptString();
 const jsonOutput = JSON.stringify({ ...formData, polishedPrompt }, null, 2);
 const yamlOutput = generateYaml({ ...formData, polishedPrompt });
 const xmlOutput = generateXml({ ...formData, polishedPrompt });

 return (
   <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
     <ApiKeyModal 
       isOpen={showApiModal} onClose={() => setShowApiModal(false)} onSave={saveSettings} existingKey={apiKey} existingModel={apiModel}
     />
     <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
         <div className="flex items-center gap-3">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
             <Zap size={20} className="text-white" />
           </div>
           <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
             Prompt Architect <span className="text-xs font-mono text-blue-400 ml-2">v2.1</span>
           </h1>
         </div>
         <div className="flex gap-2">
           <button 
             onClick={() => setShowApiModal(true)}
             className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors text-xs font-medium border border-transparent ${apiKey ? 'text-green-400 bg-green-900/20 border-green-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
             title="API Settings"
           >
             <Cpu size={14} />
             <span className="hidden sm:inline">{apiModel.replace('gemini-', '')}</span>
             <Settings size={14} className="ml-1 opacity-50" />
           </button>
            <button onClick={clearForm} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-all">
             <Trash2 size={16} /> <span className="hidden sm:inline">Clear</span>
           </button>
           <button onClick={generateFullRandom} className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-md shadow-lg shadow-blue-900/30 transition-all active:scale-95">
             <RefreshCw size={16} /> <span className="hidden sm:inline">Randomize</span>
           </button>
         </div>
       </div>
     </header>
     <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
       <div className="lg:col-span-5 space-y-2">
         <div className="mb-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Main Subject</label>
              <textarea 
                 value={formData.subject} onChange={(e) => updateField('subject', e.target.value)}
                 placeholder="Describe the core subject (e.g., A futuristic samurai in a rain-soaked alley...)"
                 className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none placeholder:text-slate-600"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-red-400/80 uppercase tracking-wider mb-2 flex items-center gap-2"><Ban size={12} /> Negative Prompt</label>
              <input 
                 type="text" value={formData.negativePrompt} onChange={(e) => updateField('negativePrompt', e.target.value)}
                 placeholder="Items to remove (e.g. blurry, low quality, ugly, text)"
                 className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:ring-2 focus:ring-red-500/50 focus:border-transparent outline-none placeholder:text-slate-600 text-sm"
              />
            </div>
         </div>
         <Section id="core" title="Core Aesthetics" icon={Palette} activeSection={activeSection} onToggle={handleAccordion}>
           <InputGroup label="Medium" value={formData.medium} options={PRESETS.medium} onChange={(v) => updateField('medium', v)} onRandomize={() => randomizeField('medium')} />
           <InputGroup label="Style" value={formData.style} options={PRESETS.style} onChange={(v) => updateField('style', v)} onRandomize={() => randomizeField('style')} />
            <InputGroup label="Artist / Reference" value={formData.artist} options={PRESETS.artists} onChange={(v) => updateField('artist', v)} onRandomize={() => randomizeField('artist')} />
         </Section>
         <Section id="lighting" title="Lighting & Atmosphere" icon={Sun} activeSection={activeSection} onToggle={handleAccordion}>
           <InputGroup label="Lighting Type" value={formData.lighting} options={PRESETS.lighting} onChange={(v) => updateField('lighting', v)} onRandomize={() => randomizeField('lighting')} />
            <InputGroup label="Mood" value={formData.mood} options={PRESETS.mood} onChange={(v) => updateField('mood', v)} onRandomize={() => randomizeField('mood')} />
           <div className="grid grid-cols-2 gap-3">
             <InputGroup label="Time" value={formData.time} options={PRESETS.time} onChange={(v) => updateField('time', v)} onRandomize={() => randomizeField('time')} />
              <InputGroup label="Season" value={formData.season} options={PRESETS.season} onChange={(v) => updateField('season', v)} onRandomize={() => randomizeField('season')} />
           </div>
         </Section>
         <Section id="camera" title="Camera & Technical" icon={Camera} activeSection={activeSection} onToggle={handleAccordion}>
           <InputGroup label="Camera / Lens" value={formData.camera} options={PRESETS.camera} onChange={(v) => updateField('camera', v)} onRandomize={() => randomizeField('camera')} />
           <InputGroup label="Composition" value={formData.composition} options={PRESETS.composition} onChange={(v) => updateField('composition', v)} onRandomize={() => randomizeField('composition')} />
            <div className="grid grid-cols-2 gap-3">
             <InputGroup label="Resolution" value={formData.resolution} options={PRESETS.resolution} onChange={(v) => updateField('resolution', v)} onRandomize={() => randomizeField('resolution')} />
             <InputGroup label="Aspect Ratio" value={formData.aspectRatio} options={PRESETS.aspectRatios} onChange={(v) => updateField('aspectRatio', v)} onRandomize={() => { const opts = PRESETS.aspectRatios; updateField('aspectRatio', opts[Math.floor(Math.random() * opts.length)]); }} />
           </div>
         </Section>
          <Section id="details" title="Advanced & Parameters" icon={Sliders} activeSection={activeSection} onToggle={handleAccordion}>
           <InputGroup label="Color Palette" value={formData.colorPalette} options={PRESETS.colorPalette} onChange={(v) => updateField('colorPalette', v)} onRandomize={() => randomizeField('colorPalette')} />
           <RangeSlider label="Stylize / Chaos (0-1000)" value={formData.stylize} min="0" max="1000" step="10" onChange={(v) => updateField('stylize', v)} />
           <div className="mb-4">
             <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Seed</label>
             <div className="flex gap-2">
                <input type="text" value={formData.seed} onChange={(e) => updateField('seed', e.target.value)} placeholder="Random seed..." className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-slate-200 outline-none" />
                <button onClick={() => updateField('seed', Math.floor(Math.random() * 1000000000).toString())} className="p-2 bg-slate-800 rounded hover:bg-slate-700"><RefreshCw size={14} /></button>
             </div>
           </div>
         </Section>
       </div>
       <div className="lg:col-span-7 flex flex-col gap-6">
         <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity"><CopyButton text={rawPrompt} /></div>
           <h3 className="text-xs font-bold text-blue-400 mb-3 flex items-center gap-2 tracking-wider"><Layers size={14} /> COMPILED PROMPT</h3>
           <p className="text-lg leading-relaxed text-slate-200 font-light mb-4">{rawPrompt || <span className="text-slate-600 italic">Configure settings to generate a prompt...</span>}</p>
           <div className="border-t border-slate-700/50 pt-4 flex items-center justify-between">
             <div className="flex items-center gap-2 text-xs text-slate-500">
               <div className={`w-2 h-2 rounded-full ${apiKey ? 'bg-green-500' : 'bg-red-500'}`}></div> {apiKey ? 'AI Enabled' : 'No API Key'}
               <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-400 border border-slate-700">{apiModel}</span>
             </div>
             <button onClick={polishWithAI} disabled={isPolishing} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isPolishing ? 'bg-slate-700 text-slate-400 cursor-wait' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg hover:shadow-purple-500/20'}`}>
               {isPolishing ? <RefreshCw size={16} className="animate-spin" /> : <Wand2 size={16} />} {isPolishing ? 'Polishing...' : 'Magic Polish'}
             </button>
           </div>
           {aiError && <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-sm">Error: {aiError}</div>}
           {polishedPrompt && (
             <div className="mt-4 p-4 bg-purple-900/10 border border-purple-500/30 rounded-lg animate-in fade-in slide-in-from-bottom-2">
               <div className="flex items-center justify-between mb-2">
                 <h4 className="text-xs font-bold text-purple-400 flex items-center gap-2"><Sparkles size={12} /> AI ENHANCED VERSION</h4>
                 <CopyButton text={polishedPrompt} />
               </div>
               <p className="text-slate-300 italic text-sm leading-relaxed">"{polishedPrompt}"</p>
             </div>
           )}
         </div>
         <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
           <div className="flex border-b border-slate-800 bg-slate-950/50">
             {[{ id: 'json', icon: FileJson, label: 'JSON' }, { id: 'yaml', icon: FileText, label: 'YAML' }, { id: 'xml', icon: Code, label: 'XML' }].map(tab => (
               <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-r border-slate-800 ${activeTab === tab.id ? 'bg-slate-900 text-blue-400 border-b-2 border-b-blue-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'}`}>
                 <tab.icon size={16} /> {tab.label}
               </button>
             ))}
             <div className="ml-auto flex items-center px-4"><CopyButton text={activeTab === 'json' ? jsonOutput : activeTab === 'yaml' ? yamlOutput : xmlOutput} /></div>
           </div>
           <div className="flex-1 relative group">
             <textarea readOnly value={activeTab === 'json' ? jsonOutput : activeTab === 'yaml' ? yamlOutput : xmlOutput} className="w-full h-full bg-slate-950 p-6 font-mono text-sm text-green-400 resize-none outline-none" style={{ minHeight: '400px' }} />
           </div>
         </div>
       </div>
     </main>
   </div>
 );
}