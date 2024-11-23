'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { icons } from 'feather-icons'
import { motion, AnimatePresence } from 'framer-motion'

type IconPickerProps = {
  initialParams: {
    rowsInOnePage: number
    columnsInOnePage: number
    pickerHeight: number
    pickerWidth: number
  }
}

export default function AnimatedIconPicker({ initialParams }: IconPickerProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [params, setParams] = useState(initialParams)
  const [featherIcons, setFeatherIcons] = useState<string[]>([])

  useEffect(() => {
    setFeatherIcons(Object.keys(icons))
  }, [])

  const iconsPerPage = params.rowsInOnePage * params.columnsInOnePage
  const totalIcons = featherIcons.length
  const totalPages = Math.ceil(totalIcons / iconsPerPage)

  const handleIconSelect = (iconName: string) => {
    setSelectedIcon(iconName)
    setIsOpen(false)
  }

  const handleParamChange = (param: keyof typeof params, value: number[]) => {
    setParams((prev) => ({ ...prev, [param]: value[0] }))
    setCurrentPage(1) // Reset to first page when changing parameters
  }

  const renderIcons = () => {
    const startIndex = (currentPage - 1) * iconsPerPage
    const endIndex = startIndex + iconsPerPage
    const pageIcons = featherIcons.slice(startIndex, endIndex)

    return pageIcons.map((iconName) => {
      const iconSvg = icons[iconName].toSvg({
        width: 24,
        height: 24,
      })

      return (
        <motion.div
          key={iconName}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="ghost"
            className="p-2 h-auto"
            onClick={() => handleIconSelect(iconName)}
            title={iconName}
            aria-label={`Select ${iconName} icon`}
          >
            <div dangerouslySetInnerHTML={{ __html: iconSvg }} />
          </Button>
        </motion.div>
      )
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[100px] h-[100px] p-0">
          {selectedIcon ? (
            <div
              dangerouslySetInnerHTML={{
                __html: icons[selectedIcon].toSvg({
                  width: 24,
                  height: 24,
                }),
              }}
            />
          ) : (
            <span className="text-sm">Select Icon</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className={`p-0 sm:max-w-[700px] w-[${initialParams.pickerWidth}px] h-[${initialParams.pickerHeight}px]`}>
        <div className="flex h-full">
          
          <div className="w-2/3 flex flex-col">
            <ScrollArea className="w-full p-4">
              <motion.div
                layout
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${params.columnsInOnePage}, minmax(0, 1fr))`,
                }}
              >
                <AnimatePresence>
                  {renderIcons()}
                </AnimatePresence>
              </motion.div>
            </ScrollArea>
            <div className="flex justify-between items-center p-4 border-t">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}