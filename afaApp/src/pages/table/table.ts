import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {CookieService} from 'ngx-cookie-service';
import { DeviceInfo } from '../../model/DeviceInfo';
import { DeviceService } from '../../services/device.service';

/**
 * Generated class for the TablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-table',
  templateUrl: 'table.html',
})
export class TablePage {

  deviceName:any;
  deviceId:any;
  payloadData:any[];
  panel:DeviceInfo[];

  constructor(public cookieService: CookieService, private deviceService: DeviceService, public navCtrl: NavController, public navParams: NavParams) {
    this.deviceName=this.cookieService.get('deviceName');
    this.deviceId=this.cookieService.get('deviceId');
    this.payloadData=[];
    this.table();
  }

  table(){
    var dateMonthString;
    var dateDayString;
    this.panel=[];
    const date = new Date();
    date.setDate(date.getDate()-7);
    date.setMonth(date.getUTCMonth()+1);
    if(date.getUTCMonth()<10)
    {
      dateMonthString = "0"+date.getUTCMonth().toString();
    }else{
      dateMonthString = date.getUTCMonth().toString();
    }
    if(date.getUTCDate()<=9){
      dateDayString = "0"+date.getUTCDate().toString();
    }else{
      dateDayString = date.getUTCDate().toString();
    }
    const utcTime = date.getUTCFullYear().toString()+"-"+dateMonthString+"-"+dateDayString+"T00:00:00.000Z";
    console.log(utcTime);
    this.deviceService.getPayloadData(this.deviceId,utcTime).subscribe((data)=>{
      console.log(data);
      this.payloadData = data['Items'];
     
      for(var i=0; i<this.payloadData.length; i++){
        let currentPanel = new DeviceInfo();
        console.log(this.payloadData[i].Time.S);
        const tableDate = new Date(this.payloadData[i].Time.S);
        
        console.log("tabledtae "+tableDate);

        currentPanel.date = tableDate;
        var messageType= this.payloadData[i].RawData.S.substr(2,2);
        var payLoad= this.payloadData[i].RawData.S.substr(4);
       
        
        
        switch(messageType){
            case 'fd':{
                if(payLoad=='01'){
                  currentPanel.RawData  = "Sensor state message (OPEN)";
                }
                else if(payLoad=='00'){
                  currentPanel.RawData  = "Sensor state message (CLOSED)";
                }
                break;
            }
            case '02':{
                if(payLoad=='01'){
                  currentPanel.RawData  = "Tamper switch message (CLOSED)";
                }
                else if(payLoad=='00'){
                  currentPanel.RawData  = "Tamper switch message (OPEN)";
                }
                break;
            }
            case '07':{
                if(payLoad=='01'){
                  currentPanel.RawData  = "Sensor Event (CLOSED)";
                }
                else if(payLoad=='00'){
                  currentPanel.RawData  = "Sensor Event (OPEN)";
                }
                break;
            }
            default:{
              currentPanel.RawData = this.payloadData[i].RawData.S;

            }
            
            }
        
        this.panel.push(currentPanel);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TablePage');
  }

  logout()
  {
    this.navCtrl.setRoot(LoginPage);
    this.cookieService.delete('xAuthToken'); 
  }

  goBack()
  {
    this.navCtrl.setRoot('AnalyticsPage');
  }

}
