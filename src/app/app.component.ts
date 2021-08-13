import { Component } from '@angular/core';
import { UploadService } from './services/upload.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
declare var SamsungPay: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-image-upload';
  htmlCont = null;
  samsungAPIURL = 'https://api-ops.stg.mpay.samsung.com';

  constructor(private uploadService: UploadService, private http: HttpClient) {
    this.loadScript(
      'https://d35p4vvdul393k.cloudfront.net/sdk_library/us/stg/ops/pc_gsmpi_web_sdk.js'
    );
  }

  async uploadFile(event: any) {
    const file = event.target.files[0];
    const data = await this.uploadService.addPhoto(file);
    console.log(data);
  }

  downloadDOC(url: string) {
    if (this.htmlCont) {
      this.http
        .post(
          `http://192.168.1.139:5000/${url}`,
          {
            html: this.htmlCont,
          },
          { responseType: 'blob' }
        )
        .subscribe((resp: any) => {
          // console.log(resp);

          // var file = new File([resp], `filename${new Date().getTime()}`, {
          //   type: 'application/msword',
          //   lastModified: Date.now(),
          // });
          // var byteArray = new Uint8Array(resp);
          // var blob = new Blob([byteArray], {type: "application/msword"});
          saveAs(resp, 'filename.docx');
        });
    } else {
      alert('enter content');
    }
  }

  initSamsungPay() {
    if(window.PaymentRequest){
      
    }
    SamsungPay.connect()
    // this.loadScript(
    //   'https://d35p4vvdul393k.cloudfront.net/sdk_library/us/stg/ops/pc_gsmpi_web_sdk.js'
    // );
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
