import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Type } from '../../_models/type'
import { Brand } from '../../_models/brand'

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss']
})
export class FilterComponentComponent {
  @Input() items: Type[] | Brand[] = [];
  @Input() selectedItemId: number = 0;
  @Input() title: string = '';
  @Output() itemSelected = new EventEmitter<number>();

  onItemSelected(id: number) {
    this.itemSelected.emit(id);
  }

}
