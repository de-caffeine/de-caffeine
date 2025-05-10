// src/pages/Writer.tsx
import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Writer() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState(''); // 콤마(,)로 구분
  const [body, setBody] = useState(''); // 본문 원문 텍스트
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 태그 문자열 → 배열로
  const tagList = tags
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const insertHeading = (level: number) => {
    const ref = textareaRef.current;
    if (!ref) return;

    const prefix = '#'.repeat(level) + ' ';
    const start = ref.selectionStart;
    const end = ref.selectionEnd;
    const value = body;

    // 현재 라인 시작 위치 찾기
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;

    const before = value.slice(0, lineStart);
    const line = value.slice(lineStart, end);
    const after = value.slice(end);

    // 기존 # 제거 후 새로 붙이기
    const strippedLine = line.replace(/^#{1,6}\s*/, '');
    const newLine = prefix + strippedLine;

    const newBody = before + newLine + after;
    setBody(newBody);

    // 커서를 heading 뒤로 배치
    const newPos = before.length + newLine.length;
    setTimeout(() => {
      ref.focus();
      ref.setSelectionRange(newPos, newPos);
    }, 0);
  };

  return (
    <div className="nanum-gothic-regular flex h-150 gap-4 px-30 py-5">
      {/* 좌측: 입력 영역 */}
      <div className="flex flex-1 flex-col gap-4 rounded-[5px] border border-[#ABABAB] p-4">
        {/* 제목 */}
        <input
          type="text"
          placeholder="제목을 작성해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-18 w-full rounded px-2 py-1 text-[32px] placeholder:text-[32px]"
        />

        {/* 태그 */}
        <input
          type="text"
          placeholder="태그를 입력해주세요 (콤마로 구분)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded px-2 py-1 text-[16px] placeholder:text-[16px]"
        />

        <hr className="mb-4 border-t border-[#ABABAB]" />

        {/* 본문 */}
        <div className="flex flex-1 flex-col">
          <div className="mb-2 flex gap-2">
            {[1, 2, 3, 4].map((lvl) => (
              <button
                key={lvl}
                onClick={() => insertHeading(lvl)}
                className="rounded border px-2 py-1 hover:bg-gray-100"
              >
                H{lvl}
              </button>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            className="w-full flex-1 resize-none rounded p-2 font-mono placeholder:text-[16px]"
            placeholder="내용을 입력해주세요"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="mt-2 flex justify-end">
          <button className="nanum-gothic-regular h-[40px] w-[100px] rounded-[5px] bg-[#6B4C36] text-white hover:cursor-pointer">
            작성 완료
          </button>
        </div>
      </div>

      {/* 우측: 미리보기 영역 */}
      <div className="flex-1 overflow-auto rounded-[5px] border border-[#ABABAB] p-4">
        {/* 제목 */}
        <h1 className="mb-2 text-3xl font-bold">{title}</h1>

        {/* 태그 */}
        {tagList.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tagList.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded bg-[#D7CAB9] px-2 py-1 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 본문 (Markdown 렌더링) */}
        <div className="text-base whitespace-pre-wrap">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="mb-2 text-3xl font-bold" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="mb-2 text-2xl font-semibold" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="mb-2 text-xl font-semibold" {...props} />
              ),
              h4: ({ node, ...props }) => (
                <h4 className="mb-2 text-lg font-semibold" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-2 whitespace-pre-wrap" {...props} />
              ),
            }}
          >
            {body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
