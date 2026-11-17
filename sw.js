<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  <meta name="theme-color" content="#131314" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <title>chat-gpt: Ultima</title>
  <link rel="manifest" href="manifest.json" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <style>
    body {
      background-color: #131314;
      color: #e3e3e3;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      overscroll-behavior-y: none;
      -webkit-tap-highlight-color: transparent;
    }
    .prose pre {
      background-color: #1e1f20;
      border-radius: 0.75rem;
      padding: 0.85rem;
      overflow-x: auto;
      border: 1px solid #333537;
      margin: 0.5rem 0;
    }
    .prose code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.875rem;
    }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #333537; border-radius: 4px; }
  </style>
</head>
<body class="h-screen w-screen overflow-hidden flex flex-col select-none">

  <!-- Top App Bar -->
  <header class="h-14 px-3 bg-[#1e1f20] border-b border-[#333537] flex items-center justify-between shrink-0 z-20">
    <div class="flex items-center gap-2">
      <button id="menuBtn" class="p-2 rounded-lg hover:bg-[#2a2b2d] active:scale-95 transition">
        <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <div>
        <h1 class="font-bold text-base tracking-tight flex items-center gap-1.5">
          <span class="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">chat-gpt: Ultima</span>
          <span id="badgeModel" class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">ULTIMA-PRO</span>
        </h1>
      </div>
    </div>
    <div class="flex items-center gap-1.5">
      <button id="newChatBtn" class="p-2 rounded-lg bg-[#2a2b2d] text-gray-200 text-xs font-medium active:scale-95 transition">+ New</button>
      <button id="consoleBtn" class="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold active:scale-95 transition flex items-center gap-1">
        <span>&gt;_</span> Dev
      </button>
    </div>
  </header>

  <!-- Main Chat Area -->
  <main id="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4 select-text">
    <div id="welcomeScreen" class="h-full flex flex-col items-center justify-center text-center px-4">
      <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4">
        <svg class="w-9 h-9 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      </div>
      <h2 class="text-2xl font-bold mb-1">chat-gpt: Ultima</h2>
      <p class="text-sm text-gray-400 max-w-xs mb-6">Mobile Edition • Full Developer Console • Custom System Prompts & Live Parameter Tuning</p>
      <div class="grid grid-cols-1 gap-2 w-full max-w-sm text-left">
        <button onclick="quickPrompt('Explain quantum computing like I am 15')" class="p-3 rounded-xl bg-[#1e1f20] border border-[#333537] text-xs text-gray-300 active:bg-[#2a2b2d]">⚡ "Explain quantum computing like I am 15"</button>
        <button onclick="quickPrompt('Write a Python script to scrape top tech headlines')" class="p-3 rounded-xl bg-[#1e1f20] border border-[#333537] text-xs text-gray-300 active:bg-[#2a2b2d]">💻 "Write a Python script to scrape headlines"</button>
      </div>
    </div>
  </main>

  <!-- Input Bar -->
  <footer class="p-3 bg-[#131314] border-t border-[#333537] shrink-0">
    <div class="flex items-end gap-2 bg-[#1e1f20] border border-[#333537] rounded-2xl p-2 focus-within:border-emerald-500/60 transition">
      <textarea id="promptInput" rows="1" placeholder="Message Ultima..." class="flex-1 bg-transparent text-sm text-white placeholder-gray-500 resize-none focus:outline-none max-h-32 py-1.5 px-2"></textarea>
      <button id="sendBtn" class="p-2.5 rounded-xl bg-emerald-500 text-black font-bold active:scale-90 transition shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  </footer>

  <!-- Slide-out History Drawer -->
  <div id="historyDrawer" class="fixed inset-0 bg-black/70 z-40 hidden">
    <div class="w-72 h-full bg-[#1e1f20] border-r border-[#333537] p-4 flex flex-col">
      <div class="flex items-center justify-between mb-4">
        <span class="font-bold text-sm text-gray-200">Chat History</span>
        <button id="closeHistoryBtn" class="p-1 text-gray-400">✕</button>
      </div>
      <div id="historyList" class="flex-1 overflow-y-auto space-y-2 text-xs"></div>
      <button id="clearAllBtn" class="mt-3 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 text-xs">Clear All Chats</button>
    </div>
  </div>

  <!-- Developer Console Modal -->
  <div id="consoleModal" class="fixed inset-0 bg-black/80 z-50 hidden flex items-end sm:items-center justify-center">
    <div class="w-full max-w-lg h-[88vh] bg-[#161718] border-t sm:border border-[#333537] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden">
      <div class="px-4 py-3 bg-[#1e1f20] border-b border-[#333537] flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-amber-400 font-mono font-bold text-sm">&gt;_ ULTIMA DEV CONSOLE</span>
        </div>
        <button id="closeConsoleBtn" class="px-2.5 py-1 rounded bg-[#2a2b2d] text-xs text-gray-300">Done</button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-