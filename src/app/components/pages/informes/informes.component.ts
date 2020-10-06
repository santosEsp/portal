import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
})
export class InformesComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
