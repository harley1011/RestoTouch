import { Injectable } from '@angular/core';
import { Menu } from '../shared/models/menu';
import { GeneralResponse }  from '../shared/general.response';
import { Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttpService } from '../services/auth-http.services';
import { Observable } from 'rxjs/Observable';
import  {ApiEndpointService} from '../services/api-endpoint.service';

@Injectable()
export class MenuService {
    private url = '/menu';

    public selectedMenu: Menu;

    constructor (private http: AuthHttpService, private api: ApiEndpointService) {}

    getMenu (menuId: number): Observable<Menu> {
        return this.http.get(this.api.getEndpoint() + this.url + '/' + menuId)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getMenus (): Observable<Menu[]> {
        return this.http.get(this.api.getEndpoint() + this.url)
            .map((response) => this.extractData(response).menus)
            .catch(this.handleError);
    }

    addMenu (menu: Menu): Observable<GeneralResponse> {
        let body = JSON.stringify(menu);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api.getEndpoint() + this.url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateMenu (menu: Menu): Observable<GeneralResponse> {
        let body = JSON.stringify(menu);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.api.getEndpoint() + this.url + '/' + menu.id, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteMenu (menu: Menu): Observable<Menu> {
        return this.http.delete(this.api.getEndpoint() + this.url + '/' + menu.id)
            .map(this.extractData)
            .catch(this.handleError);
    }



    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
