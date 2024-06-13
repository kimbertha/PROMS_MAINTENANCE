import React from 'react'
import { Box } from '@chakra-ui/react'
import { AgGridReact } from 'ag-grid-react' 
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

interface AGGridProps {
  rows: any[]
  columns: any[],
  gridOptions?: object
  [x: string]: any;

}

const AGGrid = ({ rows, columns, gridOptions, ...other }: AGGridProps) => {

  const defGridOptions = {
    defaultColDef: {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      filter: true,
      flex: 1,
      minWidth: 100
    },
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 25, 50],
    domLayout: 'autoHeight'
  }

  return (
    <>
      <Box
        className="ag-theme-quartz" 
      >
        <AgGridReact
          rowData={rows}
          columnDefs={columns}
          gridOptions={gridOptions ? gridOptions : defGridOptions}
          {...other}
        />
      </Box>
    </>
  )
}

export default AGGrid