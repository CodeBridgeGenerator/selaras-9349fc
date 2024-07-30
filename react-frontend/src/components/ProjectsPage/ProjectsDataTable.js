import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../services/uploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../utils/DownloadCSV";

const ProjectsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');

const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.strategic}</p>
const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.sector}</p>
const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.codePPI}</p>
const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.projectType}</p>
const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.stanco}</p>
const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.categoryProject}</p>
const inputTextareaTemplate6 = (rowData, { rowIndex }) => <p >{rowData.ppiExplaination}</p>
const calendarTemplate7 = (rowData, { rowIndex }) => <p>{new Date(rowData.startDate).toLocaleDateString()}</p>
const calendarTemplate8 = (rowData, { rowIndex }) => <p>{new Date(rowData.endDate).toLocaleDateString()}</p>
const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.ppiOwner}</p>
const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.contractorPPI}</p>
const pTemplate11 = (rowData, { rowIndex }) => <p >{rowData.financialSource}</p>
const pTemplate12 = (rowData, { rowIndex }) => <p >{rowData.ppiStatus}</p>
const pTemplate13 = (rowData, { rowIndex }) => <p >{rowData.ketuaTerasVal}</p>
const pTemplate14 = (rowData, { rowIndex }) => <p >{rowData.ketuaBidangVal}</p>
const pTemplate15 = (rowData, { rowIndex }) => <p >{rowData.pegawaiPenguasaVal}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;
    const paginatorLeft = <Button type="button" icon="pi pi-upload" text onClick={() => setShowUpload(true)} disabled={!false}/>;
    const paginatorRight = DownloadCSV({ data : items, fileName : "projects"});
    const exportCSV = () => {dt.current?.exportCSV();};

    return (
        <>
        <DataTable value={items} ref={dt} removableSort onRowClick={onRowClick} scrollable rowHover stripedRows paginator rows={10} rowsPerPageOptions={[10, 50, 250, 500]} size={"small"}  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} rowClassName="cursor-pointer" alwaysShowPaginator={!urlParams.singleUsersId} loading={loading}>
<Column field="strategic" header="Teras Strategik" body={pTemplate0} filter={selectedFilterFields.includes("strategic")} hidden={selectedHideFields?.includes("strategic")}  sortable style={{ minWidth: "8rem" }} />
<Column field="sector" header="Bidang Tumpuan/Sektor" body={pTemplate1} filter={selectedFilterFields.includes("sector")} hidden={selectedHideFields?.includes("sector")}  sortable style={{ minWidth: "8rem" }} />
<Column field="codePPI" header="Kod PPI" body={pTemplate2} filter={selectedFilterFields.includes("codePPI")} hidden={selectedHideFields?.includes("codePPI")}  sortable style={{ minWidth: "8rem" }} />
<Column field="projectType" header="Adakah projek ini fizikal atau" body={pTemplate3} filter={selectedFilterFields.includes("projectType")} hidden={selectedHideFields?.includes("projectType")}  sortable style={{ minWidth: "8rem" }} />
<Column field="stanco" header="STANCO" body={pTemplate4} filter={selectedFilterFields.includes("stanco")} hidden={selectedHideFields?.includes("stanco")}  sortable style={{ minWidth: "8rem" }} />
<Column field="categoryProject" header="Projek Category" body={pTemplate5} filter={selectedFilterFields.includes("categoryProject")} hidden={selectedHideFields?.includes("categoryProject")}  sortable style={{ minWidth: "8rem" }} />
<Column field="ppiExplaination" header="Keterangan PPI" body={inputTextareaTemplate6} filter={selectedFilterFields.includes("ppiExplaination")} hidden={selectedHideFields?.includes("ppiExplaination")}  sortable style={{ minWidth: "8rem" }} />
<Column field="startDate" header="Tarikh Mula" body={calendarTemplate7} filter={selectedFilterFields.includes("startDate")} hidden={selectedHideFields?.includes("startDate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="endDate" header="EndDate" body={calendarTemplate8} filter={selectedFilterFields.includes("endDate")} hidden={selectedHideFields?.includes("endDate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="ppiOwner" header="Pemilik PPI" body={pTemplate9} filter={selectedFilterFields.includes("ppiOwner")} hidden={selectedHideFields?.includes("ppiOwner")}  sortable style={{ minWidth: "8rem" }} />
<Column field="contractorPPI" header="Kontraktor PPI" body={pTemplate10} filter={selectedFilterFields.includes("contractorPPI")} hidden={selectedHideFields?.includes("contractorPPI")}  sortable style={{ minWidth: "8rem" }} />
<Column field="financialSource" header="Sumber Kewangan" body={pTemplate11} filter={selectedFilterFields.includes("financialSource")} hidden={selectedHideFields?.includes("financialSource")}  sortable style={{ minWidth: "8rem" }} />
<Column field="ppiStatus" header="Status PPI" body={pTemplate12} filter={selectedFilterFields.includes("ppiStatus")} hidden={selectedHideFields?.includes("ppiStatus")}  sortable style={{ minWidth: "8rem" }} />
<Column field="ketuaTerasVal" header="KetuaTerasVal" body={pTemplate13} filter={selectedFilterFields.includes("ketuaTerasVal")} hidden={selectedHideFields?.includes("ketuaTerasVal")}  sortable style={{ minWidth: "8rem" }} />
<Column field="ketuaBidangVal" header="Ketua Bidang PPI" body={pTemplate14} filter={selectedFilterFields.includes("ketuaBidangVal")} hidden={selectedHideFields?.includes("ketuaBidangVal")}  sortable style={{ minWidth: "8rem" }} />
<Column field="pegawaiPenguasaVal" header="Pegawai Penguasa PPI" body={pTemplate15} filter={selectedFilterFields.includes("pegawaiPenguasaVal")} hidden={selectedHideFields?.includes("pegawaiPenguasaVal")}  sortable style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
        </DataTable>
        <Dialog header="Upload Projects Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService />
      </Dialog>

      <Dialog header="Search Projects" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default ProjectsDataTable;