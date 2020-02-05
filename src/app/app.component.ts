import { Component, Injectable, Input } from '@angular/core';
import { newEnforcer, newModel, StringAdapter } from 'casbin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'casbin-angular';
  public policy = '[request_definition]\n' +
                  'r = sub, obj, act\n' +
                  '\n' +
                  '[policy_definition]\n' +
                  'p = sub, obj, act\n' +
                  '\n' +
                  '[role_definition]\n' +
                  'g = _, _\n' +
                  '\n' +
                  '[policy_effect]\n' +
                  'e = some(where (p.eft == allow))\n' +
                  '\n' +
                  '[matchers]\n' +
                  'm = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act';

  public dataSet =  'p, admin, GET, / , puma, , api\n'+
                    'g, kxg8313, admin, write, puma, , api\n'+
                    'p, admin, GET, /info, puma, deny, api\n'+
                    'p, admin, CreateProject, write, puma, , web'

  public req: any;
  public result: any;
  public userId: any;


  constructor() {
    this.userId = 'kxg8313';
    this.req = {
      headers: {
        userid : this.userId,
        role: 'admin'
      },
      method: 'GET',
      originalUrl: '/'
    };
  }

  public validatePermission() {
    this.req = {
      headers: {
        userid : this.userId,
        role: 'admin'
      },
      method: 'GET',
      originalUrl: '/'
    };
    let self = this;
    this.verifyPermission().then(function(response: any) {
      self.result = response;
    }.bind(this));
  }

  public async verifyPermission() {
    try {
      const e = await newEnforcer(newModel(this.policy), new StringAdapter(this.dataSet));
      const authzorizer = new BasicAuthorizer(this.req, e);
      const authcheck = await authzorizer.checkPermission();
      if (!authcheck) {
        console.log('unauthorized');
        return false;
      } else {
        console.log('authorized');
        return true;
      }
    } catch(ex) {
      console.log(ex);
    }
  }
}


@Injectable()
export class BasicAuthorizer {
  private req: any;
  private enforcer: any;
  constructor(req: any, enforcer: any) {
      this.req = req;
      this.enforcer = enforcer;
  }

  getUserName() {
      const { user } = this.req;
      const { username } = user;
      return username;
  }

  checkPermission() {
      const { req, enforcer } = this;
      const { originalUrl: path, method } = req;
      console.log('--------details----',method, path)
      return enforcer.enforce(req.headers.userid, method , path);
  }
}

