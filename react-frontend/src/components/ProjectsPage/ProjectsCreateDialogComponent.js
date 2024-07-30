import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const ProjectsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {startDate:new Date(),endDate:new Date()};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.strategic)) {
                error["strategic"] = `Teras Strategik field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.sector)) {
                error["sector"] = `Bidang Tumpuan/Sektor field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.codePPI)) {
                error["codePPI"] = `Kod PPI field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.projectType)) {
                error["projectType"] = `Adakah projek ini fizikal atau field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.stanco)) {
                error["stanco"] = `STANCO field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.categoryProject)) {
                error["categoryProject"] = `Projek Category field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.ppiExplaination)) {
                error["ppiExplaination"] = `Keterangan PPI field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.ppiOwner)) {
                error["ppiOwner"] = `Pemilik PPI field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.contractorPPI)) {
                error["contractorPPI"] = `Kontraktor PPI field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.financialSource)) {
                error["financialSource"] = `Sumber Kewangan field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.ppiStatus)) {
                error["ppiStatus"] = `Status PPI field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.ketuaTerasVal)) {
                error["ketuaTerasVal"] = `KetuaTerasVal field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.ketuaBidangVal)) {
                error["ketuaBidangVal"] = `Ketua Bidang PPI field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.pegawaiPenguasaVal)) {
                error["pegawaiPenguasaVal"] = `Pegawai Penguasa PPI field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            strategic: _entity?.strategic,sector: _entity?.sector,codePPI: _entity?.codePPI,projectType: _entity?.projectType,stanco: _entity?.stanco,categoryProject: _entity?.categoryProject,ppiExplaination: _entity?.ppiExplaination,startDate: _entity?.startDate,endDate: _entity?.endDate,ppiOwner: _entity?.ppiOwner,contractorPPI: _entity?.contractorPPI,financialSource: _entity?.financialSource,ppiStatus: _entity?.ppiStatus,ketuaTerasVal: _entity?.ketuaTerasVal,ketuaBidangVal: _entity?.ketuaBidangVal,pegawaiPenguasaVal: _entity?.pegawaiPenguasaVal,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("projects").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Projects created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Projects" });
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
        <Dialog header="Create Projects" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="projects-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="strategic">Teras Strategik:</label>
                <InputText id="strategic" className="w-full mb-3 p-inputtext-sm" value={_entity?.strategic} onChange={(e) => setValByKey("strategic", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["strategic"]) ? (
              <p className="m-0" key="error-strategic">
                {error["strategic"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="sector">Bidang Tumpuan/Sektor:</label>
                <InputText id="sector" className="w-full mb-3 p-inputtext-sm" value={_entity?.sector} onChange={(e) => setValByKey("sector", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sector"]) ? (
              <p className="m-0" key="error-sector">
                {error["sector"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="codePPI">Kod PPI:</label>
                <InputText id="codePPI" className="w-full mb-3 p-inputtext-sm" value={_entity?.codePPI} onChange={(e) => setValByKey("codePPI", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["codePPI"]) ? (
              <p className="m-0" key="error-codePPI">
                {error["codePPI"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="projectType">Adakah projek ini fizikal atau:</label>
                <InputText id="projectType" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectType} onChange={(e) => setValByKey("projectType", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectType"]) ? (
              <p className="m-0" key="error-projectType">
                {error["projectType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="stanco">STANCO:</label>
                <InputText id="stanco" className="w-full mb-3 p-inputtext-sm" value={_entity?.stanco} onChange={(e) => setValByKey("stanco", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stanco"]) ? (
              <p className="m-0" key="error-stanco">
                {error["stanco"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="categoryProject">Projek Category:</label>
                <InputText id="categoryProject" className="w-full mb-3 p-inputtext-sm" value={_entity?.categoryProject} onChange={(e) => setValByKey("categoryProject", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["categoryProject"]) ? (
              <p className="m-0" key="error-categoryProject">
                {error["categoryProject"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="ppiExplaination">Keterangan PPI:</label>
                <InputTextarea id="ppiExplaination" rows={5} cols={30} value={_entity?.ppiExplaination} onChange={ (e) => setValByKey("ppiExplaination", e.target.value)} autoResize  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ppiExplaination"]) ? (
              <p className="m-0" key="error-ppiExplaination">
                {error["ppiExplaination"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="startDate">Tarikh Mula:</label>
                <Calendar id="startDate" value={_entity?.startDate ? new Date(_entity?.startDate) : new Date()} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("startDate", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["startDate"]) ? (
              <p className="m-0" key="error-startDate">
                {error["startDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="endDate">EndDate:</label>
                <Calendar id="endDate" value={_entity?.endDate ? new Date(_entity?.endDate) : new Date()} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("endDate", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["endDate"]) ? (
              <p className="m-0" key="error-endDate">
                {error["endDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="ppiOwner">Pemilik PPI:</label>
                <InputText id="ppiOwner" className="w-full mb-3 p-inputtext-sm" value={_entity?.ppiOwner} onChange={(e) => setValByKey("ppiOwner", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ppiOwner"]) ? (
              <p className="m-0" key="error-ppiOwner">
                {error["ppiOwner"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="contractorPPI">Kontraktor PPI:</label>
                <InputText id="contractorPPI" className="w-full mb-3 p-inputtext-sm" value={_entity?.contractorPPI} onChange={(e) => setValByKey("contractorPPI", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["contractorPPI"]) ? (
              <p className="m-0" key="error-contractorPPI">
                {error["contractorPPI"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="financialSource">Sumber Kewangan:</label>
                <InputText id="financialSource" className="w-full mb-3 p-inputtext-sm" value={_entity?.financialSource} onChange={(e) => setValByKey("financialSource", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["financialSource"]) ? (
              <p className="m-0" key="error-financialSource">
                {error["financialSource"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="ppiStatus">Status PPI:</label>
                <InputText id="ppiStatus" className="w-full mb-3 p-inputtext-sm" value={_entity?.ppiStatus} onChange={(e) => setValByKey("ppiStatus", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ppiStatus"]) ? (
              <p className="m-0" key="error-ppiStatus">
                {error["ppiStatus"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="ketuaTerasVal">KetuaTerasVal:</label>
                <InputText id="ketuaTerasVal" className="w-full mb-3 p-inputtext-sm" value={_entity?.ketuaTerasVal} onChange={(e) => setValByKey("ketuaTerasVal", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ketuaTerasVal"]) ? (
              <p className="m-0" key="error-ketuaTerasVal">
                {error["ketuaTerasVal"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="ketuaBidangVal">Ketua Bidang PPI:</label>
                <InputText id="ketuaBidangVal" className="w-full mb-3 p-inputtext-sm" value={_entity?.ketuaBidangVal} onChange={(e) => setValByKey("ketuaBidangVal", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ketuaBidangVal"]) ? (
              <p className="m-0" key="error-ketuaBidangVal">
                {error["ketuaBidangVal"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="pegawaiPenguasaVal">Pegawai Penguasa PPI:</label>
                <InputText id="pegawaiPenguasaVal" className="w-full mb-3 p-inputtext-sm" value={_entity?.pegawaiPenguasaVal} onChange={(e) => setValByKey("pegawaiPenguasaVal", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["pegawaiPenguasaVal"]) ? (
              <p className="m-0" key="error-pegawaiPenguasaVal">
                {error["pegawaiPenguasaVal"]}
              </p>
            ) : null}
          </small>
            </div>
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
