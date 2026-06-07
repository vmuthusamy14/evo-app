import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, X, Link2 } from "lucide-react";

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

export default function PinterestBoardLink({ boards = [], onChange }) {
  const [inputUrl, setInputUrl] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (!inputUrl.trim()) return;
    const url = inputUrl.trim().startsWith("http") ? inputUrl.trim() : `https://${inputUrl.trim()}`;
    const label = inputLabel.trim() || "Pinterest Board";
    const newBoard = { id: Date.now().toString(), label, url };
    onChange([...boards, newBoard]);
    setInputUrl("");
    setInputLabel("");
    setAdding(false);
  };

  const handleRemove = (id) => onChange(boards.filter((b) => b.id !== id));

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white flex-shrink-0">
          <PinterestIcon />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">Pinterest Boards</p>
          <p className="text-[11px] text-primary/60">Link boards to pull in inspiration</p>
        </div>
      </div>

      {boards.length > 0 && (
        <div className="space-y-2">
          {boards.map((board) => (
            <div key={board.id} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-primary/15 group">
              <div className="text-primary flex-shrink-0"><PinterestIcon /></div>
              <a
                href={board.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-sm font-medium text-primary hover:underline truncate flex items-center gap-1"
              >
                {board.label}
                <ExternalLink className="w-3 h-3 opacity-50 flex-shrink-0" />
              </a>
              <button
                onClick={() => handleRemove(board.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-primary/50 hover:text-primary"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {adding ? (
        <div className="space-y-2">
          <Input
            placeholder="Board name (optional)"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
            className="bg-white border-primary/20 text-sm"
          />
          <Input
            placeholder="pinterest.com/username/board-name"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="bg-white border-primary/20 text-sm"
            autoFocus
          />
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setAdding(false)} className="text-xs">Cancel</Button>
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={!inputUrl.trim()}
              className="bg-primary hover:bg-primary/90 text-white text-xs rounded-xl gap-1.5"
            >
              <Link2 className="w-3 h-3" /> Link Board
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="w-full text-xs text-primary/70 hover:text-primary border border-dashed border-primary/30 rounded-xl py-2 transition-colors hover:bg-white"
        >
          + Link a Pinterest board
        </button>
      )}
    </div>
  );
}
