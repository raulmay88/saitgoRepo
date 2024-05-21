import React, { useState } from 'react';
import { Switch } from "@headlessui/react";

interface SwitchStatusProps {
  initialValue?: boolean;
  onChange?: (value: boolean) => void;
}

const SwitchStatus: React.FC<SwitchStatusProps> = ({ initialValue = false, onChange }) => {
  const [enabled, setEnabled] = useState(initialValue);

  const handleToggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleToggle}
      className={`${enabled ? 'bg-cyan-800' : 'bg-cyan-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none`}
    >
      <span
        className={`${enabled ? 'translate-x-6' : 'translate-x-1'} pointer-events-none inline-block w-4 h-4 transition duration-200 ease-in-out bg-white rounded-full`}
      />
    </Switch>
  );
};

export default SwitchStatus;
