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
import { login } from '../../api/auth';
import { createPost, getPost, updatePost } from '../../api/posts';

interface LocationState {
  title?: string;
  body?: string;
  tags?: string[];
  imageUrl?: string;
}

interface Writer2Props {
  channelId?: string;
}

export default function Writer2({
  channelId = '681da0077ffa911fa118e4ba', // default 테스트 채널 ID
}: Writer2Props) {
  const { postId } = useParams<{ postId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  // 입력 필드의 초기값
  const [title, setTitle] = useState(state?.title ?? '');
  const [editor, setEditor] = useState(state?.body ?? '');
  const [tags, setTags] = useState(state?.tags?.join(',') ?? '');
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    state?.imageUrl,
  );
  const [imageFile, setImageFile] = useState<File>();
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
          if (data.image) setPreviewUrl(data.image);
        })
        .catch((err) => {
          console.error('포스트 불러오기 실패', err);
        });
    }
  }, [postId, state]);

  // 이미지 파일 선택 시 미리보기 URL 생성
  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  // Quill 커스텀 이미지 핸들러
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      setImageFile(file);
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

  const handleSubmit = useCallback(async () => {
    if (!title.trim() || !editor.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      // 임시 테스트용 로그인
      await login('lhw971103@gmail.com', 'fnskq787!');

      if (postId) {
        // 수정 모드
        await updatePost(
          postId,
          title,
          editor,
          channelId,
          tags.split(',').map((t) => t.trim()),
          imageFile,
        );
        alert('포스트가 성공적으로 수정되었습니다!');
        navigate(`/post/${postId}`);
      } else {
        // 새 글 작성 모드
        await createPost(
          title,
          editor,
          channelId,
          tags.split(',').map((t) => t.trim()),
          imageFile,
        );
        alert('포스트가 성공적으로 생성되었습니다!');
        // 입력값 초기화
        setTitle('');
        setEditor('');
        setTags('');
        setImageFile(undefined);
        setPreviewUrl(undefined);
      }
    } catch (err: any) {
      console.error(err);
      alert('오류 발생: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [postId, title, editor, tags, imageFile, channelId, navigate]);

  return (
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
            onChange={(e) => setImageFile(e.target.files?.[0])}
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="커버 이미지 미리보기"
              className="mt-2 max-h-[200px] max-w-[200px] rounded-[5px]"
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
            className={`nanum-gothic-regular h-[40px] w-[100px] rounded-[5px] text-white ${
              loading ? 'cursor-not-allowed bg-gray-400' : 'bg-[#6B4C36]'
            }`}
          >
            {loading
              ? postId
                ? '수정 중…'
                : '작성 중…'
              : postId
                ? '수정 완료'
                : '작성 완료'}
          </button>
        </div>
      </div>
    </div>
  );
}
