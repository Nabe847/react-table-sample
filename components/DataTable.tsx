import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export const DataTable = ({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: {
    header: string;
    isNumeric?: boolean;
  }[];
  rows: (string | number)[][];
}) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>{caption}</TableCaption>
        <Thead>
          <Tr>
            {columns.map(({ header, isNumeric }, i) => (
              <Th key={i} isNumeric={isNumeric}>
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, i) => (
            <Tr key={i}>
              {row.map((value, j) => (
                <Td key={j} isNumeric={columns[j].isNumeric}>
                  {value}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
