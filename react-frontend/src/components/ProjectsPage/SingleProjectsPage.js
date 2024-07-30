import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import { Calendar } from 'primereact/calendar';

const SingleProjectsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("projects")
            .get(urlParams.singleProjectsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Projects", type: "error", message: error.message || "Failed get projects" });
            });
    }, [props,urlParams.singleProjectsId]);


    const goBack = () => {
        navigate("/projects");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Projects</h3>
                </div>
                <p>projects/{urlParams.singleProjectsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Teras Strategik</label><p className="m-0 ml-3" >{_entity?.strategic}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Bidang Tumpuan/Sektor</label><p className="m-0 ml-3" >{_entity?.sector}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Kod PPI</label><p className="m-0 ml-3" >{_entity?.codePPI}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Adakah projek ini fizikal atau</label><p className="m-0 ml-3" >{_entity?.projectType}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">STANCO</label><p className="m-0 ml-3" >{_entity?.stanco}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Projek Category</label><p className="m-0 ml-3" >{_entity?.categoryProject}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Keterangan PPI</label><p className="m-0 ml-3" >{_entity?.ppiExplaination}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Tarikh Mula</label><p id="startDate" className="m-0 ml-3" >{_entity?.startDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">EndDate</label><p id="endDate" className="m-0 ml-3" >{_entity?.endDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Pemilik PPI</label><p className="m-0 ml-3" >{_entity?.ppiOwner}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Kontraktor PPI</label><p className="m-0 ml-3" >{_entity?.contractorPPI}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Sumber Kewangan</label><p className="m-0 ml-3" >{_entity?.financialSource}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Status PPI</label><p className="m-0 ml-3" >{_entity?.ppiStatus}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">KetuaTerasVal</label><p className="m-0 ml-3" >{_entity?.ketuaTerasVal}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Ketua Bidang PPI</label><p className="m-0 ml-3" >{_entity?.ketuaBidangVal}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Pegawai Penguasa PPI</label><p className="m-0 ml-3" >{_entity?.pegawaiPenguasaVal}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="last Updated By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="updated At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                    </div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleProjectsPage);
