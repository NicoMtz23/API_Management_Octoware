import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import * as _ from 'lodash'
import { FavApiUsr } from 'src/app/models/basicInfoUser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  displayedColumns: string[] = ['nombre_api', 'disp_api', 'ult_conexion_api', 'version_api'];
  dataSource!: MatTableDataSource<FavApiUsr>;

  constructor( private dataService: DataService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;

  userData = this.dataService.getJsonValue('currentUser');

  ngOnInit(): void {
    this.getAllFavs();
  }
  
  getAllFavs() {
    this.dataService.getFavs(this.userData.id_usr ).subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res.entries);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
      },
      error: (err)=>{
        alert("Error while fetching data.");
      }
    })
  }
}
