import React, { useState } from 'react';
import { AETHER_FILE_CONTENTS, REPO_MARKDOWN_TREE } from '../data/aetherRepoData.ts';
import { Folder, FolderOpen, FileCode, Copy, Check, Download, Search, Terminal, ChevronRight, ChevronDown } from 'lucide-react';

export const RepoTreeView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('/device/humane/aipin/BoardConfig.mk');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedTree, setCopiedTree] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'files' | 'tree_markdown'>('files');

  const fileKeys = Object.keys(AETHER_FILE_CONTENTS);
  const filteredFiles = fileKeys.filter((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));

  const currentFile = AETHER_FILE_CONTENTS[selectedFile] || {
    language: 'plaintext',
    content: '// File not loaded',
    description: '',
  };

  const handleCopyFile = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTreeMarkdown = () => {
    navigator.clipboard.writeText(REPO_MARKDOWN_TREE);
    setCopiedTree(true);
    setTimeout(() => setCopiedTree(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              AetherOS Repository Explorer
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                AOSP 14 • Snapdragon
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Browse production-grade C++, AIDL, Makefiles, and Soong blueprints for the Humane AI Pin
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setViewMode('files')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'files' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Source Files ({fileKeys.length})
            </button>
            <button
              onClick={() => setViewMode('tree_markdown')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'tree_markdown' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Full GitHub Tree (.md)
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'files' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          {/* File Sidebar (4 cols) */}
          <div className="md:col-span-4 border-r border-slate-800 bg-slate-950/70 p-3 flex flex-col">
            {/* Search Box */}
            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search repository files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* File List */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1">
              {filteredFiles.map((path) => {
                const isSelected = selectedFile === path;
                const fileName = path.split('/').pop();
                const folder = path.substring(0, path.lastIndexOf('/'));

                return (
                  <button
                    key={path}
                    onClick={() => setSelectedFile(path)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-mono transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-200'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <FileCode
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        isSelected ? 'text-cyan-400' : 'text-slate-500'
                      }`}
                    />
                    <div className="truncate">
                      <div className="font-semibold text-slate-200 truncate">{fileName}</div>
                      <div className="text-[10px] text-slate-500 truncate">{folder}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code Viewer (8 cols) */}
          <div className="md:col-span-8 flex flex-col bg-slate-950">
            {/* File Header Bar */}
            <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-300 font-semibold">{selectedFile}</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {currentFile.language}
                </span>
              </div>
              <button
                onClick={handleCopyFile}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            {/* File Description Tagline */}
            {currentFile.description && (
              <div className="px-4 py-2 bg-slate-900/30 border-b border-slate-800/60 text-xs text-slate-400 font-sans">
                {currentFile.description}
              </div>
            )}

            {/* Code Preformatted Block */}
            <div className="flex-1 overflow-x-auto p-4 font-mono text-xs text-slate-200 bg-slate-950/90 leading-relaxed select-text">
              <pre className="overflow-x-auto">
                <code>{currentFile.content}</code>
              </pre>
            </div>
          </div>
        </div>
      ) : (
        /* Markdown Tree View */
        <div className="p-6 bg-slate-950 flex flex-col min-h-[580px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <span className="text-xs font-mono text-slate-400">
              Full GitHub Repository Directory Tree (Markdown formatted)
            </span>
            <button
              onClick={handleCopyTreeMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono transition shadow"
            >
              {copiedTree ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedTree ? 'Markdown Tree Copied!' : 'Copy Markdown Tree'}
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-xs leading-relaxed overflow-x-auto flex-1 select-text">
            {REPO_MARKDOWN_TREE}
          </pre>
        </div>
      )}
    </div>
  );
};
