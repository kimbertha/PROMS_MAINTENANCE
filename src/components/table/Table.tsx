/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import './table.scss'
import { GoAlertFill } from 'react-icons/go'

import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Box,
  Tr,
  Td,
  Button
} from '@chakra-ui/react'

interface TableProps {
  rows: any;
  columns?: any;
  loading?: boolean;
  amount?: number;

}

const Table = ({ columns, rows, amount = 5 }: TableProps) => {
  const [index, setIndex] = useState(0)
  

  
  const arrays = Array.from({ length: Math.ceil(columns.length / amount) }, (v, i) =>
    columns.slice(i * amount, i * amount + amount)
  )
  
  console.log(arrays)
  return (
    <>
      <ChakraTable>
        <Thead>
          <Tr>
            {rows.map((row:any,i:number) => <td key={i}>{row.header}</td>)}
          </Tr>
        </Thead>

        <Tbody>
          {arrays?.length > 0 ?
            arrays[index].map((column: any, i: number) =>
              <Tr key={i}>
                { rows.map((row: any, i: number) => 
                  <td key={i}>
                    {row.component ? row.component(column) : column[row.id]}
                  </td>
                )}
              </Tr>
            ) : 
            <Tr>
              <Td colSpan={10}>
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='row'>
                  <Box mr={10}><GoAlertFill/></Box>
                  <p>No Data</p>
                </Box>
              </Td>
            </Tr>
        
          }
        </Tbody>
      </ChakraTable>
      <Box>
        {(index + 1) * amount} of {columns.length }
        <Button onClick={() => setIndex(index === arrays.length - 1 ? 0 : index + 1)}>Next</Button>
        <Button onClick={() => setIndex(index === 0 ?  arrays.length - 1 : index - 1)}>Back</Button>

      </Box>
    </>
  )
}

export default Table