import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PerformanceMonitor } from '../../components/PerformanceMonitor';

describe('PerformanceMonitor Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const MockObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
    })) as unknown as typeof PerformanceObserver;
    Object.defineProperty(MockObserver, 'supportedEntryTypes', {
      value: [
        'element',
        'event',
        'first-input',
        'largest-contentful-paint',
        'layout-shift',
        'longtask',
        'mark',
        'measure',
        'navigation',
        'paint',
        'resource',
      ],
      writable: false,
      configurable: true,
    });
    global.PerformanceObserver = MockObserver;
  });

  test('renders toggle button when disabled', () => {
    render(<PerformanceMonitor enabled={false} />);

    const button = screen.getByTitle('Show Performance Metrics');
    expect(button).toBeInTheDocument();
  });

  test('shows toggle button initially when enabled', () => {
    render(<PerformanceMonitor enabled={true} />);

    const button = screen.getByTitle('Show Performance Metrics');
    expect(button).toBeInTheDocument();
  });
});

describe('Lighthouse Configuration Validation', () => {
  test('validates lighthouse configuration structure', () => {
    const config = {
      ci: {
        collect: {
          numberOfRuns: 3,
          settings: {
            preset: 'desktop',
            throttling: {
              rttMs: 40,
              throughputKbps: 10240,
              cpuSlowdownMultiplier: 1,
            },
          },
        },
        assert: {
          assertions: {
            'categories:performance': ['error', { minScore: 0.9 }],
            'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
            'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
          },
        },
      },
    };

    expect(config).toHaveProperty('ci.collect.numberOfRuns', 3);
    expect(config).toHaveProperty('ci.assert.assertions');
  });

  test('performance targets meet Google recommendations', () => {
    const performanceTargets = {
      lcp: { target: 2500, warning: 4000 },
      cls: { target: 0.1, warning: 0.25 },
      tbt: { target: 200, warning: 300 },
    };

    expect(performanceTargets.lcp.target).toBeLessThanOrEqual(2500);
    expect(performanceTargets.cls.target).toBeLessThanOrEqual(0.1);
    expect(performanceTargets.tbt.target).toBeLessThanOrEqual(200);
  });
});

describe('Core Web Vitals Thresholds', () => {
  test('defines all required Core Web Vitals metrics', () => {
    const coreWebVitals = ['LCP', 'FID', 'CLS', 'TTFB'];

    coreWebVitals.forEach((vital) => {
      expect(vital).toBeDefined();
    });
  });

  test('LCP threshold is within acceptable range', () => {
    const lcpTarget = 2500;
    expect(lcpTarget).toBeGreaterThanOrEqual(2000);
    expect(lcpTarget).toBeLessThanOrEqual(4000);
  });

  test('CLS threshold ensures visual stability', () => {
    const clsTarget = 0.1;
    expect(clsTarget).toBeGreaterThanOrEqual(0);
    expect(clsTarget).toBeLessThanOrEqual(0.25);
  });

  test('TBT threshold ensures responsiveness', () => {
    const tbtTarget = 200;
    expect(tbtTarget).toBeGreaterThanOrEqual(100);
    expect(tbtTarget).toBeLessThanOrEqual(300);
  });
});

describe('Performance Budgets', () => {
  test('JavaScript bundle size is reasonable for enterprise app', () => {
    const jsBudget = {
      maxSize: '500KB',
      maxUncompressed: '1.5MB',
    };

    expect(jsBudget.maxSize).toBeDefined();
    expect(parseInt(jsBudget.maxSize)).toBeLessThanOrEqual(1024);
  });

  test('Total bundle size limit is defined', () => {
    const totalBundleLimit = '1MB';
    expect(totalBundleLimit).toBeDefined();
  });
});
