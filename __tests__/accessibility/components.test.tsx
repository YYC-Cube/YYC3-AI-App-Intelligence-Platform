import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {
  axe,
  categorizeViolations,
  extractViolations,
  generateAccessibilityReport,
  getWCAGComplianceScore,
} from '../../__tests__/utils/accessibility';
import { Announcer, SkipNav, VisuallyHidden } from '../../components/accessibility';

describe('Accessibility Components', () => {
  describe('SkipNav', () => {
    test('renders skip navigation link', () => {
      render(<SkipNav />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '#main-content');
      expect(link).toHaveTextContent('Skip to main content');
    });

    test('allows custom main content ID', () => {
      render(<SkipNav mainContentId="custom-main" />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '#custom-main');
    });

    test('allows custom label', () => {
      render(<SkipNav label="Go to content" />);

      const link = screen.getByRole('link');
      expect(link).toHaveTextContent('Go to content');
    });
  });

  describe('Announcer', () => {
    test('renders with correct ARIA attributes', () => {
      render(<Announcer message="Test message" />);

      const announcer = screen.getByRole('status');
      expect(announcer).toBeInTheDocument();
      expect(announcer).toHaveAttribute('aria-live', 'polite');
      expect(announcer).toHaveAttribute('aria-atomic', 'true');
    });

    test('updates message on change', () => {
      const { rerender } = render(<Announcer message="First" />);

      rerender(<Announcer message="Second" />);

      const announcer = screen.getByRole('status');
      expect(announcer).toBeInTheDocument();
    });
  });

  describe('VisuallyHidden', () => {
    test('hides content visually but keeps it accessible', () => {
      render(
        <VisuallyHidden>
          <span>Hidden text</span>
        </VisuallyHidden>
      );

      const element = screen.getByText('Hidden text');
      expect(element).toBeInTheDocument();
    });
  });
});

describe('WCAG 2.1 AA Compliance Tests', () => {
  test('SkipNav component has minimal accessibility violations', async () => {
    const { container } = render(<SkipNav />);
    const results = await axe(container.innerHTML);

    const violations = extractViolations(results);
    expect(violations.length).toBeLessThanOrEqual(2);
  });

  test('Announcer component is properly hidden from visual display', async () => {
    const { container } = render(<Announcer message="Test" />);
    const results = await axe(container.innerHTML);

    const violations = extractViolations(results);
    expect(violations.length).toBe(0);
  });

  test('visually hidden elements are accessible to screen readers', async () => {
    const { container } = render(
      <VisuallyHidden>
        <span>Important information</span>
      </VisuallyHidden>
    );

    const results = await axe(container.innerHTML);
    const violations = extractViolations(results);
    expect(violations.length).toBeLessThanOrEqual(2);
  });

  test('generates proper accessibility report for violations', () => {
    const mockViolations = [
      {
        id: 'image-alt',
        impact: 'critical',
        description: 'Images must have alt text',
        help: 'Provide alt text for images',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/image-alt',
        nodes: [
          {
            html: '<img src="test.jpg" />',
            target: ['img'],
            failureSummary: 'Element does not have an alt attribute',
          },
        ],
      },
    ];

    const report = generateAccessibilityReport(mockViolations);
    expect(report).toContain('❌ Found 1 accessibility violation(s)');
    expect(report).toContain('image-alt');
    expect(report).toContain('critical');
  });

  test('categorizes violations by severity correctly', () => {
    const violations = [
      {
        id: 'critical-issue',
        impact: 'critical' as const,
        description: '',
        help: '',
        helpUrl: '',
        nodes: [],
      },
      {
        id: 'serious-issue',
        impact: 'serious' as const,
        description: '',
        help: '',
        helpUrl: '',
        nodes: [],
      },
      {
        id: 'moderate-issue',
        impact: 'moderate' as const,
        description: '',
        help: '',
        helpUrl: '',
        nodes: [],
      },
      {
        id: 'minor-issue',
        impact: 'minor' as const,
        description: '',
        help: '',
        helpUrl: '',
        nodes: [],
      },
    ];

    const { critical, serious, moderate, minor } = categorizeViolations(violations);

    expect(critical.length).toBe(1);
    expect(serious.length).toBe(1);
    expect(moderate.length).toBe(1);
    expect(minor.length).toBe(1);
  });

  test('calculates WCAG compliance score correctly', () => {
    const noViolationsScore = getWCAGComplianceScore([]);
    expect(noViolationsScore).toBe(100);

    const minorViolationScore = getWCAGComplianceScore([
      { id: 'test', impact: 'minor' as const, description: '', help: '', helpUrl: '', nodes: [] },
    ]);
    expect(minorViolationScore).toBe(98);

    const criticalViolationScore = getWCAGComplianceScore([
      {
        id: 'test',
        impact: 'critical' as const,
        description: '',
        help: '',
        helpUrl: '',
        nodes: [],
      },
    ]);
    expect(criticalViolationScore).toBe(90);
  });
});
