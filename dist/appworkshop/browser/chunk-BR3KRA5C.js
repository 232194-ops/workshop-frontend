import{a as he,b as Ce}from"./chunk-WQDIUYUD.js";import{d as Se,e as xe}from"./chunk-V56VXY4S.js";import{a as _e,b as Ie}from"./chunk-NJ7TYCDW.js";import"./chunk-72ZOOTPI.js";import"./chunk-NZYGPSGV.js";import"./chunk-SUD6GLSX.js";import"./chunk-THSPXOVP.js";import"./chunk-WNL3VX7K.js";import{G as ve,K as fe,O as ye,T as ge,b as W,c as v,e as J,f as K,h as U,i as X,j as Y,k as Z,l as ee,m as te,o as ie,q as de,r as se,s as me,u as ue}from"./chunk-WN76KQZN.js";import"./chunk-XYC5HFGG.js";import{a as be}from"./chunk-ACBTV47M.js";import{$ as o,$c as ce,Ab as Q,B as S,Ba as R,Cc as re,G as d,Ha as q,Hc as oe,K as h,L as N,Lc as ae,Mc as le,Nc as b,O as P,Oc as I,P as A,S as O,V as f,W as y,X as T,Y as z,Z as G,_ as m,_c as pe,aa as n,ba as c,ia as j,jb as _,ka as C,l as E,la as g,m as w,ma as B,n as k,na as V,p as u,q as M,r as F,wb as L,wc as ne,xa as $,xb as H,ya as x,za as s}from"./chunk-GUBLIEO7.js";var De=`
    .p-divider-horizontal {
        display: flex;
        width: 100%;
        position: relative;
        align-items: center;
        margin: dt('divider.horizontal.margin');
        padding: dt('divider.horizontal.padding');
    }

    .p-divider-horizontal:before {
        position: absolute;
        display: block;
        inset-block-start: 50%;
        inset-inline-start: 0;
        width: 100%;
        content: '';
        border-block-start: 1px solid dt('divider.border.color');
    }

    .p-divider-horizontal .p-divider-content {
        padding: dt('divider.horizontal.content.padding');
    }

    .p-divider-vertical {
        min-height: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        margin: dt('divider.vertical.margin');
        padding: dt('divider.vertical.padding');
    }

    .p-divider-vertical:before {
        position: absolute;
        display: block;
        inset-block-start: 0;
        inset-inline-start: 50%;
        height: 100%;
        content: '';
        border-inline-start: 1px solid dt('divider.border.color');
    }

    .p-divider.p-divider-vertical .p-divider-content {
        padding: dt('divider.vertical.content.padding');
    }

    .p-divider-content {
        z-index: 1;
        background: dt('divider.content.background');
        color: dt('divider.content.color');
    }

    .p-divider-solid.p-divider-horizontal:before {
        border-block-start-style: solid;
    }

    .p-divider-solid.p-divider-vertical:before {
        border-inline-start-style: solid;
    }

    .p-divider-dashed.p-divider-horizontal:before {
        border-block-start-style: dashed;
    }

    .p-divider-dashed.p-divider-vertical:before {
        border-inline-start-style: dashed;
    }

    .p-divider-dotted.p-divider-horizontal:before {
        border-block-start-style: dotted;
    }

    .p-divider-dotted.p-divider-vertical:before {
        border-inline-start-style: dotted;
    }

    .p-divider-left:dir(rtl),
    .p-divider-right:dir(rtl) {
        flex-direction: row-reverse;
    }
`;var Ne=["*"],Pe={root:({instance:e})=>({justifyContent:e.layout==="horizontal"?e.align==="center"||e.align==null?"center":e.align==="left"?"flex-start":e.align==="right"?"flex-end":null:null,alignItems:e.layout==="vertical"?e.align==="center"||e.align==null?"center":e.align==="top"?"flex-start":e.align==="bottom"?"flex-end":null:null})},Ae={root:({instance:e})=>["p-divider p-component","p-divider-"+e.layout,"p-divider-"+e.type,{"p-divider-left":e.layout==="horizontal"&&(!e.align||e.align==="left")},{"p-divider-center":e.layout==="horizontal"&&e.align==="center"},{"p-divider-right":e.layout==="horizontal"&&e.align==="right"},{"p-divider-top":e.layout==="vertical"&&e.align==="top"},{"p-divider-center":e.layout==="vertical"&&(!e.align||e.align==="center")},{"p-divider-bottom":e.layout==="vertical"&&e.align==="bottom"}],content:"p-divider-content"},Ee=(()=>{class e extends ne{name="divider";style=De;classes=Ae;inlineStyles=Pe;static \u0275fac=(()=>{let r;return function(i){return(r||(r=S(e)))(i||e)}})();static \u0275prov=E({token:e,factory:e.\u0275fac})}return e})();var we=new k("DIVIDER_INSTANCE"),D=(()=>{class e extends le{componentName="Divider";$pcDivider=u(we,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=u(b,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;layout="horizontal";type="solid";align;_componentStyle=u(Ee);get dataP(){return this.cn({[this.align]:this.align,[this.layout]:this.layout,[this.type]:this.type})}static \u0275fac=(()=>{let r;return function(i){return(r||(r=S(e)))(i||e)}})();static \u0275cmp=h({type:e,selectors:[["p-divider"]],hostAttrs:["role","separator"],hostVars:6,hostBindings:function(t,i){t&2&&(O("aria-orientation",i.layout)("data-p",i.dataP),$(i.sx("root")),x(i.cn(i.cx("root"),i.styleClass)))},inputs:{styleClass:"styleClass",layout:"layout",type:"type",align:"align"},features:[q([Ee,{provide:we,useExisting:e},{provide:ae,useExisting:e}]),P([b]),A],ngContentSelectors:Ne,decls:2,vars:3,consts:[[3,"pBind"]],template:function(t,i){t&1&&(B(),o(0,"div",0),V(1),n()),t&2&&(x(i.cx("content")),m("pBind",i.ptm("content")))},dependencies:[_,oe,I,b],encapsulation:2,changeDetection:0})}return e})(),ke=(()=>{class e{static \u0275fac=function(t){return new(t||e)};static \u0275mod=N({type:e});static \u0275inj=w({imports:[D,I,I]})}return e})();function Te(e,a){e&1&&(o(0,"small",11),s(1,"La fecha de emisi\xF3n es requerida."),n())}function ze(e,a){e&1&&(o(0,"small",11),s(1,"El cliente es requerido."),n())}function Ge(e,a){if(e&1){let r=j();o(0,"p-button",29),C("click",function(){M(r);let i=g().$index,p=g();return F(p.removeDetail(i))}),n()}e&2&&m("text",!0)}function je(e,a){e&1&&(o(0,"small",11),s(1,"El concepto es requerido."),n())}function Be(e,a){if(e&1&&(o(0,"label"),s(1,"Servicio *"),n(),c(2,"p-select",30)),e&2){let r=g(2);d(2),m("options",r.services)}}function Ve(e,a){if(e&1&&(o(0,"label"),s(1,"Repuesto *"),n(),c(2,"p-select",31)),e&2){let r=g(2);d(2),m("options",r.spareParts)}}function $e(e,a){if(e&1&&(o(0,"div",16)(1,"div",20)(2,"span",21),s(3),n(),f(4,Ge,1,1,"p-button",22),n(),o(5,"div",23)(6,"div",9)(7,"label"),s(8,"Concepto *"),n(),c(9,"input",24),f(10,je,2,0,"small",11),n(),o(11,"div",9)(12,"label"),s(13,"Cantidad *"),n(),c(14,"p-inputnumber",25),n(),o(15,"div",9)(16,"label"),s(17,"Tipo *"),n(),c(18,"p-select",26),n(),o(19,"div",9),f(20,Be,3,1)(21,Ve,3,1),n(),o(22,"div",27)(23,"label"),s(24,"Orden de Trabajo (opcional)"),n(),c(25,"p-select",28),n()()()),e&2){let r,t,i=a.$index,p=g();m("formGroupName",i),d(3),R("L\xEDnea ",i+1),d(),y(p.detailsArray.length>1?4:-1),d(6),y((r=p.df(i,"concept"))!=null&&r.invalid&&((r=p.df(i,"concept"))!=null&&r.touched)?10:-1),d(4),m("useGrouping",!1)("min",1),d(4),m("options",p.typeOptions),d(2),y(((t=p.detailGroup(i).get("type"))==null?null:t.value)==="service"?20:21),d(5),m("options",p.workOrders)("showClear",!0)}}var Me=class e{fb=u(te);api=u(me);router=u(L);messageService=u(re);optionMenuService=u(be);form;loading=!1;customers=[];services=[];spareParts=[];workOrders=[];typeOptions=[{label:"Servicio",value:"service"},{label:"Repuesto",value:"sparePart"}];ngOnInit(){this.optionMenuService.sendData("invoicelist"),this.form=this.fb.group({issueDate:[new Date,v.required],customerId:[null,v.required],details:this.fb.array([])}),this.loadDropdowns(),this.addDetail()}async loadDropdowns(){try{let[a,r,t,i]=await Promise.all([this.api.invoke(ue),this.api.invoke(fe),this.api.invoke(ye),this.api.invoke(ve)]),p={PENDING:"Pendiente",IN_REPAIR:"En Reparaci\xF3n",FINISHED:"Finalizado",DELIVERED:"Entregado"};this.customers=(a.data??[]).map(l=>({label:`${l.firstName} ${l.surName}`,value:l.idCustomer})),this.services=(r.data??[]).map(l=>({label:`${l.name} (S/ ${l.price})`,value:l.idService})),this.spareParts=(t.data??[]).map(l=>({label:`${l.name} - ${l.brand??""} (Stock: ${l.stock})`,value:l.idSparePart})),this.workOrders=(i.data??[]).map(l=>({label:`${l.vehiclePlate} - ${p[l.status]||l.status}`,value:l.idWorkOrder}))}catch{}}get detailsArray(){return this.form.get("details")}addDetail(){let a=this.fb.group({concept:["",v.required],quantity:[1,[v.required,v.min(1)]],type:["service",v.required],serviceId:[null],sparePartId:[null],workOrderId:[null]});this.detailsArray.push(a)}removeDetail(a){this.detailsArray.length>1&&this.detailsArray.removeAt(a)}detailGroup(a){return this.detailsArray.at(a)}get totalEstimated(){return 0}async onSubmit(){if(this.form.invalid){this.form.markAllAsTouched();return}let a=this.form.value,r=a.details.map(t=>{let i={concept:t.concept,quantity:t.quantity,workOrderId:t.workOrderId||null};return t.type==="service"&&(i.serviceId=t.serviceId),t.type==="sparePart"&&(i.sparePartId=t.sparePartId),i});this.loading=!0;try{await this.api.invoke(ge,{body:{issueDate:a.issueDate.toISOString(),customerId:a.customerId,details:r}}),this.messageService.add({severity:"success",summary:"Creado",detail:"Factura creada con \xE9xito."}),this.router.navigate(["/invoice/list"])}catch(t){this.messageService.add({severity:"error",summary:"Error",detail:t?.error?.message||"La operaci\xF3n fall\xF3."})}finally{this.loading=!1}}f(a){return this.form.get(a)}df(a,r){return this.detailGroup(a).get(r)}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=h({type:e,selectors:[["app-invoice-insert"]],decls:34,vars:6,consts:[[1,"page-card"],[1,"page-header"],[1,"page-title"],[1,"pi","pi-file-check"],["routerLink","/invoice/list"],["label","Volver","icon","pi pi-arrow-left","size","small","severity","secondary"],[3,"ngSubmit","formGroup"],[1,"section-title"],[1,"form-grid","mb-4"],[1,"field"],["formControlName","issueDate","dateFormat","dd/mm/yy","styleClass","w-full","inputStyleClass","w-full",3,"showTime"],[1,"errorMessage"],["formControlName","customerId","placeholder","Seleccionar cliente","styleClass","w-full",3,"options"],[1,"section-header"],["label","Agregar L\xEDnea","icon","pi pi-plus","size","small","severity","secondary","type","button",3,"click"],["formArrayName","details"],[1,"detail-row",3,"formGroupName"],[1,"form-actions"],["type","submit","label","Crear Factura","icon","pi pi-check",3,"loading"],["type","button","label","Cancelar","icon","pi pi-times","severity","secondary"],[1,"detail-row-header"],[1,"detail-num"],["icon","pi pi-times","size","small","severity","danger","type","button","pTooltip","Quitar l\xEDnea",3,"text"],[1,"form-grid"],["pInputText","","formControlName","concept","placeholder","Descripci\xF3n del servicio o repuesto",1,"w-full"],["formControlName","quantity","styleClass","w-full","inputStyleClass","w-full",3,"useGrouping","min"],["formControlName","type","styleClass","w-full",3,"options"],[1,"field","field-full"],["formControlName","workOrderId","placeholder","Vincular a orden de trabajo","styleClass","w-full",3,"options","showClear"],["icon","pi pi-times","size","small","severity","danger","type","button","pTooltip","Quitar l\xEDnea",3,"click","text"],["formControlName","serviceId","placeholder","Seleccionar servicio","styleClass","w-full",3,"options"],["formControlName","sparePartId","placeholder","Seleccionar repuesto","styleClass","w-full",3,"options"]],template:function(r,t){if(r&1&&(o(0,"div",0)(1,"div",1)(2,"h2",2),c(3,"i",3),s(4," Nueva Factura"),n(),o(5,"a",4),c(6,"p-button",5),n()(),o(7,"form",6),C("ngSubmit",function(){return t.onSubmit()}),o(8,"div",7),s(9,"Cabecera de Factura"),n(),o(10,"div",8)(11,"div",9)(12,"label"),s(13,"Fecha de Emisi\xF3n *"),n(),c(14,"p-datepicker",10),f(15,Te,2,0,"small",11),n(),o(16,"div",9)(17,"label"),s(18,"Cliente *"),n(),c(19,"p-select",12),f(20,ze,2,0,"small",11),n()(),c(21,"p-divider"),o(22,"div",13)(23,"span",7),s(24,"Detalles de Factura"),n(),o(25,"p-button",14),C("click",function(){return t.addDetail()}),n()(),o(26,"div",15),z(27,$e,26,10,"div",16,T),n(),c(29,"p-divider"),o(30,"div",17),c(31,"p-button",18),o(32,"a",4),c(33,"p-button",19),n()()()()),r&2){let i,p;d(7),m("formGroup",t.form),d(7),m("showTime",!0),d(),y((i=t.f("issueDate"))!=null&&i.invalid&&((i=t.f("issueDate"))!=null&&i.touched)?15:-1),d(4),m("options",t.customers),d(),y((p=t.f("customerId"))!=null&&p.invalid&&((p=t.f("customerId"))!=null&&p.touched)?20:-1),d(7),G(t.detailsArray.controls),d(4),m("loading",t.loading)}},dependencies:[_,ie,U,W,J,K,ee,Z,X,Y,Q,H,se,de,Ie,_e,xe,Se,Ce,he,ce,pe,ke,D],styles:[".page-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem}.section-title[_ngcontent-%COMP%]{font-size:.95rem;font-weight:700;color:#0f172a;margin-bottom:.75rem;display:block}.section-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem}.form-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:1rem}.field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.35rem}.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:.85rem;font-weight:600;color:#374151}.field-full[_ngcontent-%COMP%]{grid-column:1 / -1}.mb-4[_ngcontent-%COMP%]{margin-bottom:1rem}.detail-row[_ngcontent-%COMP%]{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;margin-bottom:.75rem}.detail-row-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem}.detail-num[_ngcontent-%COMP%]{font-size:.82rem;font-weight:700;color:#64748b}.form-actions[_ngcontent-%COMP%]{display:flex;gap:.75rem;justify-content:flex-end;padding-top:.5rem}"]})};export{Me as InvoiceInsert};
