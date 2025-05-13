import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 수정: useParams, useNavigate import
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { login } from '../../api/auth';
import { createPost, getPost, updatePost } from '../../api/posts'; // 수정: getPost, updatePost 추가

interface WriterProps {
  channelId?: string;
}

export default function Writer2({
  channelId = '681d9fee7ffa911fa118e4b5',
}: WriterProps) {
  const { postId } = useParams<{ postId?: string }>(); // 추가: 수정할 때 사용할 postId
  const navigate = useNavigate(); // 추가: 작성/수정 후 이동

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [editor, setEditor] = useState('');
  const [imageFile, setImageFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  // --- 수정 모드: 기존 데이터 불러오기 ---
  useEffect(() => {
    if (!postId) return; // 새 글 작성 모드일 때는 패스

    (async () => {
      try {
        const data = await getPost(postId);
        setTitle(data.title);
        setEditor(data.body);
        setTags((data.tags ?? []).join(',')); // 태그는 콤마로 join
        if (data.image) {
          setPreviewUrl(data.image); // 기존 이미지가 있으면 미리보기로
        }
      } catch (err) {
        console.error('포스트 불러오기 실패', err);
      }
    })();
  }, [postId]);

  // imageFile 변경될 때마다 미리보기 URL 생성/해제 (기존 코드)
  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(undefined);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [imageFile]);

  const tagList = useMemo(
    () =>
      tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
    [tags],
  );

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
          .insertEmbed(range?.index || 0, 'image', reader.result);
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

  // --- 제출 핸들러: 생성 vs 수정 분기 ---
  const handleSubmit = useCallback(async () => {
    if (!title.trim() || !editor.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      await login('lhw971103@gmail.com', 'fnskq787!');

      if (postId) {
        // 수정 모드
        await updatePost(postId, title, editor, channelId, tagList, imageFile);
        alert('포스트가 성공적으로 수정되었습니다!');
        navigate(`/post/${postId}`); // 수정 후 해당 포스트로 이동
      } else {
        // 생성 모드
        await createPost(title, editor, channelId, tagList, imageFile);
        alert('포스트가 성공적으로 생성되었습니다!');
        setTitle('');
        setTags('');
        setEditor('');
        setImageFile(undefined);
      }
    } catch (err: any) {
      console.error(err);
      alert('오류 발생: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [title, editor, channelId, tagList, imageFile, postId, navigate]);

  return (
    <div className="nanum-gothic-regular flex min-h-[700px] w-[1200px] gap-4 px-30 py-5">
      <div className="flex flex-1 flex-col gap-4 rounded-[5px] border border-[#ABABAB] p-4">
        {/* 제목 */}
        <h2 className="mb-4 text-2xl">
          {postId ? '게시글 수정' : '새 게시글 작성'} {/* 추가: 제목 분기 */}
        </h2>
        <input
          type="text"
          placeholder="제목을 작성해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-18 w-full rounded px-2 py-1 text-[32px] placeholder:text-[32px]"
        />

        {/* 태그 입력 */}
        <input
          type="text"
          placeholder="태그를 입력해주세요 (콤마로 구분)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded px-2 py-1 text-[16px] placeholder:text-[16px]"
        />
        <div className="flex flex-wrap gap-2">
          {tagList.map((tag, idx) => (
            <span
              key={idx}
              className="rounded-[2px] bg-[#D7CAB9] px-2 py-0.5 text-sm text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        <hr className="mb-4 border-t border-[#ABABAB]" />

        {/* 커버 이미지 선택 및 미리보기 */}
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
              className="mt-2 max-h-[200px] max-w-[200px] rounded-[5px] object-cover"
            />
          )}
        </div>

        {/* 에디터 */}
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
                : '작성 완료'}{' '}
            {/* 버튼 텍스트 분기 */}
          </button>
        </div>
      </div>
    </div>
  );
}
