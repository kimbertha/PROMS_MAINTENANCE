/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import './table.scss'
import { GoAlertFill } from 'react-icons/go'

import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Box,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Skeleton,
  Button
} from '@chakra-ui/react'
import { SearchBar } from '../search/Search'

interface TableProps {
  rows: any;
  columns?: any;
  loading?: boolean;

}

const Table = ({ columns,rows, loading }: TableProps) => {
  
  return (
    <ChakraTable>
      <Thead>
        <Tr>
          {rows.map((row:any,i:number) => <td key={i}>{row.header}</td>)}
        </Tr>
      </Thead>

      <Tbody>
        {columns?.length > 0 ?
          columns.map((column: any, i: number) =>
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
  )
}

export default Table