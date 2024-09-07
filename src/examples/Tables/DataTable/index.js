import React, { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ArgonSelect from "../../../components/ArgonSelect/index";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
import { Table, TableBody, TableContainer, TableRow, Icon, TableCell } from "@mui/material";
import ArgonButton from "components/ArgonButton";
// Your existing imports
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonPagination from "components/ArgonPagination";
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

function DataTable({
  entriesPerPage,
  canSearch,
  noEndBorder,
  showTotalEntries,
  pagination,
  table,
  isSorted, //staff screen
  showNewUserButton,
  handleFormOpen,
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries ? entriesPerPage.entries : [5, 10, 15, 20, 25];
  const columns = useMemo(() => table?.columns || [], [table]);
  const data = useMemo(() => table?.rows || [], [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  const setEntriesPerPage = ({ value }) => setPageSize(value);

  const renderPagination = pageOptions.map((option) => (
    <ArgonPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </ArgonPagination>
  ));

  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  const customizedPageOptions = pageOptions.map((option) => option + 1);

  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  const [search, setSearch] = useState(globalFilter);

  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <TableContainer sx={{ boxShadow: "none", overflowX: "auto" }}>
      {entriesPerPage || canSearch ? (
        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {showNewUserButton && (
            <ArgonBox>
              <ArgonBox display="inline-flex" justifyContent="space-between" alignItems="center">
                <ArgonButton sx={{ backgroundColor: "#11cdef" }} onClick={handleFormOpen}>
                  Add New user
                </ArgonButton>
              </ArgonBox>
            </ArgonBox>
          )}
          {canSearch && (
            <ArgonBox width="12rem" ml="auto">
              <ArgonInput
                placeholder="Search..."
                value={search}
                onChange={({ currentTarget }) => {
                  setSearch(search);
                  onSearchChange(currentTarget.value);
                }}
              />
            </ArgonBox>
          )}
        </ArgonBox>
      ) : null}

      <ArgonBox style={{ overflowX: "auto" }}>
        <Table {...getTableProps()}>
          <ArgonBox component="thead" sx={{ backgroundColor: "#11cdef" }}>
            {headerGroups.map((headerGroup, key) => (
              <>
                <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <DataTableHeadCell
                      key={index}
                      {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                      width={column.width ? column.width : "auto"}
                      align={column.align ? column.align : "center"}
                      sorted={setSortedValue(column)}
                      style={{
                        color: "white",
                      }}
                    >
                      {column.render("Header")}
                    </DataTableHeadCell>
                  ))}
                </TableRow>
              </>
            ))}
          </ArgonBox>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, key) => {
              prepareRow(row);
              return (
                <>
                  <TableRow key={key} {...row.getRowProps()}>
                    {row.cells.map((cell, index) => (
                      <>
                        {" "}
                        <DataTableBodyCell
                          key={index}
                          noBorder={noEndBorder && rows.length - 1 === key}
                          align={cell.column.align ? cell.column.align : "center"}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </DataTableBodyCell>
                      </>
                    ))}
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </ArgonBox>

      <ArgonBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <ArgonBox mb={{ xs: 3, sm: 0 }}>
            <ArgonTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </ArgonTypography>
          </ArgonBox>
        )}

        {entriesPerPage && (
          <ArgonBox display="flex" alignItems="center">
            <ArgonBox width="25%">
              <ArgonSelect
                defaultValue={{ value: defaultValue, label: defaultValue }}
                options={entries.map((entry) => ({ value: entry, label: entry }))}
                onChange={setEntriesPerPage}
                size="small"
              />
            </ArgonBox>
            <ArgonTypography variant="caption" color="secondary">
              &nbsp;&nbsp;entries per page
            </ArgonTypography>
          </ArgonBox>
        )}

        {pageOptions.length > 1 && (
          <ArgonPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <ArgonPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </ArgonPagination>
            )}
            {renderPagination.length > 6 ? (
              <ArgonBox width="5rem" mx={1}>
                <ArgonInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </ArgonBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <ArgonPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </ArgonPagination>
            )}
          </ArgonPagination>
        )}
      </ArgonBox>
    </TableContainer>
  );
}

DataTable.propTypes = {
  entriesPerPage: PropTypes.object,
  canSearch: PropTypes.bool,
  noEndBorder: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  isSorted: PropTypes.bool,
  showNewUserButton: PropTypes.bool,
  handleFormOpen: PropTypes.func,
  table: PropTypes.shape({
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
  }).isRequired,

  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "outlined", "text"]),
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error"]),
  }),
  isSorted: PropTypes.bool,
};

DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10 },
  canSearch: true,
  noEndBorder: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
};

export default DataTable;
