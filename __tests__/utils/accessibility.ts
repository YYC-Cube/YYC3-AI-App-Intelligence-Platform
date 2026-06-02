import { AxeResults, configureAxe } from 'jest-axe';

const axeConfig = {
  rules: {
    'color-contrast': { enabled: true },
    'image-alt': { enabled: true },
    label: { enabled: true },
    'link-name': { enabled: true },
    'button-name': { enabled: true },
    'heading-order': { enabled: true },
    'html-has-lang': { enabled: true },
    'landmark-one-main': { enabled: true },
  },
};

export const axe = configureAxe(axeConfig);

export interface AccessibilityViolation {
  id: string;
  impact: string;
  description: string;
  help: string;
  helpUrl: string;
  nodes: Array<{
    html: string;
    target: string[];
    failureSummary: string;
  }>;
}

export function extractViolations(results: AxeResults): AccessibilityViolation[] {
  return results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact || 'unknown',
    description: violation.description,
    help: violation.help,
    helpUrl: violation.helpUrl,
    nodes: (violation.nodes || []).map((node) => {
      const nodeRecord = node as unknown as Record<string, unknown>;
      return {
        html: nodeRecord.html as string,
        target: (nodeRecord.target as string[]) || [],
        failureSummary: (nodeRecord.failureSummary as string) || '',
      };
    }),
  }));
}

export function generateAccessibilityReport(violations: AccessibilityViolation[]): string {
  if (violations.length === 0) {
    return '✅ No accessibility violations found!';
  }

  let report = `❌ Found ${violations.length} accessibility violation(s):\n\n`;

  violations.forEach((violation, index) => {
    report += `${index + 1}. **${violation.id}** (${violation.impact})\n`;
    report += `   ${violation.description}\n`;
    report += `   Help: ${violation.help}\n`;
    report += `   URL: ${violation.helpUrl}\n\n`;

    if (violation.nodes.length > 0) {
      report += `   Affected elements:\n`;
      violation.nodes.slice(0, 3).forEach((node) => {
        report += `   - ${node.html}\n`;
        if (node.failureSummary) {
          report += `     Issue: ${node.failureSummary}\n`;
        }
      });
      if (violation.nodes.length > 3) {
        report += `   ... and ${violation.nodes.length - 3} more\n`;
      }
      report += '\n';
    }
  });

  return report;
}

export function categorizeViolations(violations: AccessibilityViolation[]): {
  critical: AccessibilityViolation[];
  serious: AccessibilityViolation[];
  moderate: AccessibilityViolation[];
  minor: AccessibilityViolation[];
} {
  return {
    critical: violations.filter((v) => v.impact === 'critical'),
    serious: violations.filter((v) => v.impact === 'serious'),
    moderate: violations.filter((v) => v.impact === 'moderate'),
    minor: violations.filter((v) => v.impact === 'minor'),
  };
}

export function getWCAGComplianceScore(violations: AccessibilityViolation[]): number {
  const totalPossibleChecks = 50;
  const deductions = violations.reduce((total, violation) => {
    switch (violation.impact) {
      case 'critical':
        return total + 5;
      case 'serious':
        return total + 3;
      case 'moderate':
        return total + 2;
      case 'minor':
        return total + 1;
      default:
        return total + 1;
    }
  }, 0);

  const score = Math.max(0, ((totalPossibleChecks - deductions) / totalPossibleChecks) * 100);
  return Math.round(score);
}
