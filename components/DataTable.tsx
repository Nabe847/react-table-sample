import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Cell, HeaderGroup, Row, TableBodyProps, useTable } from "react-table";

type Overflow = "visible" | "hidden";

type OnRowClick<T extends object> = (row: T) => void;

export type DataTableColumn<T extends object> = {
  readonly Header: string;
  readonly accessor: keyof T;
  readonly width?: string;
  readonly overflow?: Overflow;
  readonly Cell?: ({ value }: { value: any }) => ReactJSXElement;
};

const TableHeader = <T extends object>({
  headerGroups,
  color,
  backgroundColor,
}: {
  headerGroups: HeaderGroup<T>[];
  color: string;
  backgroundColor: string;
}) => (
  <Thead backgroundColor={backgroundColor}>
    {headerGroups.map((headerGroup, i) => (
      <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
        {headerGroup.headers.map((header: HeaderGroup<T>, j) => (
          <TableHeaderCell key={j} header={header} color={color} />
        ))}
      </Tr>
    ))}
  </Thead>
);

const TableHeaderCell = <T extends object>({
  header,
  color,
}: {
  header: HeaderGroup<T>;
  color: string;
}) => (
  <Th
    {...header.getHeaderProps()}
    color={color}
    width={(header as unknown as DataTableColumn<T>).width}
  >
    {header.render("Header")}
  </Th>
);

const TableBody = <T extends object>({
  tableBodyProps,
  columns,
  rows,
  onRowClick,
  prepareRow,
}: {
  tableBodyProps: TableBodyProps;
  columns: DataTableColumn<T>[];
  rows: Row<T>[];
  onRowClick?: OnRowClick<T>;
  prepareRow: (row: Row<T>) => void;
}) => (
  <Tbody {...tableBodyProps}>
    {rows.map((row, i_row) => {
      prepareRow(row);
      return (
        <Tr
          {...row.getRowProps()}
          key={i_row}
          onClick={() => onRowClick && onRowClick(row.values as T)}
          _hover={{ opacity: 0.5 }}
        >
          {row.cells.map((cell, i_cell) => (
            <TableCell
              cell={cell}
              key={i_cell}
              overflow={
                (columns[i_cell] as unknown as DataTableColumn<T>).overflow
              }
            />
          ))}
        </Tr>
      );
    })}
  </Tbody>
);

const TableCell = <T extends object>({
  cell,
  overflow,
}: {
  cell: Cell<T, unknown>;
  overflow?: Overflow;
}) => (
  <Td
    {...(overflow === "hidden"
      ? {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }
      : {})}
  >
    {cell.render("Cell")}
  </Td>
);

export const DataTable = <T extends object>({
  columns,
  data,
  onRowClick,
}: {
  columns: DataTableColumn<T>[];
  data: T[];
  onRowClick?: OnRowClick<T>;
}) => {
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <TableContainer>
      <Table
        variant="striped"
        colorScheme="gray"
        size="md"
        css={{ tableLayout: "fixed" }}
        {...getTableProps()}
      >
        <TableHeader
          headerGroups={headerGroups}
          color="white"
          backgroundColor="gray"
        />
        <TableBody
          tableBodyProps={getTableBodyProps()}
          columns={columns}
          rows={rows}
          onRowClick={onRowClick}
          prepareRow={prepareRow}
        />
      </Table>
    </TableContainer>
  );
};
