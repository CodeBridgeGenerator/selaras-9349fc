import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ProjectsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            strategic: _entity?.strategic,
sector: _entity?.sector,
codePPI: _entity?.codePPI,
projectType: _entity?.projectType,
stanco: _entity?.stanco,
categoryProject: _entity?.categoryProject,
ppiExplaination: _entity?.ppiExplaination,
startDate: _entity?.startDate,
endDate: _entity?.endDate,
ppiOwner: _entity?.ppiOwner,
contractorPPI: _entity?.contractorPPI,
financialSource: _entity?.financialSource,
ppiStatus: _entity?.ppiStatus,
ketuaTerasVal: _entity?.ketuaTerasVal,
ketuaBidangVal: _entity?.ketuaBidangVal,
pegawaiPenguasaVal: _entity?.pegawaiPenguasaVal,
        };

        setLoading(true);
        try {
            
        const result = await client.service("projects").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info projects updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Edit Projects" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="projects-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="strategic">Teras Strategik:</label>
            <InputText id="strategic" className="w-full mb-3 p-inputtext-sm" value={_entity?.strategic} onChange={(e) => setValByKey("strategic", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="sector">Bidang Tumpuan/Sektor:</label>
            <InputText id="sector" className="w-full mb-3 p-inputtext-sm" value={_entity?.sector} onChange={(e) => setValByKey("sector", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="codePPI">Kod PPI:</label>
            <InputText id="codePPI" className="w-full mb-3 p-inputtext-sm" value={_entity?.codePPI} onChange={(e) => setValByKey("codePPI", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="projectType">Adakah projek ini fizikal atau:</label>
            <InputText id="projectType" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectType} onChange={(e) => setValByKey("projectType", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="stanco">STANCO:</label>
            <InputText id="stanco" className="w-full mb-3 p-inputtext-sm" value={_entity?.stanco} onChange={(e) => setValByKey("stanco", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="categoryProject">Projek Category:</label>
            <InputText id="categoryProject" className="w-full mb-3 p-inputtext-sm" value={_entity?.categoryProject} onChange={(e) => setValByKey("categoryProject", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="ppiExplaination">Keterangan PPI:</label>
            <InputTextarea id="ppiExplaination" rows={5} cols={30} value={_entity?.ppiExplaination} onChange={ (e) => setValByKey("ppiExplaination", e.target.value)} autoResize  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="startDate">Tarikh Mula:</label>
            <Calendar id="startDate" value={_entity?.startDate ? new Date(_entity?.startDate) : new Date()} onChange={ (e) => setValByKey("startDate", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="endDate">EndDate:</label>
            <Calendar id="endDate" value={_entity?.endDate ? new Date(_entity?.endDate) : new Date()} onChange={ (e) => setValByKey("endDate", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="ppiOwner">Pemilik PPI:</label>
            <InputText id="ppiOwner" className="w-full mb-3 p-inputtext-sm" value={_entity?.ppiOwner} onChange={(e) => setValByKey("ppiOwner", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="contractorPPI">Kontraktor PPI:</label>
            <InputText id="contractorPPI" className="w-full mb-3 p-inputtext-sm" value={_entity?.contractorPPI} onChange={(e) => setValByKey("contractorPPI", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="financialSource">Sumber Kewangan:</label>
            <InputText id="financialSource" className="w-full mb-3 p-inputtext-sm" value={_entity?.financialSource} onChange={(e) => setValByKey("financialSource", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="ppiStatus">Status PPI:</label>
            <InputText id="ppiStatus" className="w-full mb-3 p-inputtext-sm" value={_entity?.ppiStatus} onChange={(e) => setValByKey("ppiStatus", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="ketuaTerasVal">KetuaTerasVal:</label>
            <InputText id="ketuaTerasVal" className="w-full mb-3 p-inputtext-sm" value={_entity?.ketuaTerasVal} onChange={(e) => setValByKey("ketuaTerasVal", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="ketuaBidangVal">Ketua Bidang PPI:</label>
            <InputText id="ketuaBidangVal" className="w-full mb-3 p-inputtext-sm" value={_entity?.ketuaBidangVal} onChange={(e) => setValByKey("ketuaBidangVal", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="pegawaiPenguasaVal">Pegawai Penguasa PPI:</label>
            <InputText id="pegawaiPenguasaVal" className="w-full mb-3 p-inputtext-sm" value={_entity?.pegawaiPenguasaVal} onChange={(e) => setValByKey("pegawaiPenguasaVal", e.target.value)}  required  />
        </span>
        </div>
                <div className="col-12">&nbsp;</div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created At:"></Tag>{" " + moment(_entity?.createdAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created By:"></Tag>{" " +_entity?.createdBy?.name}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated At:"></Tag>{" " + moment(_entity?.updatedAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated By:"></Tag>{" " +_entity?.updatedBy?.name}</p></div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ProjectsCreateDialogComponent);
