import { Then } from '@cucumber/cucumber';
import type { PlaywrightWorld } from '../support/world.ts';
import { expect } from '@playwright/test';

import AxeBuilder from '@axe-core/playwright';
import type { AxeResults } from 'axe-core';

Then(
  'i see a title containing {string}',
  async function (this: PlaywrightWorld, expectedTitle: RegExp) {
    await expect(this.screen.page).toHaveTitle(new RegExp(expectedTitle));
  },
);

Then(
  'i see a url containing {string}',
  async function (this: PlaywrightWorld, expectedUrl: RegExp) {
    await this.screen.page.waitForURL(new RegExp(expectedUrl));
    expect(this.screen.page.url()).toMatch(new RegExp(expectedUrl));
  },
);

Then(
  'there are no accessibility violations except {string}',
  async function (this: PlaywrightWorld, violations: string) {
    function violationRulesNames(
      accessibilityScanResults: AxeResults,
    ): string[] {
      return accessibilityScanResults.violations
        .map((violation) => violation.id)
        .sort();
    }
    function extractExpectedViolations(violations: string) {
      return violations
        .split(',')
        .map((v) => v.trim())
        .sort();
    }

    const accessibilityScanResults = await new AxeBuilder({
      page: this.screen.page,
    }).analyze();

    const expectedViolationList = extractExpectedViolations(violations);
    const actualViolations = violationRulesNames(accessibilityScanResults);

    expect(actualViolations).toEqual(expectedViolationList);
  },
);
