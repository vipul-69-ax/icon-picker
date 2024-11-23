import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import { IconPickerDialog } from './icon-picker-dialog'
import { Button } from '@/components/ui/button'

export interface IconPickerProps {
  rowsInOnePage: number
  columnsInOnePage: number
  iconHeight: number
  iconWidth: number
  pickerHeight?: number
  pickerWidth?: number
  onIconSelect: (iconName: string) => void
}

export function IconPicker({
  rowsInOnePage,
  columnsInOnePage,
  iconHeight,
  iconWidth,
  pickerHeight = 500,
  pickerWidth = 500,
  onIconSelect,
}: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  const handleIconSelect = (iconName: string) => {
    setSelectedIcon(iconName)
    onIconSelect(iconName)
    setIsOpen(false)
  }

  const SelectedIcon = selectedIcon ? Icons[selectedIcon as keyof typeof Icons] : null

  return (
    <div>
      <Button
        variant="outline"
        className="w-[100px] h-[100px] p-0 flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        {SelectedIcon ? (
          <SelectedIcon className="w-6 h-6" />
        ) : (
          <Icons.Plus className="w-6 h-6 text-muted-foreground" />
        )}
      </Button>
      <IconPickerDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onIconSelect={handleIconSelect}
        rowsInOnePage={rowsInOnePage}
        columnsInOnePage={columnsInOnePage}
        iconHeight={iconHeight}
        iconWidth={iconWidth}
        pickerHeight={pickerHeight}
        pickerWidth={pickerWidth}
      />
    </div>
  )
}

