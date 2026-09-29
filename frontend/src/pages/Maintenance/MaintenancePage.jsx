import React from 'react';
import UnderMaintenance from '../../components/ui/UnderMaintenance';

/**
 * MaintenancePage Component
 * Route wrapper for non-home active tabs
 */
export default function MaintenancePage({ activeTab, onReturnHome }) {
  return (
    <UnderMaintenance
      activeTab={activeTab}
      onReturnHome={onReturnHome}
    />
  );
}
