'use client'

import { ChevronDown } from 'lucide-react'

interface FilterDropdownProps {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
  onRemove: () => void
}

export default function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded bg-[#1E293B] px-3 py-2 pr-8 text-sm text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#84CC16] font-roboto"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F9FAFB]" />
    </div>
  )
}