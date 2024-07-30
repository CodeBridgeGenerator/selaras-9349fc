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

const IssueCreateDialogComponent = (props) => {
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
          
            if (_.isEmpty(_entity?.category)) {
                error["category"] = `Kategori Isu field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.issueName)) {
                error["issueName"] = `Keterangan Isu field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.priorityStatus)) {
                error["priorityStatus"] = `Keutamaan Isu field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.issueOwner)) {
                error["issueOwner"] = `IssueOwner field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            category: _entity?.category,issueName: _entity?.issueName,priorityStatus: _entity?.priorityStatus,issueOwner: _entity?.issueOwner,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("issue").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Issue created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Issue" });
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
        <Dialog header="Create Issue" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="issue-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="category">Kategori Isu:</label>
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
                <label htmlFor="issueName">Keterangan Isu:</label>
                <InputTextarea id="issueName" rows={5} cols={30} value={_entity?.issueName} onChange={ (e) => setValByKey("issueName", e.target.value)} autoResize  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["issueName"]) ? (
              <p className="m-0" key="error-issueName">
                {error["issueName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="priorityStatus">Keutamaan Isu:</label>
                <InputText id="priorityStatus" className="w-full mb-3 p-inputtext-sm" value={_entity?.priorityStatus} onChange={(e) => setValByKey("priorityStatus", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["priorityStatus"]) ? (
              <p className="m-0" key="error-priorityStatus">
                {error["priorityStatus"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="issueOwner">IssueOwner:</label>
                <InputText id="issueOwner" className="w-full mb-3 p-inputtext-sm" value={_entity?.issueOwner} onChange={(e) => setValByKey("issueOwner", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["issueOwner"]) ? (
              <p className="m-0" key="error-issueOwner">
                {error["issueOwner"]}
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

export default connect(mapState, mapDispatch)(IssueCreateDialogComponent);
