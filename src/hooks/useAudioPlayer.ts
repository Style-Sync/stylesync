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

  // play()는 Promise를 반환하며 iOS Safari 자동재생 정책(NotAllowedError) 등으로
  // 거절될 수 있다. 실패 시 재생 상태를 롤백해 UI가 실제 상태와 어긋나지 않게 한다.
  // 신규 재생·재개 두 경로가 공유한다. (#296)
  const playSafely = useCallback((audio: HTMLAudioElement, url: string) => {
    setPlayingUrl(url);
    setIsPlaying(true);
    audio.play().catch(() => {
      // 재생 시작 실패 — 그 사이 다른 트랙으로 교체됐다면 최신 상태를 건드리지 않는다
      if (audioRef.current !== audio) return;
      setIsPlaying(false);
      setPlayingUrl(null);
    });
  }, []);

  const toggle = useCallback(
    (url: string) => {
      // 동일 URL — 재생/일시정지 토글
      if (playingUrl === url) {
        if (isPlaying) {
          audioRef.current?.pause();
          setIsPlaying(false);
        } else if (audioRef.current) {
          playSafely(audioRef.current, url);
        }
        return;
      }

      // 다른 URL — 기존 정지 후 새로 재생
      stop();

      const audio = new Audio(url);
      audio.addEventListener("ended", handleEnded);
      audioRef.current = audio;
      playSafely(audio, url);
    },
    [playingUrl, isPlaying, stop, handleEnded, playSafely]
  );

  // 언마운트 시 재생 중단
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return { playingUrl, isPlaying, toggle, stop };
}
