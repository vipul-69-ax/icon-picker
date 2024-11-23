'use client'

import React, { useState } from 'react'
import * as FeatherIcons from 'react-feather'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

interface IconPickerDialogProps {
  isOpen: boolean
  onClose: () => void
  onIconSelect: (iconName: string) => void
  rowsInOnePage: number
  columnsInOnePage: number
  iconHeight: number
  iconWidth: number
  pickerHeight: number
  pickerWidth: number
}

export function IconPickerDialog({
  isOpen,
  onClose,
  onIconSelect,
  rowsInOnePage,
  columnsInOnePage,
  iconHeight,
  iconWidth,
  pickerHeight,
  pickerWidth,
}: IconPickerDialogProps) {
  const [currentPage, setCurrentPage] = useState(0)

  const iconNames = Object.keys(FeatherIcons)
  const iconsPerPage = rowsInOnePage * columnsInOnePage
  const totalPages = Math.ceil(iconNames.length / iconsPerPage)

  const startIndex = currentPage * iconsPerPage
  const endIndex = startIndex + iconsPerPage
  const currentIcons = iconNames.slice(startIndex, endIndex)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0" style={{ height: pickerHeight, width: pickerWidth }}>
        <ScrollArea>
          <div
            className="grid gap-2 p-4"
            style={{
              gridTemplateColumns: `repeat(${columnsInOnePage}, 1fr)`,
              gridTemplateRows: `repeat(${rowsInOnePage}, 1fr)`,
              height: '100%',
              overflow: 'auto',
            }}
          >
            {currentIcons.map((iconName) => {
              const Icon = FeatherIcons[iconName as keyof typeof FeatherIcons]
              return (
                <Button
                  key={iconName}
                  variant="outline"
                  className="p-2 flex items-center justify-center"
                  onClick={() => onIconSelect(iconName)}
                  style={{ height: iconHeight, width: iconWidth }}
                >
                  <Icon className="w-full h-full" />
                </Button>
              )
            })}
          </div>
        </ScrollArea>
        <div className="flex justify-between items-center p-4 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
