import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown, Plus, WandSparkles, XIcon } from 'lucide-react';
import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

/**
 * Animation types and configurations
 */
export interface AnimationConfig {
  /** Badge animation type */
  badgeAnimation?: 'bounce' | 'pulse' | 'wiggle' | 'fade' | 'slide' | 'none';
  /** Popover animation type */
  popoverAnimation?: 'scale' | 'slide' | 'fade' | 'flip' | 'none';
  /** Option hover animation type */
  optionHoverAnimation?: 'highlight' | 'scale' | 'glow' | 'none';
  /** Animation duration in seconds */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
}

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva('m-1 transition-all duration-300 ease-in-out', {
  variants: {
    variant: {
      default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
      secondary:
        'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive:
        'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      inverted: 'inverted',
    },
    badgeAnimation: {
      bounce: 'hover:-translate-y-1 hover:scale-110',
      pulse: 'hover:animate-pulse',
      wiggle: 'hover:animate-wiggle',
      fade: 'hover:opacity-80',
      slide: 'hover:translate-x-1',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    badgeAnimation: 'bounce',
  },
});

/**
 * Option interface for MultiSelect component
 */
interface MultiSelectOption {
  /** The text to display for the option. */
  label: string;
  /** The unique value associated with the option. */
  value: string;
  /** Optional icon component to display alongside the option. */
  icon?: React.ComponentType<{ className?: string }>;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Custom styling for the option */
  style?: {
    /** Custom badge color */
    badgeColor?: string;
    /** Custom icon color */
    iconColor?: string;
    /** Gradient background for badge */
    gradient?: string;
  };
}

/**
 * Group interface for organizing options
 */
interface MultiSelectGroup {
  /** Group heading */
  heading: string;
  /** Options in this group */
  options: MultiSelectOption[];
}

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'animationConfig'
    >,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects or groups to be displayed in the multi-select component.
   */
  options: MultiSelectOption[] | MultiSelectGroup[];
  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * If true, shows only icons without border and chevron (icon-only mode).
   * Optional, defaults to false.
   */
  iconOnly?: boolean;

  /**
   * Default icon component to show when no items are selected in icon-only mode.
   * Optional, defaults to a plus icon.
   */
  defaultIcon?: React.ComponentType<{ className?: string }>;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Advanced animation configuration for different component parts.
   * Optional, allows fine-tuning of various animation effects.
   */
  animationConfig?: AnimationConfig;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;

  /**
   * If true, disables the select all functionality.
   * Optional, defaults to false.
   */
  hideSelectAll?: boolean;

  /**
   * If true, shows search functionality in the popover.
   * If false, hides the search input completely.
   * Optional, defaults to true.
   */
  searchable?: boolean;

  /**
   * Custom empty state message when no options match search.
   * Optional, defaults to "No results found."
   */
  emptyIndicator?: React.ReactNode;

  /**
   * If true, allows the component to grow and shrink with its content.
   * If false, uses fixed width behavior.
   * Optional, defaults to false.
   */
  autoSize?: boolean;

  /**
   * If true, shows badges in a single line with horizontal scroll.
   * If false, badges wrap to multiple lines.
   * Optional, defaults to false.
   */
  singleLine?: boolean;

  /**
   * Custom CSS class for the popover content.
   * Optional, can be used to customize popover appearance.
   */
  popoverClassName?: string;

  /**
   * If true, disables the component completely.
   * Optional, defaults to false.
   */
  disabled?: boolean;

  /**
   * Responsive configuration for different screen sizes.
   * Allows customizing maxCount and other properties based on viewport.
   * Can be boolean true for default responsive behavior or an object for custom configuration.
   */
  responsive?:
    | boolean
    | {
        /** Configuration for mobile devices (< 640px) */
        mobile?: {
          maxCount?: number;
          hideIcons?: boolean;
          compactMode?: boolean;
        };
        /** Configuration for tablet devices (640px - 1024px) */
        tablet?: {
          maxCount?: number;
          hideIcons?: boolean;
          compactMode?: boolean;
        };
        /** Configuration for desktop devices (> 1024px) */
        desktop?: {
          maxCount?: number;
          hideIcons?: boolean;
          compactMode?: boolean;
        };
      };

  /**
   * Minimum width for the component.
   * Optional, defaults to auto-sizing based on content.
   * When set, component will not shrink below this width.
   */
  minWidth?: string;

  /**
   * Maximum width for the component.
   * Optional, defaults to 100% of container.
   * Component will not exceed container boundaries.
   */
  maxWidth?: string;

  /**
   * If true, automatically removes duplicate options based on their value.
   * Optional, defaults to false (shows warning in dev mode instead).
   */
  deduplicateOptions?: boolean;

  /**
   * If true, the component will reset its internal state when defaultValue changes.
   * Useful for React Hook Form integration and form reset functionality.
   * Optional, defaults to true.
   */
  resetOnDefaultValueChange?: boolean;

  /**
   * If true, automatically closes the popover after selecting an option.
   * Useful for single-selection-like behavior or mobile UX.
   * Optional, defaults to false.
   */
  closeOnSelect?: boolean;

  /**
   * Tooltip text to show when no values are selected (empty state).
   * Useful to prompt actions like "Set sources" or "Set channels".
   */
  emptyTooltip?: string;
}

/**
 * Imperative methods exposed through ref
 */
export interface MultiSelectRef {
  /**
   * Programmatically reset the component to its default value
   */
  reset: () => void;
  /**
   * Get current selected values
   */
  getSelectedValues: () => string[];
  /**
   * Set selected values programmatically
   */
  setSelectedValues: (values: string[]) => void;
  /**
   * Clear all selected values
   */
  clear: () => void;
  /**
   * Focus the component
   */
  focus: () => void;
}

export const MultiSelect = React.forwardRef<MultiSelectRef, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = 'Select options',
      animation = 0,
      animationConfig,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      hideSelectAll = false,
      searchable = true,
      emptyIndicator,
      autoSize = false,
      singleLine = false,
      popoverClassName,
      disabled = false,
      responsive,
      minWidth,
      maxWidth,
      deduplicateOptions = false,
      resetOnDefaultValueChange = true,
      closeOnSelect = false,
      iconOnly = false,
      defaultIcon: DefaultIcon,
      emptyTooltip,
      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const [politeMessage, setPoliteMessage] = React.useState('');
    const [assertiveMessage, setAssertiveMessage] = React.useState('');
    const prevSelectedCount = React.useRef(selectedValues.length);
    const prevIsOpen = React.useRef(isPopoverOpen);
    const prevSearchValue = React.useRef(searchValue);

    const announce = React.useCallback(
      (message: string, priority: 'polite' | 'assertive' = 'polite') => {
        if (priority === 'assertive') {
          setAssertiveMessage(message);
          setTimeout(() => setAssertiveMessage(''), 100);
        } else {
          setPoliteMessage(message);
          setTimeout(() => setPoliteMessage(''), 100);
        }
      },
      [],
    );

    const multiSelectId = React.useId();
    const listboxId = `${multiSelectId}-listbox`;
    const triggerDescriptionId = `${multiSelectId}-description`;
    const selectedCountId = `${multiSelectId}-count`;

    const prevDefaultValueRef = React.useRef<string[]>(defaultValue);

    const isGroupedOptions = React.useCallback(
      (
        opts: MultiSelectOption[] | MultiSelectGroup[],
      ): opts is MultiSelectGroup[] => {
        return opts.length > 0 && 'heading' in opts[0];
      },
      [],
    );

    const arraysEqual = React.useCallback(
      (a: string[], b: string[]): boolean => {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        return sortedA.every((val, index) => val === sortedB[index]);
      },
      [],
    );

    const resetToDefault = React.useCallback(() => {
      setSelectedValues(defaultValue);
      setIsPopoverOpen(false);
      setSearchValue('');
      onValueChange(defaultValue);
    }, [defaultValue, onValueChange]);

    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(
      ref,
      () => ({
        reset: resetToDefault,
        getSelectedValues: () => selectedValues,
        setSelectedValues: (values: string[]) => {
          setSelectedValues(values);
          onValueChange(values);
        },
        clear: () => {
          setSelectedValues([]);
          onValueChange([]);
        },
        focus: () => {
          if (buttonRef.current) {
            buttonRef.current.focus();
            const originalOutline = buttonRef.current.style.outline;
            const originalOutlineOffset = buttonRef.current.style.outlineOffset;
            buttonRef.current.style.outline = '2px solid hsl(var(--ring))';
            buttonRef.current.style.outlineOffset = '2px';
            setTimeout(() => {
              if (buttonRef.current) {
                buttonRef.current.style.outline = originalOutline;
                buttonRef.current.style.outlineOffset = originalOutlineOffset;
              }
            }, 1000);
          }
        },
      }),
      [resetToDefault, selectedValues, onValueChange],
    );

    const [screenSize, setScreenSize] = React.useState<
      'mobile' | 'tablet' | 'desktop'
    >('desktop');

    React.useEffect(() => {
      if (typeof window === 'undefined') return;
      const handleResize = () => {
        const width = window.innerWidth;
        if (width < 640) {
          setScreenSize('mobile');
        } else if (width < 1024) {
          setScreenSize('tablet');
        } else {
          setScreenSize('desktop');
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', handleResize);
        }
      };
    }, []);

    const getResponsiveSettings = () => {
      if (!responsive) {
        return {
          maxCount: maxCount,
          hideIcons: false,
          compactMode: false,
        };
      }
      if (responsive === true) {
        const defaultResponsive = {
          mobile: { maxCount: 2, hideIcons: false, compactMode: true },
          tablet: { maxCount: 4, hideIcons: false, compactMode: false },
          desktop: { maxCount: 6, hideIcons: false, compactMode: false },
        };
        const currentSettings = defaultResponsive[screenSize];
        return {
          maxCount: currentSettings?.maxCount ?? maxCount,
          hideIcons: currentSettings?.hideIcons ?? false,
          compactMode: currentSettings?.compactMode ?? false,
        };
      }
      const currentSettings = responsive[screenSize];
      return {
        maxCount: currentSettings?.maxCount ?? maxCount,
        hideIcons: currentSettings?.hideIcons ?? false,
        compactMode: currentSettings?.compactMode ?? false,
      };
    };

    const responsiveSettings = getResponsiveSettings();

    const getBadgeAnimationClass = () => {
      if (animationConfig?.badgeAnimation) {
        switch (animationConfig.badgeAnimation) {
          case 'bounce':
            return isAnimating
              ? 'animate-bounce'
              : 'hover:-translate-y-1 hover:scale-110';
          case 'pulse':
            return 'hover:animate-pulse';
          case 'wiggle':
            return 'hover:animate-wiggle';
          case 'fade':
            return 'hover:opacity-80';
          case 'slide':
            return 'hover:translate-x-1';
          case 'none':
            return '';
          default:
            return '';
        }
      }
      return isAnimating ? 'animate-bounce' : '';
    };

    const getPopoverAnimationClass = () => {
      if (animationConfig?.popoverAnimation) {
        switch (animationConfig.popoverAnimation) {
          case 'scale':
            return 'animate-scaleIn';
          case 'slide':
            return 'animate-slideInDown';
          case 'fade':
            return 'animate-fadeIn';
          case 'flip':
            return 'animate-flipIn';
          case 'none':
            return '';
          default:
            return '';
        }
      }
      return '';
    };

    const getAllOptions = React.useCallback((): MultiSelectOption[] => {
      if (options.length === 0) return [];
      let allOptions: MultiSelectOption[];
      if (isGroupedOptions(options)) {
        allOptions = options.flatMap((group) => group.options);
      } else {
        allOptions = options;
      }
      const valueSet = new Set<string>();
      const duplicates: string[] = [];
      const uniqueOptions: MultiSelectOption[] = [];
      allOptions.forEach((option) => {
        if (valueSet.has(option.value)) {
          duplicates.push(option.value);
          if (!deduplicateOptions) {
            uniqueOptions.push(option);
          }
        } else {
          valueSet.add(option.value);
          uniqueOptions.push(option);
        }
      });
      if (process.env.NODE_ENV === 'development' && duplicates.length > 0) {
        const action = deduplicateOptions
          ? 'automatically removed'
          : 'detected';
        console.warn(
          `MultiSelect: Duplicate option values ${action}: ${duplicates.join(
            ', ',
          )}. ` +
            `${
              deduplicateOptions
                ? 'Duplicates have been removed automatically.'
                : "This may cause unexpected behavior. Consider setting 'deduplicateOptions={true}' or ensure all option values are unique."
            }`,
        );
      }
      return deduplicateOptions ? uniqueOptions : allOptions;
    }, [options, deduplicateOptions, isGroupedOptions]);

    const getOptionByValue = React.useCallback(
      (value: string): MultiSelectOption | undefined => {
        const option = getAllOptions().find((option) => option.value === value);
        if (!option && process.env.NODE_ENV === 'development') {
          console.warn(
            `MultiSelect: Option with value "${value}" not found in options list`,
          );
        }
        return option;
      },
      [getAllOptions],
    );

    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchValue) return options;
      if (options.length === 0) return [];
      if (isGroupedOptions(options)) {
        return options
          .map((group) => ({
            ...group,
            options: group.options.filter(
              (option) =>
                option.label
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                option.value.toLowerCase().includes(searchValue.toLowerCase()),
            ),
          }))
          .filter((group) => group.options.length > 0);
      }
      return options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
          option.value.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }, [options, searchValue, searchable, isGroupedOptions]);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (optionValue: string) => {
      if (disabled) return;
      const option = getOptionByValue(optionValue);
      if (option?.disabled) return;
      const newSelectedValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((value) => value !== optionValue)
        : [...selectedValues, optionValue];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
      if (closeOnSelect) {
        setIsPopoverOpen(false);
      }
    };

    const handleClear = () => {
      if (disabled) return;
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      if (disabled) return;
      setIsPopoverOpen((prev) => !prev);
    };

    const toggleAll = () => {
      if (disabled) return;
      const allOptions = getAllOptions().filter((option) => !option.disabled);
      if (selectedValues.length === allOptions.length) {
        handleClear();
      } else {
        const allValues = allOptions.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }

      if (closeOnSelect) {
        setIsPopoverOpen(false);
      }
    };

    React.useEffect(() => {
      if (!resetOnDefaultValueChange) return;
      const prevDefaultValue = prevDefaultValueRef.current;
      if (!arraysEqual(prevDefaultValue, defaultValue)) {
        if (!arraysEqual(selectedValues, defaultValue)) {
          setSelectedValues(defaultValue);
        }
        prevDefaultValueRef.current = [...defaultValue];
      }
    }, [defaultValue, selectedValues, arraysEqual, resetOnDefaultValueChange]);

    const getWidthConstraints = () => {
      const defaultMinWidth = screenSize === 'mobile' ? '0px' : '200px';
      const effectiveMinWidth = minWidth || defaultMinWidth;
      const effectiveMaxWidth = maxWidth || '100%';
      return {
        minWidth: effectiveMinWidth,
        maxWidth: effectiveMaxWidth,
        width: autoSize ? 'auto' : '100%',
      };
    };

    const widthConstraints = getWidthConstraints();

    React.useEffect(() => {
      if (!isPopoverOpen) {
        setSearchValue('');
      }
    }, [isPopoverOpen]);

    React.useEffect(() => {
      const selectedCount = selectedValues.length;
      const allOptions = getAllOptions();
      const totalOptions = allOptions.filter((opt) => !opt.disabled).length;
      if (selectedCount !== prevSelectedCount.current) {
        const diff = selectedCount - prevSelectedCount.current;
        if (diff > 0) {
          const addedItems = selectedValues.slice(-diff);
          const addedLabels = addedItems
            .map(
              (value) => allOptions.find((opt) => opt.value === value)?.label,
            )
            .filter(Boolean);

          if (addedLabels.length === 1) {
            announce(
              `${addedLabels[0]} selected. ${selectedCount} of ${totalOptions} options selected.`,
            );
          } else {
            announce(
              `${addedLabels.length} options selected. ${selectedCount} of ${totalOptions} total selected.`,
            );
          }
        } else if (diff < 0) {
          announce(
            `Option removed. ${selectedCount} of ${totalOptions} options selected.`,
          );
        }
        prevSelectedCount.current = selectedCount;
      }

      if (isPopoverOpen !== prevIsOpen.current) {
        if (isPopoverOpen) {
          announce(
            `Dropdown opened. ${totalOptions} options available. Use arrow keys to navigate.`,
          );
        } else {
          announce('Dropdown closed.');
        }
        prevIsOpen.current = isPopoverOpen;
      }

      if (
        searchValue !== prevSearchValue.current &&
        searchValue !== undefined
      ) {
        if (searchValue && isPopoverOpen) {
          const filteredCount = allOptions.filter(
            (opt) =>
              opt.label.toLowerCase().includes(searchValue.toLowerCase()) ||
              opt.value.toLowerCase().includes(searchValue.toLowerCase()),
          ).length;

          announce(
            `${filteredCount} option${
              filteredCount === 1 ? '' : 's'
            } found for "${searchValue}"`,
          );
        }
        prevSearchValue.current = searchValue;
      }
    }, [selectedValues, isPopoverOpen, searchValue, announce, getAllOptions]);

    return (
      <>
        <div className='sr-only'>
          <output aria-live='polite' aria-atomic='true'>
            {politeMessage}
          </output>
          <div aria-live='assertive' aria-atomic='true' role='alert'>
            {assertiveMessage}
          </div>
        </div>

        <Popover
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          modal={modalPopover}
        >
          <div id={triggerDescriptionId} className='sr-only'>
            Multi-select dropdown. Use arrow keys to navigate, Enter to select,
            and Escape to close.
          </div>
          <output id={selectedCountId} className='sr-only' aria-live='polite'>
            {selectedValues.length === 0
              ? 'No options selected'
              : `${selectedValues.length} option${
                  selectedValues.length === 1 ? '' : 's'
                } selected: ${selectedValues
                  .map((value) => getOptionByValue(value)?.label)
                  .filter(Boolean)
                  .join(', ')}`}
          </output>

          <PopoverTrigger asChild>
            {iconOnly ? (
              <div className='flex items-center gap-1'>
                {selectedValues.length > 0 ? (
                  selectedValues
                    .slice(0, responsiveSettings.maxCount)
                    .map((value, index) => {
                      const option = getOptionByValue(value);
                      const IconComponent = option?.icon;
                      const customStyle = option?.style;
                      if (!option) {
                        return null;
                      }
                      const badgeStyle: React.CSSProperties = {
                        animationDuration: `${animation}s`,
                        ...(customStyle?.badgeColor && {
                          backgroundColor: customStyle.badgeColor,
                        }),
                        ...(customStyle?.gradient && {
                          background: customStyle.gradient,
                          color: 'white',
                        }),
                      };
                      return (
                        <div
                          key={value}
                          className={cn(
                            'relative bg-muted/80 rounded-md p-0.5',
                            index > 0 && '-ml-3', // Overlap effect
                          )}
                        >
                          <button
                            type='button'
                            className={cn(
                              'rounded-md p-1 cursor-pointer border-0 bg-transparent',
                              getBadgeAnimationClass(),
                              multiSelectVariants({ variant }),
                              customStyle?.gradient &&
                                'text-white border-transparent',
                              responsiveSettings.compactMode && 'p-0.5',
                              screenSize === 'mobile' &&
                                'max-w-[120px] truncate',
                              singleLine && 'flex-shrink-0 whitespace-nowrap',
                              '[&>svg]:pointer-events-auto',
                              disabled && 'opacity-50 cursor-not-allowed',
                            )}
                            style={{
                              ...badgeStyle,
                              animationDuration: `${
                                animationConfig?.duration || animation
                              }s`,
                              animationDelay: `${animationConfig?.delay || 0}s`,
                              zIndex: selectedValues.length - index, // Stack order
                            }}
                            onClick={handleTogglePopover}
                            disabled={disabled}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                handleTogglePopover();
                              }
                            }}
                            aria-label={`${option.label} - Click to open options`}
                          >
                            {IconComponent && !responsiveSettings.hideIcons ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    <IconComponent
                                      className={cn(
                                        'h-4 w-4',
                                        responsiveSettings.compactMode &&
                                          'h-3 w-3',
                                        customStyle?.iconColor &&
                                          'text-current',
                                      )}
                                      {...(customStyle?.iconColor && {
                                        style: { color: customStyle.iconColor },
                                      })}
                                    />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{option.label}</p>
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <span
                                className={cn(
                                  'text-xs',
                                  screenSize === 'mobile' && 'truncate',
                                )}
                              >
                                {option.label}
                              </span>
                            )}
                          </button>
                        </div>
                      );
                    })
                    .filter(Boolean)
                ) : emptyTooltip ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type='button'
                        className={cn(
                          'rounded-md p-1 cursor-pointer border-0 bg-transparent',
                          getBadgeAnimationClass(),
                          multiSelectVariants({ variant }),
                          responsiveSettings.compactMode && 'p-0.5',
                          disabled && 'opacity-50 cursor-not-allowed',
                        )}
                        style={{
                          animationDuration: `${
                            animationConfig?.duration || animation
                          }s`,
                          animationDelay: `${animationConfig?.delay || 0}s`,
                        }}
                        onClick={handleTogglePopover}
                        disabled={disabled}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleTogglePopover();
                          }
                        }}
                        aria-label={`No options selected - Click to open options`}
                      >
                        {DefaultIcon ? (
                          <DefaultIcon className='h-4 w-4' />
                        ) : (
                          <Plus className='h-4 w-4' />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{emptyTooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <button
                    type='button'
                    className={cn(
                      'rounded-md p-1 cursor-pointer border-0 bg-transparent',
                      getBadgeAnimationClass(),
                      multiSelectVariants({ variant }),
                      responsiveSettings.compactMode && 'p-0.5',
                      disabled && 'opacity-50 cursor-not-allowed',
                    )}
                    style={{
                      animationDuration: `${
                        animationConfig?.duration || animation
                      }s`,
                      animationDelay: `${animationConfig?.delay || 0}s`,
                    }}
                    onClick={handleTogglePopover}
                    disabled={disabled}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleTogglePopover();
                      }
                    }}
                    aria-label={`No options selected - Click to open options`}
                  >
                    {DefaultIcon ? (
                      <DefaultIcon className='h-4 w-4' />
                    ) : (
                      <Plus className='h-4 w-4' />
                    )}
                  </button>
                )}
                {selectedValues.length > responsiveSettings.maxCount && (
                  <div className='relative -ml-3 bg-muted/80 rounded-md'>
                    <button
                      type='button'
                      className={cn(
                        'rounded-md p-1 bg-muted text-muted-foreground cursor-pointer border-0 leading-none flex items-center justify-center',
                        getBadgeAnimationClass(),
                        multiSelectVariants({ variant }),
                        responsiveSettings.compactMode && 'p-0.5 text-xs',
                        singleLine && 'flex-shrink-0 whitespace-nowrap',
                        '[&>svg]:pointer-events-auto',
                        disabled && 'opacity-50 cursor-not-allowed',
                      )}
                      style={{
                        animationDuration: `${
                          animationConfig?.duration || animation
                        }s`,
                        animationDelay: `${animationConfig?.delay || 0}s`,
                        zIndex: 1,
                      }}
                      onClick={handleTogglePopover}
                      disabled={disabled}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          handleTogglePopover();
                        }
                      }}
                      aria-label={`+${selectedValues.length - responsiveSettings.maxCount} more selected - Click to open options`}
                    >
                      {`+${
                        selectedValues.length - responsiveSettings.maxCount
                      }`}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                ref={buttonRef}
                {...props}
                onClick={handleTogglePopover}
                disabled={disabled}
                role='combobox'
                aria-expanded={isPopoverOpen}
                aria-haspopup='listbox'
                aria-controls={isPopoverOpen ? listboxId : undefined}
                aria-describedby={`${triggerDescriptionId} ${selectedCountId}`}
                aria-label={`Multi-select: ${selectedValues.length} of ${
                  getAllOptions().length
                } options selected. ${placeholder}`}
                className={cn(
                  'flex p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto',
                  autoSize ? 'w-auto' : 'w-full',
                  responsiveSettings.compactMode && 'min-h-8 text-sm',
                  screenSize === 'mobile' && 'min-h-12 text-base',
                  disabled && 'opacity-50 cursor-not-allowed',
                  className,
                )}
                style={{
                  ...widthConstraints,
                  maxWidth: `min(${widthConstraints.maxWidth}, 100%)`,
                }}
              >
                {selectedValues.length > 0 ? (
                  <div className='flex justify-between items-center w-full'>
                    <div
                      className={cn(
                        'flex items-center',
                        singleLine
                          ? 'overflow-x-auto multiselect-singleline-scroll'
                          : 'flex-wrap',
                      )}
                      style={
                        singleLine
                          ? {
                              paddingBottom: '4px',
                            }
                          : {}
                      }
                    >
                      {selectedValues
                        .slice(0, responsiveSettings.maxCount)
                        .map((value, index) => {
                          const option = getOptionByValue(value);
                          const IconComponent = option?.icon;
                          const customStyle = option?.style;
                          if (!option) {
                            return null;
                          }
                          const badgeStyle: React.CSSProperties = {
                            animationDuration: `${animation}s`,
                            ...(customStyle?.badgeColor && {
                              backgroundColor: customStyle.badgeColor,
                            }),
                            ...(customStyle?.gradient && {
                              background: customStyle.gradient,
                              color: 'white',
                            }),
                          };
                          return (
                            <div
                              key={value}
                              className={cn(
                                'relative bg-muted/80 rounded-md p-0.5',
                                index > 0 && '-ml-3', // Overlap effect
                              )}
                            >
                              <Badge
                                className={cn(
                                  'rounded-md p-1',
                                  getBadgeAnimationClass(),
                                  multiSelectVariants({ variant }),
                                  customStyle?.gradient &&
                                    'text-white border-transparent',
                                  responsiveSettings.compactMode && 'p-0.5',
                                  screenSize === 'mobile' &&
                                    'max-w-[120px] truncate',
                                  singleLine &&
                                    'flex-shrink-0 whitespace-nowrap',
                                  '[&>svg]:pointer-events-auto',
                                )}
                                style={{
                                  ...badgeStyle,
                                  animationDuration: `${
                                    animationConfig?.duration || animation
                                  }s`,
                                  animationDelay: `${animationConfig?.delay || 0}s`,
                                  zIndex: selectedValues.length - index, // Stack order
                                }}
                              >
                                {IconComponent &&
                                !responsiveSettings.hideIcons ? (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div>
                                        <IconComponent
                                          className={cn(
                                            'h-4 w-4',
                                            responsiveSettings.compactMode &&
                                              'h-3 w-3',
                                            customStyle?.iconColor &&
                                              'text-current',
                                          )}
                                          {...(customStyle?.iconColor && {
                                            style: {
                                              color: customStyle.iconColor,
                                            },
                                          })}
                                        />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{option.label}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                ) : (
                                  <span
                                    className={cn(
                                      'text-xs',
                                      screenSize === 'mobile' && 'truncate',
                                    )}
                                  >
                                    {option.label}
                                  </span>
                                )}
                              </Badge>
                            </div>
                          );
                        })
                        .filter(Boolean)}
                      {selectedValues.length > responsiveSettings.maxCount && (
                        <div className='relative -ml-3 bg-muted/80 rounded-md'>
                          <Badge
                            className={cn(
                              'rounded-md p-1 bg-muted text-muted-foreground leading-none',
                              getBadgeAnimationClass(),
                              multiSelectVariants({ variant }),
                              responsiveSettings.compactMode && 'p-0.5 text-xs',
                              singleLine && 'flex-shrink-0 whitespace-nowrap',
                              '[&>svg]:pointer-events-auto',
                            )}
                            style={{
                              animationDuration: `${
                                animationConfig?.duration || animation
                              }s`,
                              animationDelay: `${animationConfig?.delay || 0}s`,
                              zIndex: 1,
                            }}
                          >
                            {`+${
                              selectedValues.length -
                              responsiveSettings.maxCount
                            }`}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className='flex items-center justify-between'>
                      <button
                        type='button'
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClear();
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            event.stopPropagation();
                            handleClear();
                          }
                        }}
                        aria-label={`Clear all ${selectedValues.length} selected options`}
                        className='flex items-center justify-center h-4 w-4 mx-2 cursor-pointer text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded-sm border-0 bg-transparent'
                      >
                        <XIcon className='h-4 w-4' />
                      </button>
                      <ChevronDown
                        className='h-4 mx-2 cursor-pointer text-muted-foreground'
                        aria-hidden='true'
                      />
                    </div>
                  </div>
                ) : (
                  <div className='flex items-center justify-between w-full mx-auto'>
                    {emptyTooltip ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className='text-sm text-muted-foreground mx-3'>
                            {placeholder}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{emptyTooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <span className='text-sm text-muted-foreground mx-3'>
                        {placeholder}
                      </span>
                    )}
                    <ChevronDown className='h-4 cursor-pointer text-muted-foreground mx-2' />
                  </div>
                )}
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent
            id={listboxId}
            role='listbox'
            aria-multiselectable='true'
            aria-label='Available options'
            className={cn(
              'w-auto p-0',
              getPopoverAnimationClass(),
              screenSize === 'mobile' && 'w-[85vw] max-w-[280px]',
              screenSize === 'tablet' && 'w-[70vw] max-w-md',
              screenSize === 'desktop' && 'min-w-[300px]',
              popoverClassName,
            )}
            style={{
              animationDuration: `${animationConfig?.duration || animation}s`,
              animationDelay: `${animationConfig?.delay || 0}s`,
              maxWidth: `min(${widthConstraints.maxWidth}, 85vw)`,
              maxHeight: screenSize === 'mobile' ? '70vh' : '60vh',
              touchAction: 'manipulation',
            }}
            align='start'
            onEscapeKeyDown={() => setIsPopoverOpen(false)}
          >
            <Command>
              {searchable && (
                <CommandInput
                  placeholder='Search options...'
                  onKeyDown={handleInputKeyDown}
                  value={searchValue}
                  onValueChange={setSearchValue}
                  aria-label='Search through available options'
                  aria-describedby={`${multiSelectId}-search-help`}
                />
              )}
              {searchable && (
                <div id={`${multiSelectId}-search-help`} className='sr-only'>
                  Type to filter options. Use arrow keys to navigate results.
                </div>
              )}
              <CommandList
                className={cn(
                  'max-h-[40vh] overflow-y-auto multiselect-scrollbar',
                  screenSize === 'mobile' && 'max-h-[50vh]',
                  'overscroll-behavior-y-contain',
                )}
              >
                <CommandEmpty>
                  {emptyIndicator || 'No results found.'}
                </CommandEmpty>{' '}
                {!hideSelectAll && !searchValue && (
                  <CommandGroup>
                    <CommandItem
                      key='all'
                      onSelect={toggleAll}
                      role='option'
                      aria-selected={
                        selectedValues.length ===
                        getAllOptions().filter((opt) => !opt.disabled).length
                      }
                      aria-label={`Select all ${
                        getAllOptions().length
                      } options`}
                      className='cursor-pointer flex items-center justify-between'
                    >
                      <span>
                        (Select All
                        {getAllOptions().length > 20
                          ? ` - ${getAllOptions().length} options`
                          : ''}
                        )
                      </span>
                      <Switch
                        checked={
                          selectedValues.length ===
                          getAllOptions().filter((opt) => !opt.disabled).length
                        }
                        onCheckedChange={toggleAll}
                        className='ml-2'
                        aria-hidden='true'
                      />
                    </CommandItem>
                  </CommandGroup>
                )}
                {isGroupedOptions(filteredOptions) ? (
                  filteredOptions.map((group) => (
                    <CommandGroup key={group.heading} heading={group.heading}>
                      {group.options.map((option) => {
                        const isSelected = selectedValues.includes(
                          option.value,
                        );
                        return (
                          <CommandItem
                            key={option.value}
                            onSelect={() => toggleOption(option.value)}
                            role='option'
                            aria-selected={isSelected}
                            aria-disabled={option.disabled}
                            aria-label={`${option.label}${
                              isSelected ? ', selected' : ', not selected'
                            }${option.disabled ? ', disabled' : ''}`}
                            className={cn(
                              'cursor-pointer flex items-center justify-between',
                              option.disabled &&
                                'opacity-50 cursor-not-allowed',
                            )}
                            disabled={option.disabled}
                          >
                            <div className='flex items-center'>
                              {option.icon && (
                                <option.icon
                                  className='mr-2 h-4 w-4 text-muted-foreground'
                                  aria-hidden='true'
                                />
                              )}
                              <span>{option.label}</span>
                            </div>
                            <Switch
                              checked={isSelected}
                              onCheckedChange={() => toggleOption(option.value)}
                              disabled={option.disabled}
                              className='ml-2'
                              aria-hidden='true'
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  ))
                ) : (
                  <CommandGroup>
                    {filteredOptions.map((option) => {
                      const isSelected = selectedValues.includes(option.value);
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => toggleOption(option.value)}
                          role='option'
                          aria-selected={isSelected}
                          aria-disabled={option.disabled}
                          aria-label={`${option.label}${
                            isSelected ? ', selected' : ', not selected'
                          }${option.disabled ? ', disabled' : ''}`}
                          className={cn(
                            'cursor-pointer flex items-center justify-between',
                            option.disabled && 'opacity-50 cursor-not-allowed',
                          )}
                          disabled={option.disabled}
                        >
                          <div className='flex items-center'>
                            {option.icon && (
                              <option.icon
                                className='mr-2 h-4 w-4 text-muted-foreground'
                                aria-hidden='true'
                              />
                            )}
                            <span>{option.label}</span>
                          </div>
                          <Switch
                            checked={isSelected}
                            onCheckedChange={() => toggleOption(option.value)}
                            disabled={option.disabled}
                            className='ml-2'
                            aria-hidden='true'
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
          {animation > 0 && selectedValues.length > 0 && (
            <WandSparkles
              className={cn(
                'cursor-pointer my-2 text-foreground bg-background w-3 h-3',
                isAnimating ? '' : 'text-muted-foreground',
              )}
              onClick={() => setIsAnimating(!isAnimating)}
            />
          )}
        </Popover>
      </>
    );
  },
);

MultiSelect.displayName = 'MultiSelect';
export type { MultiSelectOption, MultiSelectGroup, MultiSelectProps };
