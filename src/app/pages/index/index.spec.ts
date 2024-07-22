import { describe, it, expect, vi } from 'vitest';
import './index';

const currentPage = global.pageInstance

const mockApp = {
  data: {
    locale: require('../../utils/locale/id/id-ID.json')
    }
  }

vi.mocked(getApp).mockReturnValue(mockApp);

describe('Test data lang', () => {
  it('onLoad sets data from mocked getApp', async () => {

    currentPage.onLoad()

    expect(currentPage.data.lang.disini).toBe('disini.');
  });
});
