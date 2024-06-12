/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import './table.scss'
import { GoAlertFill } from 'react-icons/go'
import { Select,Text } from '@chakra-ui/react'
import { MdNavigateNext,MdLastPage, MdFirstPage, MdNavigateBefore } from 'react-icons/md'



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
  pagination?: boolean;

}

const Table = ({ columns, rows, pagination , amount = 10 }: TableProps) => {
  const [index, setIndex] = useState(0)
  const [showAmount, setShowAmount] = useState<number>(amount)

  
  const arrays = columns.length > 0 ? Array.from({ length: Math.ceil(columns.length / showAmount) }, (v, i) =>
    columns.slice(i * showAmount, i * showAmount + showAmount)) : columns
  

  console.log(arrays)
  console.log(columns)
  return (
    <>
      <ChakraTable>
        <Thead>
          <Tr>
            {rows.map((row:any,i:number) => <td key={i}>{row.header}</td>)}
          </Tr>
        </Thead>

        <Tbody>
          {arrays?.length >= 0 ?
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
                  <Text>No Data</Text>
                </Box>
              </Td>
            </Tr>
        
          }
        </Tbody>
      </ChakraTable>

      {pagination &&
        <Box display='flex' className='pagination-container'>
          <Box display='flex' justifyContent='space-between'  width='100%' alignItems='center'>
            <small> {(index + 1) * showAmount} of {columns.length } results </small>

            <Box display='flex'>
              <MdFirstPage/>
              <MdNavigateBefore onClick={() => setIndex(index === 0 ? arrays.length - 1 : index - 1)}/>
              <MdNavigateNext onClick={() => setIndex(index === arrays.length - 1 ? 0 : index + 1)} />
              <MdLastPage/>
            </Box>
          

            <Box display='flex' alignItems='center'> 
              <small style={{ whiteSpace: 'nowrap' }}>Per page</small>
              <Select size='xs' onChange={(e) => setShowAmount(parseInt(e.target.value))}>
                {columns.length > 10  && <option value={10} >10</option>}
                {columns.length > 25  && <option value={25} >25</option>}
                {columns.length > 50  && <option value={50} >50</option>}
                {columns.length > 100 && <option value={100} >100</option>}
                <option value={columns.length} >All</option>
              </Select>
            </Box>
          </Box>
        </Box>
      }
    </>
  )
}

export default Table