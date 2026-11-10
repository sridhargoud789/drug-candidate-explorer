import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from '@/components/status-badge';

describe('StatusBadge', () => {
  it('displays the status', () => {
    render(<StatusBadge status='Approved' />);

    expect(screen.getByText('Approved')).toBeInTheDocument();
  });
});
