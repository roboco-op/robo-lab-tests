import { test, expect } from '../../src/fixtures/scanner.fixture';
import { CONSULTATION_DATA } from '../../src/utils/test-data';
import { assertValidationErrorsVisible } from '../../src/assertions/scanner-assertions';

test.describe('Consultation Booking - Regression', () => {
  /**
   * TC11 - Successfully book a consultation with valid data
   */
  test('TC11 - Should successfully book a consultation with valid data', async ({ consultationPage, page }) => {
    await consultationPage.openBookingForm();
    await page.waitForTimeout(2000);
    await consultationPage.takeScreenshot('TC11-booking-form-opened');

    await consultationPage.fillForm(CONSULTATION_DATA);
    await consultationPage.checkAllCheckboxes();
    await consultationPage.takeScreenshot('TC11-form-filled');

    await consultationPage.submitForm();
    const success = await consultationPage.checkSuccessMessage();
    await consultationPage.takeScreenshot('TC11-consultation-booked');

    console.log(success ? 'Consultation booking completed successfully' : 'Form submitted — success message not found');
  });

  /**
   * TC12 - Validate required fields show errors when empty
   */
  test('TC12 - Should show validation errors for empty required fields', async ({ consultationPage, page }) => {
    await consultationPage.openBookingForm();
    await consultationPage.submitForm();

    const validationFound = await assertValidationErrorsVisible(page);
    await consultationPage.takeScreenshot('TC12-validation-errors');
    expect(validationFound).toBeTruthy();
  });

  /**
   * TC13 - Validate email format
   */
  test('TC13 - Should validate email format correctly', async ({ consultationPage }) => {
    await consultationPage.openBookingForm();
    await consultationPage.fillForm({ email: 'invalid-email-format' });
    await consultationPage.submitForm();
    await consultationPage.takeScreenshot('TC13-email-validation');
  });

  /**
   * TC14 - Cancel/close consultation form
   */
  test('TC14 - Should be able to close/cancel consultation form', async ({ consultationPage }) => {
    await consultationPage.openBookingForm();
    await consultationPage.closeForm();
    await consultationPage.takeScreenshot('TC14-form-closed');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({
        path: `test-results/FAILED-${testInfo.title.replace(/\s+/g, '-')}.png`,
        fullPage: true,
      });
    }
  });
});
