import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';

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

const ContractorCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.contractorName)) {
                error["contractorName"] = `Nama Kontraktor field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.registrationNo)) {
                error["registrationNo"] = `No. Pendaftaran field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.pegawaiPenguasaVal)) {
                error["pegawaiPenguasaVal"] = `Nama Pegawai Penguasa field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            contractorName: _entity?.contractorName,registrationNo: _entity?.registrationNo,pegawaiPenguasaVal: _entity?.pegawaiPenguasaVal,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("contractor").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Contractor created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Contractor" });
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
        <Dialog header="Create Contractor" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="contractor-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="contractorName">Nama Kontraktor:</label>
                <InputText id="contractorName" className="w-full mb-3 p-inputtext-sm" value={_entity?.contractorName} onChange={(e) => setValByKey("contractorName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["contractorName"]) ? (
              <p className="m-0" key="error-contractorName">
                {error["contractorName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="registrationNo">No. Pendaftaran:</label>
                <InputText id="registrationNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.registrationNo} onChange={(e) => setValByKey("registrationNo", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["registrationNo"]) ? (
              <p className="m-0" key="error-registrationNo">
                {error["registrationNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="pegawaiPenguasaVal">Nama Pegawai Penguasa:</label>
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

export default connect(mapState, mapDispatch)(ContractorCreateDialogComponent);
