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

const RiskCreateDialogComponent = (props) => {
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
          
            if (_.isEmpty(_entity?.name)) {
                error["name"] = `Risiko field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.owner)) {
                error["owner"] = `Pemilik Risiko field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.type)) {
                error["type"] = `Jenis field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.category)) {
                error["category"] = `Kategori field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.mitigation)) {
                error["mitigation"] = `Cara Pencegahan field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.probability)) {
                error["probability"] = `Kebarangkalian field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.impact)) {
                error["impact"] = `Impak field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            name: _entity?.name,owner: _entity?.owner,type: _entity?.type,category: _entity?.category,mitigation: _entity?.mitigation,probability: _entity?.probability,impact: _entity?.impact,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("risk").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Risk created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Risk" });
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
        <Dialog header="Create Risk" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="risk-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="name">Risiko:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="owner">Pemilik Risiko:</label>
                <InputText id="owner" className="w-full mb-3 p-inputtext-sm" value={_entity?.owner} onChange={(e) => setValByKey("owner", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["owner"]) ? (
              <p className="m-0" key="error-owner">
                {error["owner"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="type">Jenis:</label>
                <InputText id="type" className="w-full mb-3 p-inputtext-sm" value={_entity?.type} onChange={(e) => setValByKey("type", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["type"]) ? (
              <p className="m-0" key="error-type">
                {error["type"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="category">Kategori:</label>
                <InputText id="category" className="w-full mb-3 p-inputtext-sm" value={_entity?.category} onChange={(e) => setValByKey("category", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["category"]) ? (
              <p className="m-0" key="error-category">
                {error["category"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="mitigation">Cara Pencegahan:</label>
                <InputTextarea id="mitigation" rows={5} cols={30} value={_entity?.mitigation} onChange={ (e) => setValByKey("mitigation", e.target.value)} autoResize  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["mitigation"]) ? (
              <p className="m-0" key="error-mitigation">
                {error["mitigation"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="probability">Kebarangkalian:</label>
                <InputText id="probability" className="w-full mb-3 p-inputtext-sm" value={_entity?.probability} onChange={(e) => setValByKey("probability", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["probability"]) ? (
              <p className="m-0" key="error-probability">
                {error["probability"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="impact">Impak:</label>
                <InputText id="impact" className="w-full mb-3 p-inputtext-sm" value={_entity?.impact} onChange={(e) => setValByKey("impact", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["impact"]) ? (
              <p className="m-0" key="error-impact">
                {error["impact"]}
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

export default connect(mapState, mapDispatch)(RiskCreateDialogComponent);
