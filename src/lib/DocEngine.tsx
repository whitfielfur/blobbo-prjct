import React, { useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ChevronDown, Terminal, AlertCircle, Info, 
  CheckCircle2, AlertTriangle, Globe, Server, 
  CreditCard, Layout, Link as LinkIcon, Hash,
  Copy, Check, Image as ImageIcon, ExternalLink,
  Maximize2, Code2, List, MousePointerClick, Zap
} from 'lucide-react';

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    // TODO: navigator.clipboard might fail in non-secure contexts (http)
    // Should probably add a fallback, who the hell uses http in 2025?
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white">
      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
    </button>
  );
};

const ImageBlock = ({ src, alt, caption, align = 'center', width = 'full', shadow = 'true' }: any) => {
  // If Tailwind's JIT compiler misses these, the layout breaks
  // Ideally, we should use a proper class library like clsx or cva
  const alignClass = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto'
  }[align as string] || 'mx-auto';

  const widthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    full: 'w-full'
  }[width as string] || 'w-full';

  return (
    <div className={`my-8 ${alignClass} ${widthClass}`}>
      <div className={`relative rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0c] ${shadow === 'true' ? 'shadow-2xl shadow-black/50' : ''}`}>
        <img src={src} alt={alt || 'image'} className="w-full h-auto object-cover" loading="lazy" />
        <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
           <button 
             onClick={() => window.open(src, '_blank')} 
             className="p-1.5 bg-black/60 backdrop-blur rounded text-white hover:bg-black/80 transition-colors"
             title="Open original"
           >
             <Maximize2 size={14}/>
           </button>
        </div>
      </div>
      {caption && (
        <div className="mt-2 text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
           <ImageIcon size={12} /> {caption}
        </div>
      )}
    </div>
  );
};

const TabsBlock = ({ children }: { children: ReactNode[] }) => {
    // HACK: We are inspecting React.Children props directly
    // If the child is wrapped in another component (like a HOC), this breaks
    const tabs = React.Children.toArray(children).filter(child => React.isValidElement(child)) as React.ReactElement[];
    if (tabs.length === 0) return null;

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="my-6 border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden">
            <div className="flex border-b border-white/5 bg-white/[0.02] overflow-x-auto scrollbar-hide">
                {tabs.map((tab, idx) => (
                    <button
                        // TODO: Using index as key is generally bad, but since these tabs 
                        // are static and come from XML, it's *probably* fine. Probably... :D
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                            activeTab === idx 
                            ? 'border-orange-500 text-orange-400 bg-orange-500/5' 
                            : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
                        }`}
                    >
                        {/* Accessing .props.title directly. React team would frown at this */}
                        {tab.props.title || `Tab ${idx + 1}`}
                    </button>
                ))}
            </div>
            <div className="p-4 bg-[#0c0c0e]">
                {tabs[activeTab]}
            </div>
        </div>
    );
};

const CodeBlock = ({ lang, title, children }: any) => {
    // HACK: Handling children that might be ReactNodes or strings
    // We need raw text for the clipboard. If children is a complex tree 
    // .props.children might be undefined or an object, crashing the copy function
    const textContent = typeof children === 'string' ? children : children?.props?.children || '';
    
    return (
        <div className="my-6 rounded-lg border border-white/10 bg-[#050505] overflow-hidden group">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.03]">
                <div className="flex items-center gap-2">
                    <Code2 size={14} className="text-gray-500"/>
                    <span className="text-xs font-bold text-gray-400 uppercase">{lang || 'text'}</span>
                    {title && <span className="text-xs text-gray-600 border-l border-white/10 pl-2 ml-2">{title}</span>}
                </div>
                <CopyButton text={textContent} />
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
                {children}
            </pre>
        </div>
    );
};

const VideoBlock = ({ src, type = 'youtube', title }: any) => {
    return (
        <div className="my-8 rounded-xl overflow-hidden border border-white/10 bg-black aspect-video relative group">
            {type === 'youtube' ? (
                <iframe 
                    src={src} 
                    title={title || "Video player"} 
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                />
            ) : (
                <video controls className="w-full h-full" src={src} />
            )}
        </div>
    );
};

const CommandBlock = ({ name, desc, children, tag }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`group mb-4 border border-white/5 rounded-xl transition-all duration-300 ${isOpen ? 'bg-white/[0.02] border-white/10' : 'hover:border-white/10'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <code className="text-orange-400 font-mono font-bold text-sm bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
            {name}
          </code>
          {tag && <span className="text-[10px] font-bold text-gray-500 uppercase border border-white/10 px-1.5 py-0.5 rounded tracking-wider">{tag}</span>}
          <span className="text-gray-300 font-medium text-sm">{desc}</span>
        </div>
        <ChevronDown className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-400' : ''}`} size={16} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 space-y-3 text-gray-400 border-t border-white/5 mt-2">
                <div className="pt-2">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

//
//
//  THE ENGINE CORE
//  This is where the mess happens
//  We recursively traverse the XML DOM and turn it into React
//
//  Why not use a library? Because we like pain
//  Also because it gives us 100% control over the component mapping
//
//
//
//
const renderNode = (node: Node, key: number): ReactNode => {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    // HACK: XML parsers treat newlines/indentation as text nodes
    // If we don't trim this, our layout gets filled with random empty spans
    if (!text?.trim() && text?.includes('\n')) return null;
    return <span key={key}>{text}</span>;
  }

  // If for some reason we get a Comment node or something weird, bail out
  if (node.nodeType !== Node.ELEMENT_NODE) return null;
  
  const el = node as Element;
  const tagName = el.tagName.toLowerCase();

  const attrs: Record<string, string> = {};
  if (el.attributes) {
    Array.from(el.attributes).forEach(attr => attrs[attr.name] = attr.value);
  }

  // This can technically cause a stack overflow if you nest 
  // 10,000 tags. Don't do that
  const getChildren = () => Array.from(el.childNodes).map((c, i) => renderNode(c, i)).filter(Boolean);
  const getRawText = () => el.textContent || '';

  // TODO: This switch statement is growing uncontrollably
  // I should probably move this to a configuration object or a Map map into map X2
  // But for now... behold the wall of code
  switch (tagName) {
    // --- STRUCTURE ---
    case 'section':
      return <section key={key} id={attrs.id} className="scroll-mt-32 mb-20">{getChildren()}</section>;
    case 'grid':
      return <div key={key} className={`grid grid-cols-1 md:grid-cols-${attrs.cols || 2} gap-6 my-6`}>{getChildren()}</div>;
    case 'col':
      return <div key={key} className="flex flex-col gap-4">{getChildren()}</div>;
    case 'separator':
      return <hr key={key} className="border-white/5 my-12" />;
    
    // --- TYPOGRAPHY ---
    case 'h1':
      return <h1 key={key} className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent inline-block">{getChildren()}</h1>;
    case 'h2':
      return (
        <h2 key={key} className="text-2xl font-bold text-white mb-6 mt-10 flex items-center gap-3 group border-b border-white/5 pb-4">
          {attrs.icon && <span className="text-orange-500 opacity-80"><DynamicIcon name={attrs.icon} /></span>}
          {getChildren()}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 text-lg select-none">#</span>
        </h2>
      );
    case 'h3':
        return <h3 key={key} className="text-xl font-bold text-gray-200 mb-3 mt-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-orange-500 rounded-full" />
            {getChildren()}
        </h3>;
    case 'p':
      return <p key={key} className="text-gray-400 text-[16px] leading-7 mb-4 font-normal">{getChildren()}</p>;
    case 'quote':
        return (
            <blockquote key={key} className="border-l-2 border-orange-500 pl-4 py-1 my-6 italic text-gray-400 bg-white/[0.02] pr-4 rounded-r-lg">
                "{getChildren()}"
                {attrs.author && <footer className="text-xs text-gray-500 mt-2 not-italic font-bold">— {attrs.author}</footer>}
            </blockquote>
        );

    // --- MEDIA ---
    case 'img':
        return <ImageBlock key={key} {...attrs} />;
    case 'video':
        return <VideoBlock key={key} {...attrs} />;

    // --- LISTS (The Logic Here is A Bit... Sketchy) ---
    case 'list':
        const isOrdered = attrs.type === 'ordered' || attrs.type === '1';
        const isCheck = attrs.type === 'check';
        const ListTag = isOrdered ? 'ol' : 'ul';
        const listClass = isCheck ? 'space-y-2' : isOrdered ? 'list-decimal list-outside ml-5 space-y-2 text-gray-400' : 'list-disc list-outside ml-5 space-y-2 text-gray-400';
        
        if (isCheck) {
            // HACK: Custom parsing for checklists because standard <li> doesn't support checked state easily
            // We iterate over children manually
            return (
                <div key={key} className="space-y-2 my-4">
                    {Array.from(el.childNodes).map((child, idx) => {
                       if(child.nodeName.toLowerCase() !== 'li') return null;
                       const checked = (child as Element).getAttribute('checked') === 'true';
                       return (
                           <div key={idx} className="flex gap-3 items-start text-gray-400">
                               <div className={`mt-1 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${checked ? 'bg-orange-500 border-orange-500 text-black' : 'border-white/20 bg-white/5'}`}>
                                   {checked && <Check size={10} strokeWidth={4} />}
                               </div>
                               <span className={checked ? 'text-gray-500 line-through' : ''}>{child.textContent}</span>
                           </div>
                       )
                    })}
                </div>
            )
        }
        return <ListTag key={key} className={`${listClass} my-4`}>{getChildren()}</ListTag>;
    case 'li':
        return <li key={key}>{getChildren()}</li>;

    // --- TABLES ---
    case 'table':
        return (
            <div key={key} className="my-6 overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-left text-sm text-gray-400">
                    {getChildren()}
                </table>
            </div>
        );
    case 'thead':
        return <thead key={key} className="bg-white/5 text-gray-200 uppercase font-bold">{getChildren()}</thead>;
    case 'tbody':
        return <tbody key={key} className="divide-y divide-white/5">{getChildren()}</tbody>;
    case 'tr':
        return <tr key={key} className="hover:bg-white/[0.02] transition-colors">{getChildren()}</tr>;
    case 'th':
        return <th key={key} className="px-4 py-3 font-medium whitespace-nowrap">{getChildren()}</th>;
    case 'td':
        return <td key={key} className="px-4 py-3 align-top">{getChildren()}</td>;

    // --- TECH BLOCKS ---
    case 'codeblock':
        // Note: passing raw text is crucial here
        return <CodeBlock key={key} {...attrs}>{getRawText()}</CodeBlock>;
    case 'cmd':
      return <CommandBlock key={key} {...attrs}>{getChildren()}</CommandBlock>;
    case 'usage':
      return (
        <div key={key} className="bg-black/40 rounded-lg p-3 border border-white/5 my-3 font-mono text-sm text-gray-300 flex items-start gap-3 overflow-x-auto group">
            <Terminal size={16} className="text-gray-600 mt-0.5 shrink-0" />
            <span className="whitespace-pre-wrap flex-1">{getChildren()}</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={getRawText()} />
            </div>
        </div>
      );
    case 'api':
       const methods: any = { GET: 'text-blue-400 bg-blue-500/10', POST: 'text-green-400 bg-green-500/10', DELETE: 'text-red-400 bg-red-500/10', PUT: 'text-yellow-400 bg-yellow-500/10' };
       return (
        <div key={key} className="my-6 rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="flex items-center gap-3 p-3 border-b border-white/5 bg-black/20">
                <span className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded ${methods[attrs.method] || methods.GET}`}>{attrs.method}</span>
                <code className="text-gray-300 font-mono text-sm">{attrs.url}</code>
            </div>
            <div className="p-4 text-sm text-gray-400">{getChildren()}</div>
        </div>
       );

    // --- INTERACTIVE ---
    case 'tabs':
        return <TabsBlock key={key}>{getChildren()}</TabsBlock>;
    case 'tab':
        // Pseudo-element used by TabsBlock. It renders a div but the real data is pulled from attrs
        return <div key={key} title={attrs.title} className="animate-in fade-in slide-in-from-top-2 duration-300">{getChildren()}</div>;
    
    case 'details':
        // God, native HTML <details> is awesome. No JS needed for the toggle!
        return (
            <details key={key} className="my-4 group border border-white/5 rounded-lg bg-white/[0.01] open:bg-white/[0.03]">
                <summary className="flex items-center justify-between p-3 cursor-pointer list-none font-medium text-gray-300 hover:text-white">
                    <span className="flex items-center gap-2"><Info size={16} className="text-orange-500"/> {attrs.summary}</span>
                    <ChevronDown size={16} className="group-open:rotate-180 transition-transform text-gray-500" />
                </summary>
                <div className="px-4 pb-4 pt-0 text-sm text-gray-400 border-t border-white/5 pt-3">
                    {getChildren()}
                </div>
            </details>
        );

    // --- UI ELEMENTS ---
    case 'alert':
        const themes: any = {
            info: { icon: Info, color: 'text-blue-400', border: 'border-blue-500/20 bg-blue-500/5' },
            warn: { icon: AlertTriangle, color: 'text-orange-400', border: 'border-orange-500/20 bg-orange-500/5' },
            danger: { icon: AlertCircle, color: 'text-red-400', border: 'border-red-500/20 bg-red-500/5' },
            success: { icon: CheckCircle2, color: 'text-green-400', border: 'border-green-500/20 bg-green-500/5' }
        };
        const t = themes[attrs.type] || themes.info;
        const Icon = t.icon;
        return (
            <div key={key} className={`my-6 p-4 rounded-lg border flex gap-3 ${t.border}`}>
                <Icon size={20} className={`shrink-0 mt-0.5 ${t.color}`} />
                <div className="text-gray-300 text-sm leading-relaxed w-full">{getChildren()}</div>
            </div>
        );
    case 'card':
        return (
            <a key={key} href={attrs.href} target="_blank" rel="noreferrer" className="block p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-500/30 transition-all group no-underline my-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-200 group-hover:text-orange-400 transition-colors">{attrs.title}</span>
                    <ExternalLink size={14} className="text-gray-600 group-hover:text-orange-500" />
                </div>
                <div className="text-sm text-gray-500">{getChildren()}</div>
            </a>
        );
    case 'step':
        return (
            <div key={key} className="flex gap-4 mb-8 relative">
                <div className="absolute left-[15px] top-10 bottom-[-20px] w-0.5 bg-white/5 last:hidden" />
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0f0f12] border border-orange-500/30 text-orange-400 flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(249,115,22,0.15)] z-10">
                    {attrs.num}
                </div>
                <div className="pt-1 w-full">
                    <h4 className="font-bold text-gray-200 mb-1 text-base">{attrs.title}</h4>
                    <div className="text-gray-400 text-sm leading-relaxed">{getChildren()}</div>
                </div>
            </div>
        );
    
    // --- INLINE STUFF ---
    case 'b': return <strong key={key} className="font-bold text-gray-200">{getChildren()}</strong>;
    case 'i': return <em key={key} className="italic text-gray-400">{getChildren()}</em>;
    case 'u': return <u key={key} className="decoration-orange-500/50 underline-offset-4">{getChildren()}</u>;
    case 'kbd': return <kbd key={key} className="bg-white/10 border border-white/20 rounded px-1.5 py-0.5 text-[10px] font-mono text-gray-200 mx-1 shadow-sm font-bold align-middle">{getChildren()}</kbd>;
    case 'code': return <code key={key} className="bg-[#1a1a1e] border border-white/10 rounded px-1.5 py-0.5 text-sm font-mono text-orange-300 mx-1">{getChildren()}</code>;
    case 'link': 
        return <a key={key} href={attrs.href} className="text-orange-400 hover:text-orange-300 hover:underline decoration-orange-500/30 underline-offset-2 transition-colors inline-flex items-center gap-0.5">{getChildren()}<LinkIcon size={10} className="opacity-50"/></a>;
    case 'badge': 
        const bColors: any = { red: 'text-red-400 bg-red-500/10', green: 'text-green-400 bg-green-500/10', orange: 'text-orange-400 bg-orange-500/10', blue: 'text-blue-400 bg-blue-500/10' };
        return <span key={key} className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-white/5 ml-2 align-middle ${bColors[attrs.color] || bColors.orange}`}>{getChildren()}</span>;
    case 'tooltip':
        return (
            <span key={key} className="relative group border-b border-dotted border-gray-500 cursor-help">
                {getChildren()}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black border border-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {attrs.text}
                </span>
            </span>
        );
    case 'param':
      return (
        <div key={key} className="flex items-start gap-3 text-sm py-2 ml-1 border-b border-white/[0.03] last:border-0">
           <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500/50 shrink-0 shadow-[0_0_5px_rgba(249,115,22,0.5)]" />
           <div>
               <div className="flex items-baseline gap-2">
                    <span className="text-gray-200 font-bold font-mono">{attrs.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 border border-white/10 px-1 rounded bg-white/5">{attrs.type}</span>
                    {attrs.req === 'true' && <span className="text-[10px] text-red-400">required</span>}
               </div>
               <span className="text-gray-400 text-sm mt-0.5 block">{getChildren()}</span>
           </div>
        </div>
      );

    default:
      // Fallback: If we don't know the tag, just render its children
      // Better to show unstyled text than to crash
      return <span key={key}>{getChildren()}</span>;
  }
};

const DynamicIcon = ({ name }: { name: string }) => {
    // TODO: Dynamic imports would be nicer, but this is fast and dumb
    const map: any = { globe: Globe, server: Server, credit: CreditCard, layout: Layout, hash: Hash, zap: Zap, list: List, mouse: MousePointerClick };
    const I = map[name] || Hash;
    return <I size={24} />;
}

//
//
//
//
//  ROOT WRAPPER
//  DOMParser is extremely sensitive. If you feed it XML with multiple
//  root nodes (e.g. <h1/><p/>), it throws an error or drops data
//  So we wrap the user's input in a fake <root> tag
//
//
//
export const DocRenderer = ({ source }: { source: string }) => {
  const content = React.useMemo(() => {
    try {
        const parser = new DOMParser();
        const xmlString = `<root>${source}</root>`; 
        const doc = parser.parseFromString(xmlString, 'text/xml');
        
        const errorNode = doc.querySelector('parsererror');
        if (errorNode) {
            console.error('XML Error:', errorNode.textContent);
            return (
                <div className="p-4 border border-red-500/50 bg-red-900/20 text-red-200 rounded-lg flex items-center gap-3">
                    <AlertTriangle />
                    <div>
                        <h4 className="font-bold">XML Syntax Error</h4>
                        <p className="text-sm opacity-70">Check closing tags and quotes in `docsContent.ts`. Also, escape your ampersands (&amp;).</p>
                    </div>
                </div>
            );
        }

        const root = doc.querySelector('root');
        if (!root) return null;

        return Array.from(root.childNodes).map((node, i) => renderNode(node, i));
    } catch (e) {
        console.error(e);
        return <div className="text-red-500">Critical Render Error</div>;
    }
  }, [source]);

  return <>{content}</>;
};

export const extractNavigation = (source: string) => {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<root>${source}</root>`, 'text/xml');
        const sections = Array.from(doc.querySelectorAll('section'));
        return sections.map(sec => ({
            id: sec.getAttribute('id') || '',
            title: sec.getAttribute('title') || 'Untitled',
            icon: sec.getAttribute('icon') || 'hash'
        }));
    } catch (e) {
        return [];
    }
};