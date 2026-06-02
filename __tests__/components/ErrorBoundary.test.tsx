import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../../components/ErrorBoundary';

describe('ErrorBoundary Component', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('应该正常渲染子组件', () => {
    render(
      <ErrorBoundary>
        <div>正常内容</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('正常内容')).toBeInTheDocument();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('应该在子组件抛出错误时显示错误UI', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/出现了一些问题/)).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('应该显示错误消息', () => {
    const ThrowError = () => {
      throw new Error('Specific error message');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Specific error message')).toBeInTheDocument();
  });

  it('应该提供重试按钮', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const retryButton = screen.getByText('重试');
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toHaveClass('bg-blue-600');
  });

  it('应该提供刷新页面按钮', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const refreshButton = screen.getByText('刷新页面');
    expect(refreshButton).toBeInTheDocument();
  });

  it('应该调用onError回调函数', () => {
    const onErrorMock = jest.fn();

    const ThrowError = () => {
      throw new Error('Callback test error');
    };

    render(
      <ErrorBoundary onError={onErrorMock}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(onErrorMock).toHaveBeenCalledTimes(1);
    expect(onErrorMock).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    );
  });
});
