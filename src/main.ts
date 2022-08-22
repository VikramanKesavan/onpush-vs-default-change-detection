import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ChangeDetectionStrategy, NgModule } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p>§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</p>
    Change detect concerne child :
    <br />
    <br />
    *If default change :
    <br />
    every time when we update the counter in the ParentComponent, the
    ChildComponent life Cycle is also triggered to re-render, this Child
    Component is re-rendered even when the change of Counter has no impact on
    the view of Child Component.
    <br />
    <br />
    <br />
    ==> At the example below change the stratigy to default you will see the
    function of child at the html render has been called for every click !!
    <br />
    <br />
    * If onPush :
    <br />
    He component will not refresh/re-render, if the parent component’s property
    updates (except for preperties used as input for the child it self ).

    <p>§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</p>
    <div>
      <h1>
        Counter1, which no link & not used on child, has value:
        {{ this.counter1 }}
      </h1>
      <h1>
        Counter2, which is an input from parent to child, has value :
        {{ this.counter2 }}
      </h1>
      <input
        type="button"
        (click)="this.updateCounter()"
        value="Update Counter1 (no link & not used on child)"
      />
      <br />
      <input
        type="button"
        (click)="this.updateCounter2()"
        value="Update Counter2 (input from parent to child)"
      />
      <child-component [counter2]="counter2"></child-component>
    </div>
  `
})
export class AppComponent {
  counter1 = 0;
  counter2 = 1000;

  updateCounter() {
    this.counter1 += 1;
  }

  updateCounter2() {
    ++this.counter2;
  }
}

@Component({
  selector: 'child-component',
  template: `
    <p>------------------------------------- Child compoent start</p>
    <div id="child-component">
      <p>This is Child Component;</p>
      <div>
        <h2>{{ this.functionInHtmlRender() }}</h2>
      </div>
      <div>
        <p>counter2: {{ counter2 }}</p>
      </div>

      <div>
        <p>Child counter: {{ childCounter }}</p>
      </div>
    </div>
    <p>------------------------------------- Child compoent end</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input() counter2;
  childCounter = 10000;
  functionInHtmlRender() {
    console.log('App child Rerendered');
    this.childCounter++;
  }
}

@NgModule({
  declarations: [AppComponent, ChildComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
