import { useRef, useEffect } from "react";

const BTN_W = 196;
const BTN_H = 48;
const MARGIN = 16;
const FRICTION = 0.15;    // lerp factor — lower = more rubber-band lag
const DAMPING = 0.86;     // velocity decay per frame after release
const BOUNCE = 0.4;       // energy kept on wall collision
const SPRING_K = 0.07;    // spring stiffness pulling toward home
const SNAP_RADIUS = 150;  // px from home that activates the spring
const STORAGE_KEY = "kofi-btn-pos";

export function KofiButton() {
  const btnRef = useRef<HTMLDivElement>(null);
  const startPhysicsRef = useRef<() => void>(() => {});

  const phy = useRef({
    x: 0, y: 0,
    vx: 0, vy: 0,
    tx: 0, ty: 0,
    sx: 1, sy: 1,
    isDragging: false,
    didDrag: false,
    offsetX: 0, offsetY: 0,
    startX: 0, startY: 0,
  });

  useEffect(() => {
    const p = phy.current;
    let rafId = 0;
    let running = false;

    const getHome = () => ({
      x: MARGIN,
      y: window.innerHeight - BTN_H - MARGIN,
    });

    const applyDOM = () => {
      if (!btnRef.current) return;
      btnRef.current.style.left = `${p.x}px`;
      btnRef.current.style.top = `${p.y}px`;
      btnRef.current.style.transform = `scale(${p.sx.toFixed(4)},${p.sy.toFixed(4)})`;
    };

    const tick = () => {
      const home = getHome();
      const maxX = window.innerWidth - BTN_W - MARGIN;
      const maxY = window.innerHeight - BTN_H - MARGIN;

      if (p.isDragging) {
        // Rubber-band follow: lerp current pos toward cursor target
        const prevX = p.x, prevY = p.y;
        p.x += (p.tx - p.x) * FRICTION;
        p.y += (p.ty - p.y) * FRICTION;
        // Track real velocity for momentum after release
        p.vx = p.x - prevX;
        p.vy = p.y - prevY;
      } else {
        // Spring toward home when close enough
        const dx = home.x - p.x;
        const dy = home.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < SNAP_RADIUS && dist > 0.5) {
          p.vx += dx * SPRING_K;
          p.vy += dy * SPRING_K;
        }
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;
      }

      // Wall collisions with squish deformation
      if (p.x < MARGIN) {
        p.x = MARGIN;
        if (p.vx < -0.5) { p.sx = 0.78; p.sy = 1.2; }
        p.vx = Math.abs(p.vx) * BOUNCE;
      } else if (p.x > maxX) {
        p.x = maxX;
        if (p.vx > 0.5) { p.sx = 0.78; p.sy = 1.2; }
        p.vx = -Math.abs(p.vx) * BOUNCE;
      }
      if (p.y < MARGIN) {
        p.y = MARGIN;
        if (p.vy < -0.5) { p.sy = 0.78; p.sx = 1.2; }
        p.vy = Math.abs(p.vy) * BOUNCE;
      } else if (p.y > maxY) {
        p.y = maxY;
        if (p.vy > 0.5) { p.sy = 0.78; p.sx = 1.2; }
        p.vy = -Math.abs(p.vy) * BOUNCE;
      }

      // Scale springs back toward 1 (squish recovery)
      p.sx += (1 - p.sx) * 0.22;
      p.sy += (1 - p.sy) * 0.22;

      applyDOM();

      const isStable =
        !p.isDragging &&
        Math.abs(p.vx) + Math.abs(p.vy) < 0.05 &&
        Math.abs(p.sx - 1) + Math.abs(p.sy - 1) < 0.002;

      if (!isStable) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
        p.vx = 0; p.vy = 0; p.sx = 1; p.sy = 1;
        applyDOM();
      }
    };

    const startPhysics = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };

    // Expose startPhysics to the React mousedown handler
    startPhysicsRef.current = startPhysics;

    // Init position
    const home = getHome();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const q = JSON.parse(stored);
        p.x = q.x; p.y = q.y;
      } else {
        p.x = home.x; p.y = home.y;
      }
    } catch {
      p.x = home.x; p.y = home.y;
    }
    p.sx = 1; p.sy = 1;
    applyDOM();

    const onMouseMove = (e: MouseEvent) => {
      if (!p.isDragging) return;
      if (Math.abs(e.clientX - p.startX) > 4 || Math.abs(e.clientY - p.startY) > 4) {
        p.didDrag = true;
      }
      p.tx = e.clientX - p.offsetX;
      p.ty = e.clientY - p.offsetY;
    };

    const onMouseUp = () => {
      if (!p.isDragging) return;
      p.isDragging = false;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ x: Math.round(p.x), y: Math.round(p.y) }));
      startPhysics();
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    const p = phy.current;
    p.isDragging = true;
    p.didDrag = false;
    p.offsetX = e.clientX - p.x;
    p.offsetY = e.clientY - p.y;
    p.startX = e.clientX;
    p.startY = e.clientY;
    p.tx = p.x;
    p.ty = p.y;
    p.vx = 0; p.vy = 0;
    startPhysicsRef.current();
    e.preventDefault();
  };

  const onClick = () => {
    if (!phy.current.didDrag) {
      window.open("https://ko-fi.com/terravidhal", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      ref={btnRef}
      onMouseDown={onMouseDown}
      onClick={onClick}
      style={{
        position: "fixed",
        zIndex: 9999,
        willChange: "transform, left, top",
        transformOrigin: "center center",
      }}
      className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary text-sm font-semibold shadow-xl shadow-primary/40 select-none cursor-grab active:cursor-grabbing"
      title="Support me on Ko-fi"
    >
      <img
        src="/images/kofi-logo.webp"
        alt="Ko-fi"
        className="h-9 w-9 object-contain animate-kofi-heartbeat"
        draggable={false}
      />
      <span className="text-white">Support me</span>
    </div>
  );
}
