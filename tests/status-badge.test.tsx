import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react/pure';
import { StatusBadge } from '@/components/status-badge';

describe('StatusBadge', () => {
  it('displays the status', () => {
    const { unmount } = render(<StatusBadge status='Approved' />);

    expect(screen.getByText('Approved')).toBeInTheDocument();

    unmount();
  });
});
