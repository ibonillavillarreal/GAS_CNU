

import { Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ItemService } from 'src/app/services/Item.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddItemSComponent } from '../add-item-puntos/add-itemPuntos.component';
import { Items } from 'src/app/models/Items';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Toast } from 'src/app/utils/Toast';
import { SelectionModel } from '@angular/cdk/collections';
import { EditafilaCampoComponent } from '../editFilaUso/editfila-Campo.component';


@Component({
  selector: 'app-eliminar-agenda',
  templateUrl:'./eliminar-agenda.component.html',  
  styleUrls: ['./eliminar-agenda.component.css']
})
export class EliminarAgenda implements OnInit {

 
  firstLoad: boolean = true;
  frmAddItem!: FormGroup
  tools: GlobalUtilities;
  toast: Toast;
  list_Producto:any ;
  list_Producto_Item: any[] = [];
  Lista_ID!: any
  Lista_NOMBRE!: any
  list_proyecto: any[] = [];
  
  displayedColumns: string[] = [
    'Descripcion',
    'Cantidad',
    'Precio',
    'PrecioDollar',
    'Iva',
    //'subTotal',
    //'subTotalDollar',
    'DescripcionDeUso',
    'acciones'
  ];

  dataSource = new MatTableDataSource(this.list_Producto_Item);
  dataSourceItemProyecto = new MatTableDataSource(this.list_Producto_Item);
  selection = new SelectionModel<any>(true, []);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialogItems: any;
  bool = false

  constructor(
    private _builder: FormBuilder,
    private srvItem: ItemService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRefItems: MatDialog,
    private dialogRef: MatDialogRef<EliminarAgenda>
  ) {
    this.tools = GlobalUtilities.getInstance();
    this.toast = new Toast(this._snackbar);

    console.log('Entrada de datos Items - Data : ' +JSON.stringify(data));
    // viene de pantalla Detail para ver 
    if(data.ModoVer ==0){      
    let tmpFila:any;
    tmpFila = data.filaItems[0] ;   //.frm_modeloItem.idDetCotizacion; //viene del enviaraPadre
    this.list_Producto = tmpFila;
    
    this.list_Producto_Item = data.DetalleItem; //viene del padre
    this.dataSourceItemProyecto.data = this.list_Producto_Item; //ES para la tabla grid
    }
   
    // RE Asiganar solo en caso que venga de la pantalla MODO SOLO VER 
   if(data.ModoVer == 1){     
    //console.log('CARGA DESDE EDITAR NUEVO  =====>>>>>> '+JSON.stringify(data)); 

    this.list_Producto = data.filaItems[0]; // PARA LA FILA viene del padre Add

    let dataListaItems: any[];
        dataListaItems = data.DetalleItem;  //viene del padre Add
        //console.log(dataListaItems);
        dataListaItems.forEach((e:any)=> {
            e.Item.list_Producto_Item.forEach( (f:any)=> {
               let objDataSource = {
                  ARTICULO:f.itemProyecto.ARTICULO,
                  DESCRIPCION:f.itemProyecto.DESCRIPCION,
                  TIPO:f.itemProyecto.TIPO,
                  Precio:f.itemProyecto.Precio,
                  Precio$:f.itemProyecto.Precio$,
                  Largo:f.itemProyecto.Largo,
                  Ancho:f.itemProyecto.Ancho,
                  Cantidad:f.itemProyecto.Cantidad,
                  MONEDA:f.itemProyecto.MONEDA,
                  CostoBase:f.itemProyecto.CostoBase,
                  Iva:f.itemProyecto.Iva,
                  IvaC$:f.itemProyecto.IvaC$,
                  Iva$:f.itemProyecto.Iva$,
                  subTotal:f.itemProyecto.subTotal,
                  subTotal$:f.itemProyecto.subTotal$,
                  DescripcionDeUso:f.DescripcionDeUso
                }
                this.list_Producto_Item.push(objDataSource);    
            });
          });  
        this.dataSourceItemProyecto.data = this.list_Producto_Item;
  }else if(data.ModoVer == 2){
    this.list_Producto = data.proyecto; // PARA LA FILA viene del padre Add

    this.list_Producto_Item = data.proyecto.detalles_proyecto;  //viene del padre Add    
    console.log(this.data);
    this.dataSourceItemProyecto.data = this.list_Producto_Item;
    // this.list_Producto_Item.push(dataListaItems);    
  } 
    this.getData();
    this.iniciarForm();
  }

  iniciarForm() {
    this.frmAddItem = this._builder.group({
      DESCRIPCION: [''],
      Cantidad: [''],
      Precio: [''],
      Precio$: [''],
      Iva: [''],
      IvaC$: [''],
      Iva$: [''],
      subTotal: [''],
      subTotal$: ['']
    });
    
    if (this.data.ModoVer == 0)
    {
      this.frmAddItem.patchValue({...this.list_Producto})
    }else if(2){
      this.frmAddItem.patchValue({...this.list_Producto})
    }
    
    
  }

  async getData() {
    this.setListaProducto();
  }

  ngOnInit(): void {

    this.escuchador(); //llamada
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async escuchador() {
    this.srvItem.addItemTriggerEditProyect.subscribe(res => {
      this.list_Producto_Item.push(res.data);
      this.dataSourceItemProyecto.data = this.list_Producto_Item;
    })
  }

  async setListaProducto() {
    this.srvItem.getTipoItem(0).subscribe((ItemData: any) => {
      this.list_Producto = ItemData[0];
      //this.dataSourceItemProyecto.data = this.list_Producto_Item; //ES para la tabla grid
    });
  }

  openFormEditDetalle(ARTICULO:any,Cantidad:any,DescripUso:any){

    let dialog = this.dialogRefItems.open(EditafilaCampoComponent,{data:{ARTICULO:ARTICULO,Cantidad:Cantidad,DescripUso:DescripUso}})
    dialog.afterClosed().subscribe(res =>{
      if(res !== undefined){
        console.log(this.list_Producto_Item);
        let obj = this.list_Producto_Item.find(x => x.ARTICULO === res.ARTICULO);
        console.log(obj)
        obj.Cantidad = res.Cantidad
        obj.DescripcionDeUso = res.DescripUso;
        //eliminar anterior
        let index=this.list_Producto_Item.findIndex(x => x.ARTICULO === res.ARTICULO)
        if(index > 0){
          this.list_Producto_Item.splice(index,1);
          this.list_Producto_Item.push(obj);
        }
        this.dataSourceItemProyecto.data = this.list_Producto_Item; 
      }
    });
  }
  

  openFrmItems(type: number, id: number) {
    let datoCompuesto: any[] = [1, this.list_Producto];

    let dialogRef;
    switch (type) {
       case 1: { dialogRef = this.dialogRefItems.open(AddItemSComponent, { height: '730px', width: '800px', data: this.list_Producto }) } break;
      default: { dialogRef = this.dialogRefItems.open(AddItemSComponent); } break;
    }
    dialogRef.afterClosed().subscribe(() => {
      this.loadModules();
    });
  }

  async loadModules() {
    this.firstLoad = true;

    this.frmAddItem.controls['Precio']
      .setValue(parseFloat(this.list_Producto_Item.map((t: any) =>
        parseFloat(t.Precio)).reduce((acc: any, value: any) => acc + value, 0))
      );
    this.frmAddItem.controls['Precio$']
      .setValue(this.list_Producto_Item.map((t: Items) =>
        parseFloat(t.Precio$)).reduce((acc: any, value: any) => acc + value, 0)
      );

    this.frmAddItem.controls['Iva']
      .setValue((this.list_Producto_Item.map((t: Items) => t.Iva)[0])
      );

    this.frmAddItem.controls['subTotal']
      .setValue(this.list_Producto_Item.map((t: Items) =>
        parseFloat(t.Cantidad) * parseFloat(t.Precio)).reduce((acc: any, value: any) => acc + value, 0)
      );

    this.frmAddItem.controls['subTotal$']
      .setValue(this.list_Producto_Item.map((t: Items) =>
        parseFloat(t.Precio$) * parseFloat(t.Cantidad)).reduce((acc: any, value: any) => acc + value, 0)
      );


    if (this.firstLoad) {
      setTimeout(() => {
        this.tools.setisLoadingDetails(false)
      }, 450);
      this.firstLoad = false;
    }

  }



  enviaraPadre(values: any) {

    let frm_modeloItem = values;
    this.frmAddItem.controls['DESCRIPCION'].setValue(frm_modeloItem.DESCRIPCION),
    this.frmAddItem.controls['Cantidad'].setValue(frm_modeloItem.Cantidad),
    this.frmAddItem.controls['Precio'].setValue(frm_modeloItem.Precio),
    
    ///  SE HACEN LOS RE CALCULOS 

    this.frmAddItem.controls['IvaC$'].setValue(
      parseFloat(this.frmAddItem.controls['Cantidad'].value)
      * parseFloat(this.frmAddItem.controls['Precio'].value)
      * parseFloat(this.frmAddItem.controls['Iva'].value)
    );
    this.frmAddItem.controls['Iva$'].setValue(
      parseFloat(this.frmAddItem.controls['Cantidad'].value)
      * parseFloat(this.frmAddItem.controls['Precio$'].value)
      * parseFloat(this.frmAddItem.controls['Iva'].value)
    );

    this.frmAddItem.controls['subTotal$']
      .setValue(this.list_Producto_Item.map((t: Items) =>
        parseFloat(t.Precio$) * parseFloat(t.Cantidad)).reduce((acc: any, value: any) => acc + value, 0)
      );

    this.frmAddItem.controls['subTotal'].setValue(
      parseFloat(this.frmAddItem.controls['Cantidad'].value) * parseFloat(this.frmAddItem.controls['Precio'].value)
    );
    this.frmAddItem.controls['subTotal$'].setValue(
      parseFloat(this.frmAddItem.controls['Cantidad'].value) * parseFloat(this.frmAddItem.controls['Precio$'].value)
    );
    
    let proyecto = { 
      DESCRIPCION:frm_modeloItem.DESCRIPCION, 
      Cantidad:frm_modeloItem.Cantidad,
      Iva:frm_modeloItem.Iva,
      Iva$:frm_modeloItem.Iva$,
      IvaC$:frm_modeloItem.IvaC$,
      Precio:frm_modeloItem.Precio,
      Precio$:frm_modeloItem.Precio$,
      subTotal:frm_modeloItem.subTotal,
      subTotal$:frm_modeloItem.subTotal$,
      detalles_proyecto:this.list_Producto_Item 
    };
    console.log(proyecto)
    this.dialogRef.close(proyecto)

    //console.log("MODELO DEL PROYECTO COMPUESTO ANTES DE EMITIR");

    //EMITE EL EVENTO  ENVIO HACIA LA LISTA DE PROYECTOS ITEMS
    
    //this.srvItem.addItemTriggerDescProyecto.emit({ data_filaItem: frm_modeloItem });

    //lista_Item
    
    //this.srvItem.addItemTriggerItemsProyecto.emit({ data_ItemProyecto: obj_Proyecto_Items_Desc });

    // //cerramos el popup
  

  }



  EditCantidad(Articulo:any,Cantidad:any){
    //console.log('valores al edidtar la cantidad [Articulo y Cantidad value]');
    //console.log(Articulo+'  -  '+Cantidad);
    //this.dataSourceItemProyecto.data = this.list_Producto_Item; //Refrescamos  tabla grid
}



  load_SubTotalNeto(listado: Items[], cordobas: boolean) {

    if (cordobas) {
      let sumatotal: number = 0
      listado.forEach(campo => {
        sumatotal = parseFloat(campo.subTotal) + sumatotal;
      })
      return sumatotal;
    } else {
      let sumatotal$: number = 0
      listado.forEach(campo => {
        sumatotal$ = parseFloat(campo.subTotal$) + sumatotal$;
      })
      return sumatotal$;
    }


  }

  load_SubIvaNeto(listado: Items[], cordoba: boolean) {
    if (cordoba) {
      let sumaIva: number = 0
      listado.forEach(campo => {
        sumaIva = parseFloat(campo.IvaC$) + sumaIva;
      })
      return sumaIva;
    } else {
      let sumaIva$: number = 0
      listado.forEach(campo => {
        sumaIva$ = parseFloat(campo.Iva$) + sumaIva$;
      })
      return sumaIva$;
    }

  }

  delete(Articulo: any) {
  }

}


