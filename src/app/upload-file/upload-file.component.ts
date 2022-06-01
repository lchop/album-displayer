import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize, map, Observable } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  nameImage: string;
  @Output() uploadFileName: EventEmitter<string> = new EventEmitter();
  @Output() progress: EventEmitter<Observable<number>> = new EventEmitter();

  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  upload(event: any) {    
     this.nameImage = event.target.files[0].name;

    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref('/images/' + this.nameImage);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);

    // AngularFireUploadTask provides observable
    // to get uploadProgress value
    this.progress.emit(this.uploadProgress = this.task.snapshotChanges()
    .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100)));

    // get notified when the download URL is available
    // this.task.snapshotChanges().pipe(
    //   map(s => s.ref.getDownloadURL().then(url => {
    //     console.log(url);
    //     this.uploadFileName.emit(url)
    //   }))).subscribe();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().pipe( map(url => {
          this.uploadFileName.emit(url);
        })).subscribe();
    })).subscribe();
  }

}
