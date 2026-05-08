import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GlitchText from '../components/GlitchText';

describe('GlitchText', () => {
  it('渲染传入的文本内容', () => {
    render(<GlitchText text="Hello" />);
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('默认使用 h1 标签', () => {
    render(<GlitchText text="Test" />);
    const element = screen.getByText('Test');
    expect(element.tagName).toBe('H1');
  });

  it('支持自定义标签类型', () => {
    render(<GlitchText text="Test" tag="h2" />);
    const element = screen.getByText('Test');
    expect(element.tagName).toBe('H2');
  });

  it('支持 span 标签', () => {
    render(<GlitchText text="Test" tag="span" />);
    const element = screen.getByText('Test');
    expect(element.tagName).toBe('SPAN');
  });

  it('设置 data-text 属性用于 CSS 伪元素', () => {
    render(<GlitchText text="Glitch" />);
    const element = screen.getByText('Glitch');
    expect(element.getAttribute('data-text')).toBe('Glitch');
  });

  it('应用 glitch-text CSS 类名', () => {
    render(<GlitchText text="Test" />);
    const element = screen.getByText('Test');
    expect(element.classList.contains('glitch-text')).toBe(true);
  });

  it('支持自定义 className', () => {
    render(<GlitchText text="Test" className="custom-class" />);
    const element = screen.getByText('Test');
    expect(element.classList.contains('custom-class')).toBe(true);
  });

  it('包含内联样式标签', () => {
    const { container } = render(<GlitchText text="Test" />);
    const styleTag = container.querySelector('style');
    expect(styleTag).toBeTruthy();
    expect(styleTag!.textContent).toContain('glitch-text');
  });
});
