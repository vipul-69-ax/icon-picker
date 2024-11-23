'use client'

import { IconPicker } from '@/components/icon-picker'

export default function Home() {
  const handleIconSelect = (iconName: string) => {
    console.log('Selected icon:', iconName)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <IconPicker
        rowsInOnePage={5}
        columnsInOnePage={5}
        iconHeight={50}
        iconWidth={50}
        pickerHeight={400}
        pickerWidth={400}
        onIconSelect={handleIconSelect}
      />
    </div>
  )
}

