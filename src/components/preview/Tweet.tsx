"use client";

interface TweetProps {
  content: string;
}

export function Tweet({ content }: TweetProps) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      <div className="whitespace-pre-wrap text-sm leading-relaxed">
        {content}
      </div>
    </div>
  );
}
