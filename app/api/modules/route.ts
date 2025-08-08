import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Fetch and parse the CSV data
  const itModulesResponse = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ERP%20Modules%20Index%28IT%29-cmCESpW8WaEeDDvDOKsp5fqlz32xLY.csv')
  const facilityModulesResponse = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ERP%20Modules%20Index%28Facility%29-ZD41HU1BkPAtkqaeoioFYAimwKFfBs.csv')
  
  const itModulesText = await itModulesResponse.text()
  const facilityModulesText = await facilityModulesResponse.text()

  // Parse CSV data (simple parsing for demo)
  const parseCSV = (csvText: string) => {
    const lines = csvText.split('\n')
    const headers = lines[0].split(',')
    const data = []
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',')
        const row: any = {}
        headers.forEach((header, index) => {
          row[header.trim()] = values[index]?.trim() || ''
        })
        data.push(row)
      }
    }
    return data
  }

  const itModules = parseCSV(itModulesText)
  const facilityModules = parseCSV(facilityModulesText)

  return NextResponse.json({
    success: true,
    data: {
      itModules,
      facilityModules
    }
  })
}
