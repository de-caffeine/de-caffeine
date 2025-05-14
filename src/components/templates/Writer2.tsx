// src/components/templates/Writer2.tsx
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
// import { useAuth } from '../../contexts/AuthContext'; // 나중에 전역 로그인 관리용
import { createPost, getPost, updatePost } from '../../api/posts';

interface LocationState {
  title?: string;
  body?: string;
  tags?: string[];
  imageUrl?: string;
}

export default function Writer2() {
  const { postId } = useParams<{ postId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  // 1) 카테고리 목록 & 맵 정의
  const categories = [
    '일상공유',
    '개발일지',
    '취업정보',
    '팀원모집',
    '코드질문',
  ] as const;
  type Category = (typeof categories)[number];

  const channelMap: Record<Category, string> = {
    일상공유: '681d9fee7ffa911fa118e4b5',
    개발일지: '681da0077ffa911fa118e4ba',
    취업정보: '681da0247ffa911fa118e4be',
    팀원모집: '681da0307ffa911fa118e4c2',
    코드질문: '681da0447ffa911fa118e4ca',
  };

  // 2) 선택된 카테고리 상태
  const [category, setCategory] = useState<Category>('일상공유');

  // 입력 필드의 초기값
  const [title, setTitle] = useState(state?.title ?? '');
  const [editor, setEditor] = useState(state?.body ?? '');
  const [tags, setTags] = useState(state?.tags?.join(',') ?? '');

  // 커버용 상태 분리
  const [coverFile, setCoverFile] = useState<File>();
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | undefined>(
    state?.imageUrl,
  );

  const [loading, setLoading] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  // state가 없고 postId만 있을 때 백엔드에서 불러오기
  useEffect(() => {
    if (postId && !state) {
      getPost(postId)
        .then((data) => {
          setTitle(data.title);
          setEditor(data.body);
          setTags((data.tags ?? []).join(','));
          if (data.image) setCoverPreviewUrl(data.image);
        })
        .catch((err) => {
          console.error('포스트 불러오기 실패', err);
        });
    }
  }, [postId, state]);

  // 커버 파일 선택 시 미리보기 URL 생성
  useEffect(() => {
    if (!coverFile) return;
    const url = URL.createObjectURL(coverFile);
    setCoverPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  // Quill 커스텀 이미지 핸들러 (커버 상태 건드리지 않음)
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const range = quillRef.current?.getEditor().getSelection(true);
        quillRef.current
          ?.getEditor()
          .insertEmbed(range?.index ?? 0, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [imageHandler],
  );

  const formats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'blockquote',
      'code-block',
      'list',
      'link',
      'image',
    ],
    [],
  );

  // 3) 제출 핸들러: channelMap[category] 사용
  const handleSubmit = useCallback(async () => {
    if (!title.trim() || !editor.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const tagArray = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      // ▶ 여기서 선택된 카테고리의 채널ID를 꺼냅니다
      const selectedChannelId = channelMap[category];

      if (postId) {
        // 수정 모드
        await updatePost(
          postId,
          title,
          editor,
          selectedChannelId,
          tagArray,
          coverFile,
        );
        alert('포스트가 성공적으로 수정되었습니다!');
        navigate(`/post/${postId}`);
      } else {
        // 새 글 작성 모드
        await createPost(title, editor, selectedChannelId, tagArray, coverFile);
        alert('포스트가 성공적으로 생성되었습니다!');
        // 입력값 초기화
        setTitle('');
        setEditor('');
        setTags('');
        setCoverFile(undefined);
        setCoverPreviewUrl(undefined);
      }
    } catch (err: any) {
      console.error(err);
      alert('오류 발생: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [postId, title, editor, tags, coverFile, category, navigate]);

  return (
    <div>
      {/* 카테고리 버튼 그룹 (가로 중앙 정렬) */}
      <div className="flex w-full justify-center gap-5">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`rounded px-4 py-2 ${
              category === cat ? 'text-black opacity-100' : 'opacity-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="nanum-gothic-regular flex min-h-[700px] w-[1200px] gap-4 px-30 py-5">
        <div className="flex flex-1 flex-col gap-4 rounded-[5px] border border-[#ABABAB] p-4">
          <h2 className="mb-4 text-2xl">
            {postId ? '게시글 수정' : '새 게시글 작성'}
          </h2>

          {/* 제목 입력 */}
          <input
            type="text"
            placeholder="제목을 작성해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-18 w-full rounded px-2 py-1 text-[32px]"
          />

          {/* 태그 입력 */}
          <input
            type="text"
            placeholder="태그를 입력해주세요 (콤마로 구분)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded px-2 py-1 text-[16px]"
          />
          <div className="flex flex-wrap gap-2">
            {tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
              .map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-[2px] bg-[#D7CAB9] px-2 py-0.5 text-sm text-black"
                >
                  {tag}
                </span>
              ))}
          </div>

          <hr className="mb-4 border-t border-[#ABABAB]" />

          {/* 커버 이미지 업로드 */}
          <div>
            <label className="mb-1 block text-sm">커버 이미지 업로드</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files?.[0])}
              className="cursor-pointer"
            />
            {coverPreviewUrl && (
              <img
                src={coverPreviewUrl}
                alt="커버 이미지 미리보기"
                className="mt-2 max-h-[200px] max-w-[200px] rounded-[5px] object-cover"
              />
            )}
          </div>

          {/* 본문 에디터 */}
          <ReactQuill
            ref={quillRef}
            value={editor}
            onChange={setEditor}
            modules={modules}
            formats={formats}
            theme="snow"
            placeholder="내용을 입력해주세요"
            className="flex-1"
          />

          {/* 제출 버튼 */}
          <div className="mt-9 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`nanum-gothic-regular h-[40px] w-[100px] cursor-pointer rounded-[5px] text-white ${
                loading ? 'cursor-not-allowed bg-gray-400' : 'bg-[#6B4C36]'
              }`}
            >
              {postId
                ? loading
                  ? '수정 중…'
                  : '수정 완료'
                : loading
                  ? '작성 중…'
                  : '작성 완료'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
