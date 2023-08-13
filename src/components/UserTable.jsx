import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  EditIcon,
  DeleteIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import { HEADER_BG, HEADER_FONT, HEADER_HOVER } from './constant';

const UserTable = ({ users, onDelete, onEdit }) => {
  const bgHeader = useColorModeValue(HEADER_BG.LIGHT, HEADER_BG.DARK);
  const fontColor = useColorModeValue(HEADER_FONT.LIGHT, HEADER_FONT.DARK);
  const hoverBg = useColorModeValue(HEADER_HOVER.LIGHT, HEADER_HOVER.DARK);
  const hoverBgDark = useColorModeValue(HEADER_HOVER.DARK, HEADER_HOVER.LIGHT);
  const data = React.useMemo(() => users, [users]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'id',
      },
      {
        Header: 'Image',
        accessor: 'image',
        Cell: ({ value }) => <Avatar size="sm" src={value} />,
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <IconButton
              icon={<EditIcon />}
              onClick={() => onEdit(row.original)}
              mr={2}
              bg={bgHeader}
              _hover={{ backgroundColor: hoverBg }}
              _dark={{ _hover: { backgroundColor: hoverBgDark } }}
              color={fontColor}
            />
            <IconButton
              color={fontColor}
              bg={bgHeader}
              _hover={{ backgroundColor: hoverBg }}
              _dark={{ _hover: { backgroundColor: hoverBgDark } }}
              icon={<DeleteIcon />}
              onClick={() => onDelete(row.original.id)}
            />
          </div>
        ),
        disableSortBy: true,
      },
    ],
    [bgHeader, hoverBg, hoverBgDark, fontColor, onEdit, onDelete]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <Table {...getTableProps()} variant="simple">
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <TriangleDownIcon ml="2px" />
                  ) : (
                    <TriangleUpIcon ml="2px" />
                  )
                ) : null}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows?.length > 0 ? (
          rows.map(row => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  );
                })}
              </Tr>
            );
          })
        ) : (
          <Tr>
            <Td colSpan={columns.length} textAlign="center">There are no data to display</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default UserTable;
