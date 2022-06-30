import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  name: string;
  displayName: string;
  @Input() type: string;
  @Output() uploadFileName: EventEmitter<string> = new EventEmitter();
  @Output() progress: EventEmitter<Observable<number>> = new EventEmitter();

  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    if (this.type === 'image') {
      this.displayName = 'une image';
    } else if (this.type === 'file') {
      this.displayName = 'un fichier';
    }
  }

  upload(event: any) {    
    this.name = event.target.files[0].name;

    // create a reference to the storage bucket location
    if (this.type === 'image') {
      this.ref = this.afStorage.ref(`images/${this.name}`);
    }
    else if (this.type === 'file') {
      this.ref = this.afStorage.ref('/files/' + this.name);
    }
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);

    // AngularFireUploadTask provides observable
    // to get uploadProgress value
    this.progress.emit(this.uploadProgress = this.task.snapshotChanges()
    .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100)));

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().pipe( map(url => {
          this.uploadFileName.emit(url);
        })).subscribe();
    })).subscribe();
  }

}
