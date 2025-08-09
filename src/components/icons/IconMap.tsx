/**
 * Unified Icon Component
 * Provides React components for consistent icon usage across the application
 */

import React from 'react';
import { Icons, IconName } from '../../constants/icons';

// Icon component props
export interface IconProps {
  name?: IconName;
  className?: string;
  size?: number | string;
  color?: string;
  'aria-label'?: string;
}

/**
 * Unified Icon Component
 * Provides a consistent interface for rendering icons throughout the application
 */
function Icon({
  name,
  className = '',
  size,
  color,
  'aria-label': ariaLabel,
  ...props
}: IconProps & React.SVGProps<SVGSVGElement>) {
  if (!name || !Icons[name]) {
    console.warn(`Icon "${name}" not found in icon map`);
    return null;
  }

  const IconComponent = Icons[name];

  const iconProps = {
    className,
    ...(size && { size }),
    ...(color && { color }),
    ...(ariaLabel && { 'aria-label': ariaLabel }),
    ...props,
  };

  return <IconComponent {...iconProps} />;
}

export { Icon };

export default Icon;
