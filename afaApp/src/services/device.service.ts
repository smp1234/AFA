import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Util} from '../constants/util';
import {HttpHeaders} from '@angular/common/http';
 

@Injectable()
export class DeviceService {

  //private mqApiString = "https://api.machineq.net/v1/";
  headerAWS = new HttpHeaders();
  




  constructor(private util: Util, private http: HttpClient) {

  }

  getUser(username){
    this.headerAWS.set("requestType", "login");
    this.headerAWS.set("username", username);
    return this.http.get("https://gkefuynsbd.execute-api.us-east-1.amazonaws.com/TEST/getdevices",{headers:this.headerAWS});
  }

  // getDevice(id) {
  //   return this.http.get(this.mqApiString + 'devices/' + id, {headers: this.util.SECURED_HEADER});
  // }

  getAllDevices() {    
    return this.http.get("https://gkefuynsbd.execute-api.us-east-1.amazonaws.com/TEST/getdevices?requestType=getdevices");
  }
   
  getAllGateways() {
  //   return this.http.get(this.mqApiString + 'gateways', {headers: this.util.SECURED_HEADER});
  return this.http.get("https://gkefuynsbd.execute-api.us-east-1.amazonaws.com/TEST/getdevices?requestType=getdevices");
  }


  // getDeviceStats(id) {
  //   return this.http.get(this.mqApiString + 'devices/' + id + '/statistics', {headers: this.util.SECURED_HEADER});
  // }

  getPayloadData(macId, lastDay) {
    //return this.http.get(this.mqApiString + 'devices/' + macId + '/payloads?StartTime=' + lastDay, {headers: this.util.SECURED_HEADER});
    console.log(typeof(lastDay));
    return this.http.get("https://gkefuynsbd.execute-api.us-east-1.amazonaws.com/TEST/getdevicedata?requestType=getdevicesdata&Clock=2018-09-19T2018-09-21&DevId=4491600000F7BF4C");
  }

}
