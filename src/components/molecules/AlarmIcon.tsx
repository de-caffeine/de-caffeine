import { useEffect, useRef, useState } from 'react';
import {
  getNotifications,
  markNotificationsSeen,
} from '../../api/notifications';
import AlarmListItem from '../atoms/AlarmListItem';
import Icon from '../atoms/Icon';

export default function AlarmIcon() {
  const [ismodalOpen, setIsmodalOpen] = useState(false);
  const [alarms, setAlarms] = useState<Notification[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const fetchAlarms = async () => {
    const res = await getNotifications();
    setAlarms(res ?? []);
  };

  useEffect(() => {
    if (ismodalOpen) fetchAlarms();
  }, [ismodalOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node))
        setIsmodalOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayAlarms = alarms.filter((alarm) => !alarm.seen);
  const deleteAlarms = async () => {
    await markNotificationsSeen();
    fetchAlarms();
  };

  return (
    <div className="relative inline-block" ref={modalRef}>
      <div className="mt-[5px] dark:contrast-60 dark:invert">
        <Icon
          size={40}
          name="alarmIcon"
          onClick={() => setIsmodalOpen(!ismodalOpen)}
        />
      </div>

      {ismodalOpen && (
        <div className="absolute top-full right-0 z-10 mt-2 max-h-[400px] w-[300px] cursor-default rounded-md border border-[#d9d9d9] bg-white shadow-md dark:border-[#505050] dark:bg-[#1e1e1e] dark:text-[#e0e0e0]">
          <div className="mx-[15px] my-[5px] flex h-[50px] items-center justify-between border-b border-[#d9d9d9] px-[5px]">
            <span className="nanum-gothic-bold">알림</span>
            <button className="cursor-pointer text-sm" onClick={deleteAlarms}>
              알림 읽기
            </button>
          </div>
          <div
            className="max-h-[330px] overflow-y-auto pr-[5px] pl-[20px]"
            style={{ scrollbarGutter: 'stable' }}
          >
            {displayAlarms.length !== 0 ? (
              displayAlarms.map((alarm) => (
                <AlarmListItem key={alarm._id} alarm={alarm} />
              ))
            ) : (
              <p className="nanum-gothic-regular mt-[10px] mb-[15px] text-sm text-[#ababab]">
                앗! 받은 알림이 없어요!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
