// src/pages/Writer.tsx
import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import imageicon from '../../assets/images/free-icon-image-565801.png';

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

  // 헤딩 삽입
  const insertHeading = (level: number) => {
    const ref = textareaRef.current;
    if (!ref) return;
    const prefix = '#'.repeat(level) + ' ';
    const start = ref.selectionStart;
    const end = ref.selectionEnd;
    const value = body;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const before = value.slice(0, lineStart);
    const line = value.slice(lineStart, end);
    const after = value.slice(end);
    const strippedLine = line.replace(/^#{1,6}\s*/, '');
    const newLine = prefix + strippedLine;
    setBody(before + newLine + after);
    setTimeout(() => {
      ref.focus();
      ref.setSelectionRange(
        before.length + newLine.length,
        before.length + newLine.length,
      );
    }, 0);
  };

  // 코드 스니펫 삽입
  const insertCodeSnippet = () => {
    const ref = textareaRef.current;
    if (!ref) return;
    const start = ref.selectionStart;
    const end = ref.selectionEnd;
    const selected = body.slice(start, end);
    // 언어 태그 없이 백틱 페어만 삽입
    const snippet = `\`\`\`
${selected}
\`\`\`
`;
    setBody(body.slice(0, start) + snippet + body.slice(end));
    setTimeout(() => {
      const cursor = start + snippet.indexOf(selected);
      ref.focus();
      ref.setSelectionRange(cursor, cursor + selected.length);
    }, 0);
  };

  return (
    <div className="nanum-gothic-regular flex h-150 gap-4 px-30 py-5">
      <div className="flex flex-1 flex-col gap-4 rounded-[5px] border border-[#ABABAB] p-4">
        <input
          type="text"
          placeholder="제목을 작성해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-18 w-full rounded px-2 py-1 text-[32px] placeholder:text-[32px]"
        />
        <input
          type="text"
          placeholder="태그를 입력해주세요 (콤마로 구분)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded px-2 py-1 text-[16px] placeholder:text-[16px]"
        />
        <hr className="mb-4 border-t border-[#ABABAB]" />
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
            <button
              onClick={insertCodeSnippet}
              className="rounded border px-2 py-1 hover:bg-gray-100"
              title="코드 블록 삽입"
            >
              {'<>'}
            </button>
            <button className="rounded border px-2 py-1 hover:bg-gray-100">
              <img className="h-5 w-5" src={imageicon} alt="그림삽입 이미지" />
            </button>
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
      {/* 미리보기 페이지 */}
      <div className="flex-1 overflow-auto rounded-[5px] border border-[#ABABAB] p-4">
        <h1 className="mb-2 text-3xl font-bold">{title}</h1>
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
              code: (props: any) => {
                const { inline, className, children, ...rest } = props;
                // inline이 아니면 (펜스 코드블록이면) 무조건 tsx 하이라이팅
                if (!inline) {
                  return (
                    <SyntaxHighlighter
                      {...rest}
                      language="tsx"
                      style={materialLight}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  );
                }
                return (
                  <code className={className} {...rest}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
