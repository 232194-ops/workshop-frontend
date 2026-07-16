/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

// ===== VEHICLE =====
export interface VehicleGetAll$Params {}
export function vehicleGetAll(http: HttpClient, rootUrl: string, params?: VehicleGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, vehicleGetAll.PATH, 'get');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
vehicleGetAll.PATH = '/api/vehicles';

export interface VehicleInsert$Params { body: { brand: string; model: string; year: number; plate: string; color?: string; customerId: string; }; }
export function vehicleInsert(http: HttpClient, rootUrl: string, params: VehicleInsert$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, vehicleInsert.PATH, 'post');
  rb.body(params.body, 'application/json');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
vehicleInsert.PATH = '/api/vehicles';

export interface VehicleUpdate$Params { id: string; body: { brand: string; model: string; year: number; plate: string; color?: string; customerId: string; }; }
export function vehicleUpdate(http: HttpClient, rootUrl: string, params: VehicleUpdate$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, vehicleUpdate.PATH, 'put');
  rb.path('id', params.id); rb.body(params.body, 'application/json');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
vehicleUpdate.PATH = '/api/vehicles/{id}';

export interface VehicleDelete$Params { id: string; }
export function vehicleDelete(http: HttpClient, rootUrl: string, params: VehicleDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, vehicleDelete.PATH, 'delete');
  rb.path('id', params.id);
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
vehicleDelete.PATH = '/api/vehicles/{id}';

// ===== MECHANIC =====
export interface MechanicGetAll$Params {}
export function mechanicGetAll(http: HttpClient, rootUrl: string, params?: MechanicGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, mechanicGetAll.PATH, 'get');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
mechanicGetAll.PATH = '/api/mechanics';

export interface MechanicInsert$Params { body: { firstName: string; specialty: string; phone?: string; }; }
export function mechanicInsert(http: HttpClient, rootUrl: string, params: MechanicInsert$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, mechanicInsert.PATH, 'post');
  rb.body(params.body, 'application/json');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
mechanicInsert.PATH = '/api/mechanics';

export interface MechanicUpdate$Params { id: string; body: { firstName: string; specialty: string; phone?: string; }; }
export function mechanicUpdate(http: HttpClient, rootUrl: string, params: MechanicUpdate$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, mechanicUpdate.PATH, 'put');
  rb.path('id', params.id); rb.body(params.body, 'application/json');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
mechanicUpdate.PATH = '/api/mechanics/{id}';

export interface MechanicDelete$Params { id: string; }
export function mechanicDelete(http: HttpClient, rootUrl: string, params: MechanicDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, mechanicDelete.PATH, 'delete');
  rb.path('id', params.id);
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
mechanicDelete.PATH = '/api/mechanics/{id}';

// ===== WORK ORDER =====
export interface WorkOrderGetAll$Params {}
export function workOrderGetAll(http: HttpClient, rootUrl: string, params?: WorkOrderGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, workOrderGetAll.PATH, 'get');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
workOrderGetAll.PATH = '/api/work-orders';

export interface WorkOrderInsert$Params { body: { entryDate: string; problemDescription: string; diagnosis?: string; status: string; vehicleId: string; mechanicId?: string; }; }
export function workOrderInsert(http: HttpClient, rootUrl: string, params: WorkOrderInsert$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, workOrderInsert.PATH, 'post');
  rb.body(params.body, 'application/json');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
workOrderInsert.PATH = '/api/work-orders';

export interface WorkOrderUpdate$Params { id: string; body: { entryDate: string; problemDescription: string; diagnosis?: string; status: string; vehicleId: string; mechanicId?: string; }; }
export function workOrderUpdate(http: HttpClient, rootUrl: string, params: WorkOrderUpdate$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, workOrderUpdate.PATH, 'put');
  rb.path('id', params.id); rb.body(params.body, 'application/json');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
workOrderUpdate.PATH = '/api/work-orders/{id}';

export interface WorkOrderDelete$Params { id: string; }
export function workOrderDelete(http: HttpClient, rootUrl: string, params: WorkOrderDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, workOrderDelete.PATH, 'delete');
  rb.path('id', params.id);
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
workOrderDelete.PATH = '/api/work-orders/{id}';

// ===== SERVICE =====
export interface ServiceGetAll$Params {}
export function serviceGetAll(http: HttpClient, rootUrl: string, params?: ServiceGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, serviceGetAll.PATH, 'get');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
serviceGetAll.PATH = '/api/services';

export interface ServiceInsert$Params { body: { name: string; description?: string; price: number; }; }
export function serviceInsert(http: HttpClient, rootUrl: string, params: ServiceInsert$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, serviceInsert.PATH, 'post');
  rb.body(params.body, 'application/json');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
serviceInsert.PATH = '/api/services';

export interface ServiceUpdate$Params { id: string; body: { name: string; description?: string; price: number; }; }
export function serviceUpdate(http: HttpClient, rootUrl: string, params: ServiceUpdate$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, serviceUpdate.PATH, 'put');
  rb.path('id', params.id); rb.body(params.body, 'application/json');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
serviceUpdate.PATH = '/api/services/{id}';

export interface ServiceDelete$Params { id: string; }
export function serviceDelete(http: HttpClient, rootUrl: string, params: ServiceDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, serviceDelete.PATH, 'delete');
  rb.path('id', params.id);
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
serviceDelete.PATH = '/api/services/{id}';

// ===== SPARE PART =====
export interface SparePartGetAll$Params {}
export function sparePartGetAll(http: HttpClient, rootUrl: string, params?: SparePartGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, sparePartGetAll.PATH, 'get');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
sparePartGetAll.PATH = '/api/spare-parts';

export interface SparePartInsert$Params { body: { name: string; brand?: string; price: number; stock: number; }; }
export function sparePartInsert(http: HttpClient, rootUrl: string, params: SparePartInsert$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, sparePartInsert.PATH, 'post');
  rb.body(params.body, 'application/json');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
sparePartInsert.PATH = '/api/spare-parts';

export interface SparePartUpdate$Params { id: string; body: { name: string; brand?: string; price: number; stock: number; }; }
export function sparePartUpdate(http: HttpClient, rootUrl: string, params: SparePartUpdate$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, sparePartUpdate.PATH, 'put');
  rb.path('id', params.id); rb.body(params.body, 'application/json');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
sparePartUpdate.PATH = '/api/spare-parts/{id}';

export interface SparePartDelete$Params { id: string; }
export function sparePartDelete(http: HttpClient, rootUrl: string, params: SparePartDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, sparePartDelete.PATH, 'delete');
  rb.path('id', params.id);
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
sparePartDelete.PATH = '/api/spare-parts/{id}';

// ===== INVOICE =====
export interface InvoiceGetAll$Params {}
export function invoiceGetAll(http: HttpClient, rootUrl: string, params?: InvoiceGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, invoiceGetAll.PATH, 'get');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
invoiceGetAll.PATH = '/api/invoices';

export interface InvoiceInsert$Params { body: { issueDate: string; customerId: string; details: any[]; }; }
export function invoiceInsert(http: HttpClient, rootUrl: string, params: InvoiceInsert$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, invoiceInsert.PATH, 'post');
  rb.body(params.body, 'application/json');
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
invoiceInsert.PATH = '/api/invoices';

export interface InvoiceDelete$Params { id: string; }
export function invoiceDelete(http: HttpClient, rootUrl: string, params: InvoiceDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, invoiceDelete.PATH, 'delete');
  rb.path('id', params.id);
  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse), map((r: HttpResponse<any>) => r as StrictHttpResponse<any>));
}
invoiceDelete.PATH = '/api/invoices/{id}';
