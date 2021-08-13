import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor() {}

  async addPhoto(file: File): Promise<any> {
    const fileName = file.name;
    const photoKey = fileName;
    AWS.config.update({
      region: 'REGION',
      credentials: new AWS.Credentials({
        accessKeyId: 'ACCESSKEY',
        secretAccessKey: 'SECRETKEY',
      }),
    });
    return new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'BUCKETNAME',
        Key: photoKey,
        Body: file,
      },
    }).promise();
  }
}
