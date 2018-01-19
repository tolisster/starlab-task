import { Component, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

class Tag {
  id: number;
  text: string;
}

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: TagsInputComponent }]
})
export class TagsInputComponent implements MatFormFieldControl<number[]>, OnDestroy {

  filteredSources: Tag[] = [];

  selectable = true;
  removable = true;
  addOnBlur = true;

  /* autoCompleteChipList: FormControl = new FormControl();
  // Set up values to use with Chips
  visible: boolean = true;
  // Set up Options Array
  options = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];
  // Define filteredOptins Array and Chips Array
  filteredOptions = [];
  chips = []; */

  stateChanges = new Subject<void>();

  @Input()
  get value(): number[] {
    return this._value;
  }
  set value(ids: number[]) {
    this._value = ids;
    this.stateChanges.next();
  }
  _value: number[] = [];

  @Input()
  get source(): Tag[] {
    return this._source;
  }
  set source(tags: Tag[]) {
    this._source = tags;
    this.stateChanges.next();
  }
  private _source: Tag[] = [];

  static nextId = 0;

  @HostBinding() id = `tags-input-${TagsInputComponent.nextId++}`;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  ngControl = null;

  focused = false;

  get empty() {
    return !this._value.length;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }
  private _disabled = false;

  errorState = false;

  controlType = 'tags-input';

  @HostBinding('attr.aria-describedby') describedBy = '';

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  constructor(private fm: FocusMonitor, private elRef: ElementRef) {
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

}
