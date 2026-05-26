import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterDropdownProps {
  placeholder: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterDropdown({ placeholder, options, value, onChange, className }: FilterDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className || "w-[160px]"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
