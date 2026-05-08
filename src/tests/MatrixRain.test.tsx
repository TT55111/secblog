import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import MatrixRain from '../components/MatrixRain';

describe('MatrixRain', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('渲染 canvas 元素', () => {
    const { container } = render(<MatrixRain />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('canvas 固定定位覆盖全屏', () => {
    const { container } = render(<MatrixRain />);
    const canvas = container.querySelector('canvas')!;
    const style = canvas.style;
    expect(style.position).toBe('fixed');
    expect(style.top).toBe('0px');
    expect(style.left).toBe('0px');
    expect(style.width).toBe('100%');
    expect(style.height).toBe('100%');
  });

  it('canvas 禁用鼠标事件', () => {
    const { container } = render(<MatrixRain />);
    const canvas = container.querySelector('canvas')!;
    expect(canvas.style.pointerEvents).toBe('none');
  });

  it('默认透明度为 0.12', () => {
    const { container } = render(<MatrixRain />);
    const canvas = container.querySelector('canvas')!;
    expect(canvas.style.opacity).toBe('0.12');
  });

  it('支持自定义透明度', () => {
    const { container } = render(<MatrixRain opacity={0.5} />);
    const canvas = container.querySelector('canvas')!;
    expect(canvas.style.opacity).toBe('0.5');
  });

  it('z-index 为 0 确保在背景层', () => {
    const { container } = render(<MatrixRain />);
    const canvas = container.querySelector('canvas')!;
    expect(canvas.style.zIndex).toBe('0');
  });
});
