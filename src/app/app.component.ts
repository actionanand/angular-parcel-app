import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

import { singleSpaPropsSubject } from '../single-spa/single-spa-props';

interface AppProps {
  [key: string]: unknown;
}

interface Todo {
  title: string;
  isDone: boolean;
}

@Component({
  selector: 'app-sspa-angular-parcel',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  dialogRefAccessor = 'componentInstance';
  title = 'Angular 18 single-spa standalone';
  todo!: Todo;

  parcelPopupdata!: AppProps;

  ngOnInit(): void {
    singleSpaPropsSubject.subscribe((props: AppProps) => {
      console.log('Angular popup parcel props: ', props);
      // this.parcelPopupdata = props[this.dialogRefAccessor].data ;
      const popupConfig = props[this.dialogRefAccessor] as { data: AppProps };
      this.parcelPopupdata = popupConfig.data;
      console.log('Angular popup parcel data: ', this.parcelPopupdata);

      this.title = this.parcelPopupdata['title'] as string;
      this.todo = this.parcelPopupdata['todo'] as Todo;
    });
  }
}
