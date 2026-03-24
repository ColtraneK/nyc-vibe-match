"use client";

import { useState, useRef, useCallback } from "react";

export interface RankItem {
  key: string;
  label: string;
  icon: string;
}

interface Props {
  items: RankItem[];
  onNext: (ranked: RankItem[]) => void;
}

export default function DragToRank({ items: initialItems, onNext }: Props) {
  const [items, setItems] = useState<RankItem[]>(initialItems);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const touchState = useRef<{ idx: number; moved: boolean; overIdx: number | null } | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  function handleDragStart(i: number) {
    setDraggingIdx(i);
  }

  function handleDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    setOverIdx(i);
  }

  function handleDrop(i: number) {
    if (draggingIdx === null || draggingIdx === i) return;
    const next = [...items];
    const [moved] = next.splice(draggingIdx, 1);
    next.splice(i, 0, moved);
    setItems(next);
    setDraggingIdx(null);
    setOverIdx(null);
  }

  function handleDragEnd() {
    setDraggingIdx(null);
    setOverIdx(null);
  }

  function handleTapToTop(i: number) {
    if (i === 0) return;
    const next = [...items];
    const [moved] = next.splice(i, 1);
    next.unshift(moved);
    setItems(next);
  }

  // Touch handlers for mobile drag-to-reorder
  const handleTouchStart = useCallback((i: number) => {
    touchState.current = { idx: i, moved: false, overIdx: null };
    setDraggingIdx(i);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchState.current === null) return;
    e.preventDefault();
    touchState.current.moved = true;
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!target) return;
    const hitIdx = itemRefs.current.findIndex(
      (el) => el && (el === target || el.contains(target))
    );
    if (hitIdx !== -1) {
      touchState.current.overIdx = hitIdx;
      setOverIdx(hitIdx);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchState.current === null) return;
    const fromIdx = touchState.current.idx;
    const toIdx = touchState.current.overIdx;
    const wasDrag = touchState.current.moved;
    touchState.current = null;
    if (wasDrag && toIdx !== null && toIdx !== fromIdx) {
      setItems((prev) => {
        const next = [...prev];
        const [moved] = next.splice(fromIdx, 1);
        next.splice(toIdx, 0, moved);
        return next;
      });
    }
    setDraggingIdx(null);
    setOverIdx(null);
  }, []);

  return (
    <div style={{ padding: "0 24px" }}>
      <div
        style={{
          fontSize: "12px",
          color: "var(--t3)",
          marginBottom: "12px",
        }}
      >
        Drag or tap to move to top - #1 = must-have
      </div>

      <div
        ref={listRef}
        style={{ display: "flex", flexDirection: "column", gap: "6px", userSelect: "none" }}
      >
        {items.map((item, i) => (
          <div
            key={item.key}
            ref={(el) => { itemRefs.current[i] = el; }}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => handleDragOver(e, i)}
            onDrop={() => handleDrop(i)}
            onDragEnd={handleDragEnd}
            onTouchStart={() => handleTouchStart(i)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => handleTapToTop(i)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 16px",
              borderRadius: "12px",
              background: i === draggingIdx ? "var(--s1)" : "var(--s0)",
              border: `1.5px solid ${i === overIdx ? "var(--c2)" : "var(--b1)"}`,
              opacity: i === draggingIdx ? 0.5 : 1,
              cursor: "grab",
              transition: "all .15s",
              touchAction: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: "13px",
                color: "var(--t3)",
                width: "26px",
              }}
            >
              #{i + 1}
            </span>
            <span style={{ fontSize: "20px" }}>{item.icon}</span>
            <span style={{ flex: 1, fontSize: "14px", color: "var(--t1)" }}>{item.label}</span>
            <span style={{ color: "var(--t3)", fontSize: "14px" }}>⠿</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "28px" }}>
        <button
          onClick={() => onNext(items)}
          style={{
            background: "var(--t1)",
            color: "var(--bg)",
            borderRadius: "100px",
            fontWeight: 600,
            fontSize: "14px",
            padding: "13px 32px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
