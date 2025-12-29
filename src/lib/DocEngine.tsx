import React, { useState, ReactNode, useMemo, useCallback, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ChevronDown, Terminal, AlertCircle, Info, 
  CheckCircle2, AlertTriangle, Globe, Server, 
  CreditCard, Layout, Link as LinkIcon, Hash,
  Copy, Check, Image as ImageIcon, ExternalLink,
  Maximize2, Code2, List, MousePointerClick, Zap
} from 'lucide-react';

// Global cache to avoid redundant DOM parsing
const parsedCache = new Map<string, Document>();

const CopyButton = memo(({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button onClick={handleCopy} className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white">
      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
    </button>
  );
});

const ImageBlock = memo(({ src, alt, caption, align = 'center', width = 'full', shadow = 'true' }: any) => {
  const alignClass = align === 'left' ? 'mr-auto' : align === 'right' ? 'ml-auto' : 'mx-auto';
  const widthClass = width === 'sm' ? 'max-w-sm' : width === 'md' ? 'max-w-md' : width === 'lg' ? 'max-w-2xl' : 'w-full';

  return (
    <div className={`my-8 ${alignClass} ${widthClass}`}>
      <div className={`relative rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0c] ${shadow === 'true' ? 'shadow-2xl shadow-black/50' : ''}`}>
        <img src={src} alt={alt || 'image'} className="w-full h-auto object-cover" loading="lazy" />
        <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
           <button 
             onClick={() => window.open(src, '_blank')} 
             className="p-1.5 bg-black/60 backdrop-blur rounded text-white hover:bg-black/80 transition-colors"
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
});

const TabsBlock = memo(({ children }: { children: ReactNode[] }) => {
    const tabs = React.Children.toArray(children).filter(child => React.isValidElement(child)) as React.ReactElement[];
    if (tabs.length === 0) return null;

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="my-6 border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden">
            <div className="flex border-b border-white/5 bg-white/[0.02] overflow-x-auto scrollbar-hide">
                {tabs.map((tab, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                            activeTab === idx 
                            ? 'border-orange-500 text-orange-400 bg-orange-500/5' 
                            : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
                        }`}
                    >
                        {tab.props.title || `Tab ${idx + 1}`}
                    </button>
                ))}
            </div>
            <div className="p-4 bg-[#0c0c0e]">
                {tabs[activeTab]}
            </div>
        </div>
    );
});

const CodeBlock = memo(({ lang, title, children }: any) => {
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
});

const CommandBlock = memo(({ name, desc, children, tag }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`group mb-4 border border-white/5 rounded-xl transition-all duration-300 ${isOpen ? 'bg-white/[0.02] border-white/10' : 'hover:border-white/10'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <code className="text-orange-400 font-mono font-bold text-sm bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
            {name}
          </code>
          {tag && <span className="text-[10px] font-bold text-gray-500 uppercase border border-white/10 px-1.5 py-0.5 rounded">{tag}</span>}
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
            transition={{ duration: 0.2 }}
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
});

const DynamicIcon = memo(({ name }: { name: string }) => {
    const map: any = { globe: Globe, server: Server, credit: CreditCard, layout: Layout, hash: Hash, zap: Zap, list: List, mouse: MousePointerClick };
    const I = map[name] || Hash;
    return <I size={24} />;
});

const renderNode = (node: Node, key: number): ReactNode => {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    if (!text?.trim() && text?.includes('\n')) return null;
    return <React.Fragment key={key}>{text}</React.Fragment>;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return null;
  
  const el = node as Element;
  const tagName = el.tagName.toLowerCase();
  const attrs: Record<string, string> = {};
  
  if (el.attributes) {
    for (let i = 0; i < el.attributes.length; i++) {
      const attr = el.attributes[i];
      attrs[attr.name] = attr.value;
    }
  }

  const getChildren = () => Array.from(el.childNodes).map((c, i) => renderNode(c, i)).filter(Boolean);
  const getRawText = () => el.textContent || '';

  switch (tagName) {
    case 'section':
      return <section key={key} id={attrs.id} className="scroll-mt-32 mb-20">{getChildren()}</section>;
    case 'grid':
      return <div key={key} className={`grid grid-cols-1 md:grid-cols-${attrs.cols || 2} gap-6 my-6`}>{getChildren()}</div>;
    case 'col':
      return <div key={key} className="flex flex-col gap-4">{getChildren()}</div>;
    case 'separator':
      return <hr key={key} className="border-white/5 my-12" />;
    case 'h1':
      return <h1 key={key} className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent inline-block">{getChildren()}</h1>;
    case 'h2':
      return (
        <h2 key={key} className="text-2xl font-bold text-white mb-6 mt-10 flex items-center gap-3 group border-b border-white/5 pb-4">
          {attrs.icon && <span className="text-orange-500 opacity-80"><DynamicIcon name={attrs.icon} /></span>}
          {getChildren()}
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
    case 'img': return <ImageBlock key={key} {...attrs} />;
    case 'list':
        const isCheck = attrs.type === 'check';
        const ListTag = attrs.type === 'ordered' ? 'ol' : 'ul';
        if (isCheck) {
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
        return <ListTag key={key} className="list-inside ml-2 space-y-2 text-gray-400 my-4">{getChildren()}</ListTag>;
    case 'li': return <li key={key}>{getChildren()}</li>;
    case 'codeblock': return <CodeBlock key={key} {...attrs}>{getRawText()}</CodeBlock>;
    case 'cmd': return <CommandBlock key={key} {...attrs}>{getChildren()}</CommandBlock>;
    case 'usage':
      return (
        <div key={key} className="bg-black/40 rounded-lg p-3 border border-white/5 my-3 font-mono text-sm text-gray-300 flex items-start gap-3 group">
            <Terminal size={16} className="text-gray-600 mt-0.5 shrink-0" />
            <span className="whitespace-pre-wrap flex-1">{getChildren()}</span>
            <CopyButton text={getRawText()} />
        </div>
      );
    case 'tabs': return <TabsBlock key={key}>{getChildren()}</TabsBlock>;
    case 'tab': return <div key={key} title={attrs.title}>{getChildren()}</div>;
    case 'alert':
        const themes: any = {
            info: 'border-blue-500/20 bg-blue-500/5 text-blue-400',
            warn: 'border-orange-500/20 bg-orange-500/5 text-orange-400',
            danger: 'border-red-500/20 bg-red-900/10 text-red-400',
            success: 'border-green-500/20 bg-green-500/5 text-green-400'
        };
        return (
            <div key={key} className={`my-6 p-4 rounded-lg border flex gap-3 ${themes[attrs.type] || themes.info}`}>
                <Info size={20} className="shrink-0 mt-0.5" />
                <div className="text-gray-300 text-sm leading-relaxed">{getChildren()}</div>
            </div>
        );
    case 'card':
        return (
            <a key={key} href={attrs.href} target="_blank" rel="noreferrer" className="block p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-500/30 transition-all group no-underline my-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-200 group-hover:text-orange-400 transition-colors">{attrs.title}</span>
                    <ExternalLink size={14} className="text-gray-600" />
                </div>
                <div className="text-sm text-gray-500">{getChildren()}</div>
            </a>
        );
    case 'b': return <strong key={key} className="font-bold text-gray-200">{getChildren()}</strong>;
    case 'code': return <code key={key} className="bg-[#1a1a1e] border border-white/10 rounded px-1.5 py-0.5 text-sm font-mono text-orange-300">{getChildren()}</code>;
    case 'link': return <a key={key} href={attrs.href} className="text-orange-400 hover:underline">{getChildren()}</a>;
    default: return <React.Fragment key={key}>{getChildren()}</React.Fragment>;
  }
};

export const DocRenderer = memo(({ source }: { source: string }) => {
  const content = useMemo(() => {
    try {
        let doc = parsedCache.get(source);
        if (!doc) {
            const parser = new DOMParser();
            doc = parser.parseFromString(`<root>${source}</root>`, 'text/xml');
            parsedCache.set(source, doc);
        }
        
        const root = doc.querySelector('root');
        return root ? Array.from(root.childNodes).map((node, i) => renderNode(node, i)) : null;
    } catch (e) {
        return <div className="text-red-500">Render Error</div>;
    }
  }, [source]);

  return <>{content}</>;
});

export const extractNavigation = (source: string) => {
    try {
        let doc = parsedCache.get(source);
        if (!doc) {
            const parser = new DOMParser();
            doc = parser.parseFromString(`<root>${source}</root>`, 'text/xml');
            parsedCache.set(source, doc);
        }
        return Array.from(doc.querySelectorAll('section')).map(sec => ({
            id: sec.getAttribute('id') || '',
            title: sec.getAttribute('title') || 'Untitled',
            icon: sec.getAttribute('icon') || 'hash'
        }));
    } catch (e) { return []; }
};