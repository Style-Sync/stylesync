"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface IUseAudioPlayerReturn {
  /** 현재 재생 중인 previewUrl. null이면 재생 없음 */
  playingUrl: string | null;
  /** 재생 중 여부 */
  isPlaying: boolean;
  /** 재생 / 일시정지 토글. 동일 URL이면 토글, 다른 URL이면 교체 재생 */
  toggle: (url: string) => void;
  /** 재생 중단 */
  stop: () => void;
}

export function useAudioPlayer(): IUseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setPlayingUrl(null);
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setPlayingUrl(null);
  }, []);

  const toggle = useCallback(
    (url: string) => {
      // 동일 URL — 재생/일시정지 토글
      if (playingUrl === url) {
        if (isPlaying) {
          audioRef.current?.pause();
          setIsPlaying(false);
        } else {
          audioRef.current?.play();
          setIsPlaying(true);
        }
        return;
      }

      // 다른 URL — 기존 정지 후 새로 재생
      stop();

      const audio = new Audio(url);
      audio.addEventListener("ended", handleEnded);
      audioRef.current = audio;
      audio.play().catch(() => {
        setIsPlaying(false);
        setPlayingUrl(null);
      });
      setPlayingUrl(url);
      setIsPlaying(true);
    },
    [playingUrl, isPlaying, stop, handleEnded]
  );

  // 언마운트 시 재생 중단
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return { playingUrl, isPlaying, toggle, stop };
}
