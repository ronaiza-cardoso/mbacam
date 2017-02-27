import { Component } from '@angular/core';

import { NavController, ActionSheetController } from 'ionic-angular';
import { Camera, NativeStorage } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public imageList: Array<any> = [];
  public image: any;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {

  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          icon: 'images',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          icon: 'aperture',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close'
        }
      ]
    });

    actionSheet.present();
  }

  public takePicture(sourceType) {
    let options = {
      quality: 50,
      sourceType: sourceType,
      destinationType: Camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    Camera.getPicture(options).then(imagePath => {
        this.saveImage("data:image/jpeg;base64," + imagePath);
      }, (err)=>{
          console.log(JSON.stringify(err));
      });
  }

  private saveImage(image: string) {
    NativeStorage.setItem('image', {image})
      .then(
        () => this.getImage(),
        error => console.error('Error storing item', error)
      );
  }

  private getImage() {
    NativeStorage.getItem('image')
      .then(
        data => this.imageList.push(data),
        error => console.error(error)
      );
  }

}
